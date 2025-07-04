import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BlacklistRevokeList from "@/components/blacklist/BlacklistRevokeList";
import BlacklistAddList from "@/components/blacklist/BlacklistAddList";
import PageContainer from "@/components/layout/PageContainer.jsx";

const BlacklistPage = () => {
    const [tab, setTab] = useState("add");

    return (
            <PageContainer>
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">블랙리스트 관리</h1>
                </div>

                <Tabs value={tab} onValueChange={setTab} className="w-full">
                    <TabsList>
                        <TabsTrigger value="revoke">블랙리스트 해지</TabsTrigger>
                        <TabsTrigger value="add">블랙리스트 등록</TabsTrigger>
                    </TabsList>

                    <TabsContent value="revoke" className="pt-4">
                        <BlacklistRevokeList />
                    </TabsContent>

                    <TabsContent value="add" className="pt-4">
                        <BlacklistAddList />
                    </TabsContent>
                </Tabs>
            </PageContainer>
    );
};

export default BlacklistPage;
