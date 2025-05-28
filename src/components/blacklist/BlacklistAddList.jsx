import { useEffect, useState } from "react";
import { fetchBlacklist } from "@/api/blacklist.js";
import { fetchAllMembers } from "@/api/member.js";
import {
    Card, CardHeader, CardTitle, CardContent
} from "@/components/ui/card.jsx";

import {
    Table, TableHeader, TableRow, TableHead,
    TableBody, TableCell
} from "@/components/ui/table.jsx";
import { Button } from "@/components/ui/button.jsx";
import BlacklistAddModal from "@/components/blacklist/blacklist-add-form.jsx";

const BlacklistAddList = () => {
    const [blacklist, setBlacklist] = useState([]);
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        fetchBlacklist().then((res) => setBlacklist(res.data.blacklist));
        fetchAllMembers().then((res) => setMembers(res.data.members));
    }, []);

    const refreshBlacklist = () => {
        fetchBlacklist().then((res) => setBlacklist(res.data.blacklist));
    };

    return (
        <>
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>멤버 목록 (블랙리스트 등록)</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>이름</TableHead>
                                <TableHead>이메일</TableHead>
                                <TableHead>역할</TableHead>
                                <TableHead>조치</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map((m) => (
                                <TableRow key={m.id}>
                                    <TableCell>{m.name}</TableCell>
                                    <TableCell>{m.email}</TableCell>
                                    <TableCell>{m.role}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => setSelectedMember(m)}>블랙리스트 등록</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* 기존 블랙리스트 테이블도 같이 렌더링하면 좋음 */}

            {selectedMember && (
                <BlacklistAddModal
                    member={selectedMember}
                    onSuccess={refreshBlacklist}
                    onClose={() => setSelectedMember(null)}
                />
            )}
        </>
    );
};

export default BlacklistAddList;
