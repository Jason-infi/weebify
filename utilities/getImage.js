const images = [
  "/chika/0.jpg",
  "/chika/1.jpg",
  "/chika/2.jpg",
  "/chika/3.jpg",
  "/chika/4.jpg",
  "/chika/5.jpg",
  "/chika/6.jpg",
  "/chika/7.jpg",
  "/chika/8.jpg",
  "/chika/9.jpg",
  "/chika/10.jpg",
  "/chika/11.jpg",
  "/chika/12.jpg",
  "/chika/13.jpg",
  "/chika/14.jpg",
  "/chika/15.jpg",
  "/chika/16.jpg",
  "/chika/17.jpg",
  "/chika/18.jpg",
];
const getImage = () => {
  return images[Math.floor(Math.random() * images.length)];
};
export default getImage;
