import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pocket Paths",
  description: "A calm, Pokémon-style financial literacy adventure."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
