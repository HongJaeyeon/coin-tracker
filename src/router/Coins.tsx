import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

function Coins(){

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
    font-size: 80px;
    color: ${(props) => props.theme.accentColor};
  `;

  const CoinsList = styled.ul`
  `;

  const Coin = styled.li`
    font-size: 25px;
    font-weight: 400;
    color: ${(props) => props.theme.bgColor};
    border-radius: 15px;
    margin-bottom: 10px;

    a {
      padding: 15px;
      border-radius: 20px;
      transition: color 0.2s ease-in;
      display: flex;
      align-items: center;
      background-color: ${(props) => props.theme.pointColor};
      
    }
    &:hover {
      a {
        color: ${(props) => props.theme.accentColor};
      }
    }
  `;

  const Img = styled.img`
      background-color: #55c1e8;
      width: 35px;
      margin-right: 15px;
  `;

  interface ICoin {
    id: string;
    name: string;
    symbol: string;
  };

  const {isLoading, data} = useQuery<ICoin[]>("allCoins",fetchCoins);

  return(
    <Container>
      <Helmet>
      <title>
        Coins
      </title>
    </Helmet>
      <Header>
        <Title>
          Coins
        </Title>
      </Header>
      { isLoading ? <Loader>loading...</Loader> : <CoinsList>{data?.slice(0,100).map( coin => (<Coin key={coin.id}><Link to={{
        pathname: `/${coin.id}`,
        state: {name: coin.name}
        }}><Img src ={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}></Img>{coin.name} &rarr;</Link></Coin>))}</CoinsList>}
    </Container>
  )
}; 
  
export default Coins;