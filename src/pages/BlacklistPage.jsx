import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BlacklistRevokeList from "@/components/blacklist/BlacklistRevokeList";
import BlacklistAddList from "@/components/blacklist/BlacklistAddList";

const BlacklistPage = () => {
    const [tab, setTab] = useState("revoke");

    return (
        <div className="space-y-6">
            <Tabs value={tab} onValueChange={setTab} className="w-full">
                <TabsList>
                    <TabsTrigger value="revoke">블랙리스트 해지</TabsTrigger>
                    <TabsTrigger value="add">블랙리스트 등록</TabsTrigger>
                </TabsList>

                <TabsContent value="revoke">
                    <BlacklistRevokeList />
                </TabsContent>

                <TabsContent value="add">
                    <BlacklistAddList />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default BlacklistPage;
