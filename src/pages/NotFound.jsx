
// import { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { Home, Sun, Moon } from "lucide-react";
// import { useTheme } from "../context/ThemeContext";
// import Logo         from "../components/Logo";

// /* ─── Minimal injected CSS — pseudo-elements, orbits, staggered delays ───── */
// const CSS = `
//   @keyframes nf-glitch-1 {
//     0%, 90%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
//     92%            { clip-path: inset(10% 0 60% 0); transform: translate(-4px,  2px); }
//     94%            { clip-path: inset(50% 0 20% 0); transform: translate( 4px, -2px); }
//     96%            { clip-path: inset(30% 0 40% 0); transform: translate(-3px,  1px); }
//     98%            { clip-path: inset(70% 0  5% 0); transform: translate( 3px, -1px); }
//   }
//   @keyframes nf-glitch-2 {
//     0%, 88%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
//     90%            { clip-path: inset(20% 0 50% 0); transform: translate( 4px, -2px); }
//     92%            { clip-path: inset(60% 0 10% 0); transform: translate(-4px,  2px); }
//     94%            { clip-path: inset(40% 0 30% 0); transform: translate( 3px, -1px); }
//     96%            { clip-path: inset( 5% 0 70% 0); transform: translate(-3px,  1px); }
//   }
//   .nf-glitch          { position: relative; }
//   .nf-glitch::before,
//   .nf-glitch::after   { content: attr(data-text); position: absolute; inset: 0; }
//   .nf-glitch::before  { color: #a78bfa; animation: nf-glitch-1 8s infinite; }
//   .nf-glitch::after   { color: #818cf8; animation: nf-glitch-2 8s 0.5s infinite; }

//   @keyframes nf-scan {
//     0%   { top: -2%; }
//     100% { top: 102%; }
//   }
//   .nf-scan {
//     position: absolute; left: 0; right: 0; height: 2px; pointer-events: none;
//     background: linear-gradient(90deg, transparent, rgba(167,139,250,0.15), transparent);
//     animation: nf-scan 4s linear infinite;
//   }

//   @keyframes nf-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
//   .nf-cursor::after {
//     content: '|'; margin-left: 1px; color: #a78bfa;
//     animation: nf-blink 1s step-end infinite;
//   }

//   @keyframes nf-orbit-a {
//     from { transform: rotate(0deg)   translateX(90px)  rotate(0deg); }
//     to   { transform: rotate(360deg) translateX(90px)  rotate(-360deg); }
//   }
//   @keyframes nf-orbit-b {
//     from { transform: rotate(120deg) translateX(120px) rotate(-120deg); }
//     to   { transform: rotate(480deg) translateX(120px) rotate(-480deg); }
//   }
//   @keyframes nf-orbit-c {
//     from { transform: rotate(240deg) translateX(70px)  rotate(-240deg); }
//     to   { transform: rotate(600deg) translateX(70px)  rotate(-600deg); }
//   }
//   .nf-orbit-a { animation: nf-orbit-a 12s linear infinite; }
//   .nf-orbit-b { animation: nf-orbit-b 18s linear infinite; }
//   .nf-orbit-c { animation: nf-orbit-c  9s linear infinite; }

//   @keyframes nf-fade-up {
//     from { opacity: 0; transform: translateY(20px); }
//     to   { opacity: 1; transform: translateY(0);    }
//   }
//   .nf-enter-1 { animation: nf-fade-up 0.55s 0.05s both; }
//   .nf-enter-2 { animation: nf-fade-up 0.55s 0.18s both; }
//   .nf-enter-3 { animation: nf-fade-up 0.55s 0.30s both; }
//   .nf-enter-4 { animation: nf-fade-up 0.55s 0.44s both; }
// `;

// let nfStylesReady = false;

// const NotFound = () => {
//   const navigate           = useNavigate();
//   const { isDark, toggle } = useTheme();
//   const styleRef           = useRef(false);

//   useEffect(() => {
//     if (!styleRef.current && !nfStylesReady) {
//       const tag = document.createElement("style");
//       tag.textContent = CSS;
//       document.head.appendChild(tag);
//       nfStylesReady    = true;
//       styleRef.current = true;
//     }
//   }, []);

//   return (
//     /*
//       Background switches between:
//       • Dark  → deep space gradient (#0f0a1e → #130d2b → #0a0a1a)
//       • Light → soft violet-tinted white (matching Login/Register feel)
//       transition-colors animates the switch smoothly.
//     */
//     <div
//       className="min-h-screen flex flex-col relative overflow-hidden transition-colors duration-300
//                  bg-gradient-to-br from-slate-50 via-white to-violet-50/40
//                  dark:from-[#0f0a1e] dark:via-[#130d2b] dark:to-[#0a0a1a]"
//     >

