import categoryRoute from "./category.routes";
import { userRoute, expenseRoute, incomeRoute } from "./routerExport";
import { Router } from "express";
const app = Router();
app.use(userRoute);
app.use(expenseRoute);
app.use(categoryRoute);
app.use(incomeRoute);
export default app;
