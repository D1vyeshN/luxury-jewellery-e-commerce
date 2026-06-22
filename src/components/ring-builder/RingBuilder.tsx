'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Diamond, CheckCircle, ArrowRight, ArrowLeft, Plus, ShoppingBag, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addToCart, openCart } from '../../store/cartSlice';
import { RING_SETTINGS, SAMPLE_DIAMONDS, METALS } from '../../constants';
import type { RingSetting, Diamond as DiamondType, MetalType } from '../../types';
import toast from 'react-hot-toast';

type Step = 'choose-path' | 'setting' | 'diamond' | 'summary';

export const RingBuilder: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<Step>('choose-path');
  const [startWith, setStartWith] = useState<'setting' | 'diamond' | null>(null);
  const [selectedSetting, setSelectedSetting] = useState<RingSetting | null>(null);
  const [selectedDiamond, setSelectedDiamond] = useState<DiamondType | null>(null);
  const [selectedMetal, setSelectedMetal] = useState<MetalType>('white-gold');
  const [ringSize, setRingSize] = useState<number>(6);
  const [engraving, setEngraving] = useState('');

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);

  const totalPrice = (selectedSetting?.price || 0) + (selectedDiamond?.price || 0);

  const steps = [
    { id: 'setting', label: 'Choose Setting', icon: Settings },
    { id: 'diamond', label: 'Select Diamond', icon: Diamond },
    { id: 'summary', label: 'Complete Ring', icon: CheckCircle },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === step);

  const handleAddToCart = () => {
    if (!selectedSetting) return;
    const mockProduct = {
      id: `custom-${Date.now()}`,
      name: `Custom ${selectedSetting.name}`,
      slug: 'custom-ring',
      category: 'engagement-rings' as const,
      description: `Custom ${selectedSetting.name} with ${selectedDiamond ? `${selectedDiamond.caratWeight}ct ${selectedDiamond.shape} diamond` : 'selected diamond'}`,
      shortDescription: selectedSetting.description,
      price: totalPrice,
      metal: selectedMetal,
      images: [{ id: '1', url: selectedSetting.imageUrl, alt: selectedSetting.name, isPrimary: true }],
      tags: ['custom', 'ring-builder'],
      stock: 1,
      rating: 5,
      reviewCount: 0,
      sku: `CUSTOM-${Date.now()}`,
    };
    dispatch(addToCart({ product: mockProduct, selectedMetal, selectedSize: ringSize }));
    dispatch(openCart());
    toast.success('Custom ring added to bag!', {
      icon: '💍',
      style: { fontFamily: 'Inter, sans-serif', fontSize: '13px' },
    });
  };

  const handleReset = () => {
    setStep('choose-path');
    setStartWith(null);
    setSelectedSetting(null);
    setSelectedDiamond(null);
    setSelectedMetal('white-gold');
    setRingSize(6);
    setEngraving('');
  };

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-500 font-sans mb-3">Bespoke Creation</p>
          <h1 className="font-serif text-4xl lg:text-6xl text-charcoal font-light mb-4">
            Design Your <em>Dream Ring</em>
          </h1>
          <p className="font-sans text-gray-500 max-w-xl mx-auto text-base">
            Create a bespoke engagement ring tailored to your vision. Start with a setting or a diamond.
          </p>
        </div>

        {/* Step Indicator */}
        {step !== 'choose-path' && (
          <div className="flex items-center justify-center mb-12">
            {steps.map((s, i) => {
              const isActive = s.id === step;
              const isDone = currentStepIndex > i;
              return (
                <React.Fragment key={s.id}>
                  <motion.div
                    className={`flex items-center gap-2 px-4 py-2 transition-all duration-300 ${isActive ? 'text-gold-500' : isDone ? 'text-charcoal' : 'text-gray-300'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-sans font-medium transition-colors
                      ${isActive ? 'border-gold-500 bg-gold-500 text-white' : isDone ? 'border-charcoal bg-charcoal text-white' : 'border-gray-300 text-gray-300'}`}>
                      {isDone ? '✓' : i + 1}
                    </div>
                    <span className="hidden sm:inline text-xs uppercase tracking-wider font-sans">{s.label}</span>
                  </motion.div>
                  {i < steps.length - 1 && (
                    <div className={`h-px w-12 transition-colors duration-300 ${isDone ? 'bg-charcoal' : 'bg-gray-200'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP: Choose Path */}
          {step === 'choose-path' && (
            <motion.div
              key="choose-path"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Start with a Setting',
                    description: 'Choose your ideal ring design, then find the perfect diamond to complete it.',
                    image: 'https://images.pexels.com/photos/2849742/pexels-photo-2849742.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=600',
                    value: 'setting' as const,
                    badge: 'Most Popular',
                  },
                  {
                    title: 'Start with a Diamond',
                    description: 'Select your ideal diamond first, then find a setting that perfectly showcases it.',
                    image: 'https://images.pexels.com/photos/5370650/pexels-photo-5370650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=600',
                    value: 'diamond' as const,
                    badge: null,
                  },
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      setStartWith(option.value);
                      setStep(option.value === 'setting' ? 'setting' : 'diamond');
                    }}
                    className="group relative overflow-hidden text-left bg-white border border-gray-200 hover:border-gold-500 transition-all duration-300 shadow-sm"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={option.image}
                        alt={option.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    {option.badge && (
                      <span className="absolute top-4 left-4 bg-gold-500 text-white text-[9px] uppercase tracking-widest px-2.5 py-1 font-sans">
                        {option.badge}
                      </span>
                    )}
                    <div className="p-6">
                      <h3 className="font-serif text-xl text-charcoal mb-2 group-hover:text-gold-600 transition-colors">
                        {option.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-sans leading-relaxed">{option.description}</p>
                      <div className="flex items-center gap-2 mt-4 text-gold-500">
                        <span className="text-xs uppercase tracking-widest font-sans">Get Started</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex items-center gap-6 justify-center mt-8">
                <div className="h-px flex-1 max-w-32 bg-gray-200" />
                <span className="text-xs text-gray-400 font-sans uppercase tracking-widest">or</span>
                <div className="h-px flex-1 max-w-32 bg-gray-200" />
              </div>
              <div className="text-center mt-6">
                <button
                  onClick={() => router.push('/diamonds')}
                  className="text-xs uppercase tracking-widest text-gold-500 font-sans hover:text-gold-700 flex items-center gap-2 mx-auto"
                >
                  Browse Our Diamond Collection <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP: Choose Setting */}
          {step === 'setting' && (
            <motion.div
              key="setting"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="mb-8">
                <h2 className="font-serif text-2xl text-charcoal mb-2">Choose Your Setting</h2>
                <p className="text-sm text-gray-500 font-sans">Select a ring design that speaks to you.</p>
              </div>

              {/* Metal selector */}
              <div className="mb-8 flex flex-wrap gap-3">
                <span className="text-xs uppercase tracking-widest text-gray-500 font-sans self-center mr-2">Metal:</span>
                {METALS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMetal(m.id as MetalType)}
                    className={`flex items-center gap-2 px-4 py-2 border text-xs font-sans uppercase tracking-wider transition-all ${
                      selectedMetal === m.id ? 'border-charcoal bg-charcoal text-white' : 'border-gray-200 text-gray-600 hover:border-gold-500'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border border-white/30" style={{ backgroundColor: m.color }} />
                    {m.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {RING_SETTINGS.map((setting) => (
                  <motion.button
                    key={setting.id}
                    whileHover={{ y: -4 }}
                    onClick={() => { setSelectedSetting(setting); setStep(startWith === 'setting' ? 'diamond' : 'summary'); }}
                    className={`group text-left border transition-all duration-300 bg-white ${
                      selectedSetting?.id === setting.id ? 'border-gold-500 shadow-lg' : 'border-gray-200 hover:border-gold-300'
                    }`}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img src={setting.imageUrl} alt={setting.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] uppercase tracking-widest text-gold-500 font-sans mb-1">{setting.style}</p>
                      <h3 className="font-serif text-base text-charcoal">{setting.name}</h3>
                      <p className="text-xs text-gray-400 font-sans mt-1">{setting.description}</p>
                      <p className="font-serif text-lg text-charcoal mt-3">{formatPrice(setting.price)}</p>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={() => setStep('choose-path')} className="flex items-center gap-2 text-sm text-gray-400 hover:text-charcoal transition-colors font-sans">
                  <ArrowLeft size={14} /> Back
                </button>
                {selectedSetting && (
                  <button
                    onClick={() => setStep(startWith === 'setting' ? 'diamond' : 'summary')}
                    className="flex items-center gap-2 px-6 py-3 bg-charcoal text-white text-xs uppercase tracking-widest font-sans hover:bg-gold-500 transition-colors"
                  >
                    Continue <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP: Choose Diamond */}
          {step === 'diamond' && (
            <motion.div
              key="diamond"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-charcoal mb-2">Select Your Diamond</h2>
                  <p className="text-sm text-gray-500 font-sans">All diamonds are GIA/IGI certified lab-grown.</p>
                </div>
                <button
                  onClick={() => setStep('summary')}
                  className="text-xs text-gray-400 hover:text-charcoal transition-colors font-sans uppercase tracking-wider"
                >
                  Skip for Now
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm font-sans">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-100">
                      <th className="text-left py-3 px-2 font-normal">Shape</th>
                      <th className="text-left py-3 px-2 font-normal">Carat</th>
                      <th className="text-left py-3 px-2 font-normal">Color</th>
                      <th className="text-left py-3 px-2 font-normal">Clarity</th>
                      <th className="text-left py-3 px-2 font-normal">Cut</th>
                      <th className="text-left py-3 px-2 font-normal">Cert.</th>
                      <th className="text-right py-3 px-2 font-normal">Price</th>
                      <th className="py-3 px-2" />
                    </tr>
                  </thead>
                  <tbody>
                    {SAMPLE_DIAMONDS.map((diamond) => (
                      <motion.tr
                        key={diamond.id}
                        whileHover={{ backgroundColor: '#faf9f6' }}
                        onClick={() => { setSelectedDiamond(diamond); setStep(startWith === 'diamond' ? 'setting' : 'summary'); }}
                        className={`border-b border-gray-50 cursor-pointer transition-colors ${selectedDiamond?.id === diamond.id ? 'bg-gold-50' : ''}`}
                      >
                        <td className="py-4 px-2 capitalize font-medium text-charcoal">{diamond.shape}</td>
                        <td className="py-4 px-2 text-gray-600">{diamond.caratWeight}ct</td>
                        <td className="py-4 px-2">
                          <span className="px-2 py-0.5 bg-gray-100 text-charcoal text-xs rounded-sm">{diamond.color}</span>
                        </td>
                        <td className="py-4 px-2">
                          <span className="px-2 py-0.5 bg-gray-100 text-charcoal text-xs rounded-sm">{diamond.clarity}</span>
                        </td>
                        <td className="py-4 px-2 text-gray-600">{diamond.cut}</td>
                        <td className="py-4 px-2">
                          <span className={`text-xs font-medium ${diamond.certification === 'GIA' ? 'text-blue-600' : 'text-green-600'}`}>
                            {diamond.certification}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-right font-serif text-base text-charcoal">{formatPrice(diamond.price)}</td>
                        <td className="py-4 px-2 text-right">
                          {selectedDiamond?.id === diamond.id
                            ? <CheckCircle size={16} className="text-gold-500 ml-auto" />
                            : <Plus size={16} className="text-gray-300 group-hover:text-gold-500 ml-auto" />
                          }
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={() => setStep('setting')} className="flex items-center gap-2 text-sm text-gray-400 hover:text-charcoal transition-colors font-sans">
                  <ArrowLeft size={14} /> Back to Settings
                </button>
                {selectedDiamond && (
                  <button
                    onClick={() => setStep('summary')}
                    className="flex items-center gap-2 px-6 py-3 bg-charcoal text-white text-xs uppercase tracking-widest font-sans hover:bg-gold-500 transition-colors"
                  >
                    Continue <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP: Summary */}
          {step === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white border border-gray-100 shadow-sm">
                <div className="border-b border-gray-100 px-8 py-6">
                  <h2 className="font-serif text-2xl text-charcoal">Your Custom Ring</h2>
                  <p className="text-sm text-gray-400 font-sans mt-1">Review and personalise your bespoke creation</p>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Preview */}
                  <div>
                    {selectedSetting && (
                      <img
                        src={selectedSetting.imageUrl}
                        alt={selectedSetting.name}
                        className="w-full aspect-square object-cover"
                      />
                    )}
                    <div className="flex gap-2 mt-4">
                      {METALS.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setSelectedMetal(m.id as MetalType)}
                          title={m.label}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${selectedMetal === m.id ? 'border-charcoal scale-110' : 'border-transparent hover:border-gray-300'}`}
                          style={{ backgroundColor: m.color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-5">
                    {selectedSetting && (
                      <div className="flex items-start justify-between border-b border-gray-50 pb-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-gold-500 font-sans">Setting</p>
                          <p className="font-serif text-lg text-charcoal mt-1">{selectedSetting.name}</p>
                          <p className="text-xs text-gray-400 font-sans">{METALS.find(m => m.id === selectedMetal)?.label} · {selectedSetting.style}</p>
                        </div>
                        <span className="font-serif text-lg text-charcoal">{formatPrice(selectedSetting.price)}</span>
                      </div>
                    )}

                    {selectedDiamond ? (
                      <div className="flex items-start justify-between border-b border-gray-50 pb-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-gold-500 font-sans">Diamond</p>
                          <p className="font-serif text-lg text-charcoal mt-1 capitalize">{selectedDiamond.caratWeight}ct {selectedDiamond.shape}</p>
                          <p className="text-xs text-gray-400 font-sans">{selectedDiamond.color} Color · {selectedDiamond.clarity} · {selectedDiamond.certification} Certified</p>
                        </div>
                        <span className="font-serif text-lg text-charcoal">{formatPrice(selectedDiamond.price)}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setStep('diamond')}
                        className="flex items-center gap-2 w-full border-2 border-dashed border-gray-200 hover:border-gold-400 py-4 px-4 transition-colors group"
                      >
                        <Plus size={16} className="text-gray-300 group-hover:text-gold-400" />
                        <span className="text-sm text-gray-400 group-hover:text-gold-500 font-sans">Add a Diamond</span>
                      </button>
                    )}

                    {/* Ring Size */}
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-sans mb-2">Ring Size</p>
                      <div className="flex flex-wrap gap-2">
                        {[4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map((size) => (
                          <button
                            key={size}
                            onClick={() => setRingSize(size)}
                            className={`w-10 h-10 border text-xs font-sans transition-all ${ringSize === size ? 'bg-charcoal text-white border-charcoal' : 'border-gray-200 text-charcoal hover:border-gold-500'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Engraving */}
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-sans mb-2">Engraving (optional)</p>
                      <input
                        type="text"
                        maxLength={25}
                        value={engraving}
                        onChange={(e) => setEngraving(e.target.value)}
                        placeholder="e.g. Forever Yours"
                        className="w-full border border-gray-200 px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-gold-500 transition-colors"
                      />
                      <p className="text-[10px] text-gray-400 font-sans mt-1">{engraving.length}/25 characters</p>
                    </div>

                    {/* Total */}
                    <div className="bg-cream p-4 flex items-center justify-between">
                      <span className="font-sans text-sm text-gray-600">Total Price</span>
                      <span className="font-serif text-2xl text-charcoal">{formatPrice(totalPrice)}</span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleAddToCart}
                      disabled={!selectedSetting}
                      className="w-full py-4 bg-charcoal text-white text-xs uppercase tracking-widest font-sans hover:bg-gold-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ShoppingBag size={14} />
                      Add Custom Ring to Bag
                    </motion.button>
                    <button onClick={handleReset} className="w-full flex items-center justify-center gap-2 text-xs text-gray-400 hover:text-charcoal transition-colors font-sans uppercase tracking-wider">
                      <RotateCcw size={12} /> Start Over
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-start mt-6">
                <button onClick={() => setStep('diamond')} className="flex items-center gap-2 text-sm text-gray-400 hover:text-charcoal transition-colors font-sans">
                  <ArrowLeft size={14} /> Back
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
