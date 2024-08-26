const fs = require("fs");

const readStream = fs.createReadStream("./docs/blog3.txt", {
  encoding: "utf8",
});
const writeStream = fs.createWriteStream("./docs/blog4.txt");

// //every time we receive a buffer/data event from the stream
// readStream.on("data", (chunk) => {
//   console.log("------- NEW CHUNK ------- ");
//   console.log(chunk);
//   writeStream.write("\nNEW CHUNK\n");
//   writeStream.write(chunk);
// });

/*piping, does same as above (reading chunks in stream 
 and using a write stream to put in a file) but less code */
readStream.pipe(writeStream)