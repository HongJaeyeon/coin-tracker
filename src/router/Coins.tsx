import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

  interface CoinsInterface {
    id: string;
    name: string;
    symbol: string;
  };

  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState<CoinsInterface[]>([]);
  // ts는 coins가 언제가 빈 array일거라 생각해서 data의 형식을 그냥 쓰면 error일으킴 언젠간 이런 형식의 데이터가 넣어질 거란 정의.
  // 뿐만아니라 coins자체가 array일거라는 정의도 해줘야함. 왜냐면 map을 그냥 돌리면 초기엔 [] 빈 리스트이기때문에 undefined라고 인식. -> ts덕분..

  const getData = async() => {
    const json = await(await fetch('https://api.coinpaprika.com/v1/coins')).json();
    setCoins(json.slice(0,100));
    setLoading(false);
  };

  useEffect(()=>{getData()},[]);

  // console.log(coins);
  return(
    <Container>
      <Header>
        <Title>
          Coins
        </Title>
      </Header>
      { loading ? <Loader>loading...</Loader> : <CoinsList>{coins.map( coin => (<Coin key={coin.id}><Link to={{
        pathname: `/${coin.id}`,
        state: {name: coin.name}
        }}><Img src ={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}></Img>{coin.name} &rarr;</Link></Coin>))}</CoinsList>}
    </Container>
  )
}; 
  
export default Coins;