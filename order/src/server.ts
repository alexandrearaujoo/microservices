import express from "express";
import { router } from "./infra/routes";

const PORT = process.env.PORT ?? 3002;

const app = express();

app.use(express.json());

app.use(router);

app.listen(PORT, () =>
  console.log(`Order server is running on port ${PORT}`)
);
