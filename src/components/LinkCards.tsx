import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, ArrowUpRight, Mail } from 'lucide-react';
import { SocialLink } from '../types';
import {
  TikTokIcon,
  WhatsAppIcon,
  TelegramIcon,
  InstagramIcon,
  SaweriaIcon,
} from './SocialIcons';

const linksData: SocialLink[] = [
  {
    id: 'tiktok',
    name: 'TikTok',
    username: '@_enzyk',
    url: 'https://www.tiktok.com/@_enzyk',
    description: 'Tech shorts, developer insights & backend tips',
    badge: 'Shorts & Tech',
    brandColor: '#000000',
    bgAccent: 'group-hover:bg-slate-900 group-hover:text-white',
    textColor: 'text-slate-900',
    iconName: 'tiktok',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    username: 'wa.me/enzuvk',
    url: 'https://wa.me/enzuvk',
    description: 'Fast direct chat for urgent inquiries & projects',
    badge: 'Quick Chat',
    brandColor: '#25D366',
    bgAccent: 'group-hover:bg-[#25D366] group-hover:text-white',
    textColor: 'text-emerald-600',
    iconName: 'whatsapp',
  },
  {
    id: 'email',
    name: 'Email',
    username: 'me@ofcsan.cfd',
    url: 'mailto:me@ofcsan.cfd',
    description: 'Official inquiries, collaborations & business',
    badge: 'Business',
    brandColor: '#4F46E5',
    bgAccent: 'group-hover:bg-indigo-600 group-hover:text-white',
    textColor: 'text-indigo-600',
    iconName: 'email',
  },
  {
    id: 'saweria',
    name: 'Saweria',
    username: 'saweria.co/xsenavuck',
    url: 'https://saweria.co/xsenavuck',
    description: 'Support my open-source work with a cup of coffee',
    badge: 'Tip & Support',
    brandColor: '#F59E0B',
    bgAccent: 'group-hover:bg-amber-500 group-hover:text-white',
    textColor: 'text-amber-600',
    iconName: 'saweria',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    username: '@enzvuck',
    url: 'https://t.me/enzvuck',
    description: 'Direct messaging and technical discussions',
    badge: 'Direct Message',
    brandColor: '#229ED9',
    bgAccent: 'group-hover:bg-[#229ED9] group-hover:text-white',
    textColor: 'text-sky-600',
    iconName: 'telegram',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    username: '@v1enzyk',
    url: 'https://instagram.com/v1enzyk',
    description: 'Daily life, personal updates & stories',
    badge: 'Personal',
    brandColor: '#E1306C',
    bgAccent: 'group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:via-rose-500 group-hover:to-purple-600 group-hover:text-white',
    textColor: 'text-rose-600',
    iconName: 'instagram',
  },
];

const renderIcon = (iconName: SocialLink['iconName']) => {
  switch (iconName) {
    case 'tiktok':
      return <TikTokIcon size={18} />;
    case 'whatsapp':
      return <WhatsAppIcon size={18} />;
    case 'email':
      return <Mail size={18} />;
    case 'saweria':
      return <SaweriaIcon size={18} />;
    case 'telegram':
      return <TelegramIcon size={18} />;
    case 'instagram':
      return <InstagramIcon size={18} />;
  }
};

export const LinkCards: React.FC = () => {
  return (
    <section aria-label="Social and Contact Links" className="w-full space-y-3 sm:space-y-3.5">
      {linksData.map((link, idx) => {
        const isEmail = link.url.startsWith('mailto:');
        return (
          <motion.a
            key={link.id}
            href={link.url}
            target={isEmail ? undefined : '_blank'}
            rel={isEmail ? undefined : 'noopener noreferrer'}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.15 + idx * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -3, scale: 1.012 }}
            whileTap={{ scale: 0.99, y: 1 }}
            className="group relative block w-full p-3.5 sm:p-4 rounded-2xl bg-white/95 border-2 border-slate-900/10 shadow-[0_4px_0_0_rgba(148,163,184,0.3)] hover:shadow-[0_8px_0_0_rgba(148,163,184,0.4)] hover:border-slate-900/20 transition-all duration-200"
          >
            <div className="flex items-center justify-between gap-3">
              {/* Left Zone: Icon & Name/Username */}
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Brand Icon Squircle Container */}
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 border border-slate-200/80 bg-slate-50/80 transition-colors duration-200"
                  style={{ color: link.brandColor }}
                >
                  {renderIcon(link.iconName)}
                </div>

                {/* Details */}
                <div className="min-w-0 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm sm:text-base text-slate-900 truncate group-hover:text-sky-700 transition-colors">
                      {link.name}
                    </span>
                    <span className="hidden xs:inline-block text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                      {link.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 font-mono truncate mt-0.5">
                    {link.username}
                  </p>
                </div>
              </div>

              {/* Right Zone: Clean action pill / arrow indicator */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:inline-flex text-xs font-mono font-medium text-slate-400 group-hover:text-slate-700 transition-colors">
                  {isEmail ? 'Send mail' : 'Visit'}
                </span>
                <div className="w-8 h-8 rounded-xl bg-slate-100/90 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center text-slate-500 transition-all duration-200 shadow-2xs">
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2.5}
                    className="transform transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </div>
          </motion.a>
        );
      })}
    </section>
  );
};
