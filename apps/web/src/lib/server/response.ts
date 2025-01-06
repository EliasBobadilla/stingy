import { NextResponse } from "next/server";

export type JsonBodyResponse = {
  error?: string;
  success: boolean;
  code: number;
};

export function json(
  success: boolean,
  response?: unknown,
  statusCode?: number
) {
  const status = statusCode ?? (success ? 200 : 500);
  const res = response ?? {
    code: status,
    success,
  };
  return NextResponse.json(res, { status });
}
