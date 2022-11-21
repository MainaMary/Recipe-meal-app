import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import CustomLoader from "../../components/CustomLoader";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import MealDiet from "./MealDiet";

interface Props {
  isLoading?: boolean;
  diet?: any;
  nutrients?: any[];
}
const Diet = (props: Props) => {
  const { id } = useParams();

  const fetchDiet = async () => {
    const response = await axios(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=${
        import.meta.env.VITE_APP_API_KEY
      }&timeFrame=day&diet=${id}`
    );
    return response;
  };
  const { data, isLoading } = useQuery(["fetch-diet", id], fetchDiet);
  console.log(data, "data diet component");
  let objectClone = {};
  objectClone = { ...data?.data?.meals, ...data?.data?.nutrients };
  console.log(objectClone, "object");

  return (
    <>
      <Navbar />
      {
        <>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <CustomLoader />
            </div>
          ) : (
            <div>
              <h2 style={{ textAlign: "center", margin: "30px 0" }}>
                Meal Plan
              </h2>
              <Wrap>
                {data?.data?.nutrients &&
                  Object.entries(data?.data?.nutrients)?.map((item: any) => (
                    <Flex>
                      <p>
                        {item[0]}
                        <span> {item[1].toFixed(0)}</span>
                      </p>
                    </Flex>
                  ))}
              </Wrap>
              <Grid>
                {data?.data?.meals.map((meal: any) => (
                  <MealDiet key={meal.id} meal={meal} />
                ))}
              </Grid>
            </div>
          )}
        </>
      }
    </>
  );
};

export default Diet;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  grid-gap: 3rem;
  margin: auto;
`;
const Box = styled.div`
  padding: 10px 20px;
  height: 300px;
  width: 400px;A
  margin: 12px auto;
  border-radius: 10px;
  overflow: hidden;

  img {
    border-radius: 10px;
  }
`;
const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Flex = styled.div`
  border-radius: 50px;
  padding: 12px 16px;
  background-color: #fff;
  box-shadow: 0 0 3px #777;
  outline: none;
  margin: 20px 0;
  width: 15%;
  text-align: center;
`;
