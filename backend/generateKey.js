const crypto = require("crypto");

const generateRandomKey = () => {
  const key = crypto.randomBytes(64).toString("hex");
  console.log("Generated Key:", key);
};

generateRandomKey();
