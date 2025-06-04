import PermissionList from "@/components/permission/PermissionList";

export default function PermissionListPage() {
    return (
        <main className="p-6 md:p-10 w-full max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">권한 관리</h1>
            </div>

            <PermissionList />
        </main>
    );
}
