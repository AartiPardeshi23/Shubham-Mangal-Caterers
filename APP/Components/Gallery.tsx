export default function Gallery() {
  return (
    <section id="gallery" className="py-20 text-center">
      <h2 className="text-3xl font-heading text-maroon mb-10">
        Our Wedding Creations
      </h2>

      <div className="grid md:grid-cols-3 gap-6 px-6">
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} className="h-60 bg-peach rounded-xl hover:scale-105 transition" />
        ))}
      </div>
    </section>
  );
}
