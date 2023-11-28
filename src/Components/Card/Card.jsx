import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// CSS
import "./Card.css";
const Card = ({ movie }) => {
  const { poster_path, original_title, original_name, vote_average } = movie;
  const dispatch = useDispatch();

  return (
    <>
      <div className="card border-0 h-100">
        <div
          style={{ height: "75%" }}
          className=" position-relative hover-container rounded-3"
        >
          <Link className="" to={`/movies/${movie.id}/${movie.media_type}`}>
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                  : `https://tse4.mm.bing.net/th?id=OIP.sMerUYr1YD9aHIEPsepiTgAAAA&pid=Api&P=0&h=220`
              }
              className="card-img-top hover-img rounded-3 d-block img-fluid h-100 w-100 object-fit-cover "
              alt="..."
            />

            <div
              style={{ top: "0", right: "0" }}
              className="bg-primary position-absolute text-light p-2 rounded-3 "
            >
              {vote_average > 0 ? vote_average?.toFixed(1) : "0.0"}
            </div>
          </Link>
        </div>
        <div className="card-body text-center h-25 ">
          <h5 className="card-title">{original_title || original_name}</h5>
        </div>
      </div>
    </>
  );
};

export default Card;