//       {/* ── Background grid ── */}
//       <div
//         aria-hidden="true"
//         className="absolute inset-0 pointer-events-none"
//         style={{
//           backgroundImage: `
//             linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)
//           `,
//           backgroundSize: "48px 48px",
//         }}
//       />

//       {/* ── Ambient glow blobs ── */}
//       <div
//         aria-hidden="true"
//         className="absolute -top-52 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none"
//         style={{ background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)" }}
//       />
//       <div
//         aria-hidden="true"
//         className="absolute -bottom-40 -left-24 w-[400px] h-[400px] rounded-full pointer-events-none"
//         style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }}
//       />

//       {/* ── Scan line (subtle in light mode, visible in dark) ── */}
//       <div aria-hidden="true" className="nf-scan" />

//       {/* ── Orbiting dots ── */}
//       <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none">
//         <div className="relative w-0 h-0">
//           <div className="nf-orbit-a absolute w-2 h-2 rounded-full bg-violet-400/30 dark:bg-violet-400/40" />
//           <div className="nf-orbit-b absolute w-1.5 h-1.5 rounded-full bg-indigo-400/25 dark:bg-indigo-400/30" />
//           <div className="nf-orbit-c absolute w-1 h-1 rounded-full bg-purple-400/40 dark:bg-purple-300/50" />
//         </div>
//       </div>

//       {/* ════════════════════ Navbar ════════════════════
//           grid-cols-3: left | center | right — Logo is always mathematically centered.
//       ══════════════════════════════════════════════════ */}
//       <header className="relative z-40 backdrop-blur-xl
//                          bg-white/70 dark:bg-white/[0.03]
//                          border-b border-slate-200/60 dark:border-white/8
//                          transition-colors duration-300">
//         <div className="h-14 px-4 sm:px-6 grid grid-cols-3 items-center max-w-7xl mx-auto w-full">

//           {/* ── Left: Back to home (clean pill link, not a heavy button) ── */}
//           <div className="flex justify-start">
//             <button
//               onClick={() => navigate("/")}
//               className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm
//                          font-display font-medium
//                          text-slate-500 dark:text-slate-400
//                          hover:bg-slate-100 dark:hover:bg-white/8
//                          hover:text-slate-800 dark:hover:text-white
//                          transition-all duration-200 group">
//               <Home size={15} className="shrink-0" />
//               <span className="hidden sm:inline">Home</span>
//             </button>
//           </div>

//           {/* ── Center: Logo ── */}
//           <div className="flex justify-center">
//             <Logo size="sm" />
//           </div>

//           {/* ── Right: Theme toggle ── */}
//           <div className="flex justify-end">
//             <button
//               onClick={toggle}
//               aria-label="Toggle theme"
//               className="p-2 rounded-xl
//                          text-slate-500 dark:text-slate-400
//                          hover:bg-slate-100 dark:hover:bg-white/8
//                          transition-all duration-200">
//               {isDark
//                 ? <Sun  size={17} className="text-amber-400" />
//                 : <Moon size={17} />}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* ════════════════════ Main content ════════════════════ */}
//       <main className="relative z-10 flex-1 flex flex-col items-center justify-center
//                        px-6 text-center gap-8">

//         {/* ── 404 block ── */}
//         <div className="nf-enter-1 animate-bounce relative flex items-center justify-center">
//           <div className="animate-ping absolute w-48 h-48 rounded-full
//                           border border-violet-500/20 dark:border-violet-500/20" />
//           <div
//             className="animate-ping absolute w-64 h-64 rounded-full
//                         border border-violet-500/10 dark:border-violet-500/10"
//             style={{ animationDelay: "1s" }}
//           />
//           <div className="relative select-none">
//             <span
//               className="nf-glitch font-black text-[9rem] sm:text-[12rem] leading-none
//                          tracking-tighter
//                          text-slate-800 dark:text-white/90"
//               data-text="404"
//               style={{
//                 textShadow: isDark
//                   ? "0 0 80px rgba(139,92,246,0.35), 0 0 160px rgba(139,92,246,0.15)"
//                   : "0 0 60px rgba(139,92,246,0.15)",
//               }}
//             >
//               404
//             </span>
//             <div className="mt-1 mx-auto h-1 w-24 rounded-full
//                             bg-gradient-to-r from-violet-500 via-indigo-400 to-violet-500" />
//           </div>
//         </div>

//         {/* ── Headline ── */}
//         <div className="nf-enter-2 space-y-3">
//           <h1 className="text-2xl sm:text-3xl font-bold tracking-tight
//                          text-slate-800 dark:text-white">
//             Page not found
//           </h1>
//           <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base
//                         max-w-xs sm:max-w-sm leading-relaxed">
//             Looks like this page took a wrong turn. It may have been moved,
//             deleted, or never existed in the first place.
//           </p>
//         </div>

