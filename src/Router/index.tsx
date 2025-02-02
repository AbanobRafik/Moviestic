import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import TV from "../pages/TV";
import Movies from "../pages/Movies";
import Layout from "../components/Layout";
import Login from "../pages/login";
import Register from "../pages/register";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="movies" element={<Movies />} />
          <Route path="tv" element={<TV />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
