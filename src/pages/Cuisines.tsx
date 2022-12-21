import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaJava } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { Button } from "../styles/styled";
interface Props {
  cuisine?: string;
}

const Cuisines = ({ cuisine }: Props) => {
  const [italian, setItalian] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal((item) => !item);
  };

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
  }, [italian]);
  const cuisinesType = [
    {
      label: "Italian",
      link: "/cuisines/italian",
      icon: <FaJava />,
    },
    {
      label: "African",
      link: "/cuisines/african",
      icon: <FaJava />,
    },
    {
      label: "American",
      link: "/cuisines/american",
      icon: <FaJava />,
    },
    {
      label: "German",
      link: "/cuisines/german",
      icon: <FaJava />,
    },
    {
      label: "Chinese",
      link: "/cuisines/chinese",
      icon: <FaJava />,
    },
    {
      label: "Mexican",
      link: "/cuisines/mexican",
      icon: <FaJava />,
    },

    {
      label: "British",
      link: "/cuisines/british",
      icon: <FaJava />,
    },
    {
      label: "Spanish",
      link: "/cuisines/spanish",
      icon: <FaJava />,
    },
  ];
  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    navigate(`/recipe/${id}`);
  };
  return (
    <>
      <Navbar />

      <CuisineWrap>
        {cuisinesType.map((item: any) => (
          <ItemWrapper>
            <Path to={item.link}>
              <FaJava />
              <h4>{item.label}</h4>
            </Path>
          </ItemWrapper>
        ))}
        <Container>
          <Button onClick={handleModal}>Get meal plan</Button>
        </Container>
      </CuisineWrap>
      <Grid>
        {italian.map((item: any) => (
          <Card key={item.id}>
            <Title>{item.title}</Title>
            <Image alt={item.title} src={item.image} loading="lazy" />

            <Button onClick={() => handleNavigate(item.id)}>See more</Button>
          </Card>
        ))}
      </Grid>
      <Modal openModal={openModal} handleModal={handleModal} />
    </>
  );
};

export default Cuisines;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
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
  place-items: center;
  text-align: center;
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
const CuisineWrap = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const ItemWrapper = styled.div`
  @media screen and (max-width: 768px) {
    text-align: start;
    margin: 4px 0;
    width: 100%;
    box-shadow: var(--boxShadow);
    border-radius: var(--borderRadius);
  }
`;

const Container = styled.div`
  width: 40%;
  text-align: right;
  padding: 0px 32px;
  @media screen and (max-width: 768px) {
    display: block;
    width: 100%;
    margin: 16px 0;
  }
`;
const Path = styled(NavLink)`
  text-decoration: none;
  color: #000;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  &.active {
    color: orange;
  }
  ,
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
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
