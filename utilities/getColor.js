const colors = [
  "from-indigo-500",
  "from-pink-500",
  "from-purple-500",
  "from-orange-500",
  "from-red-500",
  "from-green-500",
  "from-lime-500",
];
const getColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
export default getColor;
