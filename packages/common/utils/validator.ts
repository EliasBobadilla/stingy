import { isNonNullish } from "remeda";

export function assertSome<T>(
  arg?: T,
  objName?: string,
  logMetadata?: T | string,
): asserts arg is T {
  if (isNonNullish(arg)) {
    return;
  }
  throw new Error(
    `Found nothing in [${objName}]: ${JSON.stringify(arg)}. ${
      logMetadata ? "metadata: " + JSON.stringify(logMetadata) : ""
    } }`,
  );
}
