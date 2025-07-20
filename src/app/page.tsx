"use client";

import WebApp from "@twa-dev/sdk";
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  languageCode: string;
  isPremium: boolean;
}

export default function Page() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUser({
        firstName: WebApp.initDataUnsafe.user.first_name,
        id: WebApp.initDataUnsafe.user.id,
        isPremium: WebApp.initDataUnsafe.user.is_premium,
        languageCode: WebApp.initDataUnsafe.user.language_code,
        lastName: WebApp.initDataUnsafe.user.last_name,
        userName: WebApp.initDataUnsafe.user.username,
      } as User);
    }
  }, []);
  return (
    <main className="text-white">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to the TWA App</h1>
        {user ? (
          <div className="text-center mb-4">
            <p>
              User: ID-{user.id}, First Name-
              {user.firstName}, Last Name-{user.lastName}, premium-
              {user.isPremium ? "Yes" : "No"}, language code-
              {user.languageCode}
            </p>
            <p>Chat ID: {user.id}</p>
          </div>
        ) : (
          <p className="text-gray-500">Loading User and Chat details</p>
        )}
      </div>
    </main>
  );
}
