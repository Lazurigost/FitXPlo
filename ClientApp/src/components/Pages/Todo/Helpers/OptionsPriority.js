export const optionsPriority = [
  {
    value: "Техника",
    label: "Техника",
  },
  {
    value: "Советы",
    label: "Советы",
  },
  {
    value: "Блог",
    label: "Блог",
  },
];
export function getColorPublication(prior) {
  if (prior === "Техника") {
    return ["#ff4d4f", "#ffccc7", "#f5222d"];
  }
  if (prior === "Советы") {
    return ["#ffa940", "#ffe7ba", "#fa8c16"];
  }
  if (prior === "Блог") {
    return ["#bae637", "#f4ffb8", "#a0d911"];
  }
}
