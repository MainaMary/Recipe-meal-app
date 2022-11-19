import React from "react";
import styled from "styled-components";
import SignupForm from "./SignupForm";
import Navbar from "../../components/Navbar";
import Img from "../../assets/images/hamburgerImg.png";

const SignupPage = () => {
  return (
    <>
      <Navbar show={false} checkBtns={true} />
      <Wrapper>
        <Main>
          <Image>
            <img alt="login" src={Img} />
          </Image>
          <LogIn>
            <SignupForm />
          </LogIn>
        </Main>
      </Wrapper>
    </>
  );
};

export default SignupPage;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100vh - 10vh);
  align-items: center;
`;
const Main = styled.div`
  display: flex;
  width: 70%;
  max-width: 1000px;
  border-radius: 5px;
  box-shadow: 0 0 3px;
  @media (max-width: 800px) {
    width: "70%";
    max-width: 600px;
  }
`;
const Image = styled.div`
  width: 100%;
  text-align: center;
  height: 300px;

  img {
    margin: auto;
    text-align: center;
    height: 100%;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
const LogIn = styled.div`
  width: 100%;
`;
