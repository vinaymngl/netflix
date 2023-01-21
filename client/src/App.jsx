import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,

} from "react-router-dom";
function App() {
  const user = true;
  return (
    <Router>
      <Routes>
        <Route path="/register" element={!user ? <Register /> : <Home />} />
        <Route path="/login" element={!user ? <Login /> : <Home />} />
        <Route exact path="/" element={user ? <Home /> : <Register />} />
        {user &&<>
          <Route path="/movies" element={<Home type="movies" />} />
          <Route path="/series" element={<Home type="series" />} />
          <Route path="/watch" element={<Watch />} />
        </>}
      </Routes>
    </Router>

  );
}

export default App;
