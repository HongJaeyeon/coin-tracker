import { createGlobalStyle } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import Router from "./Router";
const GlobalStyle = createGlobalStyle`
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap" rel="stylesheet">

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  *{
    box-sizing: border-box;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props)=> props.theme.textColor};
  }
  body{
    font-family: 'Source Sans Pro', sans-serif;
  }
  a{
    text-decoration: none;
  }

`;

function App() {
  return (
    <>
      <GlobalStyle/>
      <Router/>
      <ReactQueryDevtools initialIsOpen={true} />
    </>
    //fragment 고스트 컴포넌트. div같은 불필요한 태그 없이 두개를 동시에 return할 수 있다
  );
}

export default App;
