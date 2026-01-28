import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(null);

const translations = {
  en: {
    welcome: "Welcome",
    dashboard: "Dashboard",
    logout: "Logout",
    analyze_crop: "Analyze Crop",
    ask_expert: "Ask an Expert",
    community: "Community",
    govt_schemes: "Govt Schemes",
  },
  hi: {
    welcome: "स्वागत है",
    dashboard: "डैशबोर्ड",
    logout: "लॉग आउट",
    analyze_crop: "फसल विश्लेषण",
    ask_expert: "विशेषज्ञ से पूछें",
    community: "समुदाय",
    govt_schemes: "सरकारी योजनाएं",
  },
  mr: {
    welcome: "स्वागत आहे",
    dashboard: "डॅशबोर्ड",
    logout: "बाहेर पडा",
    analyze_crop: "पीक विश्लेषण",
    ask_expert: "तज्ञांना विचारा",
    community: "समुदाय",
    govt_schemes: "सरकारी योजना",
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
