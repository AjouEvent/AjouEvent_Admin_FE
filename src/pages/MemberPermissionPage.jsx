import PermissionList from "@/components/permission/PermissionList";
import PageContainer from "@/components/layout/PageContainer.jsx";

export default function PermissionListPage() {
    return (
        <PageContainer>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">권한 관리</h1>
            </div>

            <PermissionList />
        </PageContainer>
    );
}
