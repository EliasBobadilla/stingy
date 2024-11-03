import { addFromApiCommon } from "@stingy/api-common";
import { subtractFromCommon } from "@stingy/common";
import chalk from "chalk";

console.log("[WEB-CLIENT] = Add from PWA => 1 + 2 =", chalk.green(addFromApiCommon(1, 2)));
console.log("[WEB-CLIENT] = Subtract from COMMON => 4 - 2 =", chalk.green(subtractFromCommon(4, 2)));