import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import routes from "./routes";

const app = express();
const port = 3003;

app.use(cors());
app.use(bodyParser.json());

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app