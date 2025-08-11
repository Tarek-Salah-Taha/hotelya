"use client";

import { createContext, useContext, useState } from "react";
import { UserProfile } from "../_types/types";

type UserContextType = {
  user: UserProfile | null;
  setUser: (u: UserProfile | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: UserProfile | null;
}) {
  // Simple state without localStorage persistence
  const [user, setUser] = useState<UserProfile | null>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUserContext must be used inside UserProvider");
  return ctx;
}
