import Header from "./header";
import Footer from "./footer";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}
