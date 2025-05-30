import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const MemberForm = ({ name, email, role, reason, createdAt }) => {
    return (
        <div className="flex items-start gap-4 p-4">
            <Avatar>
                <AvatarImage src="" alt={name} />
                <AvatarFallback>{name?.charAt(0) ?? "?"}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    {name && <p className="font-semibold text-sm">{name}</p>}
                    {role==="LEADER" && <Badge variant="outline" className="w-fit">회장</Badge>}
                </div>

                {email && <p className="text-sm text-muted-foreground">{email}</p>}
                {reason && <p className="text-sm text-destructive">사유: {reason}</p>}
                {createdAt && (
                    <p className="text-xs text-muted-foreground">
                        등록일: {new Date(createdAt).toLocaleString()}
                    </p>
                )}
            </div>
        </div>
    );
};

export default MemberForm;
