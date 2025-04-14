import React, { Children } from "react";
import Header from "./_components/Header";
//Cliend-side file

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8 md:py-12">
        {children}
      </main>
    </div>
  );
}

export default Provider;
