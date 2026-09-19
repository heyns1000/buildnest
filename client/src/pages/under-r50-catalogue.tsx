import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  icon: string;
}

const products: Product[] = [
  { id: 'p1', name: 'White Bread Loaf', category: 'Bakery', price: 16.99, unit: '700g', icon: '🍞' },
  { id: 'p2', name: 'Fresh Milk', category: 'Dairy', price: 22.99, unit: '1L', icon: '🥛' },
  { id: 'p3', name: 'Free Range Eggs', category: 'Dairy', price: 34.99, unit: '6-pack', icon: '🥚' },
  { id: 'p4', name: 'Rusks — Original', category: 'Bakery', price: 29.99, unit: '500g', icon: '🍪' },
  { id: 'p5', name: 'Rooibos Tea', category: 'Pantry', price: 39.99, unit: '80 tags', icon: '🍵' },
  { id: 'p6', name: 'Instant Coffee', category: 'Pantry', price: 44.99, unit: '100g', icon: '☕' },
  { id: 'p7', name: 'Brown Bread Loaf', category: 'Bakery', price: 18.49, unit: '700g', icon: '🍞' },
  { id: 'p8', name: 'Cheddar Cheese', category: 'Dairy', price: 47.99, unit: '250g', icon: '🧀' },
  { id: 'p9', name: 'Baked Beans', category: 'Pantry', price: 17.99, unit: '410g', icon: '🫘' },
  { id: 'p10', name: 'Tomato Mix', category: 'Pantry', price: 21.99, unit: '400g', icon: '🍅' },
  { id: 'p11', name: 'Maize Meal', category: 'Pantry', price: 32.99, unit: '2.5kg', icon: '🌽' },
  { id: 'p12', name: 'White Rice', category: 'Pantry', price: 42.99, unit: '2kg', icon: '🍚' },
  { id: 'p13', name: 'Bananas', category: 'Fresh Produce', price: 24.99, unit: 'per kg', icon: '🍌' },
  { id: 'p14', name: 'Apples', category: 'Fresh Produce', price: 27.99, unit: 'per kg', icon: '🍎' },
  { id: 'p15', name: 'Potatoes', category: 'Fresh Produce', price: 19.99, unit: 'per kg', icon: '🥔' },
  { id: 'p16', name: 'Onions', category: 'Fresh Produce', price: 18.99, unit: 'per kg', icon: '🧅' },
  { id: 'p17', name: 'Bar of Soap', category: 'Household', price: 15.99, unit: '175g', icon: '🧼' },
  { id: 'p18', name: 'Dishwashing Liquid', category: 'Household', price: 26.99, unit: '500ml', icon: '🧽' },
  { id: 'p19', name: 'Toilet Paper 2-Ply', category: 'Household', price: 39.99, unit: '9 rolls', icon: '🧻' },
  { id: 'p20', name: 'Toothpaste', category: 'Household', price: 23.99, unit: '100ml', icon: '🪥' },
  { id: 'p21', name: 'Handy Andy', category: 'Household', price: 28.99, unit: '750ml', icon: '🪣' },
  { id: 'p22', name: 'Colddrink — 2L', category: 'Pantry', price: 29.99, unit: '2L', icon: '🥤' },
  { id: 'p23', name: 'Canned Tuna', category: 'Pantry', price: 33.99, unit: '170g', icon: '🐟' },
  { id: 'p24', name: 'Peanut Butter', category: 'Pantry', price: 41.99, unit: '400g', icon: '🥜' },
  { id: 'p25', name: 'Sunflower Oil', category: 'Pantry', price: 45.99, unit: '750ml', icon: '🌻' },
  { id: 'p26', name: 'Samp & Beans', category: 'Pantry', price: 20.99, unit: '1kg', icon: '🥣' },
  { id: 'p27', name: 'Margarine', category: 'Dairy', price: 32.99, unit: '500g', icon: '🧈' },
  { id: 'p28', name: 'Yoghurt', category: 'Dairy', price: 14.99, unit: '140g', icon: '🍦' },
  { id: 'p29', name: 'Frozen Mixed Veg', category: 'Frozen', price: 24.99, unit: '1kg', icon: '🥦' },
  { id: 'p30', name: 'Frozen Chips', category: 'Frozen', price: 34.99, unit: '1kg', icon: '🍟' },
];

const formatPrice = (price: number) => `R${price.toFixed(2)}`;

export default function UnderR50Catalogue() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(products.map((p) => p.category)))],
    []
  );

  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? products
        : products.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="animated-grid-bg min-h-screen" data-testid="under-r50-catalogue">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="text-center mb-10" data-testid="catalogue-hero">
          <Badge className="mb-4 bg-yellow-400/20 text-yellow-300 border-yellow-400/30">
            🛒 FRUITFUL SHOPS (PTY) LTD
          </Badge>
          <h1 className="font-orbitron text-4xl sm:text-5xl font-bold text-faa-yellow mb-4">
            UNDER R50 CATALOGUE
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Everyday essentials, all priced under R50. Fresh produce, pantry
            staples, household basics — quality you can count on at prices that
            make sense.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8" data-testid="catalogue-filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-faa-yellow text-black shadow-lg'
                  : 'bg-faa-card text-gray-300 border border-faa-border hover:border-faa-yellow/50'
              }`}
              data-testid={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {category}
              {category !== 'All' && (
                <span className="ml-1 opacity-60">
                  ({products.filter((p) => p.category === category).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8"
          data-testid="catalogue-grid"
        >
          {filtered.map((product) => (
            <div
              key={product.id}
              className="card-hover bg-faa-card border border-faa-border rounded-lg p-5"
              data-testid={`product-${product.id}`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{product.icon}</span>
                <Badge className="bg-green-400/20 text-green-400 border-green-400/30 text-xs">
                  UNDER R50
                </Badge>
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">{product.name}</h3>
              <p className="text-gray-500 text-xs mb-4">
                {product.category} · {product.unit}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-orbitron text-faa-yellow font-bold text-lg">
                  {formatPrice(product.price)}
                </span>
                <button className="action-button px-4 py-1.5 rounded-full text-xs font-semibold">
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-faa-card border border-faa-border rounded-lg p-6 text-center mb-8">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="font-orbitron text-2xl font-bold text-faa-yellow">
                {filtered.length}
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-wide">
                Items Listed
              </div>
            </div>
            <div>
              <div className="font-orbitron text-2xl font-bold text-apple-green">
                {formatPrice(Math.min(...filtered.map((p) => p.price)))}
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-wide">
                Lowest Price
              </div>
            </div>
            <div>
              <div className="font-orbitron text-2xl font-bold text-apple-blue">
                {categories.length - 1}
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-wide">
                Categories
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/">
            <button className="text-gray-400 hover:text-faa-yellow text-sm transition-colors">
              ← Back to BuildNest Console
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
