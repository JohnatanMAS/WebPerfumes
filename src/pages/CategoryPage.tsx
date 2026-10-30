import { Link, useNavigate } from "react-router-dom";
import { Perfume, perfumes, formatPrice } from "../data";
import ProductCard from "../components/ProductCard";
import { useState } from "react";

interface CategoryPageProps {
  category: "Masculino" | "Feminino";
}

interface CartItem extends Perfume {
  quantity: number;
}

function CategoryPage({ category }: CategoryPageProps): JSX.Element {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const categoryProducts = perfumes.filter((perfume) => perfume.category === category);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotalCents = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleAddToCart = (perfume: Perfume): void => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === perfume.id);
      if (existing) {
        return current.map((item) => (item.id === perfume.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...current, { ...perfume, quantity: 1 }];
    });
    setCheckoutOpen(true);
    setCheckoutMessage("");
  };

  const handleRemoveFromCart = (id: number): void => {
    setCartItems((current) => {
      const updatedItems = current.filter((item) => item.id !== id);
      if (updatedItems.length === 0) {
        setCheckoutOpen(false);
        setCheckoutMessage("");
      }
      return updatedItems;
    });
  };

  const handleCheckout = (): void => {
    if (cartItems.length === 0) return;
    setCheckoutMessage("Compra confirmada! Seu pedido será processado em breve.");
  };

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
            <Link to="/masculino">Masculino</Link>
            <Link to="/feminino">Feminino</Link>
          </nav>
        </header>

        <main>
          <section className="hero">
            <div className="hero-copy">
              <p className="hero-subtitle">{category}</p>
              <h1>Perfumes {category.toLowerCase()}</h1>
              <p>Descubra fragrâncias selecionadas para a linha {category.toLowerCase()}.</p>
              <div className="hero-actions">
                <button type="button" onClick={() => navigate("/")}>Voltar ao início</button>
              </div>
            </div>
          </section>

          <section className="product-grid" id="colecao">
            {categoryProducts.map((perfume) => (
              <ProductCard key={perfume.id} perfume={perfume} onAdd={handleAddToCart} />
            ))}
          </section>
        </main>

        <footer className="footer" id="contato">
          <div>
            <h3>Maju Perfumes</h3>
            <p>Beleza e sofisticação em cada aroma, pronta para chegar até você.</p>
          </div>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/colecao">Coleção</Link>
          </div>
        </footer>
      </div>

      <aside className={`side-window ${checkoutOpen ? "open" : ""}`}>
        <div className="side-window-header">
          <h3>Resumo da compra</h3>
          <span>{cartCount > 0 ? `${cartCount} item${cartCount > 1 ? "s" : ""}` : "Vazio"}</span>
        </div>

        {cartItems.length === 0 ? (
          <p>Adicione perfumes para ver o valor e confirmar sua compra.</p>
        ) : (
          <>
            <div className="checkout-items">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item">
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.quantity}x · {formatPrice(item.price)}</p>
                  </div>
                  <button type="button" onClick={() => handleRemoveFromCart(item.id)}>✕</button>
                </div>
              ))}
            </div>
            <div className="checkout-summary">
              <div>
                <span>Subtotal</span>
                <strong>{formatPrice(cartTotalCents)}</strong>
              </div>
              <div>
                <span>Frete</span>
                <strong>Grátis</strong>
              </div>
            </div>
          </>
        )}

        <button type="button" className="checkout-confirm" onClick={handleCheckout} disabled={cartItems.length === 0}>Confirmar compra</button>
        {checkoutMessage ? <p className="checkout-message">{checkoutMessage}</p> : null}
      </aside>
    </div>
  );
}

export default CategoryPage;
