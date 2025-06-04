import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { updateMemberPermission } from "@/api/member.js";
import { useToast } from "@/hooks/use-toast";

const PERMISSIONS = [
    { type: "CAN_VIEW_EVENT", label: "이벤트 보기" },
    { type: "CAN_EDIT_EVENT", label: "이벤트 수정" },
    { type: "CAN_SEND_NOTIFICATION", label: "알림 발송" },
];

export default function PermissionForm({ member, onSuccess, onClose }) {
    const [selected, setSelected] = useState(new Set(member.permissions));
    const [isChanged, setIsChanged] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const isEqualSet = (a, b) => {
        if (a.size !== b.size) return false;
        for (let val of a) {
            if (!b.has(val)) return false;
        }
        return true;
    };

    useEffect(() => {
        const original = new Set(member.permissions);
        const selectedSet = new Set(selected);
        setIsChanged(!isEqualSet(original, selectedSet));
    }, [selected, member.permissions]);

    const toggle = (perm) => {
        setSelected((prev) => {
            const next = new Set(prev);
            next.has(perm) ? next.delete(perm) : next.add(perm);
            return next;
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await updateMemberPermission(member.id, [...selected]);
            const { added = [], removed = [] } = response ?? {};

            const format = (arr) =>
                Array.isArray(arr) && arr.length > 0 ? arr.join(", ") : "";

            toast({
                title: member.name + "'s PERMISSION UPDATED",
                description: (
                    <>
                        ADDED: {format(added)}<br />
                        REMOVED: {format(removed)}
                    </>)
            });

            onSuccess?.();
        } catch (err) {
            toast({
                title: "권한 변경 실패",
                description: err?.message || "알 수 없는 오류가 발생했습니다.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-[340px] space-y-4 shadow-xl">
                    <h2 className="text-lg font-semibold">{member.name} 권한 수정</h2>

                    <div className="flex flex-col gap-2">
                        {PERMISSIONS.map(({ type, label }) => (
                            <label key={type} className="flex items-center gap-2 text-sm">
                                <Checkbox
                                    checked={selected.has(type)}
                                    onCheckedChange={() => toggle(type)}
                                />
                                {label}
                            </label>
                        ))}
                    </div>

                    <div className="flex justify-end space-x-2">
                        {onClose && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onClose}
                                disabled={loading}
                            >
                                취소
                            </Button>
                        )}
                        <Button
                            size="sm"
                            onClick={handleSubmit}
                            disabled={!isChanged || loading}
                        >
                            {loading ? "저장 중..." : "저장"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
