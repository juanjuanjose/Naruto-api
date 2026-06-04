import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import "./index.css";
import Characters from "./pages/Characters/Characters";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <div className="app-shell min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
