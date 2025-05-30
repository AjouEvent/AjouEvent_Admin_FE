import { useEffect, useState } from "react";
import { fetchBlacklist, removeFromBlacklist } from "@/api/blacklist";
import {
    Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card.jsx";
import {
    Table, TableBody, TableRow, TableCell
} from "@/components/ui/table.jsx";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import MemberForm from "@/components/member/MemberForm.jsx";

const BlacklistRevokeList = () => {
    const [blacklist, setBlacklist] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        fetchBlacklist().then((res) => setBlacklist(res.data.blacklist));
    }, []);

    const handleRevoke = async () => {
        if (!selected) return;
        await removeFromBlacklist(selected.memberId);
        setBlacklist((prev) =>
            prev.filter((item) => item.memberId !== selected.memberId)
        );
        setSelected(null);
    };

    return (
        <Card className="mb-6">
            <CardContent>
                <Table>
                    <TableBody>
                        {blacklist.map((entry) => (
                            <TableRow key={entry.memberId}>
                                <TableCell>
                                    <MemberForm
                                        name={entry.memberName}
                                        reason={entry.reason}
                                        createdAt={entry.createdAt}
                                    />
                                </TableCell>
                                <TableCell className="align-center text-right">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="secondary"
                                                onClick={() => setSelected(entry)}
                                            >
                                                해지
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    {selected?.memberName}님을 해지하시겠습니까?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    이 작업은 되돌릴 수 없습니다.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>취소</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleRevoke}>
                                                    해지
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default BlacklistRevokeList;
