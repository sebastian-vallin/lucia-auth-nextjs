import Link from "next/link";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/auth";
import { signOut } from "@/actions/auth";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="prose mx-auto px-2 pt-8 dark:prose-invert prose-a:text-teal-700 dark:prose-a:text-teal-500 md:px-0 md:pt-24">
      <h1>
        Welcome to&nbsp;
        <Link href="https://nextjs.org/docs" target="_blank" rel="noreferrer">
          NEXT.JS!
        </Link>
      </h1>
      <h2>Features</h2>
      <ul>
        <li>
          NEXT.JS&nbsp;
          <Link
            href="https://nextjs.org/docs/app/building-your-application/routing#the-app-router"
            target="_blank"
            rel="noreferrer"
          >
            App Router
          </Link>
        </li>
        <li>Typescript</li>
        <li>
          <Link href="https://tailwindcss.com/docs/installation" target="_blank" rel="noreferrer">
            Tailwindcss
          </Link>
        </li>
        <li className="block">
          <ul>
            <li>
              <code>
                <Link href="https://github.com/tailwindlabs/tailwindcss-typography" target="_blank" rel="noreferrer">
                  @tailwindcss/typography
                </Link>
              </code>
            </li>
            <li>
              <code>
                <Link href="https://github.com/jamiebuilds/tailwindcss-animate" target="_blank" rel="noreferrer">
                  tailwindcss-animate
                </Link>
              </code>
            </li>
          </ul>
        </li>
        <li>
          <Button variant="secondary" asChild className="not-prose">
            <Link href="https://ui.shadcn.com/docs" target="_blank" rel="noreferrer">
              shadcn/ui
            </Link>
          </Button>
        </li>
        <li>
          <Link href="https://lucia-auth.com" target="_blank" rel="noreferrer">
            Lucia Auth
          </Link>
        </li>
        <li className="block">
          <ul>
            <Suspense fallback={<LuciaSkeleton />}>
              <LuciaAuth />
            </Suspense>
          </ul>
        </li>
      </ul>
      <p className="flex items-center justify-center rounded-xl border border-b border-gray-200 bg-gray-100 bg-gradient-to-b from-zinc-100 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
        Get started by editing&nbsp;
        <code>src/app/page.tsx</code>
      </p>
    </main>
  );
}

function LuciaSkeleton() {
  return (
    <>
      <li>
        <div className="flex animate-pulse items-center py-2">
          <div className="h-3 w-24 rounded bg-slate-200" />
        </div>
      </li>
      <li>
        <div className="flex animate-pulse items-center py-2">
          <div className="h-3 w-36 rounded bg-slate-200" />
        </div>
      </li>
    </>
  );
}

async function LuciaAuth() {
  const { user } = await validateRequest();

  if (user) {
    return (
      <>
        <li>Signed in as {user.username}</li>
        <li>
          <form
            action={async function () {
              "use server";
              await signOut();
            }}
          >
            <Button variant="secondary">Sign out</Button>
          </form>
        </li>
      </>
    );
  }

  return (
    <>
      <li>
        <Link href="/auth/sign-in">Sign in</Link>
      </li>
      <li>
        <Link href="/auth/sign-up">Create an account</Link>
      </li>
    </>
  );
}
