import { BarSegment, useChart } from "@chakra-ui/charts"
function FinancePreviewTable() {

    const chart = useChart({
        sort: { by: "value", direction: "desc" },
        data: [
            { name: "مجموع بدهی", value: 500000, color: " #404040" },
            { name: "مطالبات", value: 300000, color: "oklch(43.7% 0.078 188.216)" },
        ],
    })
    const handleClickOnSegment: React.MouseEventHandler<HTMLDivElement> = (event) => {

        console.log('calll finanacial detail');

    };
    return (
        <div className="grid text-neutral-700" onClick={handleClickOnSegment} >
            <BarSegment.Root chart={chart}>
                <BarSegment.Content >
                    <BarSegment.Value />
                    <BarSegment.Bar tooltip />
                    <BarSegment.Label />
                </BarSegment.Content>
                <BarSegment.Legend showPercent />
            </BarSegment.Root>
        </div>
    );
}

export default FinancePreviewTable;