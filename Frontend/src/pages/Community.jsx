import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ThumbsUp, User, Search, Filter } from 'lucide-react';
import { Button } from '../components/common/Button';

const TOPICS = ["All", "Crop Diseases", "Market Prices", "Organic Farming", "Weather"];

const INITIAL_POSTS = [
  { id: 1, author: "Ram Patil", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ram", time: "2m ago", topic: "Crop Diseases",   content: "My wheat crop leaves are turning yellow. Is this rust? Attached photo.", likes: 12, replies: 4 },
  { id: 2, author: "Suresh G", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh", time: "15m ago", topic: "Market Prices", content: "Onion prices in Lasalgaon are expected to rise next week. Hold your stock!", likes: 45, replies: 12 },
  { id: 3, author: "Anita D", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anita", time: "1h ago", topic: "Organic Farming", content: "Has anyone tried Vermicompost for tomatoes? Sharing my results!", likes: 8, replies: 2 },
];

export const Community = () => {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeTopic, setActiveTopic] = useState("All");
  
  // Simulate new posts
  useEffect(() => {
    const interval = setInterval(() => {
      const newPost = {
        id: Date.now(),
        author: "New User " + Math.floor(Math.random() * 100),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
        time: "Just now",
        topic: TOPICS[Math.floor(Math.random() * (TOPICS.length - 1)) + 1],
        content: "Anyone facing water shortage in Sinnar area?",
        likes: 0,
        replies: 0,
        isNew: true
      };
      setPosts(prev => [newPost, ...prev]);
    }, 15000); // New post every 15s

    return () => clearInterval(interval);
  }, []);

  const filteredPosts = activeTopic === "All" ? posts : posts.filter(p => p.topic === activeTopic);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-bold dark:text-white mb-2">Farmer Community 🤝</h1>
           <p className="text-gray-500">Connect with fellow farmers and experts.</p>
        </div>
        <Button icon={MessageCircle}>Start Discussion</Button>
      </div>

      {/* Topics */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        {TOPICS.map(topic => (
          <button
            key={topic}
            onClick={() => setActiveTopic(topic)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              activeTopic === topic 
                ? 'bg-[var(--color-agro-green)] text-white shadow-lg shadow-green-500/20' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
              className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 ${post.isNew ? 'border-blue-200 bg-blue-50/30' : ''}`}
            >
              <div className="flex items-start gap-4">
                <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full bg-gray-100" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{post.author}</h3>
                      <p className="text-xs text-gray-500">{post.time} • <span className="text-[var(--color-agro-green)]">{post.topic}</span></p>
                    </div>
                  </div>
                  
                  <p className="my-3 text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                    {post.content}
                  </p>

                  <div className="flex gap-6 text-gray-500 text-sm">
                    <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                      <ThumbsUp className="w-4 h-4" /> {post.likes}
                    </button>
                    <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-4 h-4" /> {post.replies} Replies
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
