import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Info, CheckCircle, ChevronRight, Landmark } from 'lucide-react';
import { api } from '../services/mockApi';
import { Button } from '../components/common/Button';

export const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchSchemes = async () => {
      const data = await api.schemes.getAll();
      setSchemes(data);
      setLoading(false);
    };
    fetchSchemes();
  }, []);

  const filtered = schemes.filter(s => s.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 text-center bg-gradient-to-r from-orange-400 to-orange-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <Landmark className="absolute top-0 right-0 w-64 h-64 opacity-10 -mr-16 -mt-16" />
        <h1 className="text-3xl font-bold mb-2 relative z-10">Government Schemes</h1>
        <p className="opacity-90 relative z-10 max-w-xl mx-auto mb-6">Find financial support, subsidies, and insurance plans tailored for your farm.</p>
        
        <div className="relative max-w-md mx-auto z-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search schemes..." 
            className="w-full pl-12 pr-4 py-3 rounded-full text-gray-800 shadow-lg focus:ring-4 focus:ring-orange-500/30 outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
             [1,2,3].map(i => <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />)
        ) : (
          <AnimatePresence>
            {filtered.map((scheme) => (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.01 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex-1">
                  <div className="flex gap-2 mb-2">
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase">{scheme.category}</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Eligible
                    </span>
                  </div>
                  <h3 className="text-xl font-bold dark:text-white mb-2 group-hover:text-orange-600 transition-colors">{scheme.title}</h3>
                  <div className="flex gap-6 text-sm text-gray-500">
                    <p>Benefit: <span className="font-bold text-gray-800 dark:text-gray-200">{scheme.amount}</span></p>
                    <p>For: <span className="font-bold text-gray-800 dark:text-gray-200">{scheme.eligibility}</span></p>
                  </div>
                </div>
                <Button variant="outline" className="rounded-full group-hover:bg-orange-50 group-hover:text-orange-600 group-hover:border-orange-200" icon={ChevronRight}>View Details</Button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
