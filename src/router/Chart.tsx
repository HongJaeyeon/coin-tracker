import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchChart } from "../api";
import { isDarkAtom } from "./atoms";

interface IChart{
  coinId: string;
};

interface IData{
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
};

function Chart({coinId}:IChart){
  const {isLoading, data} = useQuery<IData[]>("ohlcv", ()=>fetchChart(coinId), {refetchInterval: 10000});
  const isDark = useRecoilValue(isDarkAtom);
  return(
    <div>
      {isLoading ? ("loading...") : (<ApexChart 
      type="candlestick"
      // series={[
        // {
        //   data: [
        //     {
        //       x: data?.map(price => price.time_open),
        //       y: data?.map(price => (price.open, price.high, price.low, price.close))
        //     }
        // ]
      //   },
      // ]}
      series={[
        {
          name: "Price",
          data: data?.map((price) => ({
            x: price.time_close,
            y: [price.open, price.high, price.low, price.close],
          })),
        },
      ]}

      options={{
        theme:{
          mode: isDark ? "dark" : "light",
        },

        chart: {
          height: 500,
          width: 500,
          toolbar: {
            show: false,
          },
          background: "transparent",
        },
        grid: {
          show: false
        },
        stroke: {
          curve: "smooth",
          width: 4,
        },
        yaxis: {
          show: false,
        },
        xaxis:{
          // axisBorder: { show: false },
          // axisTicks: { show: false },
          // // labels: { show: false },
          type: "datetime",
          categories: data?.map((price) => price.time_close),
        },
        fill: {
          type: "gradient",
          gradient: { gradientToColors: ["#9ee6ff"], stops: [0, 100]},
        },
        colors: ["#55c1e8"],
        tooltip: {
          y: {
            formatter: (value) => `$${value.toFixed(2)}`,
          },
        }
      }}
        />
      )
    }
    </div>
  );
}

export default Chart;