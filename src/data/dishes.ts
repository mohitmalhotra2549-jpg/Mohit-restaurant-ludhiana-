import { Dish, DishCategory } from "@/types/dish";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  DISH CATALOG
 * ─────────────────────────────────────────────────────────────────────────
 *  This is the single source of truth for every dish shown on the menu.
 *
 *  🔁 TO REPLACE A 3D MODEL:
 *     1. Drop your new `.glb` and `.usdz` files into `/public/models/`.
 *     2. Update the `model.glb` / `model.usdz` paths below to point to them.
 *     3. Optionally tweak `cameraOrbit` / `arScale` for a better default view.
 *
 *  No other code changes are required — every card, the AR viewer, and the
 *  search/filter UI all read from this array.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const dishes: Dish[] = [
  {
    slug: "chocolate-cake",
    name: "Chocolate Cake",
    shortDescription:
      "Rich layered chocolate sponge with silky ganache and cocoa dust.",
    longDescription:
      "An indulgent tower of dark Belgian chocolate sponge, folded with velvety chocolate mousse and finished with a glossy ganache drip, cocoa dust and hand-tempered chocolate shards.",
    price: 349,
    currency: "₹",
    diet: "veg",
    category: "desserts",
    prepTimeMinutes: 10,
    ingredients: [
      "Belgian dark chocolate",
      "Cocoa powder",
      "Farm-fresh cream",
      "Free-range eggs",
      "Vanilla bean",
      "Sea salt",
    ],
    rating: 4.9,
    isChefSpecial: true,
    image: "/images/chocolate-cake.jpg",
    model: {
      glb: "/models/chocolate-cake.glb",
      usdz: "/models/chocolate-cake.usdz",
      cameraOrbit: "35deg 70deg 1.1m",
      arScale: "auto",
    },
  },
  {
    slug: "grilled-sandwich",
    name: "Grilled Sandwich",
    shortDescription:
      "Toasted sourdough with melted cheese, garden veggies & herb butter.",
    longDescription:
      "Golden-grilled sourdough layered with a trio of melting cheeses, roasted bell peppers, baby spinach and a whisper of truffle herb butter — pressed to a perfect crisp.",
    price: 229,
    currency: "₹",
    diet: "veg",
    category: "starters",
    prepTimeMinutes: 12,
    ingredients: [
      "Sourdough bread",
      "Cheddar & mozzarella",
      "Bell peppers",
      "Baby spinach",
      "Herb butter",
      "Black pepper",
    ],
    rating: 4.6,
    image: "/images/grilled-sandwich.jpg",
    model: {
      glb: "/models/grilled-sandwich.glb",
      usdz: "/models/grilled-sandwich.usdz",
      cameraOrbit: "25deg 75deg 1m",
      arScale: "auto",
    },
  },
  {
    slug: "momos",
    name: "Momos",
    shortDescription:
      "Steamed dumplings filled with spiced vegetables & herbs.",
    longDescription:
      "Delicate hand-pleated dumplings steamed to order, filled with a fragrant mix of vegetables, ginger and spring onion, served with a fiery house-made chilli dip.",
    price: 199,
    currency: "₹",
    diet: "veg",
    category: "starters",
    prepTimeMinutes: 15,
    ingredients: [
      "Refined flour",
      "Cabbage",
      "Carrot",
      "Spring onion",
      "Ginger-garlic",
      "Schezwan chilli sauce",
    ],
    spiceLevel: 2,
    rating: 4.7,
    image: "/images/momos.jpg",
    model: {
      glb: "/models/momos.glb",
      usdz: "/models/momos.usdz",
      cameraOrbit: "15deg 65deg 0.9m",
      arScale: "auto",
    },
  },
  {
    slug: "pastry",
    name: "Pastry",
    shortDescription: "Buttery, flaky croissant pastry baked fresh daily.",
    longDescription:
      "A textbook lamination of French butter and dough, proofed slowly and baked to a deep golden crackle — light, airy and impossibly flaky in every bite.",
    price: 149,
    currency: "₹",
    diet: "veg",
    category: "bakery",
    prepTimeMinutes: 5,
    ingredients: [
      "French butter",
      "Refined flour",
      "Yeast",
      "Milk",
      "Sugar",
      "Sea salt",
    ],
    rating: 4.8,
    image: "/images/pastry.jpg",
    model: {
      glb: "/models/pastry.glb",
      usdz: "/models/pastry.usdz",
      cameraOrbit: "20deg 70deg 0.8m",
      arScale: "auto",
    },
  },
  {
    slug: "zinger-burger",
    name: "Zinger Burger",
    shortDescription:
      "Crispy fried chicken, melted cheese & smoky sauce in a brioche bun.",
    longDescription:
      "A double-marinated, hand-breaded fried chicken fillet stacked with melted cheddar, crisp lettuce and smoky chipotle mayo between a toasted golden brioche bun.",
    price: 279,
    currency: "₹",
    diet: "non-veg",
    category: "mains",
    prepTimeMinutes: 14,
    ingredients: [
      "Chicken fillet",
      "Brioche bun",
      "Cheddar cheese",
      "Lettuce",
      "Chipotle mayo",
      "House spice blend",
    ],
    spiceLevel: 1,
    rating: 4.8,
    isChefSpecial: true,
    image: "/images/zinger-burger.jpg",
    model: {
      glb: "/models/zinger-burger.glb",
      usdz: "/models/zinger-burger.usdz",
      cameraOrbit: "30deg 75deg 1.1m",
      arScale: "auto",
    },
  },
];

export const categories: { id: DishCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "starters", label: "Starters" },
  { id: "mains", label: "Mains" },
  { id: "bakery", label: "Bakery" },
  { id: "desserts", label: "Desserts" },
  { id: "beverages", label: "Beverages" },
];

export function getDishBySlug(slug: string): Dish | undefined {
  return dishes.find((d) => d.slug === slug);
}
