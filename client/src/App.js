import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import "./App.css";
import Authentication from "./components/Authentication/Authentication";
import NewProductionForm from "./components/NewProductionForm/NewProductionForm";
import ProductionDetail from "./components/ProductionDetail/ProductionDetail";

function App() {
  const [productions, setProductions] = useState([]);

  useEffect(() => {
  //   fetchProductions()
  }, []);

  const fetchProductions = () => {
    fetch("/productions")
      .then((res) => res.json())
      .then(setProductions);
  };

  const addProduction = (production) =>
    setProductions((current) => [...current, production]);

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route
          path={"/productions/new"}
          element={<div><NewProductionForm addProduction={addProduction}/></div>}
        />
        <Route
          path={"/productions/:id"}
          element={<ProductionDetail />}
        />
        <Route
          path={"/authentication"}
          element={
            <div>
              <Authentication />
            </div>
          }
        />
        <Route
          path={"/"}
          element={
            <div>
              <Home productions={productions} />
            </div>
          }
        />
        <Route
          path={"*"}
          element={
            <>
              <h1>Sorry We can't find the Page you're looking for!</h1>
              <h1>404 Not Found</h1>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
