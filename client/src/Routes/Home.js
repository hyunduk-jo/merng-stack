import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";
import Button from "../Components/Button";
import TodoCard from "../Components/TodoCard";
import UploadModal from "../Components/UploadModal";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;
const TodoContainer = styled.div`
  width: 80%;
`;
const MyCon = styled.div``;
const OthersCon = styled.div``;
const Text = styled.div`
  font-size: ${props => props.size}px;
  font-weight: ${props => props.weight};
  color: ${props => props.color};
`;
const MyTodoCon = styled.div`
  display: flex;
`;
const OthersTodoCon = styled.div`
  display: flex;
`;

//----------------------------------------------------------STYLED COMPONENT END-------------------------------------------------

const GET_TODOS = gql`
  {
    seeTodos{
      todo
      isLiked
      _id
      likes{
        _id
      }
      user{
        userName
        isSelf
      }
    }
  }
`;

//-----------------------------------------------------------USER MUTATION END---------------------------------------------------

const Home = () => {
  const { data, loading } = useQuery(GET_TODOS);
  const [action, setAction] = useState(false);
  if (!loading && data) console.log(data.seeTodos);
  return <Wrapper>
    <Button height="30" width="100" onClick={() => setAction(!action)} color="#e98074" text="Add Todo" />
    {
      action === false ? null : <UploadModal />
    }
    <TodoContainer>
      <MyCon>
        <Text color="#e85a4f" size="40" weight="600">My Todo</Text>
        <MyTodoCon>
          {
            !loading && data?.seeTodos && data.seeTodos.map(todo => {
              return todo.user.isSelf ?
                <TodoCard key={todo._id} _id={todo._id} todo={todo.todo} userName={todo.user.userName} isSelf={todo.user.isSelf} isLiked={todo.isLiked} /> : null
            }
            )
          }
        </MyTodoCon>
      </MyCon>
      <OthersCon>
        <Text color="#e85a4f" size="40" weight="600">Other's Todo</Text>
        <OthersTodoCon>
          {
            !loading && data?.seeTodos && data.seeTodos.map(todo => {
              return todo.user.isSelf ?
                null : <TodoCard key={todo._id} _id={todo._id} todo={todo.todo} userName={todo.user.userName} isSelf={todo.user.isSelf} isLiked={todo.isLiked} />
            }
            )
          }
        </OthersTodoCon>
      </OthersCon>
    </TodoContainer>
  </Wrapper>
}

export default Home;