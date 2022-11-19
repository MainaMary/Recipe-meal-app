import React from "react";
import styled from "styled-components";
interface Props {
  children: any;
}
const CustomLabel = ({ children }: Props) => {
  return <Text>{children}</Text>;
};

export default CustomLabel;
const Text = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;
