import { useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import "./App.css";

function App() {
  const [productions, setProductions] = useState([]);

  useEffect(() => {
    fetchProductions()
  }, []);

  const fetchProductions = () => {
    fetch("/productions")
      .then((res) => res.json())
      .then(setProductions);
  };

  const addProduction = (production) => setProductions(current => [...current, production])

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route
          path={"/productions/new"}
          element={<div>Productions New Form Component</div>}
        />
        <Route
          path={"/productions/:id"}
          element={<div>Production Detail Page</div>}
        />
        <Route
          path={"/authentication"}
          element={<div>Authentication Component</div>}
        />
        <Route
          path={"/"}
          element={
            <div>
              <Home productions={productions}/>
            </div>
          }
        />
        <Route path={"*"} element={<div>Not Found Page</div>} />
      </Routes>
    </div>
  );
}

export default App;
