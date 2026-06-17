import Hero from "@/sections/Hero";
import Solutions from "@/sections/Solutions";
import OurProcess from "@/sections/OurProcess";
import ContactForm from "@/sections/ContactForm";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <main>
      <section id="hero">
        <Hero />
      </section>

      <section id="solutions">
        <Solutions />
      </section>

      <section id="our-process">
        <OurProcess />
      </section>

      <section id="contact">
        <ContactForm />
      </section>

      <Footer />
    </main>
  );
}