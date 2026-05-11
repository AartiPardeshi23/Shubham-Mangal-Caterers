export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center text-center bg-maroon text-white px-4">
      <div>
        <h1 className="text-4xl md:text-6xl font-heading mb-4">
          Royal Wedding Decor & Premium Catering
        </h1>

        <p className="max-w-xl mx-auto mb-6">
          From elegant mandap decoration to unforgettable wedding feasts.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <a href="#contact" className="bg-gold text-maroon px-6 py-3 rounded-full">
            Book Consultation
          </a>

          <a href="#services" className="border border-gold px-6 py-3 rounded-full">
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
}