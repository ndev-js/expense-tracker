import UserRoute from "./User/index.js";
import express from "express";
const app = express.Router();
const AppRouterPrefix = "/api";

const AppRoute = app.use(AppRouterPrefix, UserRoute);
export default AppRoute;
