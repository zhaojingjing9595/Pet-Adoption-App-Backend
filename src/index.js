import express from "express";
import cors from "cors";
import "dotenv/config";
import knex from "knex";
import knexConfig from "./data/knexfile.js";
import petsRoutes from "./routes/petsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParse from 'cookie-parser';
import pino from 'pino-http'

const appDB = knex(knexConfig);
const app = new express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://pet-adoption-client-side.herokuapp.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParse());
app.use(pino({level: process.env.LOG_LEVEL}))

app.get("/", (req, res) => {
  res.send("welcome to the root");
});

app.use(`/${process.env.UPLOAD_FOLDER}`, express.static(process.env.UPLOAD_FOLDER))

app.use("/auth", authRoutes);
app.use("/pet", petsRoutes);
app.use("/user", usersRoutes);

appDB.migrate
.latest()
  .then((migration) => {
    console.log("connected to DB", migration);
    app.listen(process.env.PORT, () => {
      console.log(`server is listening at port ${process.env.PORT}...`);
    });
  })
  .catch((err) => console.log(err));

export  { appDB };