//         {/* ── Terminal hint ── */}
//         <div className="nf-enter-3 w-full max-w-xs px-4 py-2.5 rounded-xl font-mono text-xs
//                         bg-slate-100 dark:bg-white/[0.04]
//                         border border-slate-200 dark:border-white/10
//                         text-slate-500 dark:text-slate-400">
//           <span className="text-violet-500 dark:text-violet-400">$ </span>
//           <span className="text-slate-700 dark:text-slate-300 nf-cursor">
//             GET /this-page → 404 Not Found
//           </span>
//         </div>

//         {/* ── Single action button (Go back is in the navbar) ── */}
//         <div className="nf-enter-4">
//           <button
//             type="button"
//             onClick={() => navigate("/")}
//             className="flex items-center justify-center gap-2
//                        px-7 py-3 rounded-xl text-sm font-semibold text-white
//                        bg-gradient-to-r from-violet-600 to-indigo-600
//                        hover:from-violet-500 hover:to-indigo-500
//                        shadow-lg shadow-violet-500/30
//                        transition-all duration-200"
//           >
//             <Home size={15} />
//             Back to home
//           </button>
//         </div>

//         {/* ── Footer ── */}
//         <p className="nf-enter-4 text-[11px] tracking-wide
//                       text-slate-400 dark:text-slate-600">
//           TaskFlow · Error 404 · Page Not Found
//         </p>
//       </main>
//     </div>
//   );
// };

// export default NotFound;











import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Logo         from "../components/Logo";

const CSS = `
  @keyframes nf-glitch-1 {
    0%, 90%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
    92%            { clip-path: inset(10% 0 60% 0); transform: translate(-4px,  2px); }
    94%            { clip-path: inset(50% 0 20% 0); transform: translate( 4px, -2px); }
    96%            { clip-path: inset(30% 0 40% 0); transform: translate(-3px,  1px); }
    98%            { clip-path: inset(70% 0  5% 0); transform: translate( 3px, -1px); }
  }
  @keyframes nf-glitch-2 {
    0%, 88%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
    90%            { clip-path: inset(20% 0 50% 0); transform: translate( 4px, -2px); }
    92%            { clip-path: inset(60% 0 10% 0); transform: translate(-4px,  2px); }
    94%            { clip-path: inset(40% 0 30% 0); transform: translate( 3px, -1px); }
    96%            { clip-path: inset( 5% 0 70% 0); transform: translate(-3px,  1px); }
  }
  .nf-glitch          { position: relative; }
  .nf-glitch::before,
  .nf-glitch::after   { content: attr(data-text); position: absolute; inset: 0; }
  .nf-glitch::before  { color: #a78bfa; animation: nf-glitch-1 8s infinite; }
  .nf-glitch::after   { color: #818cf8; animation: nf-glitch-2 8s 0.5s infinite; }
  @keyframes nf-scan {
    0%   { top: -2%; }
    100% { top: 102%; }
  }
  .nf-scan {
    position: absolute; left: 0; right: 0; height: 2px; pointer-events: none;
    background: linear-gradient(90deg, transparent, rgba(167,139,250,0.15), transparent);
    animation: nf-scan 4s linear infinite;
  }
  @keyframes nf-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  .nf-cursor::after {
    content: '|'; margin-left: 1px; color: #a78bfa;
    animation: nf-blink 1s step-end infinite;
  }
  @keyframes nf-orbit-a {
    from { transform: rotate(0deg)   translateX(90px)  rotate(0deg); }
    to   { transform: rotate(360deg) translateX(90px)  rotate(-360deg); }
  }
  @keyframes nf-orbit-b {
    from { transform: rotate(120deg) translateX(120px) rotate(-120deg); }
    to   { transform: rotate(480deg) translateX(120px) rotate(-480deg); }
  }
  @keyframes nf-orbit-c {
    from { transform: rotate(240deg) translateX(70px)  rotate(-240deg); }
    to   { transform: rotate(600deg) translateX(70px)  rotate(-600deg); }
  }
  .nf-orbit-a { animation: nf-orbit-a 12s linear infinite; }
  .nf-orbit-b { animation: nf-orbit-b 18s linear infinite; }
  .nf-orbit-c { animation: nf-orbit-c  9s linear infinite; }
  @keyframes nf-fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  .nf-enter-1 { animation: nf-fade-up 0.55s 0.05s both; }
  .nf-enter-2 { animation: nf-fade-up 0.55s 0.18s both; }
  .nf-enter-3 { animation: nf-fade-up 0.55s 0.30s both; }
  .nf-enter-4 { animation: nf-fade-up 0.55s 0.44s both; }
`;

