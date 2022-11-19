import React, { useState, useContext } from "react";
import {
  FormWrapper,
  Box,
  NavigateForgot,
  Button,
  ForgotPswdWrap,
  Password,
  PasswordsWrapper,
} from "../../styles/styled";
import Navbar from "../../components/Navbar";
import CustomLabel from "../../components/CustomLabel";
import CustomInput from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { auth } from "../../firebase";
import { updateProfile } from "firebase/auth";

const UpdateProfile = () => {
  const { currentUser } = useContext(UserContext);
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPswd, setConfirmPswd] = useState<string>("");
  const [emailErr, setEmailErr] = useState("");

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [confirmPswdErr, setConfirmPswdErr] = useState<string>("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    setEmailErr("");
  };

  //chaining promises all together
  // const promises = [];
  // if (currentUser?.email !== email) {
  //   promises.push(updateEmail(auth, email));
  // }
  // if (password) {
  //   promises.push(updatePassword(auth, password));
  // }
  // Promise.all(promises)
  //   .then((res) => {})
  //   .catch((err: any) => {
  //     setError("Failed to update accounts");
  //   })
  //   .finally();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setEmailErr("Email is required");
    }
    if (password !== confirmPswd) {
      setConfirmPswdErr("Passwords do not match");
    }
    const userData = {
      email: email,
      password: password,
    };
    try {
      // const res = await updateProfile(userData);
      // console.log(res, "update profile");
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <>
      <Navbar show={true} checkBtns={false} />
      <ForgotPswdWrap>
        <FormWrapper style={{ width: "100%" }}>
          <div>{error}</div>

          <div>
            <h2 style={{ color: "var(--globalColor)" }}>Update profile</h2>
          </div>
          <Box>
            <CustomLabel>Email</CustomLabel>
            <CustomInput
              value={email}
              onChange={handleEmailChange}
              name="username"
            />
            <div style={{ fontSize: "12px", color: "red", margin: "5px 0" }}>
              {emailErr ? emailErr : ""}
            </div>
          </Box>
          <Password>
            <PasswordsWrapper>
              <CustomLabel>Password</CustomLabel>
              <CustomInput
                value={password}
                name="password"
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </PasswordsWrapper>
            <PasswordsWrapper>
              <CustomLabel>Confirm Password</CustomLabel>
              <CustomInput
                value={confirmPswd}
                name="confirmPswd"
                onChange={(e: any) => setConfirmPswd(e.target.value)}
              />
              <div style={{ fontSize: "12px", color: "red", margin: "5px 0" }}>
                {confirmPswdErr ? confirmPswdErr : ""}
              </div>
            </PasswordsWrapper>
          </Password>
          <Box>
            <Button onClick={handleSubmit}>Update profile</Button>
          </Box>
          <NavigateForgot>
            <p onClick={() => navigate("/recipe")}>
              <span
                style={{
                  color: "var(--globalColor)",
                  textDecoration: "underline",
                  marginLeft: "5px",
                  cursor: "pointer",
                  fontWeight: "bolder",
                }}
              >
                Cancel
              </span>
            </p>
          </NavigateForgot>
        </FormWrapper>
      </ForgotPswdWrap>
    </>
  );
};

export default UpdateProfile;
