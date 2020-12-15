import Cors from "cors";
import gta from "google-trends-api";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET"],
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

  // Rest of the API logic
  const params = req.query;
  const keywords = params["keyword"].split("\n");
  let tsv = "keyword\tdate\tvalue\n";
  for (let k of keywords) {
    params["keyword"] = k;
    params["startTime"] = new Date(params["startTime"]);
    params["endTime"] = new Date(params["endTime"]);
    const ret = await gta.interestOverTime(params);

    const retJson = JSON.parse(ret);
    retJson["default"]["timelineData"].forEach((e) => {
      tsv += `${params["keyword"]}\t${e["formattedAxisTime"]}\t${e["formattedValue"][0]}\n`;
    });
  }

  res.setHeader("Content-disposition", "attachment; filename=trends.tsv");
  res.setHeader("Content-Type", "text/tab-separated-values; charset=UTF-8");
  res.send(tsv);
};

export default handler;
