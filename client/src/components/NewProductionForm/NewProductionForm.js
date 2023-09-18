import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewProductionForm = ({ addProduction }) => {
  const navigate = useNavigate();
  const [productionData, setProductionData] = useState({
    title: "",
    genre: "",
    budget: "",
    image: "",
    director: "",
    description: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const productionDataCopy = { ...productionData };
    productionDataCopy[name] = value;
    setProductionData(productionDataCopy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productionData),
    };

    fetch("/productions", config).then((res) => {
      if (res.ok) {
        res.json().then((production) => {
          addProduction(production);
          navigate(`/productions/${production.id}`);
        });
      }
    });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>Title </label>
        <input
          type="text"
          name="title"
          value={productionData.title}
          onChange={handleChange}
          required
        />

        <label> Genre</label>
        <input
          type="text"
          name="genre"
          value={productionData.genre}
          onChange={handleChange}
          required
        />

        <label>Budget</label>
        <input
          type="number"
          name="budget"
          value={productionData.budget}
          onChange={handleChange}
          required
        />

        <label>Image</label>
        <input
          type="text"
          name="image"
          value={productionData.image}
          onChange={handleChange}
          required
        />

        <label>Director</label>
        <input
          type="text"
          name="director"
          value={productionData.director}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          type="text"
          rows="4"
          cols="50"
          name="description"
          value={productionData.description}
          onChange={handleChange}
          required
        />

        <input type="submit" />
      </form>
    </div>
  );
};

export default NewProductionForm;
