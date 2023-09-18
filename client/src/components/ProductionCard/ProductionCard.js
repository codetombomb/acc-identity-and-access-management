import { Link } from "react-router-dom";
import "./styles.css";

const ProductionCard = ({ production }) => {
  const { title, budget, genre, image, id } = production;

  return (
    <li className="production-card" id={id}>
      <Link to={`/productions/${id}`}>
        <div>
          <h2>{title}</h2>
          <p>{genre}</p>
          <p>$ {budget}</p>
        </div>
        <img src={image} alt={`${title} poster`}/>
      </Link>
    </li>
  );
};
export default ProductionCard;
