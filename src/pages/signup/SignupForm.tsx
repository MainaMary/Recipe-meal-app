import React, { useState, useContext } from "react";
import styled from "styled-components";
import CustomInput from "../../components/CustomInput";
import CustomLabel from "../../components/CustomLabel";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignupForm = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  console.log({ currentUser });
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPswd: "",
  });
  const [check, setCheck] = useState(false);
  const [userNameErr, setUserNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPswdErr, setConfirmPswdErr] = useState("");
  const [checkErr, setCheckErr] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { username, email, password, confirmPswd } = formValues;
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (username.length) {
      setUserNameErr("");
    }
    if (email) {
      setEmailErr("");
    }
    if (password) {
      setPasswordErr("");
    }
    if (confirmPswd) {
      setConfirmPswdErr("");
    }
    if (check) {
      setCheckErr("");
    }
  };
  const handleCheck = (e: any) => {
    setCheck((prev) => !prev);
    setCheckErr("");
  };
  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleValidation = () => {
    if (!email) {
      setUserNameErr("Username is required");
    }
    if (!email) {
      setEmailErr("Email is required");
    } else if (!validateEmail(email)) {
      setEmailErr("Valid email adress is required");
    }

    if (!password) {
      setPasswordErr("Password is required");
    }
    if (!confirmPswd) {
      setConfirmPswdErr("Confirm password is required");
    }
    if (password && confirmPswd && password !== confirmPswd) {
      setConfirmPswdErr("Passwords do not match");
    }
    if (password && password.length < 6) {
      setPasswordErr("Password should be atleast 6 characters");
    }
    if (!check) {
      setCheckErr("Please confirm terms and policy");
    }
    setError("");
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    handleValidation();

    try {
      console.log(email, password);
      if (check && confirmPswd && password && email) {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/login");
      }

      setLoading(true);
      setError("");
    } catch (error: any) {
      console.log(error.message);
      if (error.message) {
        setEmailErr("Email already exists");
      }
      setTimeout(() => {
        setError("Account creation failed");
      }, 1000);
    }
    setLoading(false);
  };

  return (
    <FormWrapper onSubmit={handleFormSubmit}>
      <div style={{ fontSize: "16px", color: "red", margin: "5px 0" }}>
        {error}
      </div>
      <div>
        <h2 style={{ color: "var(--globalColor)" }}>Create an account</h2>
      </div>
      {/* <h2>{currentUser?.email}</h2> */}

      <Box>
        <CustomLabel>Username</CustomLabel>
        <CustomInput
          type="text"
          value={username}
          name="username"
          onChange={handleChange}
        />
        <div style={{ fontSize: "12px", color: "red", margin: "5px 0" }}>
          {userNameErr ? userNameErr : ""}
        </div>
      </Box>
      <Box>
        <CustomLabel>Email</CustomLabel>
        <CustomInput
          type="text"
          value={email}
          name="email"
          onChange={handleChange}
        />
        <div style={{ fontSize: "12px", color: "red", margin: "5px 0" }}>
          {emailErr ? emailErr : ""}
        </div>
      </Box>
      <Password>
        <PasswordWrap>
          <CustomLabel>Password</CustomLabel>
          <CustomInput
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
          <div style={{ fontSize: "12px", color: "red", margin: "5px 0" }}>
            {passwordErr ? passwordErr : ""}
          </div>
        </PasswordWrap>
        <PasswordWrap>
          <CustomLabel>Confirm Password</CustomLabel>
          <CustomInput
            type="password"
            value={confirmPswd}
            name="confirmPswd"
            onChange={handleChange}
          />
          <div style={{ fontSize: "12px", color: "red", margin: "5px 0" }}>
            {confirmPswdErr ? confirmPswdErr : ""}
          </div>
        </PasswordWrap>
      </Password>
      <Terms>
        <input type="checkbox" checked={check} onChange={handleCheck} />
        <p style={{ width: "95%" }}>
          By creating an account, you agree to the terms of service conditions
          and privacy policy
        </p>
      </Terms>
      <div style={{ fontSize: "12px", color: "red", margin: "5px 0" }}>
        {checkErr ? checkErr : ""}
      </div>
      <Box>
        <Button disabled={loading}>Sign up</Button>
      </Box>
      <Account onClick={() => navigate("/login")}>
        <p>
          Already have an account?{" "}
          <span
            style={{
              color: "var(--globalColor)",
              textDecoration: "underline",
              marginLeft: "5px",
              cursor: "pointer",
            }}
          >
            Login
          </span>
        </p>
      </Account>
    </FormWrapper>
  );
};

export default SignupForm;
const FormWrapper = styled.form`
  padding: 12px 18px;
  border-left: 1px solid #000;
  @media (max-width: 800px) {
    width: "70%";
    padding: "12px 10px";
  }
`;
const Box = styled.div`
  width: 100%;
  margin: 12px 0;
`;
const PasswordWrap = styled.div`
  width: 45%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;
const Terms = styled.div`
  display: flex;
  margin: 12px 0;
  width: 100%;
  justify-content: space-between;
  p: {
    margin-top: 5px;
  }
`;
const Password = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
const Account = styled.div``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  color: #fff;
  background-color: var(--globalColor);
  border: none;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
`;
