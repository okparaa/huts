import { Metadata } from "next";
import "./globals.css";
import { ApolloWrapper } from "@/components/ApolloWrapper";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <ApolloWrapper>
        <SessionProvider session={session}>
          <body>{children}</body>
        </SessionProvider>
      </ApolloWrapper>
    </html>
  );
}
