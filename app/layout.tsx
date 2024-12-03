import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-slate-200'>
        <div className="container mx-auto p-4">
          {children}
        </div>
      </body>
    </html>
  );
}