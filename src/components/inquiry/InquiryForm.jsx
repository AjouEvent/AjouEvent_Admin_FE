import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const InquiryForm = ({ id, title, memberName, createdAt, status }) => {
    return (
        <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/40 cursor-pointer transition">
            <Avatar>
                <AvatarImage src="" alt={memberName} />
                <AvatarFallback>{memberName?.charAt(0) ?? "?"}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-sm">{title}</p>
                    <Badge variant={status.toLowerCase()}>
                        {status}
                    </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{memberName}</p>
                <p className="text-xs text-muted-foreground">
                    작성일: {new Date(createdAt).toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default InquiryForm;
