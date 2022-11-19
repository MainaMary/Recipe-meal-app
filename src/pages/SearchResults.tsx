import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import CustomLoader from "../components/CustomLoader";

const SearchResults = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const postSearchVal = async () => {
    const response = axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_APP_API_KEY
      }&query=${query}`
    );
    return response;
  };
  const { data, isLoading } = useQuery(["search", query], postSearchVal);
  const handleMeal = (id: string) => {
    navigate(`/recipe/${id}`);
  };
  return (
    <>
      <Navbar />
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
        <>
          <h3
            style={{ textAlign: "center", margin: "20px 0" }}
          >{`Search results for ${query}`}</h3>
          <Grid>
            {data?.data?.results.map((item: any) => (
              <Box key={item.id} onClick={() => handleMeal(item.id)}>
                <img alt={item.title} src={item.image} loading="lazy" />
                <h3>{item.title}</h3>
              </Box>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default SearchResults;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;
const Box = styled.div`
  padding: 10px 20px;
  height: 300px;
  width: 400px;
  margin: 12px auto;
  border-radius: 10px;
  overflow: hidden;

  img {
    border-radius: 10px;
  }
`;
