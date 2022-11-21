import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaTimes, FaBars, FaUserAlt } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseApp";
import { Menu } from "../components/MenuItems";
interface Props {
  show?: boolean;
  checkBtns?: boolean;
}
interface ModalProps {
  showModal?: boolean;
  handleModal?: () => void;
}
const Modal = (props: ModalProps) => {
  const { showModal, handleModal } = props;
  const currentUser = useContext(UserContext);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  if (!showModal) {
    return null;
  }
  const handleLogout = async () => {
    try {
      await signOut(auth);

      navigate("/login");
    } catch (error: any) {
      console.log(error.message);
      setError("Failed to log out");
    }
  };
  return (
    <Profilewrap onClick={handleModal}>
      <Form onClick={(e: any) => e.stopPropagation()}>
        <div>{error}</div>
        <UserProfile>
          <p style={{ fontSize: "16px" }}>Profile</p>
          <div style={{ fontSize: "16px" }} onClick={handleModal}>
            <FaTimes />
          </div>
        </UserProfile>

        <Email>
          Email
          <p>{currentUser.currentUser?.email}</p>
        </Email>
        <ProfileBtns>
          <Btn onClick={() => navigate("/updateProfile")}>Update profile</Btn>
          <Btn style={{ padding: "4px 8px" }} onClick={handleLogout}>
            Log out
          </Btn>
        </ProfileBtns>
      </Form>
    </Profilewrap>
  );
};
const Navbar = ({ show = true, checkBtns = false }: Props) => {
  const [click, setClick] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setClick((prevState) => {
      return !prevState;
    });
  };
  const handleModal = () => {
    setShowModal((prev) => !prev);
    handleClick();
  };
  return (
    <NavWrapper>
      <NavLogo to="/home">FoodRecipe</NavLogo>
      {checkBtns ? (
        <Wrapper>
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </Button>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Sign up
          </Button>
        </Wrapper>
      ) : null}
      {show && (
        <>
          <ListWrap click={click}>
            {Menu.map(({ id, title, url, className }) => {
              console.log(title);
              return (
                <Items key={id} className={className}>
                  <a href={url}>{title}</a>
                </Items>
              );
            })}

            <Items className="navBtn" onClick={handleModal}>
              <FaUserAlt className="navBtn" size={20} />
            </Items>
          </ListWrap>
        </>
      )}

      <MobileIcon onClick={handleClick}>
        {click ? <FaTimes /> : <FaBars />}
      </MobileIcon>
      {showModal ? (
        <Modal showModal={showModal} handleModal={handleModal} />
      ) : null}
    </NavWrapper>
  );
};

export default Navbar;

const Profilewrap = styled.div`
  position: fixed;
  top: 80px;
  right: 36px;
  box-shadow: 0 0 3px #777;
  background-color: rgba(0, 0, 0, 0.2);
  width: 15%;
  height: 20vh;
  boder-radius: 5px;
  z-index: 100;

  @media screen and (max-width: 768px) {
    width: 100%;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
    position: fixed;
  }
`;
const Email = styled.div`
  margin: 16px 0;
`;
const UserProfile = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  width: 100%;
  font-size: 16px;
`;
const Form = styled.div`
  padding: 10px 8px;
  position: absolute;
  background-color: #fff;
  max-width: 370px;
  width: 100%;
  box-shadow: 0 0 3px #777;
  @media screen and (max-width: 768px) {
  }
`;
const Btn = styled.button`
  padding: 4px 8px;
  background-color: var(--globalColor);
  border: none;
  outline: "none";
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
  @media screen and (max-width: 860px) {
    width: 45%;
    padding: 12px 8px;
  }
`;
const ProfileBtns = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const NavWrapper = styled.nav`
  height: 10vh;
  z-index: 2;
  background-color: rgba(244, 159, 47, 0.8);
  display: flex;
  justify-content: space-between;
  padding: 0 32px;
  align-items: center;

  @media screen and (max-width: 768px) {
    transition: 0.8s all ease;
  }
`;

const NavLogo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  color: #000;
`;
const ListWrap = styled.ul.attrs((props: { click: boolean }) => props)`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  width: 70%;
  justify-content: flex-end;

  @media screen and (max-width: 768px) {
    display: flex;
    top: 10vh;
    cursor: pointer;
    flex-direction: column;
    width: 100%;
    position: absolute;
    left: ${(props) => (props.click ? 0 : "-100%")};
    opacity: 1;
    transition: all 0.5s ease;
    background: #101522;
    height: calc(100vh - 10vh);
    z-index: 10;
  }
`;
const Items = styled.li`
  padding: 0 20px;

  a {
    text-decoration: none;
    padding: 0 20px;
    color: #000;
    font-size: 20px;
    @media screen and (max-width: 768px) {
      color: var(--globalColor);
    }
  }
  &:hover {
    border-bottom: 3px solid #fff;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 200px;
    &:hover {
      border-bottom: none;
    }
  }
`;

const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
const Wrapper = styled.div`
  display: flex;
  width: 20%;
  justify-content: space-between;
`;
const Button = styled.button`
  width: 40%;
  padding: 5px 10px;
  text-align: center;
  outline: focus;
  border: none;
  border-radius: 5px;
  color: var(--globalColor);
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  background-color: #fff;
`;
