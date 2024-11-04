
export const env = (name: string) => {
  const value = Deno.env.get(name)

  if (!value) {
    const error = new Error(`Missing environment variable '${name}'.`);
    console.log(error);
    throw error;
  }

  return value;
};