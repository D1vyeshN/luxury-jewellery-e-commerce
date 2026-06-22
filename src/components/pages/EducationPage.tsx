'use client'

import { useRouter } from 'next/navigation'

export const EducationPage = () => {
  const router = useRouter()

  const handleNavigate = (page: string) => {
    router.push(`/${page}`)
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-500 font-sans mb-3">Knowledge Centre</p>
          <h1 className="font-serif text-4xl lg:text-5xl text-charcoal font-light">
            Jewellery <em>Education</em>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* The 4Cs */}
          <div className="lg:col-span-2 bg-cream p-8 lg:p-12">
            <p className="text-[10px] uppercase tracking-widest text-gold-500 font-sans mb-4">Foundation Guide</p>
            <h2 className="font-serif text-3xl text-charcoal font-light mb-6">The 4Cs of Diamond Quality</h2>
            <div className="grid grid-cols-2 gap-6">
              {[
                { letter: 'C', title: 'Cut', description: 'The most important factor. Cut determines how light interacts with the diamond. An Excellent cut maximises brilliance.' },
                { letter: 'C', title: 'Color', description: 'Graded D (colourless) to Z. The less colour, the rarer. D-F are colourless; G-J are near-colourless and great value.' },
                { letter: 'C', title: 'Clarity', description: 'Measures internal inclusions. VVS1-VS2 are eye-clean and excellent choices for most budgets.' },
                { letter: 'C', title: 'Carat', description: 'The weight of the diamond. A well-cut 1ct diamond can appear larger than a poorly-cut 1.2ct stone.' },
              ].map((item, i) => (
                <div key={i} className="border-l-2 border-gold-500 pl-4">
                  <h3 className="font-serif text-xl text-charcoal mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 font-sans leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleNavigate('ring-builder')}
              className="mt-8 px-6 py-3 bg-charcoal text-white text-xs uppercase tracking-widest font-sans hover:bg-gold-500 transition-colors inline-flex items-center gap-2"
            >
              Start Building Your Ring →
            </button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-charcoal p-6 text-white">
              <p className="text-xs uppercase tracking-widest text-gold-400 font-sans mb-3">Quick Guide</p>
              <h3 className="font-serif text-xl mb-4">Ring Size Chart</h3>
              <div className="space-y-2 text-sm font-sans">
                {[{ us: '5', uk: 'J½', mm: '15.7' }, { us: '6', uk: 'L½', mm: '16.5' }, { us: '7', uk: 'N½', mm: '17.3' }, { us: '8', uk: 'P½', mm: '18.2' }].map(r => (
                  <div key={r.us} className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/60">US {r.us}</span>
                    <span className="text-white/60">UK {r.uk}</span>
                    <span className="text-gold-400">{r.mm}mm</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-gray-100 p-6">
              <p className="text-xs uppercase tracking-widest text-gold-500 font-sans mb-3">Lab-Grown Diamonds</p>
              <h3 className="font-serif text-lg text-charcoal mb-3">Identical in Every Way</h3>
              <p className="text-sm text-gray-500 font-sans leading-relaxed">
                Lab-grown diamonds have the same physical, chemical, and optical properties as natural diamonds. 
                The only difference is their origin — and their price.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {['Same brilliance', 'Same hardness', 'GIA certified', '40% less cost'].map(f => (
                  <div key={f} className="flex items-center gap-1.5 text-xs font-sans text-charcoal">
                    <span className="text-gold-500">✦</span> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
