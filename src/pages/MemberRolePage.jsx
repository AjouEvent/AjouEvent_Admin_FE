import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import {useEffect, useState} from "react";
import {fetchAllMembers, fetchMembersByRole, updateMemberRole} from "@/api/member.js";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";

const roleOptions = ["ALL", "USER", "LEADER"];

const MemberRolePage = () => {
    const [members, setMembers] = useState([]);
    const [selectedRole, setSelectedRole] = useState("ALL");

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
        <Card className="p-6">
            <CardHeader className="pb-4">
                <CardTitle className="flex justify-between items-center">
                    <span>멤버 역할 관리</span>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="역할 필터" />
                        </SelectTrigger>
                        <SelectContent>
                            {roleOptions.map((r) => (
                                <SelectItem key={r} value={r}>
                                    {r}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {members.map((m) => (
                    <div key={m.id} className="border rounded-xl p-4 shadow-sm bg-white">
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-sm font-medium">
                                {m.name} ({m.email})
                            </div>
                            <div className="text-xs text-muted-foreground">{m.role}</div>
                        </div>
                        <div className="flex justify-end">
                            <Select
                                defaultValue={m.role}
                                onValueChange={(value) => handleRoleChange(m.id, value)}
                            >
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="역할 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roleOptions
                                        .filter((r) => r !== "ALL")
                                        .map((r) => (
                                            <SelectItem key={r} value={r}>
                                                {r}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>

    );
};

export default MemberRolePage;
