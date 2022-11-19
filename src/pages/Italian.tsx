import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQueryClient } from "react-query";
import styled from "styled-components";

const Italian = () => {
  const [italian, setItalian] = useState([]);

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
    <div>
      <Grid>
        {italian.map((item: any) => (
          <Box key={item.id}>
            <img alt={item.title} src={item.image} loading="lazy" />
            <h3>{item.title}</h3>
          </Box>
        ))}
      </Grid>
    </div>
  );
};

export default Italian;
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
