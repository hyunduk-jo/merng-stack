import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import Button from "../Components/Button";
import Loader from "../Components/Loader";
import TodoCard from "../Components/TodoCard";
import UploadModal from "../Components/UploadModal";

const Wrapper = styled.div`
  max-width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button{
    border: 2px solid white;
    box-shadow: 0 0 10px #fff, 0 0 20px #e60073,
    inset 0 0 10px #fff, inset 0 0 20px #e60073;
  }
`;
const TodoContainer = styled.div`
  width: 80%;
`;
const MyCon = styled.div`
  min-height: 350px;
`;
const OthersCon = styled.div`
  min-height: 350px;
`;

const glow = keyframes`
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
  }
  to {
    text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
  }
`;
const Text = styled.div`
  font-family: 'Redressed', cursive;
  font-size: ${props => props.size}px;
  font-weight: ${props => props.weight};
  color: white;
  animation: ${glow} 1s ease-in-out infinite alternate;
  margin: 20px 0px;
`;
const MyTodoCon = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const OthersTodoCon = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

//----------------------------------------------------------STYLED COMPONENT END-------------------------------------------------

const GET_TODOS = gql`
  {
    seeTodos{
      todo
      isLiked
      likesCount
      commentsCount
      _id
      likes{
        _id
      }
      user{
        userName
        isSelf
      }
      comments{
        _id
        text
        userName
      }
    }
  }
`;

//-----------------------------------------------------------USER MUTATION END---------------------------------------------------

const Home = () => {
  const { data, loading } = useQuery(GET_TODOS);
  const [modal, setModal] = useState(false);
  if (!loading && data) console.log(data.seeTodos);
  return <Wrapper>
    {
      loading ? <Loader size="50" /> :
        (
          <>
            <Button height="80" width="200" onClick={() => setModal(!modal)} color="transparent" padding="20" text="Add Todo" weight="600" />
            {
              modal === false ? null : <UploadModal setModal={setModal} />
            }
            <TodoContainer>
              <MyCon>
                <Text color="#e85a4f" size="40" weight="600">My Post</Text>
                <MyTodoCon>
                  {
                    !loading && data?.seeTodos && data.seeTodos.map(todo => {
                      return todo.user.isSelf ?
                        <TodoCard key={todo._id}
                          _id={todo._id}
                          todo={todo.todo}
                          userName={todo.user.userName}
                          isSelf={todo.user.isSelf}
                          isLiked={todo.isLiked}
                          likesCount={todo.likesCount}
                          comments={todo.comments}
                          commentsCount={todo.commentsCount} /> : null
                    })
                  }
                </MyTodoCon>
              </MyCon>
              <OthersCon>
                <Text color="#e85a4f" size="40" weight="600">Other's Post</Text>
                <OthersTodoCon>
                  {
                    !loading && data?.seeTodos && data.seeTodos.map(todo => {
                      return todo.user.isSelf ?
                        null : <TodoCard key={todo._id}
                          _id={todo._id}
                          todo={todo.todo}
                          userName={todo.user.userName}
                          isSelf={todo.user.isSelf}
                          isLiked={todo.isLiked}
                          likesCount={todo.likesCount}
                          comments={todo.comments}
                          commentsCount={todo.commentsCount} />
                    })
                  }
                </OthersTodoCon>
              </OthersCon>
            </TodoContainer>
          </>
        )
    }
  </Wrapper>
}

export default Home;