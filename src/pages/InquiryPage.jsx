import { useEffect, useState } from "react";
import { fetchAllInquiries } from "@/api/inquiry";
import InquiryList from "@/components/inquiry/InquiryList";
import InquiryDetailModal from "@/components/inquiry/InquiryDetailModal";
import PageContainer from "@/components/layout/PageContainer.jsx";

const InquiryPage = () => {
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [inquiries, setInquiries] = useState([]);

    useEffect(() => {
        fetchAllInquiries().then((res) => setInquiries(res.data.inquiries));
    }, []);

    // 답변 or 거절 후 리스트 갱신
    const handleSubmit = (id, newStatus, answer) => {
        setInquiries((prev) =>
            prev.map((i) =>
                i.id === id ? { ...i, status: newStatus, answer } : i
            )
        );
        setSelectedInquiry(null);
    };

    return (
            <PageContainer>

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">문의 관리</h1>
            </div>
            <InquiryList
                inquiries={inquiries}
                onSelectInquiry={setSelectedInquiry}
            />
            <InquiryDetailModal
                open={!!selectedInquiry}
                inquiry={selectedInquiry}
                onOpenChange={() => setSelectedInquiry(null)}
                onSubmit={handleSubmit}
            />

            </PageContainer>
        // </main>
    );
};

export default InquiryPage;
