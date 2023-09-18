import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import "./App.css";

function App() {
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
          element={<div>Home Component</div>}
        />
        <Route path={"*"} element={<div>Not Found Page</div>} />
      </Routes>
    </div>
  );
}

export default App;
