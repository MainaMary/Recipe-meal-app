import React, { useState, useRef } from "react";
import {
  Main,
  Box,
  NavigateForgot,
  FormWrapper,
  ForgotPswdWrap,
  InfoWrapper,
} from "../../styles/styled";
import CustomLabel from "../../components/CustomLabel";
import CustomInput from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { Button } from "../../styles/styled";
import Navbar from "../../components/Navbar";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebaseApp";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const emailRef = useRef("");

  const handleChange = (e: any) => {
    setEmail(e.target.value);
    if (email) {
      setEmailErr("");
    }
  };
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setEmailErr("Email is required");
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setInfo("Check your email to reset the password");
      setEmailErr("");
    } catch (error) {
      setError("Email not found");
    }
  };
  return (
    <>
      <Navbar show={true} checkBtns={false} />
      <ForgotPswdWrap>
        <FormWrapper style={{ width: "100%" }} onSubmit={handleReset}>
          <div>{error}</div>
          {info && (
            <InfoWrapper>
              <p>{info}</p>
            </InfoWrapper>
          )}

          <div>
            <h2 style={{ color: "var(--globalColor)" }}>Password reset</h2>
          </div>
          <Box>
            <CustomLabel>Email</CustomLabel>
            <CustomInput
              value={email}
              onChange={handleChange}
              name="username"
            />
            <div style={{ fontSize: "12px", color: "red", margin: "5px 0" }}>
              {emailErr ? emailErr : ""}
            </div>
          </Box>
          <Box>
            <Button>Reset password</Button>
          </Box>
          <NavigateForgot>
            <p onClick={() => navigate("/")}>
              Need an account?{" "}
              <span
                style={{
                  color: "var(--globalColor)",
                  textDecoration: "underline",
                  marginLeft: "5px",
                  cursor: "pointer",
                  fontWeight: "bolder",
                }}
              >
                Sign up
              </span>
            </p>
            <p
              onClick={() => navigate("/login")}
              style={{
                color: "var(--globalColor)",
                textDecoration: "underline",
                marginLeft: "5px",
                cursor: "pointer",
                fontWeight: "bolder",
              }}
            >
              Log in
            </p>
          </NavigateForgot>
        </FormWrapper>
      </ForgotPswdWrap>
    </>
  );
};

export default ForgotPassword;
