// tests/customer.test.js
const readline = require("readline");
const http = require("http");
const { expect } = require("chai");

describe("User Registration API (Only Mocha with CMD Input)", function () {
  this.timeout(60000);

  const askQuestion = (query) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) =>
      rl.question(query, (answer) => {
        rl.close();
        resolve(answer);
      })
    );
  };

  it("should register a new user with command-line input", async function () {
    console.log("\n--- User Registration ---");

    const Username= await askQuestion("Enter Username: ");
    const Password = await askQuestion("Enter Password: ");
    const email = await askQuestion("Enter Email: ");
    const contact = await askQuestion("Enter Contact Number: ");

    const postData = JSON.stringify({ Username, Password, email, contact });

    const options = {
      hostname: "localhost",
      port: 3000,
      path: "/api/postcustomer",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    // Function to make HTTP request
    const makeRequest = () =>
      new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            console.log("\n🔹 RAW RESPONSE FROM SERVER:\n", data);
            console.log(`\n🔹 Status Code: ${res.statusCode}`);

            try {
              const response = JSON.parse(data);

              expect(res.statusCode).to.equal(201);
              expect(response.message).to.equal("User Registed Sucessfully");

              console.log("\n✅ User created successfully!");
              resolve();
            } catch (error) {
              reject(new Error(`\Error Response: ${data}`));
            //   reject(new Error(`JSON Parsing Error: ${error.message}\nRaw Response: ${data}`));
            }
          });
        });

        req.on("error", (err) => {
          reject(err);
        });

        req.write(postData);
        req.end();
      });

    await makeRequest();
  });
});
