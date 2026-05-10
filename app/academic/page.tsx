import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AcademicPage() {
  return (
    <main>
      <Navbar />

      <section className="relative min-h-[70vh] flex items-center justify-center">
        <Image
          src="/company resources/academic hero.webp"
          alt="Academic hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-serif">Academic</h1>
        </div>
      </section>

      <Footer />
    </main>
  )
}
