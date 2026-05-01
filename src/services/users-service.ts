import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const registerUser = async (payload: any) => {
  const { name, email, password } = payload;

  // 1. Check if email already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    throw new Error("Email sudah terdaftar");
  }

  // 2. Hash password using Bun's built-in password hasher (bcrypt by default)
  const hashedPassword = await Bun.password.hash(password);

  // 3. Insert user into database
  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  return "OK";
};
