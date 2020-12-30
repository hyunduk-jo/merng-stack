import { useMutation } from "@apollo/client";
import { gql } from "apollo-boost";
import { useState } from "react";
import styled from "styled-components";
import Button from "../Components/Button";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  margin: 20px;
  border: 1px solid black;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  input, button{
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    height: 30px;
    margin-bottom: 10px;
  }
  flex-direction: column;
`;

const UPLOAD = gql`
  mutation uploadTodo($todo: String!){
    uploadTodo(todo: $todo)
  }
`;

const UploadModal = () => {
  const [todo, setTodo] = useState('');

  const [uploadMutation] = useMutation(UPLOAD);

  const onClick = async () => {
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

  return <Wrapper>
    <Container>
      <input placeholder="Write your today's todo" onChange={e => setTodo(e.target.value)} />
      <Button color="#6EFA65" text="Submit" onClick={onClick} />
    </Container>
  </Wrapper>
}

export default UploadModal;