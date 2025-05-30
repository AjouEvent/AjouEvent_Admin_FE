import { Card, CardContent } from "@/components/ui/card";
import InquiryForm from "./InquiryForm";

const InquiryList = ({ inquiries, onSelectInquiry }) => {
    return (
        <Card>
            <CardContent className="divide-y p-0">
                {inquiries.map((inq) => (
                    <div
                        key={inq.id}
                        className="cursor-pointer hover:bg-muted/30 transition"
                        onClick={() => onSelectInquiry(inq)}
                    >
                        <InquiryForm {...inq} />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};
export default InquiryList;
