import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  X,
  Check,
  Sparkles,
  Copy,
  Image as ImageIcon,
  FileText,
  RefreshCw,
  Share2,
} from 'lucide-react';

export const ContactCardModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloadedVcf, setDownloadedVcf] = useState(false);
  const [downloadedPng, setDownloadedPng] = useState(false);
  const [isRenderingCanvas, setIsRenderingCanvas] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // SVG Paths for high-resolution vector icon drawing on Canvas (No emojis)
  const drawVectorIcon = (
    ctx: CanvasRenderingContext2D,
    type: string,
    centerX: number,
    centerY: number,
    color = '#ffffff'
  ) => {
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;

    switch (type) {
      case 'whatsapp': {
        // WhatsApp Bubble & handset
        ctx.scale(0.9, 0.9);
        const p = new Path2D(
          'M0 -11C-6.07 -11 -11 -6.07 -11 0C-11 2.03 -10.45 3.93 -9.5 5.58L-11 11L-5.32 9.55C-3.72 10.47 -1.9 11 0 11C6.07 11 11 6.07 11 0C11 -6.07 6.07 -11 0 -11ZM5.9 3.8C5.65 4.5 4.5 5.05 3.9 5.1C3.4 5.15 2.8 5.1 1.3 4.5C-0.6 3.7 -1.8 1.8 -1.9 1.65C-2 1.5 -2.7 0.55 -2.7 -0.6C-2.7 -1.75 -2.1 -2.3 -1.9 -2.55C-1.7 -2.8 -1.4 -2.85 -1.2 -2.85C-1 -2.85 -0.8 -2.85 -0.65 -2.5C-0.45 -2.05 0 -0.85 0.05 -0.7C0.1 -0.55 0.1 -0.4 0 -0.25C-0.1 -0.1 -0.2 -0.05 -0.35 0.1C-0.5 0.25 -0.65 0.45 -0.8 0.6C-0.95 0.75 -1.1 0.9 -0.95 1.15C-0.8 1.4 -0.2 2.4 0.65 3.15C1.75 4.1 2.65 4.4 2.9 4.55C3.15 4.7 3.3 4.65 3.45 4.5C3.65 4.3 4.25 3.55 4.45 3.25C4.65 2.95 4.85 3 5.1 3.1C5.35 3.2 6.7 3.85 6.95 4C7.2 4.15 7.35 4.2 7.4 4.3C7.45 4.4 7.4 4.8 5.9 3.8Z'
        );
        ctx.fill(p);
        break;
      }
      case 'email': {
        // Crisp Envelope
        ctx.lineWidth = 2.2;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        // Box
        ctx.strokeRect(-11, -8, 22, 16);
        // V line
        ctx.beginPath();
        ctx.moveTo(-11, -7);
        ctx.lineTo(0, 1.5);
        ctx.lineTo(11, -7);
        ctx.stroke();
        break;
      }
      case 'telegram': {
        // Paper Airplane
        ctx.scale(0.85, 0.85);
        const p = new Path2D(
          'M-10 0.5L9 -8L-3 9.5L-5 3.5L-10 0.5ZM-3.5 2.5L4 -5L-2 4.5L-3.5 2.5Z'
        );
        ctx.fill(p);
        break;
      }
      case 'instagram': {
        // Modern Instagram Camera Outline & Dot
        ctx.lineWidth = 2;
        // Outer rounded box
        ctx.beginPath();
        ctx.roundRect(-10, -10, 20, 20, 5.5);
        ctx.stroke();
        // Inner circle
        ctx.beginPath();
        ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
        ctx.stroke();
        // Flash dot
        ctx.beginPath();
        ctx.arc(5.5, -5.5, 1.2, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case 'tiktok': {
        // TikTok musical note glyph
        ctx.scale(0.85, 0.85);
        const p = new Path2D(
          'M5.5 -8.5C4.2 -7 2.2 -6.5 1.5 -6.5V2.5C1.5 5 -0.5 7 -3 7C-5.5 7 -7.5 5 -7.5 2.5C-7.5 0 -5.5 -2 -3 -2C-2.4 -2 -1.8 -1.9 -1.3 -1.6V-11H1.5C1.5 -9.5 2.8 -8.5 5.5 -8.5Z'
        );
        ctx.fill(p);
        break;
      }
      case 'github': {
        // GitHub Octocat silhouette
        ctx.scale(0.85, 0.85);
        const p = new Path2D(
          'M0 -11C-6.08 -11 -11 -6.08 -11 0C-11 4.87 -7.84 9 -3.48 10.45C-2.93 10.55 -2.73 10.21 -2.73 9.92C-2.73 9.66 -2.74 8.76 -2.74 7.84C-5.8 8.51 -6.45 6.37 -6.45 6.37C-6.95 5.1 -7.67 4.76 -7.67 4.76C-8.67 4.08 -7.59 4.09 -7.59 4.09C-6.49 4.17 -5.91 5.23 -5.91 5.23C-4.93 6.91 -3.34 6.42 -2.71 6.14C-2.61 5.43 -2.33 4.95 -2.01 4.67C-4.45 4.39 -7.02 3.45 -7.02 -0.77C-7.02 -1.97 -6.59 -2.96 -5.88 -3.73C-6 -4.01 -6.37 -5.13 -5.78 -6.64C-5.78 -6.64 -4.86 -6.93 -2.77 -5.51C-1.89 -5.76 -0.95 -5.88 0 -5.88C0.95 -5.88 1.89 -5.76 2.77 -5.51C4.86 -6.93 5.78 -6.64 5.78 -6.64C6.37 -5.13 6 -4.01 5.88 -3.73C6.59 -2.96 7.02 -1.97 7.02 -0.77C7.02 3.46 4.44 4.38 2 -4.66C2.4 5.01 2.75 5.69 2.75 6.72C2.75 8.19 2.74 9.38 2.74 9.92C2.74 10.22 2.94 10.56 3.5 10.45C7.86 8.99 11 4.87 11 0C11 -6.08 6.08 -11 0 -11Z'
        );
        ctx.fill(p);
        break;
      }
      case 'saweria': {
        // Minimalist Coffee Cup
        ctx.lineWidth = 2;
        // Cup body
        ctx.beginPath();
        ctx.moveTo(-7, -5);
        ctx.lineTo(5, -5);
        ctx.lineTo(4, 5);
        ctx.quadraticCurveTo(4, 8, -1, 8);
        ctx.quadraticCurveTo(-6, 8, -6, 5);
        ctx.closePath();
        ctx.stroke();
        // Handle
        ctx.beginPath();
        ctx.arc(6.5, 0, 3, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();
        // Steam line
        ctx.beginPath();
        ctx.moveTo(-3, -8);
        ctx.lineTo(-3, -6.5);
        ctx.moveTo(1, -9);
        ctx.lineTo(1, -6.5);
        ctx.stroke();
        break;
      }
      case 'terminal': {
        // Developer Terminal prompt `>_`
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(-5, -4);
        ctx.lineTo(-1, 0);
        ctx.lineTo(-5, 4);
        ctx.moveTo(1, 4);
        ctx.lineTo(6, 4);
        ctx.stroke();
        break;
      }
      case 'map-pin': {
        // Clean Vector Map Pin
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, -3, 4.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, 1.5);
        ctx.lineTo(0, 6.5);
        ctx.stroke();
        break;
      }
      default:
        break;
    }
    ctx.restore();
  };

  // Function to render the clean, professional, non-emoji Canvas Card
  const drawContactCard = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsRenderingCanvas(true);

    // Canvas dimensions (Retina 2x resolution: 900x1260 for crisp vector export)
    const width = 900;
    const height = 1260;
    canvas.width = width;
    canvas.height = height;

    // Helper: Rounded Rectangle
    const roundRect = (
      x: number,
      y: number,
      w: number,
      h: number,
      radius: number,
      fill = true,
      stroke = true
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arcTo(x + w, y, x + w, y + h, radius);
      ctx.arcTo(x + w, y + h, x, y + h, radius);
      ctx.arcTo(x, y + h, x, y, radius);
      ctx.arcTo(x, y, x + w, y, radius);
      ctx.closePath();
      if (fill) ctx.fill();
      if (stroke) ctx.stroke();
    };

    // 1. Base Layer
    ctx.clearRect(0, 0, width, height);

    // Canvas Outer Margins
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(0, 0, width, height);

    // Card Inner Container
    const cardX = 40;
    const cardY = 40;
    const cardW = width - 80;
    const cardH = height - 80;

    // Soft Neo-Brutalist Outer Shadow
    ctx.fillStyle = 'rgba(15, 23, 42, 0.12)';
    roundRect(cardX + 10, cardY + 10, cardW, cardH, 40, true, false);

    // Card Background Gradient
    const bgGrad = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
    bgGrad.addColorStop(0, '#ffffff');
    bgGrad.addColorStop(0.5, '#f8fafc');
    bgGrad.addColorStop(1, '#edf5ff');
    ctx.fillStyle = bgGrad;
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 4;
    roundRect(cardX, cardY, cardW, cardH, 40, true, true);

    // Decorative Soft Edge Blobs (Clean geometry)
    ctx.save();
    ctx.beginPath();
    ctx.arc(cardX + cardW - 20, cardY + 20, 160, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(186, 230, 253, 0.3)';
    ctx.fill();
    ctx.restore();

    // 2. Header Bar
    // Badge 1: Identity Type
    ctx.fillStyle = '#0284c7';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    roundRect(cardX + 40, cardY + 36, 175, 38, 16, true, true);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px "Space Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('IDENTITY CARD', cardX + 127, cardY + 55);

    // Badge 2: Domain
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    roundRect(cardX + cardW - 210, cardY + 36, 170, 38, 16, true, true);
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 15px "Space Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('sann.web.id', cardX + cardW - 125, cardY + 55);

    // 3. Profile Section
    const photoX = cardX + 45;
    const photoY = cardY + 105;
    const photoSize = 150;

    // Photo Shadow & Squircle Border
    ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
    roundRect(photoX + 5, photoY + 5, photoSize, photoSize, 34, true, false);

    ctx.fillStyle = '#0284c7';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 3.5;
    roundRect(photoX, photoY, photoSize, photoSize, 34, true, true);

    // Draw Profile Image
    try {
      const profileImg = new Image();
      profileImg.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        profileImg.onload = () => resolve();
        profileImg.onerror = () => reject();
        profileImg.src = 'https://cp.senxc.my.id/c/1ef8a214c.jpg';
      });

      ctx.save();
      ctx.beginPath();
      const r = 34;
      ctx.moveTo(photoX + r, photoY);
      ctx.arcTo(photoX + photoSize, photoY, photoX + photoSize, photoY + photoSize, r);
      ctx.arcTo(photoX + photoSize, photoY + photoSize, photoX, photoY + photoSize, r);
      ctx.arcTo(photoX, photoY + photoSize, photoX, photoY, r);
      ctx.arcTo(photoX, photoY, photoX + photoSize, photoY, r);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(profileImg, photoX, photoY, photoSize, photoSize);
      ctx.restore();

      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 3.5;
      roundRect(photoX, photoY, photoSize, photoSize, 34, false, true);
    } catch {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 60px "Space Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('S', photoX + photoSize / 2, photoY + photoSize / 2);
    }

    // Active Status Dot
    ctx.fillStyle = '#10b981';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(photoX + photoSize - 10, photoY + photoSize - 10, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 4. Name, Verification, and Role Typography
    const textStartX = photoX + photoSize + 36;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // Name "Sann"
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 44px "Space Mono", monospace';
    ctx.fillText('Sann', textStartX, photoY);

    // Draw Verified Badge PNG
    try {
      const badgeImg = new Image();
      badgeImg.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        badgeImg.onload = () => resolve();
        badgeImg.onerror = () => reject();
        badgeImg.src = 'https://cdn.nekohime.site/file/i4nmytyz.png';
      });
      ctx.drawImage(badgeImg, textStartX + 135, photoY + 8, 34, 34);
    } catch {
      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText('✓', textStartX + 135, photoY + 8);
    }

    // Username Pill "@vsan"
    ctx.fillStyle = '#e0f2fe';
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2;
    roundRect(textStartX, photoY + 58, 105, 32, 14, true, true);
    ctx.fillStyle = '#0369a1';
    ctx.font = 'bold 16px "Space Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('@vsan', textStartX + 52, photoY + 74);

    // Clean Role Info Box with Vector Terminal Icon (No emoji)
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    const rolePillY = photoY + 112;

    // Small dark icon box for role
    ctx.fillStyle = '#0f172a';
    roundRect(textStartX, rolePillY - 14, 28, 28, 8, true, false);
    drawVectorIcon(ctx, 'terminal', textStartX + 14, rolePillY, '#38bdf8');

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Backend Developer', textStartX + 36, rolePillY);

    // Clean Location Info Box with Vector Pin Icon (No emoji)
    const locPillY = photoY + 144;
    ctx.fillStyle = '#fee2e2';
    roundRect(textStartX, locPillY - 13, 26, 26, 8, true, false);
    drawVectorIcon(ctx, 'map-pin', textStartX + 13, locPillY - 2, '#e11d48');

    ctx.fillStyle = '#64748b';
    ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Kalimantan Timur, Indonesia', textStartX + 34, locPillY);

    // 5. Divider
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cardX + 40, cardY + 285);
    ctx.lineTo(cardX + cardW - 40, cardY + 285);
    ctx.stroke();

    // Section Label: CONNECT CHANNELS
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 12px "Space Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('VERIFIED CHANNELS & PROFILES', cardX + 42, cardY + 305);

    // 6. Clean Vector-Icon Contact Channel Cards (Zero emojis)
    const channels = [
      {
        platform: 'WHATSAPP',
        value: 'wa.me/enzuvk',
        color: '#25D366',
        bg: '#f0fdf4',
        iconType: 'whatsapp',
      },
      {
        platform: 'EMAIL',
        value: 'me@ofcsan.cfd',
        color: '#4f46e5',
        bg: '#eef2ff',
        iconType: 'email',
      },
      {
        platform: 'TELEGRAM',
        value: 't.me/enzvuck',
        color: '#0284c7',
        bg: '#f0f9ff',
        iconType: 'telegram',
      },
      {
        platform: 'INSTAGRAM',
        value: '@v1enzyk',
        color: '#e11d48',
        bg: '#fff1f2',
        iconType: 'instagram',
      },
      {
        platform: 'TIKTOK',
        value: '@_enzyk',
        color: '#0f172a',
        bg: '#f8fafc',
        iconType: 'tiktok',
      },
      {
        platform: 'GITHUB',
        value: 'github.com/senaczk',
        color: '#1e293b',
        bg: '#f1f5f9',
        iconType: 'github',
      },
      {
        platform: 'SAWERIA',
        value: 'saweria.co/xsenavuck',
        color: '#d97706',
        bg: '#fffbeb',
        iconType: 'saweria',
      },
    ];

    let currentBoxY = cardY + 325;
    const boxHeight = 65;
    const boxSpacing = 13;

    channels.forEach((item) => {
      // Row box with soft neo-brutalist border
      ctx.fillStyle = item.bg;
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2.5;
      roundRect(cardX + 40, currentBoxY, cardW - 80, boxHeight, 18, true, true);

      // Left Icon Container Squircle
      ctx.fillStyle = item.color;
      roundRect(cardX + 52, currentBoxY + 11, 43, 43, 13, true, false);

      // Draw Pure Vector Icon (No emojis)
      drawVectorIcon(ctx, item.iconType, cardX + 73.5, currentBoxY + 32.5, '#ffffff');

      // Platform Name
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 16px "Space Mono", monospace';
      ctx.fillText(item.platform, cardX + 110, currentBoxY + 32.5);

      // Value / URL Handle
      ctx.textAlign = 'right';
      ctx.fillStyle = '#334155';
      ctx.font = 'bold 17px "Space Mono", monospace';
      ctx.fillText(item.value, cardX + cardW - 60, currentBoxY + 32.5);

      currentBoxY += boxHeight + boxSpacing;
    });

    // 7. Footer Seal & Subtitle
    const footerY = cardY + cardH - 110;
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cardX + 40, footerY);
    ctx.lineTo(cardX + cardW - 40, footerY);
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#64748b';
    ctx.font = '500 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Distributed Backend Systems • High Throughput APIs', cardX + 44, footerY + 18);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px "Space Mono", monospace';
    ctx.fillText('KALIMANTAN TIMUR, ID', cardX + 44, footerY + 42);

    // Official Verification Seal on Card (Right)
    ctx.textAlign = 'right';
    ctx.fillStyle = '#0284c7';
    ctx.font = 'bold 14px "Space Mono", monospace';
    ctx.fillText('VERIFIED DIGITAL CARD', cardX + cardW - 44, footerY + 18);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px "Space Mono", monospace';
    ctx.fillText('© 2026 SANN', cardX + cardW - 44, footerY + 42);

    setIsRenderingCanvas(false);
  }, []);

  // Trigger draw when modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        drawContactCard();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, drawContactCard]);

  // Export Canvas directly to High-Quality PNG File
  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = 'Sann-vsan-contact-card.png';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadedPng(true);
      setTimeout(() => setDownloadedPng(false), 3000);
    } catch (err) {
      console.error('Error exporting PNG canvas:', err);
    }
  };

  // Generates RFC 6350 vCard 3.0 file
  const handleDownloadVcf = () => {
    const vcardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Sann',
      'N:Sann;;;;',
      'NICKNAME:vsan',
      'TITLE:Backend Developer',
      'ORG:Independent Software Engineer',
      'ADR;TYPE=HOME:;;Kalimantan Timur;Kalimantan Timur;;;Indonesia',
      'EMAIL;TYPE=INTERNET,PREF:me@ofcsan.cfd',
      'TEL;TYPE=CELL,VOICE,WA:+6281200000000',
      'URL;TYPE=WEBSITE:https://www.sann.web.id',
      'URL;TYPE=GITHUB:https://github.com/senaczk',
      'URL;TYPE=TELEGRAM:https://t.me/enzvuck',
      'URL;TYPE=INSTAGRAM:https://instagram.com/v1enzyk',
      'URL;TYPE=TIKTOK:https://www.tiktok.com/@_enzyk',
      'URL;TYPE=SAWERIA:https://saweria.co/xsenavuck',
      'NOTE:Backend Developer based in Kalimantan Timur, Indonesia. Specializing in high-performance APIs and distributed systems.',
      'END:VCARD',
    ].join('\r\n');

    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Sann-vsan-contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedVcf(true);
    setTimeout(() => setDownloadedVcf(false), 3000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('me@ofcsan.cfd');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full">
      {/* Trigger Button in Page Flow */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="w-full group p-4 sm:p-4.5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-600 hover:via-blue-700 hover:to-indigo-700 text-white border-2 border-slate-900/15 shadow-[0_5px_0_0_#1e3a8a] hover:shadow-[0_8px_0_0_#1e3a8a] active:translate-y-1 active:shadow-[0_2px_0_0_#1e3a8a] transition-all duration-200 flex items-center justify-between gap-3 font-mono font-bold cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0">
              <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
            </div>
            <div className="text-left">
              <span className="block text-sm sm:text-base">
                Download Contact Card
              </span>
              <span className="block text-[11px] text-sky-100 font-normal font-sans">
                Render visual Canvas Card & export as PNG image / .vcf contact
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/20 text-xs font-mono text-white">
            <span>Canvas & .vcf</span>
          </div>
        </button>
      </motion.div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Content - Designed Digital Canvas Studio */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl rounded-[32px] bg-[#f8fafc] border-3 border-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.3)] overflow-hidden z-10 my-auto text-slate-800"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-200/80 bg-white">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500 border border-rose-600" />
                  <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500" />
                  <span className="font-mono text-xs sm:text-sm font-bold text-slate-800 ml-1.5">
                    Canvas Contact Card Visualizer
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => drawContactCard()}
                    title="Redraw Canvas"
                    aria-label="Redraw Canvas"
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <RefreshCw size={14} className={isRenderingCanvas ? 'animate-spin' : ''} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close dialog"
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Canvas Preview Container */}
              <div className="p-4 sm:p-5 space-y-4 max-h-[78vh] overflow-y-auto">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 px-1">
                  <span className="flex items-center gap-1">
                    <Sparkles size={13} className="text-amber-500" />
                    <span>Vector Rendered via HTML5 Canvas</span>
                  </span>
                  <span className="text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded-md font-semibold">
                    900 × 1260 Vector HD
                  </span>
                </div>

                {/* Real HTML5 Canvas Viewport */}
                <div className="relative rounded-2xl bg-slate-200/60 p-2 sm:p-3 border-2 border-slate-900/15 shadow-inner flex flex-col items-center justify-center overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    className="w-full max-w-md h-auto rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-slate-900/10 block bg-white"
                    style={{ aspectRatio: '900 / 1260' }}
                  />

                  {isRenderingCanvas && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex flex-col items-center justify-center gap-2 font-mono text-xs text-slate-700">
                      <RefreshCw size={24} className="animate-spin text-sky-600" />
                      <span>Drawing vector canvas elements...</span>
                    </div>
                  )}
                </div>

                {/* Download Options Bar */}
                <div className="space-y-2 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* 1. Download as PNG Image */}
                    <button
                      onClick={handleDownloadPng}
                      className="py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_4px_0_0_#334155] active:translate-y-0.5 active:shadow-[0_1px_0_0_#334155] transition-all cursor-pointer"
                    >
                      {downloadedPng ? (
                        <>
                          <Check size={16} className="text-emerald-400" />
                          <span>PNG Image Saved!</span>
                        </>
                      ) : (
                        <>
                          <ImageIcon size={16} className="text-sky-400" />
                          <span>Download Image (.png)</span>
                        </>
                      )}
                    </button>

                    {/* 2. Download as .vcf Contact file */}
                    <button
                      onClick={handleDownloadVcf}
                      className="py-3 px-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_4px_0_0_#0284c7] active:translate-y-0.5 active:shadow-[0_1px_0_0_#0284c7] transition-all cursor-pointer"
                    >
                      {downloadedVcf ? (
                        <>
                          <Check size={16} className="text-emerald-300" />
                          <span>.vcf Saved to Phone!</span>
                        </>
                      ) : (
                        <>
                          <FileText size={16} className="text-sky-200" />
                          <span>Save Contacts (.vcf)</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Secondary Quick Share / Copy Email */}
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyEmail}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-mono text-xs font-semibold border-2 border-slate-900/10 shadow-[0_2px_0_0_rgba(148,163,184,0.3)] active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                      <span>{copied ? 'Email Copied!' : 'Copy Email (me@ofcsan.cfd)'}</span>
                    </button>

                    <button
                      onClick={() => {
                        const shareData = {
                          title: 'Sann - Backend Developer',
                          text: 'Connect with Sann (@vsan), Backend Developer based in Kalimantan Timur, Indonesia.',
                          url: 'https://www.sann.web.id',
                        };
                        if (navigator.share) {
                          navigator.share(shareData).catch(() => {});
                        } else {
                          handleCopyEmail();
                        }
                      }}
                      title="Share Profile"
                      className="py-2.5 px-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-mono text-xs font-semibold border-2 border-slate-900/10 shadow-[0_2px_0_0_rgba(148,163,184,0.3)] active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Share2 size={14} />
                      <span className="hidden xs:inline">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
