"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlayer } from "@/components/player/PlayerContext";

interface NetworkNode {
  id: string;
  title: string;
  artist: string;
  cover: string;
  spotifyUrl: string;
  similarity: string;
}

const NETWORK_PRESETS: Record<string, { seed: NetworkNode; neighbors: NetworkNode[] }> = {
  "texas-sun": {
    seed: {
      id: "seed-1",
      title: "Texas Sun",
      artist: "Khruangbin & Leon Bridges",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/bf/16/c0/bf16c024-e9ed-c77a-ecae-8bfefbf3f6ef/656605151566.jpg/600x600bb.jpg",
      spotifyUrl: "https://open.spotify.com/search/Texas%20Sun%20Khruangbin",
      similarity: "100%",
    },
    neighbors: [
      { id: "n1", title: "Show Me How", artist: "Men I Trust", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d9/38/2e/d9382e88-6625-635e-c4bb-eaefc60965e6/artwork.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Show%20Me%20How%20Men%20I%20Trust", similarity: "96% MATCH" },
      { id: "n2", title: "The Less I Know The Better", artist: "Tame Impala", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bf/f6/28/bff628e8-d6cb-022e-a5bf-8547a4b08709/15UMGIM81958.rgb.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/The%20Less%20I%20Know%20The%20Better", similarity: "94% MATCH" },
      { id: "n3", title: "Chamber of Reflection", artist: "Mac DeMarco", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/eb/03/49/eb0349ca-4700-1c09-7d88-b4b9b9909fb5/817949019688.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Chamber%20of%20Reflection", similarity: "91% MATCH" },
      { id: "n4", title: "Space Song", artist: "Beach House", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ee/17/ef/ee17efdb-01eb-c5a4-ee4f-56df01691238/098787114068.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Space%20Song%20Beach%20House", similarity: "89% MATCH" },
      { id: "n5", title: "Sunsetz", artist: "Cigarettes After Sex", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/cc/26/54/cc26543d-8339-f408-8892-4b17b94921ff/720841214620.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Sunsetz%20Cigarettes%20After%20Sex", similarity: "88% MATCH" },
    ],
  },
};

export function SimilarSongsFinder() {
  const { playTrack } = usePlayer();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNetwork, setActiveNetwork] = useState(NETWORK_PRESETS["texas-sun"]);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Generate dynamic node based on search
    const newSeed: NetworkNode = {
      id: "search-seed",
      title: searchQuery,
      artist: "Searched Track",
      cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
      spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(searchQuery)}`,
      similarity: "100%",
    };
    setActiveNetwork({
      seed: newSeed,
      neighbors: NETWORK_PRESETS["texas-sun"].neighbors,
    });
  };

  const handleNodeClick = (node: NetworkNode) => {
    setSelectedNode(node);
    playTrack({
      id: node.title,
      name: node.title,
      artist: node.artist,
      albumImageUrl: node.cover,
      spotifyUrl: node.spotifyUrl,
    });
  };

  return (
    <section className="relative py-24 lg:py-32 bg-[#080811] text-white border-b border-[#16162A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title & Search Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 text-left space-y-3">
            <div className="text-xs font-mono tracking-widest text-[#1DB954] uppercase font-bold">
              CHOSIC INSPIRED / SIMILAR SONGS FINDER
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Create Your Dream Playlist
            </h2>
            <p className="text-base text-slate-300 font-normal">
              Find similar songs to your favorite music and explore interconnected acoustic networks.
            </p>
          </div>

          {/* Search Box */}
          <div className="lg:col-span-5">
            <form onSubmit={handleSearch} className="flex items-center gap-2 bg-[#0E0E1B] border border-[#1E1E38] p-2 rounded-full shadow-lg">
              <input
                type="text"
                placeholder="Search any song or artist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs uppercase tracking-wider transition-all"
              >
                Find Similar
              </button>
            </form>
          </div>
        </div>

        {/* Chosic-style Constellation Similarity Map */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0E0E1B] border-2 border-[#1E1E38] shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[460px]">
          
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1DB954]/5 via-transparent to-purple-500/5 pointer-events-none" />

          {/* Network Visualization Container */}
          <div className="relative w-full max-w-3xl h-80 sm:h-96 flex items-center justify-center">
            
            {/* Center Seed Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => handleNodeClick(activeNetwork.seed)}
              className="z-20 p-3 rounded-2xl bg-[#052317] border-2 border-[#1DB954] shadow-[0_0_40px_rgba(29,185,84,0.4)] flex flex-col items-center gap-2 cursor-pointer w-36 sm:w-44 text-center"
            >
              <img
                src={activeNetwork.seed.cover}
                alt={activeNetwork.seed.title}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-[#10B981]/30 shadow-md"
              />
              <div>
                <h4 className="font-bold text-xs text-white truncate max-w-[120px]">{activeNetwork.seed.title}</h4>
                <p className="text-[10px] text-[#1DB954] font-mono truncate max-w-[120px]">{activeNetwork.seed.artist}</p>
              </div>
            </motion.div>

            {/* Connecting Lines and Surrounding Nodes */}
            {activeNetwork.neighbors.map((neighbor, idx) => {
              const angle = (idx / activeNetwork.neighbors.length) * 2 * Math.PI - Math.PI / 2;
              const radius = 150; // Radius in pixels for desktop
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <React.Fragment key={neighbor.id}>
                  {/* Connecting Line SVG */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`calc(50% + ${x}px)`}
                      y2={`calc(50% + ${y}px)`}
                      stroke="#1DB954"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="animate-pulse"
                    />
                  </svg>

                  {/* Neighbor Node Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.1, zIndex: 30 }}
                    onClick={() => handleNodeClick(neighbor)}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    className="absolute z-20 p-2.5 rounded-2xl bg-[#121222] border border-[#232342] hover:border-[#1DB954] shadow-lg flex flex-col items-center gap-1.5 cursor-pointer w-28 sm:w-32 text-center group"
                  >
                    <img
                      src={neighbor.cover}
                      alt={neighbor.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-white/10"
                    />
                    <div>
                      <span className="text-[9px] font-mono text-[#1DB954] font-bold block">{neighbor.similarity}</span>
                      <h5 className="font-bold text-[11px] text-white truncate max-w-[100px] group-hover:text-[#1DB954] transition-colors">
                        {neighbor.title}
                      </h5>
                    </div>
                  </motion.div>
                </React.Fragment>
              );
            })}
          </div>

          <p className="text-xs font-mono text-slate-400 mt-6 z-20">
            Click any song node in the constellation map to play its preview or refocus the network!
          </p>
        </div>
      </div>
    </section>
  );
}
