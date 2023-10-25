//  Fontawesome
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//  Select
import Select from "react-select";
// Redux
import {
  getAllMovies,
  getAllMoviesSearch,
} from "../../Redux/Slices/MoviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// Components
import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";
// Routing
import { useNavigate } from "react-router";
// Css
import "./Home.css";
const Home = () => {
  const options = [
    { value: "movie", label: "Movie" },
    { value: "tv", label: "Tv Show" },
    { value: "person", label: "Celebs" },
  ];

  const [searchVal, setSearchVal] = useState("");

  const { moviesList, loading, error } = useSelector(
    (state) => state.moviesSlice
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllMovies());
  }, []);

  const searchFunc = () => {
    dispatch(getAllMoviesSearch(searchVal));
    navigate(`/search-results`);
  };

  const [selectedVal, setSelectedVal] = useState(null);
  const filterItems = (e) => {
    // console.log(e);
    if (e) {
      setSelectedVal({ ...e });
    } else {
      setSelectedVal(null);
    }
  };
  return (
    <>
      <div className="container my-5 vh-100">
        <div className="row">
          <div className="col-sm-12 col-md-8 col-lg-10 d-flex ">
            <button
              onClick={searchFunc}
              className=" border-0 bg-white me-4 fs-4 "
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <input
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Find movies TV Shows documentary and more..."
              type="text"
              className="w-100 border-0 outline-0 input-focus"
            />
          </div>
          <div className="col-sm-12 col-md-8 col-lg-2 d-flex justify-content-end ">
            <Select
              isClearable={true}
              value={selectedVal}
              onChange={(e) => filterItems(e)}
              className="w-100"
              options={options}
            />
          </div>
        </div>
        {loading ? (
          <div style={{ marginTop: "300px" }} className="row ">
            <Spinner />
          </div>
        ) : error ? (
          <h1 className="text-center display-1 my-5">{error}</h1>
        ) : (
          <div className="row my-5 g-4">
            <h2 className="fw-medium display-6 mb-4">
              Latest Movies & Tv Shows
            </h2>
            {moviesList.map((movie) => {
              if (selectedVal) {
                if (selectedVal.value === movie.media_type) {
                  return (
                    <div key={movie.id} className="col-6 col-md-4 col-lg-3">
                      <Card movie={movie} />
                    </div>
                  );
                }
              } else {
                return (
                  <div key={movie.id} className="col-6 col-md-4 col-lg-3">
                    <Card movie={movie} />
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
