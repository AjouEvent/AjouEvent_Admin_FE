// MemberRolePage.jsx 내부
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Select, SelectItem } from "@/components/ui/select";
import {useEffect, useState} from "react";
import {fetchMembersByRole, updateMemberRole} from "@/api/member.js";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";

const roles = ["USER", "LEADER"];

const MemberRolePage = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetchMembersByRole("")
            .then((res) => setMembers(res.data.members))
            .catch(console.error);
    }, []);

    const handleRoleChange = (id, newRole) => {
        updateMemberRole(id, newRole).then(() => {
            setMembers((prev) =>
                prev.map((m) => (m.id === id ? { ...m, role: newRole } : m))
            );
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>멤버 역할 관리</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>이름</TableHead>
                            <TableHead>이메일</TableHead>
                            <TableHead>현재 역할</TableHead>
                            <TableHead>변경</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {members.map((m) => (
                            <TableRow key={m.id}>
                                <TableCell>{m.name}</TableCell>
                                <TableCell>{m.email}</TableCell>
                                <TableCell>{m.role}</TableCell>
                                <TableCell>
                                    <Select
                                        value={m.role}
                                        onChange={(value) => handleRoleChange(m.id, value)}
                                    >
                                        {roles.map((r) => (
                                            <SelectItem key={r} value={r}>
                                                {r}
                                            </SelectItem>
                                        ))}
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

export default MemberRolePage;