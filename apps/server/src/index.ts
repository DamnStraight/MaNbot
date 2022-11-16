import * as dotenv from "dotenv";
import startBot from "./bot";
import startServer from "./server";

dotenv.config({ path: "../../.env" });

(async () => {
  await startServer();
  await startBot();
})();
