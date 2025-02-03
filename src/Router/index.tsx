import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import TV from "../pages/TV";
import Movies from "../pages/Movies";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import ProtectedRoutes from "../components/auth/ProtectedRoutes";
import Register from "../pages/register";

function Router() {
  const isLoggedin = false;
  const data = isLoggedin ? { email: "abanob@ex.com" } : null;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="home"
            element={
              <ProtectedRoutes
                isAllowed={isLoggedin}
                data={data}
                redirectPath="/login"
              >
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="about"
            element={
              <ProtectedRoutes
                isAllowed={isLoggedin}
                data={data}
                redirectPath="/login"
              >
                <About />
              </ProtectedRoutes>
            }
          />
          <Route
            path="movies"
            element={
              <ProtectedRoutes
                isAllowed={isLoggedin}
                data={data}
                redirectPath="/login"
              >
                <Movies />
              </ProtectedRoutes>
            }
          />
          <Route
            path="tv"
            element={
              <ProtectedRoutes
                isAllowed={isLoggedin}
                data={data}
                redirectPath="/login"
              >
                <TV />
              </ProtectedRoutes>
            }
          />
          <Route
            path="login"
            element={
              <ProtectedRoutes
                isAllowed={!isLoggedin}
                data={data}
                redirectPath="/"
              >
                <Login />
              </ProtectedRoutes>
            }
          />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
