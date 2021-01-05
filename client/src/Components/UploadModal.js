import { useMutation } from "@apollo/client";
import { gql } from "apollo-boost";
import { useState } from "react";
import styled from "styled-components";
import Button from "../Components/Button";

const Wrapper = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: rgba(255,255,255,0.8);
  z-index: 2;
`;
const ModalContainer = styled.div`
  height: 100%;
  position: absolute;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: 500px;
  border-radius: 30px;
  background-color: black;
  input, button{
    text-align: center;
  }
  input{
    width: 80%;
    height: 50px;
    font-size: 20px;
    margin-bottom: 70px;
    border-radius: 10px;
    background-color: black;
    border: 2px solid white;
    box-shadow: 0 0 10px white, 0 0 20px yellow, inset 0 0 10px white, inset 0 0 20px yellow;
  }
  button{
    margin-top: 20px;
  }
  flex-direction: column;
  z-index: 3;
`;
const Title = styled.div`
  font-family: "Redressed", cursive;
  font-size: 40px;
  font-weight: 600;
  color: #E4FFFF;
  margin-bottom: 70px;
  text-shadow: 0 0 10px white, 0 0 20px white, 0 0 30px #C2FEFF, 0 0 40px #C2FEFF, 0 0 50px skyblue;
`;
//--------------------------------------------------------------------------------------------------------------

const UPLOAD = gql`
  mutation uploadTodo($todo: String!){
    uploadTodo(todo: $todo)
  }
`;
//--------------------------------------------------------------------------------------------------------------

const UploadModal = ({ setModal }) => {
  const [todo, setTodo] = useState('');

  const [uploadMutation] = useMutation(UPLOAD);

  const onSubmit = async () => {
    if (todo !== "") {
      try {
        const { data: { uploadTodo } } = await uploadMutation({ variables: { todo } });
        if (uploadTodo) {
          alert("Todo uploaded");
          window.location = '/';
        } else {
          alert("Can't upload try later");
        }
      } catch (e) {
        console.log(e.message);
      }
    } else {
      alert("You need to write something")
    }
  }

  return <>
    <Wrapper onClick={() => setModal(false)}>
    </Wrapper>
    <ModalContainer>
      <Container onClick={() => setModal(true)}>
        <Title>Add Your Todo</Title>
        <input placeholder="Write your today's todo" onChange={e => setTodo(e.target.value)} />
        <Button color="transparent" text="Submit" onClick={onSubmit} width="100" height="35" />
      </Container>
    </ModalContainer>
  </>
}

export default UploadModal;