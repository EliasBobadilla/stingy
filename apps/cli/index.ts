import { addFromApiCommon } from "@stingy/api-common";
import { subtractFromCommon } from "@stingy/common";
import chalk from "chalk";

console.log("[CLI] = Add from PWA => 1 + 2 =", chalk.green(addFromApiCommon(1, 2)));
console.log("[CLI] = Subtract from COMMON => 4 - 2 =", chalk.green(subtractFromCommon(4, 2)));