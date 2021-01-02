import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";
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
const Text = styled.div`
  font-size: ${props => props.size}px;
  font-weight: ${props => props.weight};
  color: ${props => props.color};
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
            <Button height="30" width="100" onClick={() => setModal(!modal)} color="#e98074" text="Add Todo" />
            {
              modal === false ? null : <UploadModal setModal={setModal} />
            }
            <TodoContainer>
              <MyCon>
                <Text color="#e85a4f" size="40" weight="600">My Todo</Text>
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
                <Text color="#e85a4f" size="40" weight="600">Other's Todo</Text>
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