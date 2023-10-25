import { useState } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesSearch } from "../../Redux/Slices/MoviesSlice";
//  Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// Components
import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";
//  Select
import Select from "react-select";
// CSS
import "./Search.css";
const Search = () => {
  const [searchVal, setSearchVal] = useState("");
  const [selectedVal, setSelectedVal] = useState(null);
  const options = [
    { value: "movie", label: "Movie" },
    { value: "tv", label: "Tv Show" },
    { value: "person", label: "Celebs" },
  ];
  const searchFunc = () => {
    dispatch(getAllMoviesSearch(searchVal));
  };
  const { searchMoviesList, loading, error } = useSelector(
    (state) => state.moviesSlice
  );
  const dispatch = useDispatch();
  const filterItems = (e) => {
    if (e) {
      setSelectedVal({ ...e });
    } else {
      setSelectedVal(null);
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-12 col-md-8 col-lg-10 d-flex ">
            <button
              onClick={searchFunc}
              className=" border-0 bg-white me-3 fs-4 "
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <input
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Find movies TV Shows documentary and more..."
              type="text"
              className=" w-100 border-0 input-focus"
            />
          </div>
          <div className="col-sm-12 col-md-8 col-lg-2 d-flex justify-content-end ">
            <Select
              className="w-100"
              isClearable={true}
              value={selectedVal}
              onChange={(e) => filterItems(e)}
              options={options}
            />
          </div>
        </div>
        {loading ? (
          <div style={{ marginTop: "100px" }} className="row ">
            <Spinner />
          </div>
        ) : error ? (
          <h1 className="text-center display-1 my-5">{error}</h1>
        ) : (
          <div className="row my-5 g-4">
            <h2 className="fw-medium display-4 mb-5 text-center ">
              Search Results
            </h2>
            {searchMoviesList.map((movie) => {
              if (selectedVal) {
                if (selectedVal.value === movie.media_type) {
                  // console.log(selectedVal.value);
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

export default Search;
