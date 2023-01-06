import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomLabel from "../../components/CustomLabel";
import CustomInput from "../../components/CustomInput";
import {
  FormWrapper,
  Box,
  PasswordWrap,
  NavigateForgot,
  Password,
  Button,
} from "../../styles/styled";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseApp";

const LoginForm = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPswd: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (email) {
      setEmailErr("");
    }
    if (password) {
      setPasswordErr("");
    }
  };
  const navigate = useNavigate();
  const hasValue = (obj: any) => {
    for (const i in obj) {
      if (obj[i]) {
        return true;
      }
    }
    return false;
  };
  const { email, password } = formValues;

  const handleValidation = () => {
    if (!email) {
      setEmailErr("Email is required");
    }
    if (!password) {
      setPasswordErr("Password is required");
    }
  };
  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    handleValidation();
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );
      if (response.user) {
        navigate("/recipe");
      }

      console.log(response.user);
    } catch (error: any) {
      console.log(error.message.Firebase);
      if (error.message.includes("Firebase: Error (auth/wrong-password)")) {
        setPasswordErr("Wrong password");
      } else if (
        error.message.includes("Firebase: Error (auth/user-not-found)")
      ) {
        setEmailErr("Wrong email");
      }
      setError("Failed to login");
    }
  };

  return (
    <FormWrapper onSubmit={handleFormSubmit}>
      <div>{error}</div>
      <div>
        <h2 style={{ color: "var(--globalColor)" }}>Log in</h2>
      </div>

      <Box>
        <CustomLabel>Email</CustomLabel>
        <CustomInput
          value={formValues.email}
          name="email"
          onChange={handleChange}
          type="text"
        />
        <div style={{ fontSize: "12px", color: "red", margin: "5px 0" }}>
          {emailErr ? emailErr : ""}
        </div>
      </Box>
      <Password>
        <PasswordWrap>
          <CustomLabel>Password</CustomLabel>
          <CustomInput
            value={formValues.password}
            name="password"
            onChange={handleChange}
            type="password"
          />
          <div style={{ fontSize: "12px", color: "red", margin: "5px 0" }}>
            {passwordErr ? passwordErr : ""}
          </div>
        </PasswordWrap>
      </Password>

      <Box>
        <Button disabled={loading}>Log in</Button>
      </Box>
      <NavigateForgot>
        <p>
          Need an account?{" "}
          <span
            onClick={() => navigate("/")}
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
          onClick={() => navigate("/forgotPassword")}
          style={{
            color: "var(--globalColor)",
            textDecoration: "underline",
            marginLeft: "5px",
            cursor: "pointer",
            fontWeight: "bolder",
          }}
        >
          Forgot password?
        </p>
      </NavigateForgot>
    </FormWrapper>
  );
};

export default LoginForm;
