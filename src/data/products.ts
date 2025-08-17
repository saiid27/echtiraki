export type Product = {
  id: string;
  name: string;
  short: string;
  priceCents: number;
  currency: "usd";
  description: string;
  cover: string;
};

export const products: Product[] = [
  {
    id: "chatgpt-plus",
    name: "ChatGPT Plus (مقعد)",
    short: "دردشة AI بريميوم",
    priceCents: 499,
    currency: "usd",
    description: "اشتراك شهر واحد ضمن خطة مشتركة.",
    cover: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
  },
  {
    id: "netflix-uhd",
    name: "Netflix UHD (عائلي)",
    short: "مشاهدة 4K HDR",
    priceCents: 799,
    currency: "usd",
    description: "مقعد شهر واحد.",
    cover: "https://cdn-icons-png.flaticon.com/512/732/732228.png",
  },
  {
    id: "spotify-premium",
    name: "Spotify Premium (عائلي)",
    short: "موسيقى بلا إعلانات",
    priceCents: 399,
    currency: "usd",
    description: "مقعد شهر واحد.",
    cover: "https://cdn-icons-png.flaticon.com/512/3670/3670225.png",
  },
];
