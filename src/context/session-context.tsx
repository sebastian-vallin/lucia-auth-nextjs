"use client";

import { createContext, useContext } from "react";
import { validateRequest } from "@/auth";

type ContextType = Awaited<ReturnType<typeof validateRequest>>;

const SessionContext = createContext<ContextType>({
  session: null,
  user: null,
});

export const SessionProvider = ({ children, session }: React.PropsWithChildren<{ session: ContextType }>) => {
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
};

export function useSession() {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return session;
}

export function useRequiredSession() {
  const session = useSession();
  if (!session.session || !session.user) {
    throw new Error("no session found");
  }

  return session;
}
