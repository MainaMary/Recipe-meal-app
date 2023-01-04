import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
interface Props {
  img: string;
  title: string;
  label: string;
}

const Error = ({ img, label, title }: Props) => {
  return (
    <div className=" flex justify-center text-center">
      <div className="w-1/2">
        <img src={img} alt="404" />
        <p className="my-8 text-2xl">{title}</p>
        <Button name={<Link to="/">{label}</Link>} />
      </div>
    </div>
  );
};

export default Error;
