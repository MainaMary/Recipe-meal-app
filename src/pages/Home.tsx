import React, { useContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import styled from "styled-components";
import { Button } from "../styles/styled";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../components/CustomLoader";
import { UserContext } from "../context/UserContext";

const Home = () => {
  let navigate = useNavigate();
  const userProfile = useContext(UserContext);
  console.log(userProfile.currentUser?.email, "userprofile");
  const fetchRecipes = async () => {
    const res = await axios.get(
      `https://api.spoonacular.com/recipes/random?apiKey=${
        import.meta.env.VITE_APP_API_KEY
      }&number=10`
    );

    return res;
  };

  const { data, isLoading, isSuccess } = useQuery("getRecipes", fetchRecipes);

  const handleImage = (id: string) => {
    navigate(`/recipe/${id}`);
  };
  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            marginTop: "30px",
            justifyContent: "center",
          }}
        >
          <CustomLoader />
        </div>
      ) : (
        <Wrapper>
          <Popular>Popular picks</Popular>
          {isSuccess && (
            <Grid>
              {data?.data?.recipes.map((recipe: any, index: number) => (
                <div key={index}>
                  <Card>
                    <Title>{recipe.title}</Title>
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      loading="lazy"
                    />

                    <Button onClick={() => handleImage(recipe.id)}>
                      See more
                    </Button>
                  </Card>
                </div>
              ))}
            </Grid>
          )}
        </Wrapper>
      )}
    </>
  );
};

export default Home;

const Wrapper = styled.div`
  margin: auto;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  grid-gap: 3rem;
  margin: auto;
`;
const Card = styled.div`
  box-shadow: var(--boxShadow);
  border-radius: var(--borderRadius);
  max-width: 300px;
  width: 100%;
  margin: auto;
  height: 340px;
  padding: 8px 16px;
  margin: 12px 0;

  @media screen and (max-width: 768px) {
    max-width: 400px;
  }
`;
const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: var(--borderRadius);
  margin: 12px 0;
  object-fit: cover;
`;
const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 12px;
  font-weight: 500;
`;
const Popular = styled.h2`
  text-align: center;
  font-size: 24px;
  margin: 0 auto 12px auto;
  font-weight: 500;
`;
// const Image = styled.div`
//   img {
//     width: 100%;
//     height: auto;
//     border-radius: var(--borderRadius);
//     margin: 12px 0;
//     object-fit: cover;
//   }
// `;
// const More = styled.div`
//   position: absolute;
//   background-color: rgba(216, 207, 197, 0.8);
//   text-align: center;
//   width: 75%;
//   color: #000;
//   font-size: 20px;
//   bottom: -10px;
//   padding: 12px 0;
//   left: 0;
//   cursor: pointer;
//   p {
//     color: rgba(244, 159, 47, 0.8);
//     font-weight: bold;
//   }
// `;
const Box = styled.div`
  box-shadow: var(--boxShadow);
  border-radius: var(--borderRadius);
  max-width: 300px;
  width: 100%;
  margin: auto;

  padding: 8px 16px 24px 16px;
  margin: 12px 0;

  @media screen and (max-width: 768px) {
    max-width: 400px;
  }
`;
