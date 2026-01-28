/**
 * Mock Service Worker to simulate backend API calls.
 * Uses realistic delays and random failures for authenticity.
 */

const DELAY_MS = {
  SHORT: 600,
  MEDIUM: 1200,
  LONG: 2500,
};

const SIMULATE_ERRORS = false; // Toggle for demo stability

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const maybeFail = async () => {
  if (SIMULATE_ERRORS && Math.random() < 0.1) {
    await wait(DELAY_MS.SHORT);
    throw new Error("Network Error: Server unreachable");
  }
};

export const api = {
  auth: {
    login: async (email, password) => {
      await wait(DELAY_MS.MEDIUM);
      await maybeFail();
      
      if (email === "fail@test.com") throw new Error("Invalid credentials");
      
      // Mock User
      return {
        id: "usr_12345",
        name: "Rajesh Kumar",
        email,
        role: email.includes("expert") ? "expert" : "farmer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
        token: "jwt_mock_token_" + Date.now(),
        location: "Nashik, Maharashtra",
        crops: ["Wheat", "Onion"]
      };
    },
    signup: async (data) => {
      await wait(DELAY_MS.LONG);
      return { success: true, message: "Account created successfully" };
    }
  },

  chat: {
    sendMessage: async (message, context = []) => {
      await wait(1500 + Math.random() * 1000); // Variable typing delay
      
      const lowerMsg = message.toLowerCase();
      let response = "I'm not sure I understand. Can you rephrase?";
      
      if (lowerMsg.includes("weather")) response = "Currently, it is 28°C in Nashik with clear skies. No rain expected for the next 3 days. Perfect for harvesting wheat.";
      else if (lowerMsg.includes("crop") || lowerMsg.includes("disease")) response = "It looks like your crop might be suffering from fungal infection based on recent humidity levels. Could you upload a photo for better analysis?";
      else if (lowerMsg.includes("price") || lowerMsg.includes("rate")) response = "The current market price for Onions in Lasalgaon Mandi is ₹1,200/quintal. Prices are expected to rise by 5% next week.";
      else if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) response = "Namaste! I am AgriBot. How can I help you with your farming today?";

      return {
        id: Date.now(),
        text: response,
        sender: "bot",
        timestamp: new Date().toISOString()
      };
    }
  },

  vision: {
    analyze: async (file) => {
      await wait(3000); // Process delay
      // Random mock result
      const results = [
        { disease: "Leaf Rust", confidence: 0.92, solution: "Apply Azoxystrobin fungicide tailored for wheat.", healthy: false },
        { disease: "Healthy Crop", confidence: 0.98, solution: "Keep maintaining current water levels.", healthy: true },
        { disease: "Early Blight", confidence: 0.85, solution: "Use copper-based fungicides and improve air circulation.", healthy: false }
      ];
      return results[Math.floor(Math.random() * results.length)];
    }
  },

  schemes: {
    getAll: async () => {
      await wait(DELAY_MS.SHORT);
      return [
        { id: 1, title: "PM Kisan Samman Nidhi", amount: "₹6,000/year", category: "Financial Support", eligibility: "Small Farmers (<2Ha)" },
        { id: 2, title: "Pradhan Mantri Fasal Bima Yojana", amount: "Insurance Cover", category: "Insurance", eligibility: "All Crops" },
        { id: 3, title: "Soil Health Card Scheme", amount: "Free Test", category: "Soil Health", eligibility: "All Farmers" },
        { id: 4, title: "Kisan Credit Card (KCC)", amount: "Low Interest Loan", category: "Credit", eligibility: "Land Owners" },
      ];
    }
  }
};
