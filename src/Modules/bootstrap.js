import categoryRouter from "./Categories/category.routes.js";
import taskRouter from "./Tasks/tasks.routes.js";
import userRouter from "./Users/user.routes.js";

export const bootstrap = (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/categories", categoryRouter);
  app.use("/api/tasks", taskRouter);
};
