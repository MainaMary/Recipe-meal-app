import styled from "styled-components";
export const Loader = styled.div`
display: flex,
justify-content: center,
marginTop: 30px,
`;
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100vh - 10vh);
  align-items: center;
`;
export const Main = styled.div`
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
export const ForgotPswdWrap = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  border-radius: 5px;
  box-shadow: 0 0 3px;
  margin: auto;
  // height: calc(100vh - 10vh);
  margin-top: 200px;
  align-items: center;
  @media (max-width: 800px) {
    width: "60%";
    max-width: 300px;
  }
`;
export const Image = styled.div`
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
export const LogIn = styled.div`
  width: 100%;
`;
export const FormWrapper = styled.form`
  padding: 12px 18px;
  border-left: 1px solid #000;

  @media (max-width: 800px) {
    width: "70%";
    padding: "12px 10px";
  }
`;
export const Box = styled.div`
  width: 100%;
  margin: 12px 0;
`;
export const PasswordWrap = styled.div`
  width: 100%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;
export const PasswordsWrapper = styled.div`
  width: 45%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;
export const Terms = styled.div`
  display: flex;
  margin: 12px 0;
  width: 100%;
  justify-content: space-between;
  p: {
    margin-top: 5px;
  }
`;
export const Password = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: bold;
  background-color: var(--globalColor);
  border: none;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 8px;
`;

export const ModalBtn = styled.button`
  text-align: center;
  background-color: var(--globalColor);
  color: #fff;
  padding: 8px 20px;
  width: 100%;
  font-size: 16px;
  outline: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #fff;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
export const NavigateForgot = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const InfoWrapper = styled.div`
  border-radius: 5px;
  width: 100%;
  background-color: #a6d8a9;
  text-align: start;
  padding: 8px 10px;
  color: #fff;
`;
