"use client";

import { useState } from "react";
import { signIn } from "./actions";
import Link from "next/link";

export default function Page() {
  const [error, setError] = useState<string>();

  return (
    <main className="prose mx-auto px-2 pt-8 dark:prose-invert prose-a:text-teal-700 dark:prose-a:text-teal-500 md:px-0 md:pt-24">
      <form
        onSubmit={async (ev) => {
          ev.preventDefault();
          const formData = new FormData(ev.currentTarget);
          const result = await signIn(formData);

          if (result) {
            setError(result.error);
          }
        }}
        className="prose mx-auto max-w-sm space-y-6"
      >
        <h1>Sign in</h1>

        <div className="space-y-0.5">
          <label className="block" htmlFor="username">
            Username
          </label>
          <input className="h-10 w-full rounded-lg border border-border px-3 text-base" name="username" id="username" />
        </div>

        <div className="space-y-0.5">
          <label className="block" htmlFor="password">
            Password
          </label>
          <input
            className="h-10 w-full rounded-lg border border-border px-3 text-base"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <button className="h-10 w-full rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground">
          Sign in
        </button>

        {error && (
          <p className="flex h-10 w-full items-center justify-center rounded-lg bg-destructive px-4 font-medium text-destructive-foreground">
            {error}
          </p>
        )}

        <div className="space-x-2">
          <Link href="/">Back</Link>
          <Link href="/auth/sign-up">Create an account</Link>
        </div>
      </form>
    </main>
  );
}
