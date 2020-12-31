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
  background-color: rgba(0,0,0,0.8);
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
  width: 500px;
  height: 200px;
  border-radius: 30px;
  background-color: #D4B996FF;
  input, button{
    text-align: center;
  }
  input{
    height: 35px;
    font-size: 20px;
    border-radius: 10px;
  }
  button{
    margin-top: 20px;
  }
  flex-direction: column;
  z-index: 3;
`;

const UPLOAD = gql`
  mutation uploadTodo($todo: String!){
    uploadTodo(todo: $todo)
  }
`;

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
        <input placeholder="Write your today's todo" onChange={e => setTodo(e.target.value)} />
        <Button color="#A07855FF" text="Submit" onClick={onSubmit} width="100" height="35" />
      </Container>
    </ModalContainer>
  </>
}

export default UploadModal;