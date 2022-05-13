const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const readline = require("readline");
const process = require("process");
const { pipeline } = require("stream");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  `
    1. Encrypt \n
    2. Decrypt \n
    3. Exit \n

    What is your choice ? \n
`,
  (ans) => {
    switch (ans) {
      case "1":
        rl.question(
          "Enter the name of the file you want to encrypt: ",
          (fileName) => {
            rl.question(
              "Enter the name of the file you want to save the encrypted file: ",
              (saveName) => {
                rl.question("Enter the key", (key) => {
                  const cipher = crypto.createCipher("aes192", key);
                  const input = fs.createReadStream(
                    path.resolve(__dirname, "real", fileName)
                  );
                  const output = fs.createWriteStream(
                    path.resolve(__dirname, "encrypt", saveName)
                  );
                  input.pipe(cipher).pipe(output);
                  rl.close();
                });
              }
            );
          }
        );
        break;
      case "2":
        rl.question(
          "Enter the name of the file you want to decrypt: ",
          (fileName) => {
            rl.question("Enter your decrypted file name", (saveName) => {
              rl.question("Enter the key", (key) => {
                const decipher = crypto.createDecipher("aes192", key);
                const input = fs.createReadStream(
                  path.resolve(__dirname, "encrypt", fileName)
                );
                const output = fs.createWriteStream(
                  path.resolve(__dirname, "decrypt", saveName)
                );
                // input.pipe(decipher).pipe(output);
                // or
                pipeline(input, decipher, output, (err) => {
                  if (err) {
                    console.log(err);
                  }
                });
                rl.close();
              });
            });
          }
        );
        break;
      case "3":
        console.log("Bye!");
        rl.close();
        break;
    }
  }
);
