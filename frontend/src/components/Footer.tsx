import React from 'react';
import { Github, Twitter, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-lg shadow-sm border-t border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
          <div className="text-sm font-medium relative group justify-self-center md:justify-self-start">
            <div className="absolute rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center gap-1.5 text-gray-800">
              Powered by 
              <span className="bg-gradient-to-r text-blue-500 bg-clip-text text-transparent font-semibold">
                ZKVerify
              </span>
              <Heart className="w-3 h-3 text-blue-500 animate-pulse" fill="currentColor" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <a 
              href="#" 
              className="text-gray-600 hover:text-blue-600 transition-colors p-1 hover:bg-blue-50 rounded-full"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-blue-600 transition-colors p-1 hover:bg-blue-50 rounded-full"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="text-[10px] text-gray-600 justify-self-center md:justify-self-end flex items-center gap-1.5">
            © {new Date().getFullYear()} WinWave. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}