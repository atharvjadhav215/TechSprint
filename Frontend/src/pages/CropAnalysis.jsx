import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Scan, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { api } from '../services/mockApi';

export const CropAnalysis = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setAnalyzing(true);
    try {
      const data = await api.vision.analyze(image);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">AI Crop Diagnosis</h1>
        <p className="text-gray-500">Upload a clear photo of your affected crop for instant analysis.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-4">
          <div 
            className={`border-4 border-dashed rounded-3xl h-80 flex flex-col items-center justify-center relative overflow-hidden transition-colors ${
              preview ? 'border-[var(--color-agro-green)]' : 'border-gray-300 dark:border-gray-700 hover:border-[var(--color-agro-green)]'
            }`}
          >
            {preview ? (
              <>
                <img src={preview} alt="Crop" className="w-full h-full object-cover" />
                {!analyzing && !result && (
                  <button onClick={reset} className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70">
                    <X className="w-5 h-5" />
                  </button>
                )}
                {analyzing && (
                  <motion.div 
                    className="absolute inset-0 bg-black/30 flex items-center justify-center"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  >
                    <div className="relative">
                      {/* Scanning Line */}
                      <motion.div 
                        className="w-64 h-1 bg-[var(--color-agro-green)] shadow-[0_0_20px_rgba(34,197,94,1)] mb-4 absolute"
                        animate={{ top: [-150, 150] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      />
                      <div className="bg-white px-6 py-3 rounded-full flex items-center gap-3">
                        <Scan className="w-5 h-5 animate-pulse text-[var(--color-agro-green)]" />
                        <span className="font-bold">Analyzing...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              <label className="cursor-pointer flex flex-col items-center p-8 text-center w-full h-full justify-center">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                  <Upload className="w-8 h-8 text-gray-500" />
                </div>
                <span className="text-lg font-bold text-gray-700 dark:text-gray-300">Click to Upload</span>
                <span className="text-sm text-gray-500 mt-2">or drag and drop JPG, PNG</span>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            )}
          </div>

          <Button 
            className="w-full py-4 text-lg" 
            onClick={handleAnalyze} 
            disabled={!image || analyzing || result}
            variant={result ? "secondary" : "primary"}
          >
            {result ? "Analysis Complete" : "Analyze Image"}
          </Button>
        </div>

        {/* Results Section */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`h-full rounded-3xl p-8 border ${result.healthy ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-full ${result.healthy ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {result.healthy ? <CheckCircle className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider opacity-60">Result</p>
                    <h2 className="text-2xl font-bold">{result.disease}</h2>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/60 p-4 rounded-xl">
                    <div className="flex justify-between mb-2 text-sm font-medium">
                      <span>Confidence Score</span>
                      <span>{(result.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${result.healthy ? 'bg-green-500' : 'bg-red-500'}`}
                      />
                    </div>
                  </div>

                  {!result.healthy && (
                    <div className="bg-white/60 p-4 rounded-xl">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Sprout className="w-4 h-4" /> Recommended Solution
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {result.solution}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3 mt-8">
                     <Button variant="outline" className="flex-1" onClick={reset}>Scan Another</Button>
                     <Button className="flex-1">Save Report</Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 opacity-50"
              >
                <Scan className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="font-bold text-gray-400">Analysis Results</h3>
                <p className="text-sm text-gray-400">Results will appear here after scanning.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
