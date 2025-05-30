import { Skeleton } from "@/components/ui/skeleton";
import { Avatar } from "@/components/ui/avatar";

const MemberFormSkeleton = () => {
    return (
        <div className="flex items-start gap-4 p-4 border rounded-xl shadow-sm bg-white">
            <Avatar>
                <Skeleton className="h-10 w-10 rounded-full" />
            </Avatar>
            <div className="flex flex-col gap-2 w-full">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-3 w-[180px]" />
                <Skeleton className="h-4 w-[80px]" />
            </div>
        </div>
    );
};

export default MemberFormSkeleton;
