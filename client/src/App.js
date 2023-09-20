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
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([])

  useEffect(() => {
    fetchUser()
    fetchProductions()
  }, []);

  const fetchProductions = () => {
    fetch("/productions")
      .then((res) => res.json())
      .then(setProductions);
  };

  const fetchUser = () => {
    fetch("/authorized")
      .then(resp => {
        console.log(resp)
        if(resp.ok){
          resp.json().then(user => setUser(user))
        } else {
          resp.json().then(err => setErrors(err))
        }
      })
      // .then(data => console.log(data))
    /*
    Create a GET fetch that goes to '/authorized'
      - If returned successfully set the user to state and fetch our productions
      - else set the user in state to Null
    */
  };

  const addProduction = (production) =>
    setProductions((current) => [...current, production]);

  const updateUser = (user) => setUser(user);

  /*
    Restrict access to app
      - If the user is not in state, return JSX and include <Navigation/> and <Authentication updateUser={updateUser}/>
      - Test out our route! Logout and try to visit other pages. Login and try to visit other pages again. Refresh the page and note that you are still logged in! 
  */
  if(!user) return (
    <>
      <Navigation updateUser={updateUser}/>
      <Authentication updateUser={updateUser} />
    </>
  )
  
  return (
    <>
      <Navigation updateUser={updateUser}/>
      <Routes>
        <Route
          path={"/productions/new"}
          element={
            <div>
              <NewProductionForm addProduction={addProduction} />
            </div>
          }
        />
        <Route path={"/productions/:id"} element={<ProductionDetail />} />
        <Route
          path={"/authentication"}
          element={
            <div>
              <Authentication updateUser={updateUser}/>
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
    </>
  );
}

export default App;
