export default function Contact() {
  return (
    <section id="contact" className="py-20 text-center">
      <h2 className="text-3xl font-heading text-maroon mb-6">
        Let’s Plan Your Wedding
      </h2>

      <form className="max-w-lg mx-auto space-y-4">
        <input className="w-full p-3 border rounded" placeholder="Name" />
        <input className="w-full p-3 border rounded" placeholder="Phone" />
        <textarea className="w-full p-3 border rounded" placeholder="Details" />

        <button className="bg-gold text-maroon px-6 py-3 rounded-full w-full">
          Send Inquiry
        </button>
      </form>
    </section>
  );
}