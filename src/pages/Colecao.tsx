import { Link } from "react-router-dom";
import { perfumes } from "../data";
import ProductCard from "../components/ProductCard";

function Colecao(): JSX.Element {
  return (
    <div className="page-shell">
      <div className="app">
        <section className="promo-bar">
          <p>Aproveite 5% de desconto exclusivo no site</p>
        </section>

        <header className="topbar">
          <div className="brand-logo">Maju Perfumes</div>
          <nav className="desktop-nav">
            <Link to="/">Home</Link>
            <Link to="/colecao">Coleção</Link>
            <Link to="/feminino">Feminino</Link>
            <Link to="/masculino">Masculino</Link>
          </nav>
        </header>

        <main>
          <section className="hero">
            <div className="hero-copy">
              <p className="hero-subtitle">Coleção</p>
              <h1>Explore nossa seleção completa</h1>
              <p>Veja todos os perfumes disponíveis e escolha o aroma que combina com você.</p>
              <div className="hero-actions">
                <Link to="/" className="button-secondary">
                  Voltar ao início
                </Link>
              </div>
            </div>
          </section>

          <section className="product-grid" id="colecao">
            {perfumes.map((perfume) => (
              <ProductCard key={perfume.id} perfume={perfume} onAdd={() => undefined} />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

export default Colecao;
