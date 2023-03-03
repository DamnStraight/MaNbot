import * as dotenv from "dotenv";
import startBot from "./bot";

dotenv.config();

(async () => {
  await startBot();
})();
