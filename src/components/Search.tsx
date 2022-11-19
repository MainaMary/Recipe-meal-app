import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate(`/search/${searchValue}`);
  };
  return (
    <Wrapper onSubmit={handleSubmit}>
      <Input
        type="text"
        value={searchValue}
        onChange={handleSearch}
        placeholder={"Search..."}
      />
      <Button>
        <FaSearch style={{ fontSize: "14px", color: "#fff" }} />
      </Button>
    </Wrapper>
  );
};

export default Search;
const Input = styled.input`
  width: 50%;
  padding: 12px 16px;
  outline: none;
  border-top-left-radius: 5px;
  background-color: #ccc;

  border-bottom-left-radius: 5px;
  font-size: 16px;
  border: none;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const Wrapper = styled.form`
  padding: 30px 20px;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0 12px;
  display: flex;
  height: auto;
  align-items: center;
  border: none;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  background-color: var(--globalColor);
`;
