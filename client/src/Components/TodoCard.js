import { useMutation } from "@apollo/client";
import { gql } from "apollo-boost";
import { useState } from "react";
import styled from "styled-components"
import Button from "./Button";
import CommentModal from "./CommentModal";
import { Bubble, EmptyHeart, FullHeart, Submit, Trash, Update } from "./Icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 290px;
  height: 250px;
  border-radius: 10px;
  margin: 20px;
  padding: 15px;
  background-color: #3a4660;
  button{
    outline: none;
  }
`;
const TextCon = styled.div`
  text-align: center;
`;
const Text = styled.div`
  font-size: ${props => props.size}px;
  font-weight: ${props => props.weight};
  color: ${props => props.color};
  margin: 20px 0px;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  button{
    width: 40px;
    height: 40px;
    fill: white;
    box-sizing: border-box;
    margin-bottom: 7px;
  }
`;
const ButtonCon = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-around;
`;
const Input = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  input{
    width: 85%;
    height: 30px;
    font-size: 17px;
    text-align: center;
    border: none;
    border-radius: 15px;
    outline: none;
  }
  button{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  svg{
    fill: white;
  }
`;
const LikesCountCon = styled.div``;
const CountCon = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  color: white;
  margin-top: 3px;
`;

//---------------------------------------------------------STYLED COMPONENT END----------------------------------------------------

const EDIT_TODO = gql`
  mutation editTodo($action: String!, $_id: String!, $todo: String){
    editTodo(action: $action, todo: $todo, _id: $_id)
  }
`;

const TOGGLE_LIKE = gql`
  mutation toggleLike($todoId: String!){
    toggleLike(todoId: $todoId)
  }
`

//-----------------------------------------------------------USE MUTATION END------------------------------------------------------

const TodoCard = ({ todo, userName, _id, isSelf, isLiked, likesCount, comments, commentsCount }) => {
  const [updateState, setUpdateState] = useState(false);
  const [update, setUpdate] = useState('');
  const [likeState, setLikeState] = useState(isLiked);
  const [commentState, setCommentState] = useState(false);

  const [editTodoMutation] = useMutation(EDIT_TODO);

  const onUpdate = async () => {
    const { data: { editTodo } } = await editTodoMutation({ variables: { action: "EDIT", todo: update, _id } });
    if (editTodo) {
      alert("Todo updated");
      window.location.reload();
    } else {
      alert("Can't update Todo..");
    }
  }

  const onDelete = async () => {
    const { data: { editTodo } } = await editTodoMutation({ variables: { action: "DELETE", todo: update, _id } });
    if (editTodo) {
      alert("Todo Deleted");
      window.location.reload();
    } else {
      alert("Can't delete Todo..");
    }
  }

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE);

  const clickLike = async () => {
    await toggleLikeMutation({ variables: { todoId: _id } });
    if (likeState === true) {
      setLikeState(false);
    } else {
      setLikeState(true);
    }
  }
  return <Container>
    <TextCon>
      <Text size="23" weight="600" color="#ed8a63">{todo}</Text>
      <Text size="18" weight="600" color="white">{userName}</Text>
    </TextCon>
    {
      isSelf ? (
        <>
          <Form>
            <ButtonCon>
              <Button onClick={clickLike} text={likeState ? <FullHeart size="29" /> : <EmptyHeart size="29" />} color="#c3073f" />
              <Button text={<Bubble size="29" />} color="#3500d3" onClick={() => setCommentState(true)} />
              <Button text={<Update size="29" />} color={"#f3ca20"} onClick={() => setUpdateState(!updateState)} />
              <Button text={<Trash size="29" />} color={"#190061"} onClick={onDelete} />
            </ButtonCon>
            <CountCon>
              <LikesCountCon>{likesCount === 1 ? '1 like' : `${likesCount} likes`}</LikesCountCon>
              <div>{commentsCount === 1 ? '1 comment' : `${commentsCount} comments`}</div>
            </CountCon>
          </Form>
          <Input>
            {
              updateState === true ? <>
                <input placeholder="Write to update Todo" onChange={e => setUpdate(e.target.value)} />
                <Button text={<Submit size="16" />} color="grey" onClick={onUpdate} />
              </> : null
            }
            {
              commentState === true ? <CommentModal setCommentState={setCommentState} comments={comments} todoId={_id} /> : null
            }
          </Input>
        </>
      ) : (
          <>
            <Form>
              <ButtonCon>
                <Button onClick={clickLike} text={likeState ? <FullHeart size="29" /> : <EmptyHeart size="29" />} color="#c3073f" />
                <Button text={<Bubble size="29" />} color="#3500d3" onClick={() => setCommentState(true)} />
              </ButtonCon>
              <CountCon>
                <LikesCountCon>{likesCount === 1 ? '1 like' : `${likesCount} likes`}</LikesCountCon>
                <div>{commentsCount === 1 ? '1 comment' : `${commentsCount} comments`}</div>
              </CountCon>
            </Form>
            <Input>
              {
                commentState === true ? <CommentModal setCommentState={setCommentState} comments={comments} todoId={_id} /> : null
              }
            </Input>
          </>
        )
    }
  </Container>
}

export default TodoCard;