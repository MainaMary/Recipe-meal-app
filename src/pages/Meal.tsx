import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import styled from "styled-components";
import NoResults from "./NoResults";
import CustomLoader from "../components/CustomLoader";
import Navbar from "../components/Navbar";

interface IProps {
  instructions?: any;
  title?: string;
}
interface IngredientsProps {
  ingredients?: any;
}

export const Instructions = (props: IProps) => {
  const { instructions, title } = props;
  const instructionsArr = instructions[0]?.steps;
  return (
    <>
      <Prep>{`How to prepare ${title}`}</Prep>
      <ul
        style={{
          width: "50%",
          margin: "auto",
          textAlign: "start",
        }}
      >
        {instructions.length ? (
          instructionsArr?.map((item: any) => (
            <li
              style={{ color: "#737373", margin: "10px 0", fontSize: "18px" }}
              key={item.number}
            >
              {item.step}
            </li>
          ))
        ) : (
          <NoResults message="No instructions found!!" />
        )}
      </ul>
    </>
  );
};
export const Ingredients = (props: IngredientsProps) => {
  const { ingredients } = props;
  return (
    <ul
      style={{
        width: "50%",
        margin: "auto",
        textAlign: "start",
      }}
    >
      {ingredients.map((item: any) => (
        <li
          style={{ color: "#737373", margin: "10px 0", fontSize: "18px" }}
          key={item.id}
        >
          {item.name} - {item.unit}
        </li>
      ))}
    </ul>
  );
};
const Meal = () => {
  const [toggle, setToggle] = useState<number>(1);
  const { id } = useParams();
  const getRecipes = async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${
        import.meta.env.VITE_APP_API_KEY
      }`
    );
    return response;
  };
  const { data, isSuccess } = useQuery(["get-recipes"], getRecipes);

  const handleToggle = (tabIndex: number) => {
    setToggle(tabIndex);
  };

  return (
    <div>
      <Navbar />
      {isSuccess ? (
        <Wrapper>
          <>
            <Title>{data?.data?.title}</Title>
            <Type>
              Dish type:
              <span>
                {data?.data?.dishTypes.map((type: any, index: number) => {
                  const firstLetter = type[0].toUpperCase();
                  const remainingLetters = type.slice(1);

                  return (
                    <Span
                      key={index}
                    >{`${firstLetter}${remainingLetters}`}</Span>
                  );
                })}
              </span>
            </Type>

            <img
              style={{ borderRadius: "20px" }}
              src={data?.data?.image}
              alt={id}
              loading="lazy"
            />
          </>
          <div
            style={{ margin: "auto", padding: "20px 0", marginBottom: "20px" }}
          >
            <Tab>
              <Title
                className={toggle === 1 ? "active" : ""}
                onClick={() => handleToggle(1)}
              >
                Instructions
              </Title>
              <Title
                className={toggle === 2 ? "active" : ""}
                onClick={() => handleToggle(2)}
              >
                Ingredients
              </Title>
            </Tab>

            {toggle === 1 ? (
              <Instructions
                instructions={data?.data?.analyzedInstructions}
                title={data?.data?.title}
              />
            ) : null}

            {toggle === 2 ? (
              <Ingredients ingredients={data?.data?.extendedIngredients} />
            ) : null}
          </div>
        </Wrapper>
      ) : (
        <div
          style={{
            display: "flex",
            marginTop: "30px",
            justifyContent: "center",
          }}
        >
          <CustomLoader />
        </div>
      )}
    </div>
  );
};

export default Meal;
const Title = styled.p`
  font-weight: 500;
  font-size: 24px;
  cursor: pointer;

  &.active {
    color: orange;
    border-bottom: 3px solid orange;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  padding: 20px 30px;
  text-align: center;
  backgroundcolor: blue;
`;
const Prep = styled.p`
  font-weight: 300;
  font-size: 24px;
  margin: 20px 0;
`;
const Span = styled.span`
  margin: 0 5px;
  color: rgb(255, 157, 0);
`;
const Type = styled.p`
  margin: 10px 0;
`;
const Tab = styled.h2`
  display: flex;
  justify-content: space-around;
  margin: auto;
  width: 40%;
`;
