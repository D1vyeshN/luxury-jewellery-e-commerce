'use client'

import { useRouter } from 'next/navigation'

export const AboutPage = () => {
  const router = useRouter()

  const handleNavigate = (page: string) => {
    router.push(`/${page}`)
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Hero */}
        <div className="relative h-96 mb-16 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/9430466/pexels-photo-9430466.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=1200"
            alt="Aveline atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-gold-300 font-sans mb-4">Est. 2004 · Los Angeles</p>
              <h1 className="font-serif text-5xl lg:text-6xl text-white font-light">Our Story</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="font-serif text-2xl text-charcoal font-light leading-relaxed mb-6">
            "Luxury should be timeless, sustainable, and available to everyone who seeks to celebrate life's most precious moments."
          </p>
          <p className="text-sm text-gray-500 font-sans leading-relaxed mb-4">
            Founded in Los Angeles in 2004, Aveline was born from a passion for exceptional craftsmanship and a commitment 
            to ethical luxury. Our team of master jewellers combine decades of traditional goldsmithing expertise with 
            innovative design to create pieces that last a lifetime.
          </p>
          <p className="text-sm text-gray-500 font-sans leading-relaxed">
            We were pioneers in embracing lab-grown diamonds, recognising that modern luxury should not compromise on ethics or the environment. 
            Today, we ship to over 64 countries, and have been recognised as a top online jeweller by leading publications.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100">
          {[
            { title: 'Crafted in LA', body: 'Every piece is handcrafted in our Los Angeles atelier under the strict supervision of our master jewellers.' },
            { title: '100% Ethical', body: 'All our diamonds are lab-grown — chemically identical to mined diamonds but conflict-free and sustainable.' },
            { title: 'Lifetime Warranty', body: 'We stand behind every piece with a lifetime warranty, free resizing, and complimentary cleaning services.' },
          ].map((v, i) => (
            <div key={i} className="bg-white p-8 lg:p-12">
              <h3 className="font-serif text-2xl text-charcoal mb-4">{v.title}</h3>
              <p className="text-sm text-gray-500 font-sans leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => handleNavigate('shop')}
            className="px-10 py-4 bg-charcoal text-white text-xs uppercase tracking-widest font-sans hover:bg-gold-500 transition-colors"
          >
            Explore Our Collection →
          </button>
        </div>
      </div>
    </div>
  )
}
