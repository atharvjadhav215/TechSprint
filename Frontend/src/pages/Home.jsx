import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const LOGOS = [
  'crypto.com',
  'Podium',
  'FINOM',
  'RYANAIR',
  'amenitiz',
  'fever'
];

export const Home = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.from('.hero > *', {
      y: 50,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="w-full h-screen p-4">
        <section
          ref={heroRef}
          className="hero relative h-full rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center text-center"
          style={{
            background:
              'linear-gradient(180deg, #2e8b57 0%, #1a5f3a 100%)'
          }}
        >
          <h1 className="text-white text-5xl md:text-7xl font-extrabold leading-tight">
            Train & Manage <br />
            your <br />
            <span className="text-lime-300">Farm with AI</span>
          </h1>

          <p className="mt-6 text-lg text-green-100 max-w-xl">
            Make every harvest better, faster, and more consistent with AI-powered insights.
          </p>

          <div className="mt-10 flex items-center bg-white rounded-full px-4 py-2 shadow-xl w-full max-w-md">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 outline-none px-2 text-gray-700"
            />
            <button
              onClick={() => navigate('/signup')}
              className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-full font-semibold flex items-center gap-2"
            >
              See a demo <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-10 flex flex-wrap justify-center gap-8 text-white opacity-50 text-sm">
            {LOGOS.map((logo, i) => (
              <span key={i}>{logo}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};