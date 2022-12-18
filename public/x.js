// const fs = require("fs");
// const { resolve } = require("path");

// const songsDir = resolve(__dirname, "chika");

// const files = fs.readdirSync(songsDir);
// //console.log(file.slice(0, file.length - 4))
// files.forEach((file, idx) =>
//   fs.rename(songsDir + `/${file}`, songsDir + `/${idx}` + ".jpg", (err) =>
//     console.log(err)
//   )
// );

let images = [];
for (let i = 0; i < 19; i++) {
  console.log("d");
  images.push("/chika/" + `${i}.jpg`);
}
console.log(images);
