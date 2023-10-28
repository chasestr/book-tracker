require("dotenv").config();

export const getEnv = (name: string): string => {
  if (typeof process.env[name] === "undefined") {
    throw new Error("Variable ${name} undefined.");
  } else {
    return process.env[name]!;
  }
};
