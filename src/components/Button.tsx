import React from "react";
interface Props {
  name: string | JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
const Button = ({ name, onClick, disabled, className }: Props) => {
  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
