import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              layout
              className={`flex items-center gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md min-w-[300px] ${
                toast.type === 'success' 
                  ? 'bg-white/90 border-green-200 text-green-800 dark:bg-gray-800 dark:border-green-900 dark:text-green-400' 
                  : toast.type === 'error'
                  ? 'bg-white/90 border-red-200 text-red-800 dark:bg-gray-800 dark:border-red-900 dark:text-red-400'
                  : 'bg-white/90 border-blue-200 text-blue-800 dark:bg-gray-800 dark:border-blue-900 dark:text-blue-400'
              }`}
            >
              {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
              {toast.type === 'error' && <XCircle className="w-5 h-5" />}
              {toast.type === 'info' && <Info className="w-5 h-5" />}
              
              <p className="flex-1 text-sm font-medium">{toast.message}</p>
              
              <button onClick={() => removeToast(toast.id)} className="opacity-50 hover:opacity-100">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
