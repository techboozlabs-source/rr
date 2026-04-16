export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Jerseys' | 'Shoes' | 'Accessories';
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 'j1',
    name: 'Lakers Icon Edition Jersey',
    price: 110,
    category: 'Jerseys',
    image: 'https://picsum.photos/seed/lakers/600/800',
    description: 'Authentic LeBron James Lakers jersey with premium sweat-wicking fabric.'
  },
  {
    id: 'j2',
    name: 'Warriors Association Jersey',
    price: 110,
    category: 'Jerseys',
    image: 'https://picsum.photos/seed/warriors/600/800',
    description: 'Stephen Curry Golden State Warriors jersey, classic white edition.'
  },
  {
    id: 's1',
    name: 'Air Jordan 1 Retro High',
    price: 180,
    category: 'Shoes',
    image: 'https://picsum.photos/seed/jordan1/600/800',
    description: 'The legendary silhouette that started it all. Premium leather and iconic style.'
  },
  {
    id: 's2',
    name: 'LeBron 21 "Dragon Pearl"',
    price: 200,
    category: 'Shoes',
    image: 'https://picsum.photos/seed/lebron21/600/800',
    description: 'Engineered for the next generation of greatness. Lightweight and responsive.'
  },
  {
    id: 'a1',
    name: 'Spalding NBA Official Game Ball',
    price: 150,
    category: 'Accessories',
    image: 'https://picsum.photos/seed/basketball/600/800',
    description: 'The gold standard of basketballs. Full-grain leather for ultimate grip.'
  },
  {
    id: 'a2',
    name: 'Nike Elite Basketball Socks',
    price: 14,
    category: 'Accessories',
    image: 'https://picsum.photos/seed/socks/600/800',
    description: 'Cushioned support where you need it most. Stay dry and comfortable.'
  },
  {
    id: 'j3',
    name: 'Celtics Statement Edition',
    price: 115,
    category: 'Jerseys',
    image: 'https://picsum.photos/seed/celtics/600/800',
    description: 'Jayson Tatum Boston Celtics jersey in bold black and green.'
  },
  {
    id: 's3',
    name: 'KD 16 "Aunt Pearl"',
    price: 160,
    category: 'Shoes',
    image: 'https://picsum.photos/seed/kd16/600/800',
    description: 'Kevin Durant signature shoe with multi-directional traction.'
  }
];
