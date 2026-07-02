# 3D Model Assets

This folder holds every dish's 3D model used by the AR menu.

## Current files

| Dish              | GLB (web / Android)        | USDZ (iOS Quick Look)        |
|-------------------|-----------------------------|-------------------------------|
| Chocolate Cake     | `chocolate-cake.glb`        | `chocolate-cake.usdz`         |
| Grilled Sandwich   | `grilled-sandwich.glb`      | `grilled-sandwich.usdz`       |
| Momos              | `momos.glb`                 | `momos.usdz`                  |
| Pastry             | `pastry.glb`                | `pastry.usdz`                 |
| Zinger Burger      | `zinger-burger.glb`         | `zinger-burger.usdz`          |

> ℹ️ The models included here are free, real dish-shaped placeholders
> (CC0 / CC-BY, sourced from poly.pizza) so the AR experience works
> out of the box. **Swap them for your own scanned/produced models** —
> no other code changes are needed as long as you keep the same file
> names, or update the paths in `src/data/dishes.ts`.

## How to replace a model

1. Export your model as a **binary glTF (`.glb`)** — this is what
   powers the web preview, Android Scene Viewer, and WebXR.
2. Export (or convert) a **`.usdz`** version for iOS Quick Look.
   - If you only have a `.glb`, you can generate a `.usdz` with:
     - Reality Converter (macOS, free, drag-and-drop), or
     - Blender (File → Export → Universal Scene Description, save as
       `.usdz`), or
     - `xcrun usdz_converter` (Xcode command line tools).
3. Drop both files into this `public/models/` folder, using clear
   names, e.g. `my-dish.glb` / `my-dish.usdz`.
4. Open `src/data/dishes.ts` and update the relevant dish's `model`
   object:

   ```ts
   model: {
     glb: "/models/my-dish.glb",
     usdz: "/models/my-dish.usdz",
     cameraOrbit: "25deg 75deg 1m", // optional starting camera angle
     arScale: "auto",               // or a fixed scale like "1 1 1"
   },
   ```

That's it — the dish card, the AR modal, Android AR (Scene
Viewer/WebXR) and iOS AR (Quick Look) will automatically use the new
files.

## Tips for best AR results

- Keep polygon counts reasonable (under ~50k triangles) for fast
  mobile loading.
- Bake lighting into textures where possible; `<model-viewer>` applies
  its own environment lighting on top.
- Model real-world scale (meters) so "auto" AR scale places the dish
  at an accurate size on the table.
- Compress textures (JPEG/WebP, ≤2048px) to keep `.glb` file sizes
  small for fast mobile downloads.
