import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// CSS
import "./Card.css";
const Card = ({ movie }) => {
  const { poster_path, original_title, original_name, vote_average } = movie;
  const dispatch = useDispatch();

  return (
    <>
      <div className="card border-0 ">
        <Link
          className="hover-container rounded-3 position-relative"
          to={`/movies/${movie.id}/${movie.media_type}`}
        >
          <img
            style={{ objectFit: "cover" }}
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                : `https://tse1.mm.bing.net/th?id=OIP.VJHJCt5QEPXByQn7u_XsOAHaHa&pid=Api&P=0&h=220`
            }
            className="card-img-top hover-img rounded-3"
            alt="..."
          />
          <div
            style={{ top: "0", right: "0" }}
            className="bg-primary position-absolute text-light p-2 rounded-3 "
          >
            {vote_average?.toFixed(1)}
          </div>
        </Link>
        <div className="card-body text-center ">
          <h5 className="card-title">{original_title || original_name}</h5>
        </div>
      </div>
    </>
  );
};

export default Card;
