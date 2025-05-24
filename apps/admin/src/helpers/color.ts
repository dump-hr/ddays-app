export const getRatingColor = (rating: number): string => {
  const clamped = Math.min(Math.max(rating, 1), 5);

  if (clamped <= 4.5) {
    // Red → Yellow → Yellowish Light Green (1 → 3 → 4.5)
    const t = (clamped - 1) / (4.5 - 1); // Normalize to 0–1

    let r, g, b;

    if (t < 0.5) {
      // Red to Yellow
      const ratio = t / 0.5;
      r = 255;
      g = Math.round(255 * ratio);
      b = 0;
    } else {
      // Yellow to Yellowish Light Green
      const ratio = (t - 0.5) / 0.5;
      r = Math.round(255 - 55 * ratio); // 255 → 200
      g = Math.round(255 - 25 * ratio); // 255 → 230
      b = Math.round(0 + 80 * ratio); // 0 → 80
    }

    return `rgb(${r}, ${g}, ${b})`;
  } else {
    // 4.5 → 5.0: Yellowish Green to Bright Green (0, 255, 0)
    const ratio = (clamped - 4.5) / 0.5;

    const r = Math.round(200 * (1 - ratio)); // 200 → 0
    const g = Math.round(230 + 25 * ratio); // 230 → 255
    const b = Math.round(80 * (1 - ratio)); // 80 → 0

    return `rgb(${r}, ${g}, ${b})`;
  }
};
