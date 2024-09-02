"use server";

import { prisma } from "@/prisma";
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "@/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";

export async function signUp(formData: FormData): Promise<ActionResult> {
  const username = formData.get("username");
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
  if (typeof username !== "string" || username.length < 3 || username.length > 31 || !/^[a-z0-9_-]+$/.test(username)) {
    return {
      error: "Invalid username",
    };
  }
  const password = formData.get("password");
  if (typeof password !== "string" || password.length < 6 || password.length > 255) {
    return {
      error: "Invalid password",
    };
  }

  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const usernameExists = await prisma.user.count({ where: { username: { equals: username, mode: "insensitive" } } });
  if (usernameExists) {
    return {
      error: "Username already exists",
    };
  }

  const user = await prisma.user.create({
    data: {
      username: username.toLowerCase(),
      password_hash: passwordHash,
    },
  });

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect("/");
}

interface ActionResult {
  error: string;
}
