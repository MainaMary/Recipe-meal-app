import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signup/SignupPage";
import Cuisines from "./pages/Cuisines";
import LoginPage from "./pages/login/LoginPage";
import Home from "./pages/Home";
import Recipe from "./pages/recipes/Recipe";
import Meal from "./pages/Meal";
import AllCuisines from "./pages/AllCuisines";
import SearchResults from "./pages/SearchResults";
import Diet from "./pages/diet/Diet";
import UpdateProfile from "./pages/updateProfile/UpdateProfile";
import ForgotPassword from "./pages/forgot/ForgotPassword";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./routes/ProtectedRoutes";

const routes = [
  {
    path: "/",
    component: <SignupPage />,
    protectedR: false,
  },
  {
    path: "/login",
    component: <LoginPage />,
    protectedR: false,
  },
  {
    path: "/home",
    component: <Home />,
    protectedR: true,
  },

  {
    path: "/recipe",
    component: <Recipe />,
    protectedR: true,
  },
  {
    path: `/recipe/:id`,
    component: <Meal />,
    protectedR: true,
  },
  {
    path: "/cuisines",
    component: <Cuisines />,
    protectedR: true,
  },
  {
    path: `/cuisines/:cuisine`,
    component: <AllCuisines />,
    protectedR: true,
  },
  {
    path: `/search/:query`,
    component: <SearchResults />,
    protectedR: true,
  },
  {
    path: `/diet/:id`,
    component: <Diet />,
    protectedR: true,
  },
  {
    path: `/updateProfile`,
    component: <UpdateProfile />,
    protectedR: true,
  },
  {
    path: `/forgotPassword`,
    component: <ForgotPassword />,
    protectedR: false,
  },
  {
    path: "*",
    component: <NotFound />,
    protectedR: false,
  },
];
const MainRoutes = () => {
  return (
    <Routes>
      {routes.map(
        ({ path, component, protectedR }, index) => (
          <Route key={index} path={path} element={component} />
        )
        // {
        //   if (protectedR) {
        //     return (
        //       <Route element={<ProtectedRoutes />}>
        //         <Route key={index} path={path} element={component} />
        //       </Route>
        //     );
        //   } else {
        //     return <Route key={index} path={path} element={component} />;
        //   }
        // }
      )}
    </Routes>
  );
};
export default MainRoutes;
