"use server";

import { lucia, validateRequest } from "@/auth";
import { Session } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type ActionResult = { error?: string };

export async function signOut(): Promise<ActionResult> {
  "use server";
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect("/");
}

export async function getSession(): Promise<Session | null> {
  try {
    const res = await validateRequest();
    return res.session;
  } catch {
    return null;
  }
}
