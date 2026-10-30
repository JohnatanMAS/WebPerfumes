export type Category = "Ofertas" | "Feminino" | "Masculino" | "Infantil" | "Beleza" | "Novidades";

export interface Perfume {
  id: number;
  name: string;
  description: string;
  /** price in cents (e.g. R$ 159,90 === 15990) */
  price: number;
  category: Category;
  /** optional image path (use `/images/...` in public folder) */
  image?: string;
}

export const categories: Category[] = ["Ofertas", "Feminino", "Masculino", "Infantil", "Beleza", "Novidades"];

export const perfumes: Perfume[] = [
  {
    id: 1,
    name: "Essência Rosa Premium",
    description: "Floral e sofisticado, perfeito para ocasiões especiais.",
    price: 15990,
    category: "Feminino"
  },
  {
    id: 2,
    name: "Madeira Nobre Eau de Parfum",
    description: "Notas amadeiradas com toque de baunilha cremosa.",
    price: 18990,
    category: "Masculino",
    image: "/images/440.webp"
  },
  {
    id: 3,
    name: "Brisa Cítrica Femme",
    description: "Refrescante e leve, ideal para o dia a dia.",
    price: 12990,
    category: "Beleza"
  },
  {
    id: 4,
    name: "Noite de Luxo",
    description: "Atraente e intenso com notas de âmbar e oud.",
    price: 20990,
    category: "Ofertas"
  },
  {
    id: 5,
    name: "Pétala de Jasmim",
    description: "Delicado e chic, com alma floral sofisticada.",
    price: 14990,
    category: "Feminino"
  },
  {
    id: 6,
    name: "Sedução Oriental",
    description: "Envolvente, com especiarias e toque quente.",
    price: 17990,
    category: "Masculino",
    image: "/images/199.webp"
  }
];

// Brand collection - novos produtos masculinos com imagens
perfumes.push(
  {
    id: 7,
    name: "Brand Collection 005",
    description: "Edição masculina da coleção — fougère moderno.",
    price: 17990,
    category: "Masculino",
    image: "/images/005.webp"
  },
  {
    id: 8,
    name: "Brand Collection 387",
    description: "Aroma intenso e marcante para ocasiões especiais.",
    price: 19990,
    category: "Masculino",
    image: "/images/387.webp"
  },
  {
    id: 9,
    name: "Brand Collection 440",
    description: "Versão premium com notas amadeiradas.",
    price: 21990,
    category: "Masculino",
    image: "/images/440.webp"
  },
  {
    id: 10,
    name: "Brand Collection 199",
    description: "Oriental moderno com caráter sofisticado.",
    price: 18990,
    category: "Masculino",
    image: "/images/199.webp"
  },
  {
    id: 11,
    name: "Brand Collection 321",
    description: "Aroma fresco e contemporâneo.",
    price: 15990,
    category: "Masculino",
    image: "/images/321.webp"
  },
  {
    id: 12,
    name: "Brand Collection 084",
    description: "Assinatura marcante para o dia a dia.",
    price: 16990,
    category: "Masculino",
    image: "/images/084.webp"
  }
);

export const formatPrice = (valueInCents: number): string => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valueInCents / 100);
};
