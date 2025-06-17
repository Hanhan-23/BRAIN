import { ChartAreaInteractive } from "../ui/chart_statistic";
import { StatistikLaporanUtama } from "@/types/masyarakattypes/utamatype";

const StatisticSections = ({item} : { item: StatistikLaporanUtama[] }) => {
    return (
        <>
            <ChartAreaInteractive itemStatistik={item}></ChartAreaInteractive>
        </>
    )
}

export default StatisticSections;