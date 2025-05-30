import { Dialog, DialogContent } from "@/components/ui/dialog.jsx";
import InquiryDetailForm from "./InquiryDetailForm";

const InquiryDetailModal = ({ open, onOpenChange, inquiry, onSubmit }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                {inquiry && <InquiryDetailForm inquiry={inquiry} onSubmit={onSubmit} />}
            </DialogContent>
        </Dialog>
    );
};

export default InquiryDetailModal;
