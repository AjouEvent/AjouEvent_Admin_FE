import { useState } from "react";
import { addToBlacklist } from "@/api/blacklist.js";
import { Button } from "@/components/ui/button.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";

const BlacklistAddForm = ({ member, onSuccess, onClose }) => {
    const [reason, setReason] = useState("");

    const handleSubmit = async () => {
        if (!reason.trim()) return alert("사유를 입력하세요.");
        await addToBlacklist(member.id, reason);
        onSuccess();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[400px] space-y-4 shadow-xl">
                <h2 className="text-lg font-semibold">
                    {member.name} 블랙리스트 등록
                </h2>
                <Textarea
                    placeholder="블랙리스트 등록 사유를 입력하세요"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={onClose}>
                        취소
                    </Button>
                    <Button onClick={handleSubmit}>등록</Button>
                </div>
            </div>
        </div>
    );
};

export default BlacklistAddForm;
