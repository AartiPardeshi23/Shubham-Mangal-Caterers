export default function Navbar() {
  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur z-50 shadow">
      <nav className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-maroon">SM</h1>

        <ul className="hidden md:flex gap-6 font-medium">
          <li><a href="#services">Services</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <a
          href="https://wa.me/919876543210?text=Hello%20I%20want%20details"
          className="bg-green-500 text-white px-4 py-2 rounded-full"
        >
          WhatsApp
        </a>
      </nav>
    </header>
  );
}