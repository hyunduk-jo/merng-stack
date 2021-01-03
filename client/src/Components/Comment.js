import { useMutation, useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import Button from './Button';

const CommentsContainer = styled.div`
  width: 80%;
  display: flex;
  font-size: 20px;
  margin: 10px 0px;
  button{
    border-radius: 5px;
    background-color: #c3073f;
  }
`;
const CommentUserName = styled.div`
  width: 20%;
  font-weight: 600;
`;
const CommentText = styled.div`
  width: 80%;
`;
//---------------------------------------------------STYLED COMPONENTS END------------------------------------------------

const IS_MY_COMMENT = gql`
  query isMyComment($userName: String!){
    isMyComment(userName: $userName)
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($todoId: String!, $commentId: String!){
    deleteComment(todoId: $todoId, commentId: $commentId)
  }
`;
//------------------------------------------------------USE MUTATION END--------------------------------------------------

const Comment = ({ comment, todoId, commentCountS, setCommentCountS }) => {
  const { data, loading } = useQuery(IS_MY_COMMENT, { variables: { userName: comment.userName } });
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT);

  const onClick = async () => {
    try {
      await deleteCommentMutation({ variables: { todoId, commentId: comment._id } });
      setCommentCountS(commentCountS - 1);
      window.location.reload();
    } catch (e) {
      console.log(e.message);
      alert("Can't delete, try again");
    }
  }


  return <CommentsContainer>
    <CommentUserName>{comment.userName}</CommentUserName>
    <CommentText >{comment.text}</CommentText>
    {
      !loading && data?.isMyComment ? <Button text="Delete" onClick={onClick} /> : null
    }
  </CommentsContainer>
}

export default Comment;