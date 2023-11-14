import readline from "readline";
import fs from "fs";

export function createReadLineStream(path: string): readline.Interface {
  const fileStream = fs.createReadStream(path);

  return readline.createInterface({
    input: fileStream,
  });
}
