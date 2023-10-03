import express from "express";
import handlebars from "express-handlebars";
import morgan from "morgan";
import passport from "passport";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorHandler.js";
import { __dirname } from "./utils/utils.js";
import routes from "./routes/index.js";
import "./passport/jwt-strategy.js";

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(passport.initialize());

app.use("/", routes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server ok en puerto ${PORT}`);
});
