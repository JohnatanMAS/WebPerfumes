import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Colecao from "./pages/Colecao";
import CategoryPage from "./pages/CategoryPage";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/colecao" element={<Colecao />} />
      <Route path="/masculino" element={<CategoryPage category="Masculino" />} />
      <Route path="/feminino" element={<CategoryPage category="Feminino" />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
