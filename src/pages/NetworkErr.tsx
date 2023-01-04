import NotFoundImg from "../assets/images/notFound.svg";
import Error from "../components/Error";
const NotFound = () => {
  return <Error img={NotFoundImg} title="Please try again" label="Back home" />;
};

export default NotFound;
