import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getMovieDetails } from "../../Redux/Slices/MoviesSlice";
//  CSS
import "./Movie-details.css";
// Npm Circular progress
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
//  Fontawesome
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../Spinner/Spinner";
const MovieDetails = () => {
  const { id, media_type } = useParams();
  const dispatch = useDispatch();
  const { movieDetails, error, loading } = useSelector(
    (state) => state.moviesSlice
  );
  useEffect(() => {
    dispatch(getMovieDetails({ id, media_type }));
  }, []);
  const date = new Date(
    (movieDetails.first_air_date && movieDetails?.first_air_date) ||
      movieDetails.release_date
  );
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { hours, minutes };
  };
  return (
    <>
      {loading ? (
        <div style={{ marginTop: "300px" }} className="row ">
          <Spinner />
        </div>
      ) : error ? (
        <h1 className="text-center display-1 my-5">{error}</h1>
      ) : (
        <div className="card border-0 ">
          <img
            src={` https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movieDetails.backdrop_path}`}
            className="card-img filter d-none d-md-block"
            alt="..."
          />
          <div className="card-img-overlay ">
            <div className="container my-5  ">
              <div className="row ">
                <div className="card mb-3 border-0 bg-transparent text-black">
                  <div className="row g-0">
                    <div className="col-sm-12 col-md-12 col-lg-4 d-flex justify-content-center">
                      <a
                        target="_blank"
                        href={`https://www.imdb.com/title/${movieDetails.imdb_id}/`}
                      >
                        <img
                          src={
                            movieDetails.poster_path
                              ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                              : `https://tse1.mm.bing.net/th?id=OIP.VJHJCt5QEPXByQn7u_XsOAHaHa&pid=Api&P=0&h=220`
                          }
                          className="img-fluid rounded-3 "
                          alt="img"
                        />
                      </a>
                    </div>
                    <div className=" col-sm-12 col-md-12 col-lg-8 ">
                      <div className="card-body rounded-3 ms-1 bg-light bg-opacity-25 text-black">
                        <p className="card-text fw-bold">{`${date.getFullYear()}`}</p>
                        <h5 className="card-title fs-3  fw-bold">
                          {movieDetails.original_title ||
                            movieDetails.original_name}
                          <span className="fs-4 fw-medium ms-3">
                            {movieDetails.tagline &&
                              `(${movieDetails.tagline})`}
                          </span>
                        </h5>

                        <p
                          style={{ width: "90px" }}
                          className="card-text lead fw-bold "
                        >
                          <CircularProgressbar
                            className=""
                            value={`${movieDetails.vote_average * 10}`}
                            text={`${movieDetails.vote_average?.toFixed(1)}`}
                            styles={buildStyles({
                              pathColor:
                                movieDetails.vote_average >= 7
                                  ? "#20c320"
                                  : movieDetails.vote_average >= 5
                                  ? "#e9e900"
                                  : "red",
                              textColor: "black",
                              trailColor: "#ebebce",
                              backgroundColor: "black",
                            })}
                          />
                        </p>
                        <p className="card-text lead fw-bold rounded-4 px-1 ">
                          Vote Count : {movieDetails.vote_count}
                        </p>
                        <p className="card-text lead fw-bold fs-5 overflow-hidden ">
                          {movieDetails.overview}
                        </p>
                        <div className=" ">
                          {movieDetails.genres?.map((genere) => (
                            <span
                              key={genere.id}
                              className="me-1 px-3 py-2 bg-warning rounded-pill "
                            >
                              {genere.name}
                            </span>
                          ))}
                          <a
                            target="_blank"
                            href={`https://www.imdb.com/title/${movieDetails.imdb_id}/`}
                            className="w-75 lead fw-bold fs-4 d-block text-black text-decoration-none hover-anchor"
                          >
                            <FontAwesomeIcon
                              className="fs-4 mt-4"
                              icon={faCirclePlay}
                            />{" "}
                            <span>
                              WATCH THE TRAILER
                              {movieDetails.runtime &&
                                ` | ${
                                  toHoursAndMinutes(movieDetails.runtime).hours
                                }h ${
                                  toHoursAndMinutes(movieDetails.runtime)
                                    .minutes
                                }min`}
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
