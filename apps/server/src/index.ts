import * as dotenv from "dotenv";
import startBot from "./manbot";
import startServer from "./server";

dotenv.config({ path: "../../.env" });

const startApplication = async () => {
  await startServer();
  await startBot();
};

startApplication();
