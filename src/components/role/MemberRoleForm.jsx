import { useEffect, useState } from "react";
import { fetchAllMembers, fetchMembersByRole, updateMemberRole } from "@/api/member";
import {
    Card, CardHeader, CardTitle, CardContent
} from "@/components/ui/card.jsx";
import {
    Table, TableHeader, TableRow, TableHead,
    TableBody, TableCell
} from "@/components/ui/table.jsx";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import MemberForm from "@/components/member/MemberForm.jsx"; // avatar 포함 컴포넌트

const roleOptions = ["USER", "LEADER"];

const MemberRoleForm = ({ selectedRole }) => {
    const [members, setMembers] = useState([]);

    const fetchData = (role) => {
        const fetcher = role === "ALL" ? fetchAllMembers : () => fetchMembersByRole(role);
        fetcher()
            .then((res) => setMembers(res.data.members))
            .catch(console.error);
    };

    useEffect(() => {
        fetchData(selectedRole);
    }, [selectedRole]);

    const handleRoleChange = (id, newRole) => {
        updateMemberRole(id, newRole).then(() => {
            setMembers((prev) =>
                prev.map((m) => (m.id === id ? { ...m, role: newRole } : m))
            );
        });
    };

    return (
        <Card>
            <CardContent>
                <Table>
                    <TableHeader>
                        {/* <TableRow>
                            <TableHead>회원정보</TableHead>
                            <TableHead>역할 변경</TableHead>
                        </TableRow> */}
                    </TableHeader>
                    <TableBody>
                        {members.map((m) => (
                            <TableRow key={m.id}>
                                <TableCell>
                                    <MemberForm
                                        name={m.name}
                                        email={m.email}
                                        role={m.role}
                                        avatarUrl={m.avatarUrl}
                                    />
                                </TableCell>
                                <TableCell className="text-right align-center">
                                    <Select
                                        defaultValue={m.role}
                                        onValueChange={(value) => handleRoleChange(m.id, value)}
                                    >
                                        <SelectTrigger className="w-[140px] ml-auto">
                                            <SelectValue placeholder="역할 선택" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roleOptions.map((r) => (
                                                <SelectItem key={r} value={r}>
                                                    {r}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default MemberRoleForm;
