"use client";

import { motion } from "framer-motion";

export function BentoGridSection() {
  return (
    <section id="features" className="relative py-24 bg-[#0A0908] border-b border-[#2A2622]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono text-[#EAB308] uppercase tracking-widest bg-[#1A1714] px-4 py-1.5 rounded-full border border-[#332E28] mb-4">
            ACOUSTIC INTENTIONALITY
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F3EFE6] tracking-tight">
            How MoodTune shapes your listening room.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#A39E93] max-w-2xl mx-auto font-sans">
            Every recommendation is calculated using acoustic valence curves, tempo dynamics, and human emotional intent.
          </p>
        </motion.div>

        {/* Tactile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Valence & Energy Calibration */}
          <div className="p-8 rounded-2xl bg-[#141210] border border-[#2E2924] flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#EAB308] uppercase tracking-wider">
                  01 • CALIBRATION
                </span>
                <span className="text-xs font-mono text-[#A39E93]">VALENCE METRIC</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#F3EFE6] mb-3">
                Acoustic Valence Meter
              </h3>
              <p className="text-sm text-[#A39E93] leading-relaxed">
                Rather than grouping songs by generic genres like &ldquo;pop&rdquo; or &ldquo;indie&rdquo;, we analyze musical positivity (valence) and energy spectrums.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0D0C0A] border border-[#2A2622] space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-[#F3EFE6] mb-1">
                  <span>Acoustic Positivity</span>
                  <span className="text-[#EAB308]">84%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#25221E] overflow-hidden">
                  <div className="h-full bg-[#EAB308] w-[84%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#F3EFE6] mb-1">
                  <span>Tempo Resonance</span>
                  <span className="text-[#EAB308]">118 BPM</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#25221E] overflow-hidden">
                  <div className="h-full bg-[#EAB308] w-[72%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Spotify Studio Sync */}
          <div className="p-8 rounded-2xl bg-[#141210] border border-[#2E2924] flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#10B981] uppercase tracking-wider">
                  02 • INTEGRATION
                </span>
                <span className="text-xs font-mono text-[#A39E93]">SPOTIFY SDK</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#F3EFE6] mb-3">
                Direct Spotify Connection
              </h3>
              <p className="text-sm text-[#A39E93] leading-relaxed">
                Stream 30-second previews instantly as a guest, or log in with Spotify to play full tracks in-app and save curated mood playlists directly to your library.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0D0C0A] border border-[#2A2622] flex items-center gap-4">
              <img
                src="https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/21/ee/b2/2ceeb2a4-db01-923f-e14f-6f9160ebce0f/886449976735.jpg/600x600bb.jpg"
                alt="Harry Styles"
                className="w-12 h-12 rounded-lg object-cover border border-[#332E28]"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-mono font-bold text-[#F3EFE6] truncate">As It Was</h4>
                <p className="text-[11px] font-mono text-[#A39E93] truncate">Harry Styles • Harry&apos;s House</p>
              </div>
              <span className="px-2 py-1 text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 rounded border border-[#10B981]/20">
                READY
              </span>
            </div>
          </div>

          {/* Card 3: AI Liner Notes */}
          <div className="p-8 rounded-2xl bg-[#141210] border border-[#2E2924] flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#F43F5E] uppercase tracking-wider">
                  03 • LINER NOTES
                </span>
                <span className="text-xs font-mono text-[#A39E93]">REASONING</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#F3EFE6] mb-3">
                &ldquo;Why These Tracks?&rdquo; Explanations
              </h3>
              <p className="text-sm text-[#A39E93] leading-relaxed">
                Click &ldquo;Why these tracks?&rdquo; anytime to inspect AI explanations detailing acoustic keys, tempo transitions, and emotional harmony.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0D0C0A] border border-[#2A2622] text-xs font-mono text-[#C4BFB5] leading-relaxed">
              <span className="text-[#F43F5E] font-bold block mb-1">EXPLANATION:</span>
              &ldquo;Picked for its warm analog bass resonance at 92 BPM, matching your mellow introspective state.&rdquo;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
