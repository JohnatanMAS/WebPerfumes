import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Perfume, perfumes, categories, formatPrice } from "../data";
import ProductCard from "../components/ProductCard";

interface HomeProps {
  initialSection?: "colecao";
}

interface CartItem extends Perfume {
  quantity: number;
}

function Home({ initialSection }: HomeProps): JSX.Element {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"Ofertas" | "Feminino" | "Masculino" | "Infantil" | "Beleza" | "Novidades">("Ofertas");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialSection === "colecao") {
      document.getElementById("colecao")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [initialSection]);

  const filteredPerfumes = useMemo<Perfume[]>(() => {
    return perfumes.filter((perfume) => {
      const matchesCategory = selectedCategory === "Ofertas" || perfume.category === selectedCategory;
      const matchesSearch = perfume.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const scrollToCategory = (category: "Ofertas" | "Feminino" | "Masculino" | "Infantil" | "Beleza" | "Novidades") => {
    if (category === "Ofertas") {
      document.getElementById("ofertas")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setSelectedCategory(category);
    document.getElementById("colecao")?.scrollIntoView({ behavior: "smooth" });
  };

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
    if (cartItems.length === 0) {
      return;
    }

    setCheckoutMessage("Compra confirmada! Seu pedido será processado em breve.");
  };

  const masculineHighlights = perfumes.filter((perfume) => perfume.category === "Masculino");
  const [highlightIndex, setHighlightIndex] = useState(0);

  const goToPreviousHighlight = (): void => {
    setHighlightIndex((current) => (current - 1 + masculineHighlights.length) % masculineHighlights.length);
  };

  const goToNextHighlight = (): void => {
    setHighlightIndex((current) => (current + 1) % masculineHighlights.length);
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHighlightIndex((current) => (current + 1) % masculineHighlights.length);
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, [masculineHighlights.length]);

  return (
    <div className="page-shell">
      <div className="app">
        <section className="promo-bar">
          <p>Aproveite 5% de desconto exclusivo no site</p>
        </section>

        <header className="topbar">
          <div className="brand-logo">Maju Perfumes</div>

          <nav className="desktop-nav">
            <button type="button" className="nav-link-button" onClick={() => scrollToCategory("Ofertas")}>Ofertas</button>
            <Link to="/feminino">Feminino</Link>
            <Link to="/masculino">Masculino</Link>
            <button type="button" className="nav-link-button" onClick={() => scrollToCategory("Infantil")}>Infantil</button>
            <button type="button" className="nav-link-button" onClick={() => scrollToCategory("Beleza")}>Beleza</button>
            <button type="button" className="nav-link-button" onClick={() => scrollToCategory("Novidades")}>Novidades</button>
          </nav>

          <div className="search-area">
            <input
              id="search-input"
              ref={searchInputRef}
              type="text"
              placeholder="Buscar perfume masculino"
              value={search}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
            />
            <button
              type="button"
              className="search-button"
              aria-label="Buscar"
              onClick={() => searchInputRef.current?.focus()}
            >
              🔍
            </button>
          </div>

          <div className="top-icons">
            <button type="button" aria-label="Perfil">
              👤
            </button>
            <button type="button" aria-label="Favoritos">
              ♡
            </button>
            <button
              type="button"
              className="checkout-button"
              aria-label="Carrinho de compras"
              onClick={() => {
                if (cartItems.length > 0) {
                  setCheckoutOpen(true);
                  setCheckoutMessage("");
                } else {
                  setCheckoutOpen(false);
                  setCheckoutMessage("");
                }
              }}
            >
              🛍️
              {cartCount > 0 ? <span className="cart-badge">{cartCount}</span> : null}
            </button>
          </div>
        </header>

        <main>
          <section className="hero">
            <div className="hero-copy">
              <p className="hero-subtitle">Destaques</p>
              <h1>a gente traduz o que o seu aroma quer</h1>
              <p>Explore os perfumes em destaque e encontre o seu próximo favorito na coleção masculina.</p>
              <div className="hero-actions">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/colecao");
                  }}
                >
                  Ver Coleção
                </button>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-carousel">
                <div className="hero-carousel-track" style={{ transform: `translateX(-${highlightIndex * 100}%)` }}>
                  {masculineHighlights.map((perfume) => (
                    <div key={perfume.id} className="hero-carousel-slide">
                      <img src={perfume.image ?? "/images/destaque.webp"} alt={perfume.name} />
                      <div className="hero-carousel-caption">
                        <span>#{perfume.id}</span>
                        <strong>{perfume.name}</strong>
                      </div>
                    </div>
                  ))}
                </div>

                <button type="button" className="hero-carousel-control prev" onClick={goToPreviousHighlight} aria-label="Slide anterior">
                  ←
                </button>
                <button type="button" className="hero-carousel-control next" onClick={goToNextHighlight} aria-label="Próximo slide">
                  →
                </button>
              </div>
              <div className="hero-carousel-indicators">
                {masculineHighlights.map((perfume, index) => (
                  <button
                    key={perfume.id}
                    type="button"
                    className={index === highlightIndex ? "indicator active" : "indicator"}
                    aria-label={`Ver ${perfume.name}`}
                    onClick={() => setHighlightIndex(index)}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="feature-strip">
            <div>
              <strong>Frete grátis</strong>
              <span>acima de R$ 279</span>
            </div>
            <div>
              <strong>Cupons ativos</strong>
              <span>aproveite promoções</span>
            </div>
            <div>
              <strong>Entrega rápida</strong>
              <span>em até 24h</span>
            </div>
          </section>

          <section className="filters" id="colecao">
            <div className="filter-header">
              <div>
                <p className="section-label">Coleção</p>
                <h2>O melhor da perfumaria para você</h2>
              </div>
              <p className="section-note">Navegue entre categorias e encontre o aroma perfeito.</p>
            </div>

            <div className="category-list">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={selectedCategory === category ? "active" : ""}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          <section className="product-grid" id="ofertas">
            {filteredPerfumes.length === 0 ? (
              <div className="empty">Nenhum perfume encontrado na categoria selecionada.</div>
            ) : (
              filteredPerfumes.map((perfume) => (
                <ProductCard key={perfume.id} perfume={perfume} onAdd={handleAddToCart} />
              ))
            )}
          </section>
        </main>

        <footer className="footer" id="contato">
          <div>
            <h3>Maju Perfumes</h3>
            <p>Beleza e sofisticação em cada aroma, pronta para chegar até você.</p>
          </div>
          <div className="footer-links">
            <a href="#colecao">Coleção</a>
            <a href="#ofertas">Perfumes</a>
            <a href="#contato">Contato</a>
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
                  <button type="button" onClick={() => handleRemoveFromCart(item.id)}>
                    ✕
                  </button>
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

        <button type="button" className="checkout-confirm" onClick={handleCheckout} disabled={cartItems.length === 0}>
          Confirmar compra
        </button>
        {checkoutMessage ? <p className="checkout-message">{checkoutMessage}</p> : null}
      </aside>
    </div>
  );
}

export default Home;
