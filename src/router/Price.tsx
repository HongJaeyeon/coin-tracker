import { useQuery } from "react-query";
import { fetchPrice } from "../api";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;

interface IChart{
  coinId: string;
};

interface IPrice{
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price({coinId}:IChart){
  const {isLoading, data} = useQuery<IPrice>("price",()=>fetchPrice(coinId));
  return(
    <>
      {isLoading ? "Loading..." : <Container>
        <p><strong>Price:</strong> ${data?.quotes.USD.price.toFixed(3)}</p>
        <p><strong>Change rate (last 1 hours):</strong> {data?.quotes.USD.percent_change_1h}%</p>
        <p><strong>Change rate (last 12 hours):</strong> {data?.quotes.USD.percent_change_12h}%</p>
        <p><strong>Change rate (last 24 hours):</strong> {data?.quotes.USD.percent_change_24h}%</p>
        </Container>}
    </>
  );
}

export default Price;