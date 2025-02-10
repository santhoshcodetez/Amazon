const readline = require("readline");
const http = require("http");

describe("OrderDetail API Tests (CMD Input)", function () {
  this.timeout(60000); // 60 seconds timeout for user input

  // Function to get user input
  const askQuestion = (query) => {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(query, (answer) => {
        rl.close();
        resolve(answer.trim());
      });
    });
  };

  // Function to make HTTP requests
  const makeRequest = (options, postData = null) =>
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
            resolve({ status: res.statusCode, body: response });
          } catch (error) {
            reject(new Error(`\nError Parsing JSON: ${error.message}\nRaw Response: ${data}`));
          }
        });
      });

      req.on("error", (error) => {
        reject(error);
      });

      if (postData) {
        req.write(JSON.stringify(postData));
      }
      req.end();
    });
  
  let orderId; // Store order ID

  it("🔍 Get Order Details by ID", async function () {
    orderId = await askQuestion("\nEnter Order ID to fetch details: ");

    const options = {
      hostname: "localhost",
      port: 3000, // Change if different
      path: `/api/order/${orderId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await makeRequest(options);
    console.log("✅ Order Details:", response.body);
  });

  it("🛠️ Update Order", async function () {
    const updatedQuantity = await askQuestion("\nEnter new quantity: ");

    const options = {
      hostname: "localhost",
      port: 3000, // Change if different
      path: `/api/order`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const postData = {
      id: orderId,
      quantity: updatedQuantity,
    };

    const response = await makeRequest(options, postData);
    console.log("✅ Order Updated:", response.body);
  });

  it("🗑️ Delete Order", async function () {
    const confirmDelete = await askQuestion("\nConfirm delete? (yes/no): ");

    if (confirmDelete.toLowerCase() !== "yes") {
      console.log("❌ Delete Cancelled");
      return;
    }

    const options = {
      hostname: "localhost",
      port: 3000, // Change if different
      path: `/api/order`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const postData = { id: orderId };

    const response = await makeRequest(options, postData);
    console.log("✅ Order Deleted:", response.body);
  });
});
