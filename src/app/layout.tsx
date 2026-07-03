import "./globals.css";
import RefreshRedirect from "@/components/RefreshRedirect";

export const metadata = {
  title: "Yash Gupta | Full-Stack Developer",
  description:
    "Portfolio of Yash Gupta, Computer Science and  Engineering student specializing in full-stack development, problem solving and building tools ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RefreshRedirect />
        {children}
      </body>
    </html>
  );
}

