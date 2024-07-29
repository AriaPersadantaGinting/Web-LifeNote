import { app } from "./app/app.js";

const port = 3000;

app.listen(port, () => {
  console.info(`Server Running and Up on port ${port}!`);
});
