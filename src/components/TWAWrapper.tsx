"use client";

import WebApp from "@twa-dev/sdk";
import React from "react";

const TWAWrapper = ({ children }: { children: React.ReactNode }) => {
  const [appEnvironment, setAppEnvironment] = React.useState<string | null>(
    null
  ); // telegram or web
  React.useEffect(() => {
    if (WebApp.initDataUnsafe) {
      // Initialize TWA SDK or perform any necessary setup
      setAppEnvironment("telegram");
    } else {
      // Handle web environment
      setAppEnvironment("web");
    }
  }, []);
  return (
    <div>
      {appEnvironment === null ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-white">Loading...</p>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">
          {appEnvironment === "telegram" ? (
            <div className="flex-1">{children}</div>
          ) : (
            <div className="flex flex-col text-white w-9/12 mx-auto text-center items-center justify-center h-screen">
              <h1 className="text-2xl font-bold mb-4">
                This content is only available in the Telegram app.
              </h1>
              <p className="text-lg">
                Please open this link in the Telegram app to view the content.
              </p>
              ;
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TWAWrapper;
