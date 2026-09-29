/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { DecorativeBackground } from './components/DecorativeBackground';
import { ProfileHeader } from './components/ProfileHeader';
import { LinkCards } from './components/LinkCards';
import { FloatingMusicPlayer } from './components/MusicPlayer';
import { GithubContributionGraph } from './components/GithubContributionGraph';
import { ContactCardModal } from './components/ContactCardModal';
import { Footer } from './components/Footer';

export default function App() {
  // Sync URL to /profile if path is empty or root while supporting both cleanly
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      window.history.replaceState(null, '', '/profile');
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f0f4f9] text-slate-800 font-sans selection:bg-sky-200 selection:text-sky-900 overflow-x-hidden flex flex-col justify-between">
      {/* Abstract Rounded Shapes Background & Floating Decorative Elements */}
      <DecorativeBackground />

      {/* Main Content Layout Container */}
      <main className="relative z-10 w-full max-w-xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-6 flex-1 flex flex-col items-center">
        {/* Ordered Sections:
            1. Profile
            2. Links
            3. GitHub contribution graph
            4. Download Contact
            5. Footer
        */}
        <div className="w-full space-y-6 sm:space-y-7">
          {/* 1. Profile */}
          <ProfileHeader />

          {/* 2. Links */}
          <LinkCards />

          {/* 3. GitHub Contribution Graph */}
          <GithubContributionGraph />

          {/* 4. Download Contact */}
          <ContactCardModal />

          {/* 5. Footer */}
          <Footer />
        </div>
      </main>

      {/* Persistent Floating Mini-Window Spotify Player */}
      <FloatingMusicPlayer />
    </div>
  );
}
