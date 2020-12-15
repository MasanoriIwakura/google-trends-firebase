import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "POST", "OPTIONS"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};

const handler = async (req, res) => {
  // Run the middleware
  await runMiddleware(req, res, cors);
  console.log(req);

  // Rest of the API logic
  res.json({ message: "Hello Everyone!" });
};

export default handler;
