import { Route, Routes } from "react-router";
// Components
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home-Page/Home";
import Notfound from "./Components/NotFound-Page/Notfound";
import MovieDetails from "./Components/Movie-Details/MovieDetails";
import Search from "./Components/Search/Search";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id/:media_type" element={<MovieDetails />} />
        <Route path="/search-results" element={<Search />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
