import React from "react";
import styled from "styled-components";

interface Props {
  message: string;
}
const NoResults = ({ message }: Props) => {
  return <Box>{message}</Box>;
};

export default NoResults;
const Box = styled.div`
  box-shadow: 0 0 3px #000;
  width: 70%;
  margin: 20px auto;
  text-align: center;
  padding: 20px;
`;
