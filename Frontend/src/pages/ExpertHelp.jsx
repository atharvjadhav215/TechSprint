import React from 'react';
import { motion } from 'framer-motion';
import { Video, Phone, MessageSquare, Calendar, Star } from 'lucide-react';
import { Button } from '../components/common/Button';

const EXPERTS = [
  { id: 1, name: "Dr. Ramesh Pawar", role: "Agronomist (PhD)", special: "Soil Health", exp: "15 Yrs", rating: 4.9, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh", online: true },
  { id: 2, name: "Priya Desai", role: "Crop Pathologist", special: "Pest Control", exp: "8 Yrs", rating: 4.8, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya", online: false },
  { id: 3, name: "Sanjay Mehta", role: "Organic Farming Expert", special: "Sustainable Ag", exp: "12 Yrs", rating: 4.7, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sanjay", online: true },
];

export const ExpertHelp = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold dark:text-white pb-2">Expert Consultation</h1>
        <p className="text-gray-500">Get 1-on-1 advice from certified agricultural experts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EXPERTS.map((expert) => (
          <motion.div
            key={expert.id}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden"
          >
            {expert.online && (
              <div className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> ONLINE
              </div>
            )}
            
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-24 h-24 mb-4 relative">
                <img src={expert.img} className="w-full h-full rounded-full bg-gray-50" alt={expert.name} />
                <div className="absolute bottom-0 right-0 bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center shadow-sm">
                  <Star className="w-3 h-3 fill-black mr-0.5" /> {expert.rating}
                </div>
              </div>
              <h3 className="text-xl font-bold dark:text-white">{expert.name}</h3>
              <p className="text-[var(--color-agro-green)] font-medium text-sm mb-1">{expert.role}</p>
              <p className="text-gray-400 text-xs">{expert.special} • {expert.exp} Exp</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="w-full rounded-xl" icon={MessageSquare}>Chat</Button>
              <Button size="sm" className="w-full rounded-xl" icon={Video} disabled={!expert.online}>Video Call</Button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-center">
               <button className="text-xs text-gray-500 font-medium hover:text-[var(--color-agro-green)] flex items-center justify-center gap-1 mx-auto">
                 <Calendar className="w-3 h-3" /> Schedule for later
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
