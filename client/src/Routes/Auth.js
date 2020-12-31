import { useMutation } from '@apollo/client';
import { gql } from 'apollo-boost';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../Components/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  input,button{
    border-radius: 10px;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 7px;
    height: 30px;
  }
  input{
    padding: 10px;
  }
`;
const StateChanger = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  span{
    cursor: pointer;
    color: skyblue;
    margin-left: 5px;
  }
`;
//-------------------------------------------------------STYLED COMPONENTS END-------------------------------------------------

const CREATE_ACCOUNT = gql`
  mutation createAccount($email: String!, $userName: String!){
    createAccount(email: $email, userName: $userName)
  }
`;

const REQUEST_SECRET = gql`
  mutation requestSecret($email: String!){
    requestSecret(email: $email)
  }
`;

const CONFIRM_SECRET = gql`
  mutation confirmSecret($email: String!, $secret: String!){
    confirmSecret(email: $email, secret: $secret)
  }
`;

const LOG_USER_IN = gql`
  mutation logUserIn($token: String!){
    logUserIn(token: $token) @client
  }
`;
//----------------------------------------------------------USE MUTATIONS END--------------------------------------------------

const Auth = () => {
  const [action, setAction] = useState('login');

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [secret, setSecret] = useState('');

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT);
  const [requestSecretMutation] = useMutation(REQUEST_SECRET);
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET);
  const [logUserInMutation] = useMutation(LOG_USER_IN);

  const onClick = async (e) => {
    e.preventDefault();
    if(action === 'login'){
      if(email !== ""){
        try {
          const {data: {requestSecret}} = await requestSecretMutation({variables: {email}});
          if(requestSecret){
            alert("Check Your inbox for secret");
            setAction("confirm");
          }else{
            alert("Account not registerd, create one first");
            setAction("signup");
          }
        } catch (e) {
          console.log(e.message);
        }
      }else{
        alert("Email is required to login");
      }
    }else if(action === 'signup'){
      if(email !== "" && userName !== ""){
        try {
          const {data: {createAccount}} = await createAccountMutation({variables: {email, userName}});
          if(createAccount){
            alert("Account Created, Login now!!");
            setAction("login");
          }else{
            alert("Username or Email is already taken");
          }
        } catch (e) {
          console.log(e.message);
        }
      }else{
        alert("All fields are required!");
      }
    }else if(action === 'confirm'){
      if(secret !== ""){
        try {
          const {data: {confirmSecret: token}} = await confirmSecretMutation({variables: {email, secret}});
          if(token !== "" && token !== undefined){
            await logUserInMutation({variables: {token}});
            alert("You are logged in. Welcome!!");
            window.location = '/';
          }else{
            alert("Something wrong happened, try again");
          }
        } catch (e) {
          console.log(e.message);
        }
      }else{
        alert("Secret is needed check your email for the secret");
      }
    }
  }

  return <Container>
    <Form>
      {
        action === "login" && (
          <>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <Button onClick={onClick} text="Log In" color="#FEAE51FF" weight="600" />
          </>
        )
      }
      {
        action === "signup" && (
          <>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input placeholder="Username" onChange={e => setUserName(e.target.value)} />
            <Button onClick={onClick} text="Sign Up" color="#FEAE51FF" weight="600" />
          </>
        )
      }
      {
        action === "confirm" && (
          <>
            <input placeholder="Paste your secret" onChange={e => setSecret(e.target.value)} />
            <Button onClick={onClick} text="Confirm" color="#FEAE51FF" weight="600" />
          </>
        )
      }
    </Form>
    {
      action !== 'confirm' && (
        <StateChanger>
          {
            action === 'login' ? (
              <>Don't have an account? <span onClick={() => setAction("signup")}>Sign Up</span></>
            ) : (
              <>You have an account? <span onClick={() => setAction("login")}>Log In</span></>
            )
          }
        </StateChanger>
      )
    }
  </Container>
}

export default Auth;