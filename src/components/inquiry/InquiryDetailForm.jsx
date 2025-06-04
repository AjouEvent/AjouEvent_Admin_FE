import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { answerInquiry } from "@/api/inquiry";

const statusToVariant = {
    PENDING: "pending",
    ANSWERED: "answered",
    REJECTED: "rejected",
};

const InquiryDetailForm = ({ inquiry, onSubmit }) => {
    const [answer, setAnswer] = useState(inquiry.answer ?? "");
    const [loading, setLoading] = useState(false);

    const isPending = inquiry.status === "PENDING";

    const handleAnswer = async () => {
        if (!answer.trim()) return;
        setLoading(true);
        await answerInquiry(inquiry.id, answer);
        onSubmit(inquiry.id, "ANSWERED", answer);
        setLoading(false);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold">
                        {inquiry.title}
                    </CardTitle>
                    <Badge variant={statusToVariant[inquiry.status]}>
                        {inquiry.status}
                    </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                    작성자: {inquiry.memberName} / 작성일:{" "}
                    {new Date(inquiry.createdAt).toLocaleString()}
                </p>
            </CardHeader>

            <CardContent className="space-y-4">
                <div>
                    <p className="text-base">{inquiry.content}</p>
                </div>
                {isPending ? (
                    <Textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="답변을 입력하세요"
                        className="min-h-[120px]"
                    />
                ) : (
                    <div className="rounded bg-muted/50 p-4 text-sm">
                        <div className="font-bold mb-2">답변 내용</div>
                        <div>{inquiry.answer}</div>
                    </div>
                )}
            </CardContent>
            {isPending && (
                <CardFooter className="flex justify-end gap-2">
                    <Button onClick={handleAnswer} disabled={loading}>
                        답변 등록
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
};

export default InquiryDetailForm;
