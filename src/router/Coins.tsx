import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "./atoms";

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
      background-color: ${(props)=> props.theme.pointColor};
      width: 35px;
      margin-right: 15px;
  `;

  const Btn = styled.button`
      border: none;
      padding: 3px;
      border-radius: 5px;
      font-weight: 600;
      background-color: ${(props)=> props.theme.accentColor};
  `;

  const Cover = styled.div`
      margin: 30px auto 0 auto;
      max-width: 500px;
      text-align: right;
  `;

  interface ICoin {
    id: string;
    name: string;
    symbol: string;
  };

  const {isLoading, data} = useQuery<ICoin[]>("allCoins",fetchCoins);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const onClick = () => {setDarkAtom(current => !current);};
  const isDark = useRecoilValue(isDarkAtom);
  return(
    <Container>
      <Helmet>
      <title>
        Coins
      </title>
    </Helmet>
    <Cover>
      <Btn onClick={onClick}>{isDark ? "LightMode" : "DarkMode"}</Btn>
    </Cover>
    
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