import { useEffect, useState } from "react";
import { fetchAllMembers } from "@/api/member";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableRow,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import MemberForm from "@/components/member/MemberForm.jsx";
import PermissionModal from "./PermissionForm";


const PermissionList = () => {
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);

    const fetchMembers = () => {
        fetchAllMembers()
            .then((res) => setMembers(res.data.members))
            .catch(() => console.log("멤버 목록 불러오기 실패"));
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    return (
        <>
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            {/*<TableRow>*/}
                            {/*    <TableHead>회원 정보</TableHead>*/}
                            {/*    <TableHead className="text-right">권한 설정</TableHead>*/}
                            {/*</TableRow>*/}
                        </TableHeader>
                        <TableBody>
                            {members.map((m) => (
                                <TableRow key={m.id}>
                                    <TableCell>
                                        <MemberForm
                                            name={m.name}
                                            email={m.email}
                                            role={m.role}
                                        />
                                    </TableCell>
                                    <TableCell className="align-center text-right">
                                        <Button onClick={() => setSelectedMember(m)}>권한 수정</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {selectedMember && (
                <PermissionModal
                    member={selectedMember}
                    onSuccess={() => {
                        fetchMembers();
                        setSelectedMember(null);
                    }}
                    onClose={() => setSelectedMember(null)}
                />
            )}
        </>

    );
};

export default PermissionList;
