import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Cuisines from "./Cuisines";
import CustomLoader from "../components/CustomLoader";

interface IProps {
  id: string;
  title: string;
  image: string;
  imageType: string;
}
const AllCuisines = () => {
  const [_, setItalian] = useState([]);
  const navigate = useNavigate();
  const { cuisine } = useParams();
  const handleMeal = (id: string) => {
    navigate(`/recipe/${id}`);
  };
  const fetchCuisines = async () => {
    const response =
      await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_APP_API_KEY
      }&cuisine=${cuisine}
      `);
    return response;
  };
  const { data, error, isLoading } = useQuery(
    ["get cuisines", cuisine],
    fetchCuisines
  );
  const fetchItalian = async () => {
    const res = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_APP_API_KEY
      }&cuisine=italian`
    );
    const data = res.data;
    setItalian(data.results);
  };
  useEffect(() => {
    fetchItalian();
  }, []);

  return (
    <>
      <Cuisines cuisine={cuisine} />
      {
        <Grid>
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
          ) : error ? (
            <h2>Deplted the number of requests.Please try again.</h2>
          ) : (
            data?.data?.results.map((item: IProps) => (
              <Box key={item.id} onClick={() => handleMeal(item.id)}>
                <img alt={item.title} src={item.image} loading="lazy" />
                <h3>{item.title}</h3>
              </Box>
            ))
          )}
        </Grid>
      }
    </>
  );
};

export default AllCuisines;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
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