let nfStylesReady = false;

const NotFound = () => {
  const navigate           = useNavigate();
  const { isDark, toggle } = useTheme();
  const styleRef           = useRef(false);

  useEffect(() => {
    if (!styleRef.current && !nfStylesReady) {
      const tag = document.createElement("style");
      tag.textContent = CSS;
      document.head.appendChild(tag);
      nfStylesReady    = true;
      styleRef.current = true;
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden transition-colors duration-300
                    bg-gradient-to-br from-slate-50 via-white to-violet-50/40
                    dark:from-[#0f0a1e] dark:via-[#130d2b] dark:to-[#0a0a1a]">

      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }} />

      <div aria-hidden="true"
        className="absolute -top-52 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)" }} />
      <div aria-hidden="true"
        className="absolute -bottom-40 -left-24 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }} />

      <div aria-hidden="true" className="nf-scan" />

      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-0 h-0">
          <div className="nf-orbit-a absolute w-2 h-2 rounded-full bg-violet-400/30 dark:bg-violet-400/40" />
          <div className="nf-orbit-b absolute w-1.5 h-1.5 rounded-full bg-indigo-400/25 dark:bg-indigo-400/30" />
          <div className="nf-orbit-c absolute w-1 h-1 rounded-full bg-purple-400/40 dark:bg-purple-300/50" />
        </div>
      </div>

      <header className="relative z-40 backdrop-blur-xl transition-colors duration-300
                         bg-white/70 dark:bg-white/[0.03]
                         border-b border-slate-200/60 dark:border-white/8">
        <div className="h-14 px-4 sm:px-6 grid grid-cols-3 items-center max-w-7xl mx-auto w-full">

          <div className="flex justify-start">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm
                         font-display font-medium
                         text-slate-600 dark:text-slate-300
                         hover:bg-black/[0.06] dark:hover:bg-white/10
                         hover:text-slate-900 dark:hover:text-white
                         transition-all duration-150">
              <Home size={15} className="shrink-0" />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>

          <div className="flex justify-center">
            <Logo size="sm" />
          </div>

          <div className="flex justify-end">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="p-2 rounded-xl
                         text-slate-600 dark:text-slate-300
                         hover:bg-black/[0.06] dark:hover:bg-white/10
                         hover:text-slate-900 dark:hover:text-white
                         transition-all duration-150">
              {isDark
                ? <Sun  size={17} className="text-amber-400" />
                : <Moon size={17} />}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center gap-8">

        <div className="nf-enter-1 animate-bounce relative flex items-center justify-center">
          <div className="animate-ping absolute w-48 h-48 rounded-full border border-violet-500/20" />
          <div className="animate-ping absolute w-64 h-64 rounded-full border border-violet-500/10"
               style={{ animationDelay: "1s" }} />
          <div className="relative select-none">
            <span
              className="nf-glitch font-black text-[9rem] sm:text-[12rem] leading-none
                         tracking-tighter text-slate-800 dark:text-white/90"
              data-text="404"
              style={{
                textShadow: isDark
                  ? "0 0 80px rgba(139,92,246,0.35), 0 0 160px rgba(139,92,246,0.15)"
                  : "0 0 60px rgba(139,92,246,0.15)",
              }}>
              404
            </span>
            <div className="mt-1 mx-auto h-1 w-24 rounded-full
                            bg-gradient-to-r from-violet-500 via-indigo-400 to-violet-500" />
          </div>
        </div>

        <div className="nf-enter-2 space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
            Page not found
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-xs sm:max-w-sm leading-relaxed">
            Looks like this page took a wrong turn. It may have been moved,
            deleted, or never existed in the first place.
          </p>
        </div>

        <div className="nf-enter-3 w-full max-w-xs px-4 py-2.5 rounded-xl font-mono text-xs
                        bg-slate-100 dark:bg-white/[0.04]
                        border border-slate-200 dark:border-white/10
                        text-slate-500 dark:text-slate-400">
          <span className="text-violet-500 dark:text-violet-400">$ </span>
          <span className="text-slate-700 dark:text-slate-300 nf-cursor">
            GET /this-page → 404 Not Found
          </span>
        </div>

        <div className="nf-enter-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2
                       px-7 py-3 rounded-xl text-sm font-semibold text-white
                       bg-gradient-to-r from-violet-600 to-indigo-600
                       hover:from-violet-500 hover:to-indigo-500
                       shadow-lg shadow-violet-500/30
                       transition-all duration-200">
            <Home size={15} />
            Back to home
          </button>
        </div>

        <p className="nf-enter-4 text-[11px] tracking-wide text-slate-400 dark:text-slate-600">
          TaskFlow · Error 404 · Page Not Found
        </p>
      </main>
    </div>
  );
};

export default NotFound;