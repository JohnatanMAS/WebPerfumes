import React from "react";
import { Perfume, formatPrice } from "../data";

type Props = {
  perfume: Perfume;
  onAdd: (perfume: Perfume) => void;
};

export default function ProductCard({ perfume, onAdd }: Props): JSX.Element {
  return (
    <article key={perfume.id} className="card">
      <div className="card-top">
        <span className="label">{perfume.category}</span>
        <span className="heart">♡</span>
      </div>
      {perfume.image ? (
        <img src={perfume.image} alt={perfume.name} className="image-swatch" />
      ) : (
        <div className="image-swatch" />
      )}
      <div className="card-body">
        <h2>{perfume.name}</h2>
        <p className="description">{perfume.description}</p>
      </div>
      <div className="card-footer">
        <span>{formatPrice(perfume.price)}</span>
        <button type="button" onClick={() => onAdd(perfume)}>
          Adicionar
        </button>
      </div>
    </article>
  );
}
