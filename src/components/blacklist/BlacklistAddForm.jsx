import { useState } from "react";
import { addToBlacklist } from "@/api/blacklist.js";
import { Button } from "@/components/ui/button.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Terminal } from "lucide-react"; // ✅ 이거 추가

const BlacklistAddForm = ({ member, onSuccess, onClose }) => {
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!reason.trim()) {
            setError("사유를 입력하세요.");
            return;
        }

        try {
            await addToBlacklist(member.id, reason);
            onSuccess();
            onClose();
        } catch (err) {
            const errorCode = err?.response?.data?.code;

            if (errorCode === 400301) {
                setError("이미 블랙리스트에 등록된 사용자입니다.");
            } else {
                setError("알 수 없는 오류가 발생했습니다.");
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[400px] space-y-4 shadow-xl">
                <h2 className="text-lg font-semibold">
                    {member.name} 블랙리스트 등록
                </h2>

                {error && (
                    <Alert variant="destructive">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <Textarea
                    placeholder="블랙리스트 등록 사유를 입력하세요"
                    value={reason}
                    onChange={(e) => {
                        setReason(e.target.value);
                        setError(""); // 입력 시 에러 초기화
                    }}
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
