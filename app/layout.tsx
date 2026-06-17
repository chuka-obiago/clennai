import "./globals.css";
import Navbar from "@/components/Navbar";
import StyledJsxRegistry from "./registry";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
      </body>
    </html>
  );
}