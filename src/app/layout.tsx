export const metadata = { title: "echtiraki", description: "اشتراكات مشتركة" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#fafafa", color: "#111" }}>
        {children}
      </body>
    </html>
  );
}
