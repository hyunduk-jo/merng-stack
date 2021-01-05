import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Redressed&display=swap');
  ${reset};
  *{
    box-sizing: border-box;
  }
  body{
    background-color: black;
    padding: 10px;
  }
  button, input{
    outline: none;
    border: none;
  }
`;

export default GlobalStyles;