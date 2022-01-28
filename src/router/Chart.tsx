import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchChart } from "../api";

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
  return(
    <div>
      {isLoading ? ("loading...") : (<ApexChart 
      type="line" 
      series={[
        {
          name: "Price",
          data: data?.map(price => price.close),
        },
      ]}

      options={{
        theme:{
          mode:"dark",
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
          axisBorder: { show: false },
          axisTicks: { show: false },
          labels: { show: false },
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