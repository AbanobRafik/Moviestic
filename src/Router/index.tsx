import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import People from "../pages/People";
import TV from "../pages/TV";
import Movies from "../pages/Movies";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import ProtectedRoutes from "../components/auth/ProtectedRoutes";
import Register from "../pages/Register";
import userData from "../components/useData";
import ErrorPage from "../pages/ErrorPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
          <Route
            index
            element={
              <ProtectedRoutes isAllowed={userData} redirectPath="/login">
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="home"
            element={
              <ProtectedRoutes isAllowed={userData} redirectPath="/login">
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="People"
            element={
              <ProtectedRoutes isAllowed={userData} redirectPath="/login">
                <People />
              </ProtectedRoutes>
            }
          />
          <Route
            path="movies"
            element={
              <ProtectedRoutes isAllowed={userData} redirectPath="/login">
                <Movies />
              </ProtectedRoutes>
            }
          />
          <Route
            path="tv"
            element={
              <ProtectedRoutes isAllowed={userData} redirectPath="/login">
                <TV />
              </ProtectedRoutes>
            }
          />
          <Route
            path="login"
            element={
              <ProtectedRoutes isAllowed={!userData} redirectPath="/home">
                <Login />
              </ProtectedRoutes>
            }
          />
          <Route
            path="register"
            element={
              <ProtectedRoutes isAllowed={!userData} redirectPath="/home">
                <Register />
              </ProtectedRoutes>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
