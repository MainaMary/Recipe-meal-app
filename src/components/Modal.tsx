import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { ModalBtn } from "../styles/styled";

interface Prop {
  openModal: boolean;
  handleModal: () => void;
}
interface DietProps {
  id: number;
  label: string;
  value: string;
}
const dietArr = [
  {
    id: 1,
    label: "Gluten free",
    value: "glutenfree",
  },
  {
    id: 2,
    label: "Ketogenic",
    value: "ketogenic",
  },
  { id: 3, label: "Vegeterian", value: "vegeterian" },
  { id: 4, label: "Vegan", value: "vegan" },
  { id: 5, label: "Pesecatarian", value: "pesectarian" },
];
const Modal = (prop: Prop) => {
  const navigate = useNavigate();
  const { openModal, handleModal } = prop;
  const [diet, setDiet] = useState("");
  const handleSelect = (e: any) => {
    setDiet(e.target.value);
  };

  if (!openModal) {
    return null;
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/diet/${diet}`);
  };
  return (
    <>
      <Main>
        <Wrapper
          onClick={(e) => {
            e.stopPropagation();
          }}
          onSubmit={handleSubmit}
        >
          <Close onClick={handleModal}>
            <h3>Meal plan</h3>
            <div style={{ cursor: "pointer" }}>
              <FaTimes />
            </div>
          </Close>
          <Box>
            <Select value={diet} onChange={handleSelect}>
              <Option>Select diet..</Option>
              {dietArr.map((item: DietProps) => (
                <Option key={item.id} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Box>
          <ModalBtn>submit</ModalBtn>
        </Wrapper>
      </Main>
    </>
  );
};

export default Modal;
const Main = styled.div`
  top: 0;
  width: 100%;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  @media screen and (max-width: 768px) {
    padding: 0 16px;
  }
`;
const Close = styled.div`
  height: 20px;
  align-items: center;
  text-align: right;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
`;
const Wrapper = styled.form`
  width: 100%;
  max-width: 500px;
  box-shadow: 0 0 3px #777;
  padding: 32px 16px;
  border-radius: 5px;
  background-color: #fff;
`;
const Box = styled.div`
  margin: 12px 0;
`;
const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #737373;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
  position: relative;
`;
const Option = styled.option`
  font-size: 16px;
  padding-left: 10px;
  background-color: var(--globalColor);
  border-bottom: 1px solid #fff;
  &:hover {
    background-color: none;
  }
`;
