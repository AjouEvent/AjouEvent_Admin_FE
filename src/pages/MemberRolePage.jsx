import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import MemberRoleForm from "@/components/role/MemberRoleForm";
import PageContainer from "@/components/layout/PageContainer.jsx";

const roleOptions = ["ALL", "USER", "LEADER"];

const MemberRolePage = () => {
    const [selectedRole, setSelectedRole] = useState("ALL");

    return (
        <PageContainer>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">멤버 역할 관리</h1>
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
            </div>

            <MemberRoleForm selectedRole={selectedRole} />
        </PageContainer>
    );
};

export default MemberRolePage;
