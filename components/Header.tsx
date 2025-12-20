import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-700 to-red-700">
      <h1 className="text-3xl font-bold italic">Era Boy</h1>

      <div className="flex gap-4">
        <Facebook />
        <Twitter />
        <Instagram />
      </div>
    </header>
  );
}
