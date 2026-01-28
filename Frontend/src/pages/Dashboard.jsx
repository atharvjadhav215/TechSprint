import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  TrendingUp, 
  AlertTriangle, 
  Sprout, 
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={item} className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Namaste, {user?.name.split(' ')[0]}! 🙏
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Here's what's happening on your farm today.</p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-sm font-medium text-gray-500">Nashik, Maharashtra</p>
          <p className="text-xl font-bold text-[var(--color-agro-green-dark)] dark:text-[var(--color-agro-green)]">28°C, Sunny</p>
        </div>
      </motion.div>

      {/* Weather & Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Weather Card */}
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none col-span-1 md:col-span-1 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
            <CloudSun className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">Weather</span>
              <CloudSun className="w-6 h-6" />
            </div>
            <div className="mt-4">
              <span className="text-5xl font-bold">28°</span>
              <span className="text-xl opacity-80 ml-1">Clear</span>
            </div>
            <div className="mt-6 flex gap-4 text-sm font-medium opacity-90">
              <div className="flex items-center gap-1">
                <Droplets className="w-4 h-4" /> 45%
              </div>
              <div className="flex items-center gap-1">
                <Wind className="w-4 h-4" /> 12 km/h
              </div>
            </div>
          </div>
        </Card>

        {/* Market Trends */}
        <Card className="bg-white dark:bg-gray-800 md:col-span-2">
           <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg dark:text-white">Market Rates (Mandi)</h3>
            </div>
            <Button size="sm" variant="outline" className="rounded-full text-xs">View All</Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { crop: "Wheat", price: "₹2,125", change: "+12%", trend: "up" },
              { crop: "Onion", price: "₹1,200", change: "-5%", trend: "down" },
              { crop: "Tomato", price: "₹850", change: "+2%", trend: "up" },
              { crop: "Soybean", price: "₹4,800", change: "+0.5%", trend: "up" },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.crop}</p>
                 <p className="text-lg font-bold text-gray-900 dark:text-white">{item.price}</p>
                 <p className={`text-xs font-bold flex items-center ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                   {item.trend === 'up' ? '↑' : '↓'} {item.change}
                 </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Action Modules */}
      <motion.h2 variants={item} className="text-xl font-bold mb-4 dark:text-white">Quick Actions</motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <ActionCard 
          title="Ask AgriBot" 
          desc="Get instant answers about crops, weather, and more."
          icon={MessageSquare}
          color="bg-purple-500"
          onClick={() => navigate('/dashboard/chatbot')}
        />
        <ActionCard 
          title="Analyze Crop" 
          desc="Upload photo to detect diseases."
          icon={Sprout}
          color="bg-[var(--color-agro-green)]"
          onClick={() => navigate('/dashboard/crop-analysis')}
        />
        <ActionCard 
          title="Schemes" 
          desc="Find government subsidies for you."
          icon={ArrowUpRight} // Replaced Landmark icon if needed, but Landmark is fine
          color="bg-[var(--color-agro-yellow)]"
          textColor="text-black"
          onClick={() => navigate('/dashboard/schemes')}
        />
         <ActionCard 
          title="Expert Help" 
          desc="Video call with agronomists."
          icon={TrendingUp} // Replaced
          color="bg-blue-500"
          onClick={() => navigate('/dashboard/experts')}
        />
      </div>

       {/* Alerts Section */}
       <motion.div variants={item}>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl p-6 flex items-start gap-4">
          <div className="bg-red-100 dark:bg-red-800 p-3 rounded-full shrink-0 animate-pulse">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-200" />
          </div>
          <div>
             <h3 className="font-bold text-red-800 dark:text-red-200 mb-1">Pest Alert: Fall Armyworm</h3>
             <p className="text-red-700 dark:text-red-300 text-sm mb-3">High risk of Fall Armyworm detected in Nashik region for Maize crops. Please check your fields immediately.</p>
             <Button size="sm" variant="danger" className="rounded-full text-xs">View Precautions</Button>
          </div>
        </div>
       </motion.div>

    </motion.div>
  );
};

const ActionCard = ({ title, desc, icon: Icon, color, textColor = "text-white", onClick }) => (
  <motion.button 
    whileHover={{ y: -5, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`relative overflow-hidden rounded-2xl p-6 text-left h-full w-full shadow-lg transition-shadow hover:shadow-xl ${color}`}
  >
    <div className="absolute top-0 right-0 p-4 opacity-10">
      <Icon className={`w-24 h-24 ${textColor === 'text-black' ? 'text-black' : 'text-white'}`} />
    </div>
    <div className={`relative z-10 flex flex-col h-full justify-between ${textColor}`}>
      <div className="bg-white/20 w-fit p-3 rounded-xl backdrop-blur-sm mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className={`text-sm opacity-90`}>{desc}</p>
      </div>
    </div>
  </motion.button>
);
