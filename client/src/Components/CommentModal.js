import { useMutation } from "@apollo/client";
import { gql } from "apollo-boost";
import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Comment from "./Comment";
import { Submit } from "./Icons";

const Wrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: rgba(0,0,0,0.8);
  z-index: 2;
`;
const ModalContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Modal = styled.div`
  width: 800px;
  min-height: 600px;
  background-color: white;
  display: flex;
  align-items: center;
  z-index: 3;
  display: flex;
  flex-direction: column;
`;
const ModalHeader = styled.div`
  top: 0px;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid grey;
  font-size: 40px;
  font-weight: 600;
`;
const CommentWrapper = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 7px;
  }
  &::-webkit-scrollbar-thumb{
    background: linear-gradient(to top, #1e9600, #fff200, #ff0000);
  }
  &::-webkit-scrollbar-track{
    border-radius: 20px;
    background: rgba(0,0,0,0.2);
  }
`;
const AddCommentCon = styled.div`
  height: 100px;
  width: 100%;
  border-top: 1px solid grey;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Form = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-around;
  input{
    height: 30px;
    background-color: rgba(0,0,0,0.1);
  }
`;

//------------------------------------------------------------STYLED COMPONENT END---------------------------------------------

const ADD_COMMENT = gql`
  mutation addComment($todoId: String!, $text: String!){
    addComment(text: $text, todoId: $todoId){
      _id
      text
      userName
    }
  }
`;

//--------------------------------------------------------------USE MUTATION END---------------------------------------------

const CommentModal = ({ setCommentState, comments, todoId, commentCountS, setCommentCountS }) => {
  const [newComment, setNewComment] = useState('');
  const [addCommentMutation] = useMutation(ADD_COMMENT);

  const [fakeCommentList, setFakeCommentList] = useState(comments);
  console.log(fakeCommentList);

  const onClick = async () => {
    if (newComment !== "") {
      try {
        const { data: { addComment } } = await addCommentMutation({ variables: { todoId, text: newComment } });
        setFakeCommentList([addComment, ...fakeCommentList]);
        setCommentCountS(commentCountS + 1);
        setNewComment('');
      } catch (e) {
        console.log(e.message);
        alert("Can't comment, try later");
      }
    } else {
      alert("Comment is required to submit..");
    }
  }
  return <>
    <Wrapper onClick={() => setCommentState(false)}>
    </Wrapper>
    <ModalContainer>
      <Modal>
        <ModalHeader><span>Comments</span></ModalHeader>
        <CommentWrapper>
          {fakeCommentList.map(comment => <Comment key={comment._id} comment={comment} todoId={todoId} commentCountS={commentCountS} setCommentCountS={setCommentCountS} />)}
        </CommentWrapper>
        <AddCommentCon>
          <Form>
            <input placeholder="Write comment" onChange={e => setNewComment(e.target.value)} />
            <Button width="30" height="30" text={<Submit />} color="grey" onClick={onClick} />
          </Form>
        </AddCommentCon>
      </Modal>
    </ModalContainer>
  </>
}

export default CommentModal;