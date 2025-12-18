import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google"; // dành cho các font có sẵn trên google-font
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import AppProvider from "@/app/AppProvider";
import { cookies } from "next/headers";
import SlideSession from "@/components/slide-session";
import accountApi from "@/apiRequest/account";
import { AccountResType } from "@/schemaValidations/account.schema";
import { baseOpenGraph } from "@/app/sahred-metadata";

const inter = Inter({
  subsets: ["vietnamese"],
}); // dùng font có sẵn của google-font

export const metadata: Metadata = {
  title: {
    template: "%s | Product App",
    default: "Product App",
  },
  description: "Được tạo bởi PMT",
  openGraph: baseOpenGraph,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("sessionToken");

  let user: AccountResType["data"] | null = null;
  if (sessionToken) {
    const res = await accountApi.me(sessionToken?.value || "");
    user = res.payload.data;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Toaster />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SlideSession />
          <AppProvider initialSessionToken={sessionToken?.value} user={user}>
            <Header user={user} />
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

/* <body className={inter.className}>Dành cho sử dụng font từ Google Fonts</body> */
/* <body className={`${myFont.className} ${myFont.variable}`}>{children}</body> */
/* <header className="font-thuan font-semibold">header</header> */
// import localFont from "next/font/local"; // dành cho các font bên ngoài (không có sẵn)
// const myFont = localFont({
//   src: [
//     {
//       path: "./OpenSans-Regular.ttf",
//       weight: "400",
//     },
//     {
//       path: "./OpenSans-Medium.ttf",
//       weight: "500",
//     },
//     {
//       path: "./OpenSans-Bold.ttf",
//       weight: "700",
//     },
//   ],
//   display: "swap",
//   variable: "--font-openSans", // kết hợp tailwind
// }); // dùng font bên ngoài
