import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box;
  }
  body{
    background-color: #eae7dc;
  }
  button, input{
    outline: none;
    border: none;
  }
`;

export default GlobalStyles;