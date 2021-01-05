import { gql, useQuery } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Components/AppRouter';
import Header from './Components/Header';
import GlobalStyles from './GlobalStyles/GlobaStyles';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`

function App() {
  const { data: { isLoggedIn } } = useQuery(IS_LOGGED_IN);
  console.log(isLoggedIn)
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyles />
        <AppRouter isLoggedIn={isLoggedIn} />
      </BrowserRouter>
    </div>
  );
}

export default App;
