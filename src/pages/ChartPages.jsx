import {AreaTable} from "@/components/push/AreaTable.jsx";
import {CircleChart} from "@/components/push/CircleChart.jsx";
import {HexagonChart} from "@/components/push/HexagonChart.jsx";
import {ChartBarMultiple} from "@/components/push/ChartBarMultiple.jsx";
import {ChartBarInteractive} from "@/components/push/ChartBarInteractive.jsx";
import {ChartPieDonutText} from "@/components/push/ChartPieDonutText.jsx";


export default function PushStatusPage() {
    return (
        <main className="max-w-6xl mx-auto py-10 px-4 md:px-8 space-y-8">
            <section>
                <h1 className="text-2xl font-bold mb-4">괜찮은 차트들</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <AreaTable />
                    <CircleChart />
                    <HexagonChart />
                </div>
            </section>
            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ChartBarMultiple />
                    <ChartPieDonutText />
                </div>
            </section>
            <section>
                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-3">푸시 알림 상세 목록</h2>
                    <ChartBarInteractive />
                </div>
            </section>
        </main>
    );
}
