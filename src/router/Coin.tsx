import { useEffect, useState } from "react";
import { useRouteMatch, Link, Switch, Route, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  margin-top: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.h1`
  color: ${(props)=> props.theme.accentColor};`
;

const Title = styled.h1`
  font-size: 60px;
  color: ${(props)=> props.theme.accentColor};
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.pointColor};
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.pointColor};
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
    background-color: ${(props) => props.theme.pointColor};
  }
  span:last-child {
    background-color: ${(props) => props.theme.pointColor};
    color: ${(props) => props.theme.accentColor};
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props)=> props.theme.accentColor};
  margin-top: 1vh;
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
    background-color: ${(props)=> props.theme.accentColor};
  }
`;

interface ParamsInterface{
  coinId: string;
}

interface StateInterface{
  name: string;
}

interface IInfo{
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

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

function Coin(){
  const { state } = useLocation<StateInterface>();
  const { coinId } = useParams<ParamsInterface>();
  const [loading, setLoading] = useState(true);
  //coinId 찍어보면 object안에 있어서 이렇게 받아옴
  //useParams가 지금은 아무것도 안가져오지만 언젠가 가져오는 데이터가 coinId이고 그 값의 타입은 string이라고 ts에게 말해주기위해
  const [info, setInfo] = useState<IInfo>();
  const [price, setPrice] = useState<IPrice>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  useEffect(() => {
    (async() => {
      const infoData = await(await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
      setInfo(infoData);
      const priceData = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
      setPrice(priceData);
      setLoading(false);
    })();
}, [coinId]);

return (
  <Container>
    <Header>
      <Title>
        {state?.name ? state.name : loading ? "Loading..." : info?.name}
      </Title>
    </Header>
    {loading ? (
      <Loader>Loading...</Loader>
    ) : (
      <>
        <Overview>
          <OverviewItem>
            <span>Rank:</span>
            <span>{info?.rank}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Symbol:</span>
            <span>${info?.symbol}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Open Source:</span>
            <span>{info?.open_source ? "Yes" : "No"}</span>
          </OverviewItem>
        </Overview>
        <Description>{info?.description}</Description>
        <Overview>
          <OverviewItem>
            <span>Total Suply:</span>
            <span>{price?.total_supply}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Max Supply:</span>
            <span>{price?.max_supply}</span>
          </OverviewItem>
        </Overview>

        <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

        <Switch>
          <Route path={"/:coinId/price"}>
            <Price/>
          </Route>
          <Route path={"/:coinId/chart"}>
            <Chart/>
          </Route>
        </Switch>
      </>
    )}
  </Container>
  );
}

export default Coin;