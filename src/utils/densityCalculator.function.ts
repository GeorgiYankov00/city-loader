export function calculateDensity(population: number, area: number): number {
  if (!area) {
    throw new Error("Area is not a number!");
  }

  if (!population) {
    throw new Error("Population is not a number!");
  }

  return parseFloat((population / area).toFixed(2));
}
