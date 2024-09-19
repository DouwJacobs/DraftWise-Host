'use client'

import Image from 'next/image'
import topogrophy from 'public/topography.svg'

export default function Landing() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 text-white">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          priority
          src={topogrophy}
          alt="background topography image"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
      </div>
      <div className="relative z-10 p-6 max-w-2xl mx-auto text-center sm:mx-auto sm:w-full">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl ">
            Welcome to Draftwise
          </h1>
          <p className="text-lg font-bold mb-8 mt-8">
            Streamline your legal workflows with ease. Create quotes and
            antenuptial contracts effortlessly with our intuitive platform.
          </p>
          <button
            onClick={() => scrollToSection('pricing')}
            className="bg-white text-emerald-500 py-3 px-6 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Explore Pricing Plans
          </button>
        </div>
      </div>
    </div>
  )
}
