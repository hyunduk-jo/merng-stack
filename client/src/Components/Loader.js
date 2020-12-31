import styled, { keyframes } from 'styled-components';
import { Spinner } from './Icons';

const Animation = keyframes`
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  align-items:center;
  justify-content: center;
  animation: ${Animation} 1s linear infinite;
  svg{
    fill: grey;
  }
`;

const Loader = ({ size }) => {
  return <Container><Spinner size={size} /></Container>
}

export default Loader;