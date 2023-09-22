import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./styles.css";

const ProductionDetail = () => {
  const [production, setProduction] = useState({
    crew_members: [],
    performers_and_roles: [],
  });
  const [error, setError] = useState(null);

  const params = useParams();
  
  useEffect(() => {
    fetch(`/productions/${params.id}`).then((res) => {
      if (res.ok) {
        res.json().then((data) => setProduction(data));
      } else {
        res.json().then((data) => setError(data.error));
      }
    });
  }, []);

  const { id, title, genre, image, description, crew_members } = production;
  if (error) return <h2>{error}</h2>;
  return (
    <li className="card-detail" id={id}>
      <h1>{title}</h1>
      <div className="wrapper">
        <div>
          <h3>Genre:</h3>
          <p>{genre}</p>
          <h3>Description:</h3>
          <p>{description}</p>
          <h2>Cast Members</h2>
          <ul>
            {crew_members.map((crew) => (
              <li key={crew.name}>{`${crew.role} : ${crew.name}`}</li>
            ))}
          </ul>
        </div>
        <img src={image} alt="production image"/>
      </div>
      <button>Buy Ticket</button>
    </li>
  );
};
export default ProductionDetail;
