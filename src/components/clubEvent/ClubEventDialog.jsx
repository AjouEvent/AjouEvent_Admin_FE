import { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { UploadCloud, X } from "lucide-react";
import { registerClubEvent } from "@/api/clubEvent";
import { useToast } from "@/hooks/use-toast";
import SubjectSelect from "@/components/clubEvent/SubjectSelect.jsx";

export default function ClubEventDialog({ open, setOpen, subjectList, onAdd }) {
    const [form, setForm] = useState({
        title: "",
        content: "",
        subjectId: "1",
        images: [],
    });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const { toast } = useToast();

    const handleFileChange = (e) => {
        setForm({ ...form, images: Array.from(e.target.files) });
    };

    const handleRegister = async () => {
        if (!form.title || !form.subjectId) return;
        setLoading(true);
        setErrorMsg("");
        try {
            const request = {
                title: form.title,
                content: form.content,
                subjectId: form.subjectId,
            };
            const res = await registerClubEvent(request, form.images);
            toast({
                title: "이벤트 등록 완료!",
                description: `"${form.title}" 공지가 성공적으로 등록되었습니다.`,
                // status/success/variant 등 커스텀 옵션도 필요하면 추가
            });
            if (onAdd) onAdd(res.data);
            setForm({ title: "", content: "", subjectId: "", images: [] });
            setOpen(false);
        } catch (e) {
            toast({
                title: "이벤트 등록 실패",
                description: "서버 오류로 등록에 실패했습니다.",
                variant: "destructive",
            });
            setErrorMsg("이벤트 등록에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setForm({ title: "", content: "", subjectId: "", images: [] });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen);         // 부모 상태 변경
            if (!isOpen) handleClose(); // 닫힐 때만 내부 후처리
        }}>
            <DialogTrigger asChild>
                <Button className="ml-2">공지 작성</Button>
            </DialogTrigger>
            <DialogContent
                className="
                    bg-background rounded-2xl shadow-2xl
                    w-full max-w-2xl p-10 mx-4 border-0
                    fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ boxShadow: "none" }}
            >
                <h2 className="text-xl font-semibold mb-6 text-center">글 쓰기</h2>
                <div className="flex flex-col gap-4">
                    <Input
                        placeholder="제목"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        disabled={loading}
                    />
                    <Textarea
                        placeholder="설명"
                        value={form.content}
                        onChange={(e) =>
                            setForm({ ...form, content: e.target.value })
                        }
                        rows={4}
                        disabled={loading}
                    />
                    <SubjectSelect
                        subjectId={form.subjectId}
                        setSubjectId={v => setForm({ ...form, subjectId: v })}
                        subjects={subjectList}         // [{id, name}, ...]만 넘기면 됨
                        width="w-full"
                        disabled={loading}
                        placeholder="카테고리 선택"
                    />
                    {/* 이미지 업로드 */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">이미지 업로드 (여러장)</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            disabled={loading}
                            className="block"
                        />
                        {form.images?.length > 0 && (
                            <div className="text-xs mt-1 text-gray-500">
                                {form.images.length}개 파일 선택됨
                            </div>
                        )}
                    </div>
                    {errorMsg && <div className="text-red-500 text-sm">{errorMsg}</div>}
                    <Button
                        className="w-full mt-4"
                        disabled={!form.title || !form.subjectId || loading}
                        onClick={handleRegister}
                    >
                        {loading ? "등록중..." : "등록하기"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
