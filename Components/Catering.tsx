export default function Catering() {
  return (
    <section className="py-20 bg-ivory text-center">
      <h2 className="text-3xl font-heading text-maroon mb-10">
        Premium Catering Services
      </h2>

      <div className="grid md:grid-cols-4 gap-6 px-6">
        {["Maharashtrian Meals","Multi Cuisine","Live Counters","Premium Buffet"].map((item) => (
          <div key={item} className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-maroon">{item}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}