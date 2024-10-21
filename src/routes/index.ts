import categoryRoute from "./category/index";
import IncomeRoute from "./Income/index";
import UserRoute from "./User/index";
import express from "express";
const app = express.Router();

console.log("entered");

app.use(UserRoute);
app.use(IncomeRoute);
app.use(categoryRoute);
app.use(categoryRoute);
export default app;
