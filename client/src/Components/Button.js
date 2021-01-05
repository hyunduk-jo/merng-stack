import styled from "styled-components";

const Container = styled.button`
  background-color: ${props => props.color};
  color: white;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  font-weight: ${props => props.weight};
  padding: ${props => props.padding}px;
`;

const Button = ({ onClick, color, text, height, width, weight, padding }) => {

  return <Container onClick={onClick} color={color} width={width} height={height} weight={weight} padding={padding}>{text}</Container>
}

export default Button;