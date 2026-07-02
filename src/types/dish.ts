export type DishCategory =
  | "starters"
  | "mains"
  | "bakery"
  | "desserts"
  | "beverages";

export type DietType = "veg" | "non-veg";

export interface Dish {
  /** Unique URL-safe identifier, also used to derive default model file names */
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  currency: string;
  diet: DietType;
  category: DishCategory;
  prepTimeMinutes: number;
  ingredients: string[];
  spiceLevel?: 0 | 1 | 2 | 3;
  rating?: number;
  isChefSpecial?: boolean;
  /** Image files live in /public/images */
  image: string;
  /**
   * 3D / AR model files. Replace these paths with your own exported
   * models — see /public/models/README for naming + export guidance.
   */
  model: {
    /** .glb — used by <model-viewer> for web, Android Scene Viewer & WebXR */
    glb: string;
    /** .usdz — used by iOS Quick Look AR */
    usdz: string;
    /** Optional camera orbit override, e.g. "0deg 75deg 1.2m" */
    cameraOrbit?: string;
    /** Optional scale multiplier applied in AR placement */
    arScale?: string;
  };
}
