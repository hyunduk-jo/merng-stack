import { useMutation } from '@apollo/client';
import { gql } from 'apollo-boost';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Button from '../Components/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const glow = keyframes`
  0%{
    
  }
  50%{
    text-shadow: 0 0 10px white, 0 0 20px blue, 0 0 30px red;
  }
  100%{

  }
`;

const Title = styled.div`
  span{
    font-size: 120px;
    color: grey;
    font-weight: 600;
  }
  span:first-child{
    animation: ${glow} 1300ms ease-in-out infinite;
    color: black;
  }
  span:nth-child(2){
    animation: ${glow} 1300ms ease-in-out infinite 100ms;
    color: black;
  }
  span:nth-child(3){
    animation: ${glow} 1300ms ease-in-out infinite 200ms;
    color: black;
  }
  span:nth-child(4){
    animation: ${glow} 1300ms ease-in-out infinite 300ms;
    color: black;
  }
  span:nth-child(5){
    animation: ${glow} 1300ms ease-in-out infinite 400ms;
    color: black;
  }
  span:nth-child(6){
    margin-right: 20px;
    animation: ${glow} 1300ms ease-in-out infinite 500ms;
    color: black;
  }
  span:nth-child(7){
    animation: ${glow} 1300ms ease-in-out infinite 600ms;
    color: black;
  }
  span:nth-child(8){
    animation: ${glow} 1300ms ease-in-out infinite 700ms;
    color: black;
  }
  span:nth-child(9){
    animation: ${glow} 1300ms ease-in-out infinite 800ms;
    color: black;
  }
  span:nth-child(10){
    animation: ${glow} 1300ms ease-in-out infinite 900ms;
    color: black;
  }
  span:nth-child(11){
    animation: ${glow} 1300ms ease-in-out infinite 1000ms;
    color: black;
  }
  span:nth-child(12){
    animation: ${glow} 1300ms ease-in-out infinite 1100ms;
    color: black;
  }
  span:last-child{
    animation: ${glow} 1300ms ease-in-out infinite 1200ms;
    color: black;
  }
  margin-bottom: 10%;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  input,button{
    border-radius: 10px;
    width: 100%;
    height: 60px;
    font-size: 20px;
    margin-bottom: 40px;
    background-color: transparent;
    color: white;
    border: 2px solid white;
    box-shadow: 0 0 10px white, 0 0 20px red, inset 0 0 10px white, inset 0 0 20px red;
  }
  input{
    text-align: center;
  }
  input::placeholder{
    font-size: 20px;
    color: grey;
    font-weight: 600;
  }
`;
const StateChanger = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  font-size: 25px;
  color: white;
  text-shadow: 0 0 3px white, 0 0 6px white;
  span{
    cursor: pointer;
    color: skyblue;
    margin-left: 10px;
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
  <Title>
    <span>S</span>
    <span>i</span>
    <span>m</span>
    <span>p</span>
    <span>l</span>
    <span>e</span>
    <span>P</span>
    <span>o</span>
    <span>s</span>
    <span>t</span>
    <span>i</span>
    <span>n</span>
    <span>g</span>
  </Title>
    <Form>
      {
        action === "login" && (
          <>
            <input placeholder="Write Your Email" onChange={e => setEmail(e.target.value)} />
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