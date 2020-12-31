import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box;
  }
  body{
    background-color: #D7BFA7;
  }
  button, input{
    outline: none;
    border: none;
  }
`;

export default GlobalStyles;