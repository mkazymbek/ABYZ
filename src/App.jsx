import { useState, useMemo, useCallback, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   CSS
═══════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

/* ══════════════════════════════
   DARK THEME (default)
══════════════════════════════ */
:root {
  --green:#003F25;  --green2:#00301A;  --green3:#1a3d2b;  --green4:#0a2518;
  --gold:#C6A55C;   --gold2:#AF8F51;   --gold3:#e8c97a;   --gold4:#f5dfa0;
  --dark:#0e1210;   --dark2:#161a14;   --dark3:#1e231c;
  --text:#f0ebd2;   --muted:rgba(240,235,210,.38);
  --bg:#0e1210;     --bg2:#161a14;     --bg3:#1e231c;
  --border:rgba(198,165,92,.15);
  --card:rgba(255,255,255,.04);
  --card2:rgba(255,255,255,.025);
  --shadow:0 2px 12px rgba(0,0,0,.3);
  --r:14px; --tr:all .22s cubic-bezier(.4,0,.2,1);
}

/* ══════════════════════════════
   LIGHT THEME
══════════════════════════════ */
  --green:#1a6b44;  --green2:#155937;  --green3:#e8f5ee;  --green4:#d0ead9;
  --gold:#9a6f1e;   --gold2:#7d5a18;   --gold3:#b8860b;   --gold4:#d4a843;
  --dark:#f4f1eb;   --dark2:#ece8df;   --dark3:#e2ddd3;
  --text:#1c1a14;   --muted:rgba(28,26,20,.45);
  --bg:#f7f4ee;     --bg2:#ede9e0;     --bg3:#e6e1d6;
  --border:rgba(154,111,30,.18);
  --card:rgba(255,255,255,.75);
  --card2:rgba(255,255,255,.5);
  --shadow:0 2px 12px rgba(0,0,0,.08);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;-webkit-font-smoothing:antialiased;overflow-x:hidden;transition:background .3s,color .3s}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--green);border-radius:3px}

/* HEADER */
.hdr{position:fixed;top:0;left:0;right:0;z-index:300;height:54px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;background:rgba(247,244,238,.92);backdrop-filter:blur(18px);border-bottom:1px solid var(--border);transition:background .3s,border-color .3s}
.logo{font-family:'Playfair Display',serif;font-size:1.35rem;font-weight:700;color:var(--gold);cursor:pointer;letter-spacing:.02em;user-select:none}
.logo-sub{font-size:.52rem;letter-spacing:.22em;color:rgba(198,165,92,.4);text-transform:uppercase;font-weight:300;margin-top:-3px}
.nav{display:flex;gap:2px}
.nbtn{background:none;border:none;font-family:inherit;font-size:.73rem;letter-spacing:.04em;color:var(--muted);padding:5px 10px;border-radius:8px;cursor:pointer;transition:var(--tr)}
.nbtn:hover,.nbtn.on{color:var(--gold);background:rgba(154,111,30,.08)}

/* LANDING */
.landing{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:80px 24px 60px}
.lbg{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 90% 55% at 50% 12%,rgba(26,107,68,.12) 0%,transparent 65%),radial-gradient(ellipse 40% 45% at 88% 80%,rgba(26,107,68,.07) 0%,transparent 55%)}
.ornament{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold) 30%,var(--gold3) 50%,var(--gold) 70%,transparent);opacity:.45}

/* ELDER */
.elder-wrap{position:relative;width:220px;height:220px;margin-bottom:24px;flex-shrink:0}
.elder-glow{position:absolute;inset:-24px;border-radius:50%;background:radial-gradient(circle,rgba(0,63,37,.7) 0%,transparent 70%);animation:gpulse 3.5s ease-in-out infinite}
@keyframes gpulse{0%,100%{opacity:.5;transform:scale(.94)}50%{opacity:1;transform:scale(1.06)}}
.elder-ring{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(198,165,92,.2);animation:rspin 20s linear infinite}
.elder-ring2{position:absolute;inset:10px;border-radius:50%;border:1px dashed rgba(198,165,92,.1);animation:rspin 32s linear infinite reverse}
@keyframes rspin{to{transform:rotate(360deg)}}
.elder-circle{position:absolute;inset:20px;border-radius:50%;background:linear-gradient(155deg,#d0ead9 0%,#1a6b44 55%,#155937 100%);border:1.5px solid rgba(154,111,30,.3);overflow:hidden;display:flex;align-items:center;justify-content:center}

/* SPEECH BUBBLE */
.speech{max-width:500px;width:100%;margin-bottom:28px;animation:fup .5s ease both}
@keyframes fup{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.sbub{background:rgba(26,107,68,.08);border:1px solid rgba(154,111,30,.2);border-radius:18px;padding:20px 24px;position:relative}
.sbub::before{content:'';position:absolute;top:-9px;left:50%;transform:translateX(-50%);border:9px solid transparent;border-bottom-color:rgba(154,111,30,.2);border-top:none}
.sbub::after{content:'';position:absolute;top:-7px;left:50%;transform:translateX(-50%);border:8px solid transparent;border-bottom-color:rgba(26,107,68,.12);border-top:none}
.sname{font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);opacity:.7;margin-bottom:9px}
.stext{font-family:'Playfair Display',serif;font-size:1rem;line-height:1.65;color:var(--text);opacity:.88}
.cur{display:inline-block;width:2px;height:1em;background:var(--gold);margin-left:2px;vertical-align:text-bottom;animation:blink .85s step-end infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}

/* FORM */
.oform{width:100%;max-width:340px;animation:fup .4s .1s ease both}
.flabel{font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(198,165,92,.58);margin-bottom:9px}
.ninput{width:100%;background:rgba(255,255,255,.95);border:1.5px solid rgba(198,165,92,.4);border-radius:var(--r);padding:13px 18px;font-family:'Playfair Display',serif;font-size:1rem;color:#111;-webkit-text-fill-color:#111;caret-color:#333;outline:none;transition:var(--tr);margin-bottom:12px;text-align:center}
.ninput::placeholder{color:rgba(0,0,0,.4);font-family:'Inter',sans-serif;font-size:.87rem}
.ninput:focus{border-color:var(--gold);background:#fff;box-shadow:0 0 0 3px rgba(198,165,92,.12)}

/* BUTTONS */
.bgold{width:100%;background:var(--gold);color:var(--dark);border:none;padding:13px 28px;border-radius:var(--r);font-family:'Inter',sans-serif;font-size:.83rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;cursor:pointer;transition:var(--tr)}
.bgold:hover:not(:disabled){background:var(--gold3);transform:translateY(-1px)}
.bgold:disabled{opacity:.3;cursor:default}
.boutline{background:rgba(198,165,92,.07);color:var(--gold);border:1px solid rgba(198,165,92,.2);padding:10px 22px;border-radius:var(--r);font-family:'Inter',sans-serif;font-size:.8rem;font-weight:500;cursor:pointer;transition:var(--tr)}
.boutline:hover{background:rgba(198,165,92,.14);border-color:var(--gold)}
.bghost{background:none;color:rgba(240,235,210,.35);border:1px solid rgba(240,235,210,.1);padding:9px 18px;border-radius:10px;font-family:'Inter',sans-serif;font-size:.77rem;cursor:pointer;transition:var(--tr)}
.bghost:hover{border-color:var(--gold);color:var(--gold)}
.bsmall{background:rgba(198,165,92,.08);color:var(--gold2);border:1px solid rgba(198,165,92,.15);padding:7px 14px;border-radius:9px;font-family:'Inter',sans-serif;font-size:.74rem;cursor:pointer;transition:var(--tr)}
.bsmall:hover{background:rgba(198,165,92,.16);color:var(--gold)}

/* SHELL */
.shell{padding-top:54px;background:var(--bg);min-height:100vh}
.wrap{max-width:1060px;margin:0 auto;padding:0 24px}
.pe{animation:fup .32s ease both}

/* PERSONAL PAGE */
.pper{min-height:calc(100vh - 54px);display:grid;grid-template-columns:1fr 420px;gap:48px;align-items:start;padding:52px 24px;max-width:1060px;margin:0 auto}
.ptext .eyebrow{font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold2);opacity:.65;margin-bottom:12px}
.ptext h1{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;line-height:1.1;letter-spacing:-.02em;margin-bottom:12px}
.ptext h1 span{color:var(--gold)}
.ptext .pdesc{font-size:.87rem;line-height:1.78;color:rgba(240,235,210,.46);margin-bottom:24px;max-width:380px}

/* PROFILE CHIPS */
.profile-chips{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:24px}
.chip{display:inline-flex;align-items:center;gap:7px;background:rgba(0,63,37,.18);border:1px solid rgba(198,165,92,.2);border-radius:30px;padding:7px 14px;font-size:.78rem;cursor:pointer;transition:var(--tr)}
.chip:hover{background:rgba(0,63,37,.32);border-color:var(--gold)}
.chip .chip-icon{font-size:.85rem;opacity:.8}
.chip .chip-val{color:var(--gold);font-weight:500}
.chip .chip-lbl{color:rgba(240,235,210,.4);font-size:.68rem}
.chip-empty{color:rgba(240,235,210,.3);font-style:italic}
.chip-arrow{color:rgba(198,165,92,.4);font-size:.7rem;margin-left:2px}

/* MODAL OVERLAY */
.modal-overlay{position:fixed;inset:0;z-index:500;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;padding:24px;animation:fup .2s ease}
.modal{background:var(--bg2);border:1px solid var(--border);border-radius:20px;padding:28px;width:100%;max-width:480px;max-height:80vh;display:flex;flex-direction:column;box-shadow:0 8px 40px rgba(0,0,0,.15)}
.modal-title{font-family:'Playfair Display',serif;font-size:1.3rem;margin-bottom:6px}
.modal-sub{font-size:.78rem;color:var(--muted);margin-bottom:18px}
.modal-search{width:100%;background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px 14px;font-family:'Inter',sans-serif;font-size:.85rem;color:var(--text);outline:none;margin-bottom:14px;transition:var(--tr)}
.modal-search:focus{border-color:var(--gold)}
.modal-list{overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:6px}
.modal-item{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:10px;cursor:pointer;transition:var(--tr);border:1px solid transparent}
.modal-item:hover{background:rgba(154,111,30,.06);border-color:var(--border)}
.modal-item.sel{background:rgba(26,107,68,.1);border-color:var(--gold)}
.modal-item-icon{font-size:1.1rem;width:32px;text-align:center;flex-shrink:0}
.modal-item-name{font-size:.88rem;font-weight:500}
.modal-item-sub{font-size:.7rem;color:var(--muted);margin-top:1px}
.modal-check{margin-left:auto;color:var(--gold);font-size:1rem;opacity:0}
.modal-item.sel .modal-check{opacity:1}
.modal-footer{margin-top:16px;display:flex;gap:10px}

/* STATS ROW */
.stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:24px}
.scard{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:14px;text-align:center;box-shadow:var(--shadow)}
.snum{font-family:'Playfair Display',serif;font-size:1.5rem;color:var(--gold);font-weight:700}
.slbl{font-size:.6rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(240,235,210,.27);margin-top:3px}

/* PERSONAL SIDEBAR */
.pside{padding-top:40px;display:flex;flex-direction:column;align-items:center;gap:20px}
.elder-side{position:relative;width:260px;height:260px}
.elder-side .elder-circle{inset:18px}

/* QUICK ACTIONS */
.qactions{display:flex;flex-direction:column;gap:8px;width:100%}

/* SECTION HEAD */
.sh{padding:44px 0 20px;display:flex;align-items:baseline;justify-content:space-between;flex-wrap:wrap;gap:8px}
.sh h2{font-family:'Playfair Display',serif;font-size:1.7rem;font-weight:700;letter-spacing:-.02em}
.sh-count{font-size:.7rem;color:var(--gold2);opacity:.65;letter-spacing:.1em}
.sdesc{font-size:.84rem;color:rgba(240,235,210,.4);margin-bottom:20px;line-height:1.7}

/* SEARCH */
.swrap{position:relative;margin-bottom:18px}
.sicon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--gold2);opacity:.4;font-size:.95rem;pointer-events:none}
.sinput{width:100%;max-width:460px;background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:11px 15px 11px 38px;font-family:'Inter',sans-serif;font-size:.86rem;color:var(--text);outline:none;transition:var(--tr)}
.sinput::placeholder{color:var(--muted)}
.sinput:focus{border-color:var(--gold);background:rgba(255,255,255,.9)}

/* ALPHA */
.abar{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:20px}
.abtn{background:rgba(255,255,255,.03);border:1px solid rgba(198,165,92,.08);color:rgba(240,235,210,.3);width:29px;height:29px;border-radius:7px;font-size:.7rem;cursor:pointer;transition:var(--tr);font-family:'Inter',sans-serif;display:flex;align-items:center;justify-content:center}
.abtn:hover,.abtn.on{background:rgba(198,165,92,.1);border-color:var(--gold);color:var(--gold)}

/* PERSON GRID */
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(188px,1fr));gap:10px;padding-bottom:60px}
.pcard{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:16px;cursor:pointer;transition:var(--tr);position:relative;overflow:hidden;box-shadow:var(--shadow)}
.pcard::after{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:0;transition:var(--tr)}
.pcard:hover{background:rgba(154,111,30,.06);border-color:rgba(154,111,30,.3);transform:translateY(-2px)}
.pcard:hover::after{opacity:1}
.pav{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--green),var(--green2));border:1px solid rgba(198,165,92,.2);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:.92rem;color:var(--gold);margin-bottom:10px}
.pname{font-size:.85rem;font-weight:500;margin-bottom:3px;line-height:1.3}
.pera{font-size:.67rem;color:var(--muted);letter-spacing:.04em}

/* PERSON PAGE */
.ppg{padding:34px 0 80px}
.back{display:inline-flex;align-items:center;gap:5px;font-size:.73rem;color:rgba(240,235,210,.3);cursor:pointer;background:none;border:none;font-family:inherit;transition:var(--tr);padding:0;margin-bottom:26px}
.back:hover{color:var(--gold)}
.phero{display:flex;align-items:flex-end;gap:22px;padding-bottom:24px;border-bottom:1px solid rgba(198,165,92,.08);margin-bottom:24px;flex-wrap:wrap}
.pbigav{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--green),var(--green2));border:2px solid rgba(198,165,92,.28);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:1.8rem;color:var(--gold);flex-shrink:0}
.pbigname{font-family:'Playfair Display',serif;font-size:clamp(1.7rem,4vw,2.6rem);font-weight:700;letter-spacing:-.02em;margin-bottom:5px}
.pbigera{font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold2);opacity:.6}
.igrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:11px;margin-bottom:26px}
.iblock{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:19px;box-shadow:var(--shadow)}
.ilbl{font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold2);opacity:.6;margin-bottom:8px}
.iph{font-size:.82rem;color:rgba(240,235,210,.2);font-style:italic;line-height:1.65}
.pcta{display:flex;gap:10px;flex-wrap:wrap}

/* ═══ COMMUNITY PAGE ═══ */
.comm-hero{padding:44px 0 28px}
.comm-banner{background:linear-gradient(135deg,var(--green) 0%,var(--green2) 60%,#1a3d2b 100%);border:1px solid var(--border);border-radius:20px;padding:32px;margin-bottom:28px;position:relative;overflow:hidden;color:#f0ebd2}
.comm-banner::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 90% 50%,rgba(198,165,92,.08) 0%,transparent 65%);pointer-events:none}
.comm-icon{font-size:2.4rem;margin-bottom:10px}
.comm-type-tag{font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(198,165,92,.6);margin-bottom:8px}
.comm-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:700;margin-bottom:8px}
.comm-desc-text{font-size:.87rem;color:rgba(240,235,210,.5);line-height:1.7;max-width:560px}
.comm-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:28px}
.cstat{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:14px;text-align:center;box-shadow:var(--shadow)}
.cstat-n{font-family:'Playfair Display',serif;font-size:1.4rem;color:var(--gold);font-weight:700}
.cstat-l{font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(240,235,210,.27);margin-top:3px}
.comm-members{margin-bottom:36px}
.comm-members h3{font-family:'Playfair Display',serif;font-size:1.1rem;margin-bottom:14px}
.member-row{display:flex;align-items:center;gap:12px;padding:11px 14px;background:var(--card2);border:1px solid var(--border);border-radius:10px;margin-bottom:7px;cursor:pointer;transition:var(--tr)}
.member-row:hover{background:rgba(198,165,92,.06);border-color:rgba(198,165,92,.2)}
.mav{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--green),var(--green2));border:1px solid rgba(198,165,92,.18);display:flex;align-items:center;justify-content:center;font-size:.85rem;color:var(--gold);font-family:'Playfair Display',serif;flex-shrink:0}
.mname{font-size:.85rem;font-weight:500}
.mera{font-size:.68rem;color:var(--muted)}
.tribe-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:18px;cursor:pointer;transition:var(--tr);display:flex;align-items:flex-start;gap:14px;box-shadow:var(--shadow)}
.tribe-card:hover{background:rgba(198,165,92,.05);border-color:rgba(198,165,92,.22);transform:translateY(-1px)}
.tribe-icon{font-size:1.6rem;flex-shrink:0}
.tribe-name{font-size:.92rem;font-weight:600;margin-bottom:3px}
.tribe-sub{font-size:.72rem;color:var(--muted);line-height:1.5}
.tribe-count{font-size:.65rem;color:var(--gold2);margin-top:6px}
.tribes-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;margin-bottom:20px}

/* ═══ INTERACTIVE TREE ═══ */
.tree-page{padding:32px 0 80px}
.tree-header{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:20px}
.tree-title{font-family:'Playfair Display',serif;font-size:1.4rem}

/* Canvas container */
.tree-canvas-wrap{width:100%;overflow-x:auto;overflow-y:visible;padding-bottom:20px}
.tree-canvas{position:relative;min-height:580px;user-select:none}

/* TREE NODES */
.tn{position:absolute;width:160px;cursor:pointer;transition:transform .18s ease,box-shadow .18s ease}
.tn-inner{background:var(--card);border:1.5px solid var(--border);border-radius:14px;padding:14px 14px 12px;position:relative;transition:var(--tr);box-shadow:var(--shadow)}
.tn:hover .tn-inner,.tn.focused .tn-inner{border-color:rgba(198,165,92,.55);background:rgba(0,63,37,.22)}
.tn.root .tn-inner{background:rgba(26,107,68,.12);border-color:var(--gold);border-width:2px}
.tn.editing .tn-inner{border-color:var(--gold);box-shadow:0 0 0 3px rgba(198,165,92,.12)}
.tn-gen{font-size:.55rem;letter-spacing:.15em;text-transform:uppercase;color:rgba(240,235,210,.28);margin-bottom:4px}
.tn-name{font-size:.85rem;font-weight:500;line-height:1.25;word-break:break-word;min-height:20px}
.tn-name.empty{color:rgba(240,235,210,.22);font-style:italic}
.tn-inp{background:none;border:none;border-bottom:1px solid rgba(198,165,92,.3);color:var(--text);font-size:.82rem;font-family:'Inter',sans-serif;width:100%;padding:1px 0 3px;outline:none;transition:var(--tr)}
.tn-inp:focus{border-color:var(--gold)}
.tn-edit-btn{position:absolute;top:8px;right:8px;width:20px;height:20px;border-radius:5px;background:rgba(198,165,92,.1);border:none;color:var(--gold);font-size:.65rem;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;transition:var(--tr)}
.tn:hover .tn-edit-btn{opacity:1}
.tn-num{font-size:.52rem;color:var(--gold2);opacity:.45;margin-top:6px}

/* SVG CONNECTORS */
.tree-svg{position:absolute;top:0;left:0;pointer-events:none;overflow:visible}

/* NODE PULSE on root */
.tn.root .tn-inner::after{content:'';position:absolute;inset:-4px;border-radius:17px;border:1px solid rgba(198,165,92,.2);animation:npulse 2.5s ease-in-out infinite}
@keyframes npulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:0;transform:scale(1.04)}}

/* EDITOR PANEL */
.tree-editor{background:rgba(22,26,20,.95);border:1px solid rgba(198,165,92,.18);border-radius:16px;padding:20px;margin-bottom:20px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.te-gen{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold2);opacity:.65;margin-bottom:4px}
.te-name{font-size:.95rem;font-weight:500;margin-bottom:10px;font-family:'Playfair Display',serif}
.te-inp{flex:1;min-width:180px;background:rgba(255,255,255,.04);border:1px solid rgba(198,165,92,.2);border-radius:10px;padding:10px 14px;font-family:'Inter',sans-serif;font-size:.87rem;color:var(--text);outline:none;transition:var(--tr)}
.te-inp:focus{border-color:rgba(198,165,92,.5)}
.te-hint{font-size:.72rem;color:rgba(240,235,210,.3);margin-top:4px}

/* ZOOM CONTROLS */
.zoom-ctrls{display:flex;gap:6px}
.zbtn{background:rgba(255,255,255,.04);border:1px solid rgba(198,165,92,.12);color:rgba(240,235,210,.5);width:32px;height:32px;border-radius:8px;font-size:.85rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:var(--tr);font-family:inherit}
.zbtn:hover{border-color:var(--gold);color:var(--gold)}

/* LEGEND */
.tree-legend{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:16px}
.leg-item{display:flex;align-items:center;gap:6px;font-size:.7rem;color:rgba(240,235,210,.35)}
.leg-dot{width:10px;height:10px;border-radius:50%}

/* ANCESTOR BADGE */
.abadge{display:inline-flex;align-items:center;gap:8px;background:rgba(0,63,37,.15);border:1px solid rgba(198,165,92,.16);border-radius:10px;padding:9px 14px;font-size:.78rem;color:rgba(240,235,210,.45);margin-bottom:20px}
.abadge strong{color:var(--gold);font-weight:500}

/* MY TREE CENTER */
.mtc{display:flex;flex-direction:column;align-items:center;text-align:center;padding:70px 24px;max-width:400px;margin:0 auto}
.mtc h2{font-family:'Playfair Display',serif;font-size:1.7rem;margin-bottom:10px}
.mtc p{font-size:.84rem;color:rgba(240,235,210,.38);line-height:1.72;margin-bottom:26px}

/* EMPTY / FOOTER */
.empty{text-align:center;padding:60px 24px;color:var(--muted)}
.empty-i{font-size:2rem;margin-bottom:8px;opacity:.3}
.empty-t{font-size:.83rem}
.footer{border-top:1px solid var(--border);padding:24px;text-align:center;font-size:.67rem;letter-spacing:.1em;color:var(--muted)}

/* TAB BAR */
.tabs{display:flex;gap:4px;background:rgba(255,255,255,.05);border:1px solid rgba(198,165,92,.18);border-radius:12px;padding:4px;margin-bottom:22px;width:fit-content}
.tab{background:none;border:1px solid transparent;font-family:inherit;font-size:.78rem;color:rgba(240,235,210,.55);padding:8px 16px;border-radius:9px;cursor:pointer;transition:var(--tr)}
.tab.on{background:rgba(0,63,37,.35);color:var(--gold);border:1px solid rgba(198,165,92,.3)}

/* ══════════════════════════════
   ONBOARDING FLOW
══════════════════════════════ */
.ob-wrap{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:80px 24px 60px;background:var(--bg)}
.ob-fade{animation:obfade .5s cubic-bezier(.4,0,.2,1) both}
@keyframes obfade{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
.ob-fade-out{animation:obfadeout .28s cubic-bezier(.4,0,.2,1) both}
@keyframes obfadeout{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-14px)}}
.ob-progress{position:fixed;top:0;left:0;right:0;z-index:400;display:flex;align-items:center;justify-content:space-between;padding:0 28px;height:52px;background:rgba(14,18,16,.88);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);transition:background .3s}
.ob-prog-label{font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(198,165,92,.5)}
.ob-prog-track{width:160px;height:2px;background:rgba(198,165,92,.1);border-radius:2px;overflow:hidden;margin-top:5px}
.ob-prog-fill{height:100%;background:linear-gradient(90deg,var(--gold2),var(--gold3));border-radius:2px;transition:width .6s cubic-bezier(.4,0,.2,1)}
.ob-logo{font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:700;color:var(--gold);letter-spacing:.02em}
.ob-dots{display:flex;gap:6px;align-items:center}
.ob-dot{width:6px;height:6px;border-radius:50%;background:rgba(198,165,92,.2);transition:all .3s}
.ob-dot.active{background:var(--gold);width:18px;border-radius:3px}
.ob-dot.done{background:rgba(198,165,92,.5)}
.intro-tagline{font-size:.62rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(198,165,92,.5);margin-bottom:6px;text-align:center}
.intro-title{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,4vw,2.4rem);font-weight:700;color:var(--text);text-align:center;line-height:1.15;letter-spacing:-.02em;margin-bottom:6px}
.intro-title em{color:var(--gold);font-style:normal}
.intro-sub{font-size:.82rem;color:var(--muted);text-align:center;max-width:340px;line-height:1.65;margin-bottom:28px}
.tribe-grid-ob{display:grid;grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:8px;width:100%;max-width:520px;margin-bottom:18px;max-height:300px;overflow-y:auto;padding-right:4px}
.tribe-btn{background:var(--card);border:1.5px solid var(--border);border-radius:12px;padding:12px 14px;cursor:pointer;transition:var(--tr);text-align:left;font-family:inherit;color:var(--text);display:flex;align-items:center;gap:9px}
.tribe-btn:hover{background:rgba(26,107,68,.12);border-color:rgba(198,165,92,.38)}
.tribe-btn.sel{background:rgba(26,107,68,.18);border-color:var(--gold);box-shadow:0 0 0 3px rgba(198,165,92,.1)}
.tribe-btn .tb-icon{font-size:1.2rem;flex-shrink:0}
.tribe-btn .tb-name{font-size:.82rem;font-weight:500;line-height:1.2;color:var(--text)}
.tribe-btn .tb-reg{font-size:.62rem;color:var(--muted);margin-top:2px}
.tribe-unknown{background:none;border:1px dashed rgba(198,165,92,.18);color:var(--muted);font-size:.78rem;padding:11px 20px;border-radius:10px;cursor:pointer;font-family:inherit;transition:var(--tr);display:block;width:100%;max-width:520px;margin-bottom:6px;text-align:center}
.tribe-unknown:hover{border-color:rgba(198,165,92,.4);color:var(--gold)}
.anc-list{display:flex;flex-direction:column;gap:8px;width:100%;max-width:420px;margin-bottom:18px}
.anc-row{display:flex;align-items:center;gap:10px;padding:4px 0}
.anc-num{font-family:'Playfair Display',serif;font-size:.88rem;color:var(--gold);opacity:.6;width:18px;flex-shrink:0;text-align:right}
.anc-gen{font-size:.62rem;color:var(--muted);width:105px;flex-shrink:0;line-height:1.3}
.anc-inp{flex:1;background:var(--card);border:1px solid var(--border);border-radius:9px;padding:9px 14px;font-family:'Playfair Display',serif;font-size:.87rem;color:var(--text);outline:none;transition:var(--tr)}
.anc-inp:focus{border-color:rgba(198,165,92,.5);background:rgba(255,255,255,.07)}
.anc-inp::placeholder{font-family:'Inter',sans-serif;font-size:.78rem;color:var(--muted);opacity:.5}
.anc-inp.filled{border-color:rgba(198,165,92,.35);background:rgba(26,107,68,.06)}
.ob-nav{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;width:100%;max-width:420px}
.ob-back{background:none;border:1px solid var(--border);color:var(--muted);padding:11px 22px;border-radius:var(--r);font-family:'Inter',sans-serif;font-size:.8rem;cursor:pointer;transition:var(--tr)}
.ob-back:hover{border-color:var(--gold);color:var(--gold)}
.tree-reveal{animation:treeReveal .8s cubic-bezier(.34,1.56,.64,1) both}
@keyframes treeReveal{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}
.matches-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px;width:100%;max-width:860px;margin-bottom:20px}
.match-card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:18px;position:relative;overflow:hidden;transition:var(--tr);box-shadow:var(--shadow)}
.match-card:not(.blurred):hover{background:rgba(26,107,68,.08);border-color:rgba(198,165,92,.3);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.2)}
.match-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:0;transition:var(--tr)}
.match-card:not(.blurred):hover::before{opacity:.8}
.match-card.blurred .mc-body{filter:blur(5px);user-select:none;pointer-events:none}
.match-card.blurred{border-color:var(--border);cursor:default;opacity:.75}
.mc-lock{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;z-index:2;background:rgba(10,16,12,.5);backdrop-filter:blur(2px);border-radius:16px}
.mc-lock-icon{font-size:1.4rem;opacity:.55}
.mc-lock-text{font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(198,165,92,.4)}
.mc-head{display:flex;align-items:center;gap:12px;margin-bottom:12px}
.mc-icon{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,var(--green),var(--green2));border:1.5px solid rgba(198,165,92,.28);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0}
.mc-name{font-family:'Playfair Display',serif;font-size:.95rem;font-weight:700;line-height:1.2;margin-bottom:2px}
.mc-era{font-size:.64rem;color:var(--muted);letter-spacing:.05em}
.mc-type-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(26,107,68,.15);border:1px solid rgba(198,165,92,.15);border-radius:20px;padding:4px 10px;font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(198,165,92,.7);margin-bottom:10px}
.mc-relation{font-size:.78rem;color:var(--muted);line-height:1.55;margin-bottom:10px}
.mc-detail{font-size:.73rem;color:rgba(240,235,210,.28);line-height:1.6;margin-bottom:12px;font-style:italic}
.mc-strength{display:flex;align-items:center;gap:8px}
.mc-strength-label{font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(198,165,92,.38);flex-shrink:0}
.mc-strength-track{flex:1;height:3px;background:rgba(255,255,255,.05);border-radius:2px;overflow:hidden}
.mc-strength-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--gold2),var(--gold3));transition:width 1.2s cubic-bezier(.4,0,.2,1)}
.mc-strength-pct{font-size:.65rem;color:var(--gold2);flex-shrink:0;font-family:'Playfair Display',serif;font-weight:700}
.unlock-banner{width:100%;max-width:860px;background:linear-gradient(135deg,rgba(26,107,68,.12),rgba(154,111,30,.07));border:1px solid var(--border);border-radius:16px;padding:20px 26px;display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap;margin-bottom:20px;position:relative;overflow:hidden}
.unlock-banner::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:.4}
.unlock-left{display:flex;align-items:center;gap:14px}
.unlock-sparkle{font-size:1.6rem;flex-shrink:0}
.unlock-title{font-family:'Playfair Display',serif;font-size:1rem;margin-bottom:3px}
.unlock-sub{font-size:.73rem;color:var(--muted);line-height:1.5}
.unlock-btn{background:var(--gold);color:#0e1210;border:none;padding:11px 22px;border-radius:var(--r);font-family:'Inter',sans-serif;font-size:.8rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;transition:var(--tr);white-space:nowrap;flex-shrink:0}
.unlock-btn:hover{background:var(--gold3);transform:translateY(-1px);box-shadow:0 6px 20px rgba(198,165,92,.3)}
.matches-header{display:flex;align-items:center;justify-content:space-between;width:100%;max-width:860px;margin-bottom:16px;flex-wrap:wrap;gap:8px}
.matches-title{font-family:'Playfair Display',serif;font-size:1.15rem}
.matches-count{font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(198,165,92,.45)}
.matches-hint{font-size:.71rem;color:rgba(240,235,210,.22);display:flex;align-items:center;gap:5px;margin-top:3px}
.prof-layout{width:100%;max-width:860px;display:grid;grid-template-columns:240px 1fr;gap:20px;align-items:start}
@media(max-width:720px){.prof-layout{grid-template-columns:1fr}}
.prof-sidebar{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:22px;display:flex;flex-direction:column;align-items:center;gap:14px;box-shadow:var(--shadow);position:relative;overflow:hidden}
.prof-sidebar::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:.45}
.prof-avatar-wrap{display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer}
.prof-avatar{width:96px;height:96px;border-radius:50%;border:2px solid rgba(198,165,92,.3);overflow:hidden;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--green3),var(--green2));transition:border-color .2s;position:relative}
.prof-avatar:hover{border-color:var(--gold)}
.prof-avatar img{width:100%;height:100%;object-fit:cover}
.prof-avatar-placeholder{font-family:'Playfair Display',serif;font-size:2.2rem;color:var(--gold);opacity:.75}
.prof-avatar-overlay{position:absolute;inset:0;background:rgba(0,0,0,.48);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s;border-radius:50%;font-size:.6rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(240,235,210,.85)}
.prof-avatar-wrap:hover .prof-avatar-overlay{opacity:1}
.prof-avatar-hint{font-size:.6rem;color:var(--muted);opacity:.6}
.prof-name-big{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:var(--text);text-align:center;line-height:1.2}
.prof-tribe-badge{display:flex;align-items:center;gap:7px;background:rgba(26,107,68,.15);border:1px solid rgba(198,165,92,.2);border-radius:20px;padding:7px 14px;font-size:.77rem;cursor:pointer;transition:var(--tr);width:100%;justify-content:center}
.prof-tribe-badge:hover{background:rgba(26,107,68,.25);border-color:var(--gold)}
.prof-tribe-badge .ptb-val{color:var(--gold);font-weight:500}
.prof-tribe-badge .ptb-lbl{color:var(--muted);font-size:.63rem}
.prof-empty-tribe{width:100%;border:1.5px dashed rgba(198,165,92,.18);border-radius:10px;padding:11px;text-align:center;font-size:.77rem;color:var(--muted);cursor:pointer;transition:var(--tr);background:none;font-family:inherit}
.prof-empty-tribe:hover{border-color:rgba(198,165,92,.4);color:var(--gold)}
.prof-content{display:flex;flex-direction:column;gap:14px}
.prof-section{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:18px;box-shadow:var(--shadow)}
.prof-section-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.prof-section-title{font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(198,165,92,.5)}
.prof-section-action{font-size:.72rem;color:var(--gold2);cursor:pointer;background:none;border:none;font-family:inherit;transition:var(--tr);padding:3px 8px;border-radius:6px;letter-spacing:.03em}
.prof-section-action:hover{color:var(--gold);background:rgba(198,165,92,.08)}
.prof-tree-ph{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100px;gap:7px;border:1.5px dashed rgba(198,165,92,.12);border-radius:10px;cursor:pointer;transition:var(--tr)}
.prof-tree-ph:hover{border-color:rgba(198,165,92,.28);background:rgba(26,107,68,.05)}
.prof-tree-ph-icon{font-size:1.8rem;opacity:.28}
.prof-tree-ph-text{font-size:.78rem;color:var(--muted)}
.prof-tree-ph-sub{font-size:.65rem;color:rgba(198,165,92,.35)}
.prof-cta-row{display:flex;gap:10px;flex-wrap:wrap}
.anc-mini-list{display:flex;flex-direction:column;gap:6px}
.anc-mini-row{display:flex;align-items:center;gap:9px;padding:6px 10px;border-radius:8px;background:var(--bg2)}
.anc-mini-num{font-size:.63rem;color:var(--gold2);opacity:.55;width:16px;text-align:right;flex-shrink:0}
.anc-mini-gen{font-size:.65rem;color:var(--muted);width:98px;flex-shrink:0}
.anc-mini-val{font-size:.8rem;font-family:'Playfair Display',serif;color:var(--text)}
.anc-mini-empty{font-size:.74rem;color:rgba(240,235,210,.18);font-style:italic}
.sj-tree{display:flex;flex-direction:column;align-items:center;padding:12px 0}
.sj-level{display:flex;flex-direction:column;align-items:center;opacity:0;transform:translateY(14px);animation:sj-appear .5s cubic-bezier(.34,1.2,.64,1) forwards}
@keyframes sj-appear{to{opacity:1;transform:translateY(0)}}
.sj-node{position:relative;min-width:160px;max-width:210px;border-radius:12px;padding:12px 16px;text-align:center;cursor:default;transition:var(--tr)}
.sj-node.sj-user{background:linear-gradient(135deg,rgba(26,107,68,.22),rgba(26,107,68,.1));border:2px solid var(--gold);box-shadow:0 0 20px rgba(26,107,68,.2),0 2px 8px rgba(0,0,0,.2)}
.sj-node.sj-user:hover{border-color:var(--gold3);box-shadow:0 0 28px rgba(26,107,68,.3)}
.sj-node.sj-ancestor{background:var(--card);border:1.5px solid var(--border);box-shadow:var(--shadow)}
.sj-node.sj-ancestor:hover{background:rgba(26,107,68,.1);border-color:rgba(198,165,92,.4)}
.sj-node.sj-empty{background:var(--bg2);border:1.5px dashed var(--border);cursor:pointer}
.sj-node.sj-empty:hover{background:rgba(26,107,68,.08);border-color:rgba(198,165,92,.35)}
.sj-gen-label{font-size:.52rem;letter-spacing:.16em;text-transform:uppercase;margin-bottom:5px}
.sj-user .sj-gen-label{color:rgba(198,165,92,.65)}
.sj-ancestor .sj-gen-label{color:var(--muted)}
.sj-empty .sj-gen-label{color:rgba(240,235,210,.2)}
.sj-name{font-family:'Playfair Display',serif;font-size:.95rem;font-weight:600;color:var(--text);line-height:1.25}
.sj-user .sj-name{color:var(--gold);font-size:1.05rem}
.sj-empty .sj-name{font-size:.8rem;color:var(--muted);font-family:'Inter',sans-serif;font-weight:400;font-style:italic}
.sj-node.sj-user::after{content:'';position:absolute;inset:-5px;border-radius:16px;border:1px solid rgba(198,165,92,.15);animation:npulse 2.5s ease-in-out infinite;pointer-events:none}
.sj-connector{width:2px;height:26px;background:linear-gradient(180deg,rgba(198,165,92,.15),rgba(198,165,92,.4));flex-shrink:0}
@media(max-width:700px){
  .pper{grid-template-columns:1fr;gap:24px;padding:32px 16px}
  .pside{display:none}
  .comm-stats{grid-template-columns:repeat(2,1fr)}
  .ob-progress{padding:0 16px}
  .ob-prog-track{width:100px}
  .matches-grid{grid-template-columns:1fr}
  .unlock-banner{flex-direction:column;align-items:flex-start}
}
/* ══════════════════════════════
   TRIBE PICKER SCREEN
══════════════════════════════ */
.tp-wrap{width:100%;max-width:1020px;display:flex;flex-direction:column;gap:28px}
.tp-zhuz{display:flex;flex-direction:column;gap:10px}
.tp-zhuz-label{font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(198,165,92,.5);padding:0 2px;display:flex;align-items:center;gap:10px}
.tp-zhuz-label::after{content:"";flex:1;height:1px;background:rgba(198,165,92,.12)}
.tp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}
.tp-card{position:relative;background:rgba(255,255,255,.03);border:1.5px solid rgba(198,165,92,.1);border-radius:16px;padding:18px 16px;cursor:pointer;transition:all .22s cubic-bezier(.4,0,.2,1);overflow:hidden;text-align:left}
.tp-card::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,63,37,.0),rgba(0,63,37,.22));opacity:0;transition:opacity .22s}
.tp-card:hover{border-color:rgba(198,165,92,.35);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.25)}
.tp-card:hover::before{opacity:1}
.tp-card.sel{background:rgba(0,63,37,.28);border-color:var(--gold);box-shadow:0 0 0 3px rgba(198,165,92,.12),0 8px 28px rgba(0,0,0,.3)}
.tp-card.sel::before{opacity:1}
.tp-icon{font-size:2rem;margin-bottom:10px;display:block}
.tp-name{font-family:"Playfair Display",serif;font-size:1.05rem;font-weight:700;color:var(--text);margin-bottom:4px;line-height:1.2}
.tp-card.sel .tp-name{color:var(--gold)}
.tp-region{font-size:.62rem;color:var(--muted);letter-spacing:.05em;margin-bottom:8px}
.tp-desc{font-size:.72rem;color:rgba(240,235,210,.45);line-height:1.55}
.tp-members{font-size:.6rem;color:rgba(198,165,92,.45);margin-top:10px;letter-spacing:.06em}
.tp-check{position:absolute;top:12px;right:12px;width:22px;height:22px;border-radius:50%;background:var(--gold);display:flex;align-items:center;justify-content:center;font-size:.75rem;opacity:0;transform:scale(.6);transition:all .2s}
.tp-card.sel .tp-check{opacity:1;transform:scale(1)}
.tp-selected-banner{background:linear-gradient(135deg,rgba(0,63,37,.3),rgba(198,165,92,.08));border:1px solid rgba(198,165,92,.3);border-radius:14px;padding:16px 20px;display:flex;align-items:center;gap:16px;width:100%;max-width:1020px}

/* ══════════════════════════════
   CITY PICKER SCREEN
══════════════════════════════ */
.cp-regions{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px;width:100%;max-width:900px}
.cp-region{position:relative;background:rgba(255,255,255,.03);border:1.5px solid rgba(198,165,92,.1);border-radius:14px;padding:16px 14px;cursor:pointer;transition:all .22s cubic-bezier(.4,0,.2,1);overflow:hidden;text-align:left}
.cp-region::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,63,37,0),rgba(0,63,37,.2));opacity:0;transition:opacity .22s}
.cp-region:hover{border-color:rgba(198,165,92,.4);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.25)}
.cp-region:hover::before{opacity:1}
.cp-region.sel{background:rgba(0,63,37,.25);border-color:var(--gold);box-shadow:0 0 0 2px rgba(198,165,92,.1)}
.cp-region-icon{font-size:1.6rem;margin-bottom:8px;display:block}
.cp-region-name{font-family:"Playfair Display",serif;font-size:.88rem;font-weight:700;color:var(--text);line-height:1.2;margin-bottom:3px}
.cp-region.sel .cp-region-name{color:var(--gold)}
.cp-region-count{font-size:.6rem;color:rgba(198,165,92,.45);letter-spacing:.06em}
.cp-cities-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;width:100%;max-width:900px;max-height:380px;overflow-y:auto;padding-right:4px}
.cp-city{background:rgba(255,255,255,.03);border:1.5px solid rgba(198,165,92,.1);border-radius:10px;padding:12px 12px;cursor:pointer;transition:all .18s;text-align:left}
.cp-city:hover{background:rgba(0,63,37,.15);border-color:rgba(198,165,92,.35);transform:translateY(-1px)}
.cp-city.sel{background:rgba(0,63,37,.28);border-color:var(--gold)}
.cp-city-name{font-family:"Playfair Display",serif;font-size:.85rem;font-weight:600;color:var(--text);margin-bottom:2px}
.cp-city.sel .cp-city-name{color:var(--gold)}
.cp-city-type{font-size:.58rem;color:var(--muted);letter-spacing:.05em;text-transform:uppercase}
.cp-search{width:100%;max-width:900px;background:rgba(255,255,255,.06);border:1.5px solid rgba(198,165,92,.2);border-radius:10px;padding:11px 16px;font-family:"Inter",sans-serif;font-size:.86rem;color:var(--text);outline:none;transition:all .2s;margin-bottom:12px}
.cp-search::placeholder{color:rgba(240,235,210,.3)}
.cp-search:focus{border-color:var(--gold);background:rgba(255,255,255,.09);box-shadow:0 0 0 3px rgba(198,165,92,.1)}

/* ══════════════════════════════
   ДОСТИЖЕНИЯ / ACHIEVEMENTS
══════════════════════════════ */
.ach-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px;margin-bottom:8px}
.ach-card{background:rgba(255,255,255,.03);border:1.5px solid rgba(198,165,92,.1);border-radius:14px;padding:16px;display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;position:relative;overflow:hidden;transition:all .22s}
.ach-card.unlocked{background:rgba(0,63,37,.18);border-color:rgba(198,165,92,.35)}
.ach-card.unlocked::after{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(198,165,92,.06),transparent);pointer-events:none}
.ach-icon{font-size:2rem;filter:grayscale(1);opacity:.3;transition:all .3s}
.ach-card.unlocked .ach-icon{filter:none;opacity:1}
.ach-name{font-size:.78rem;font-weight:600;color:var(--muted);line-height:1.3}
.ach-card.unlocked .ach-name{color:var(--gold)}
.ach-desc{font-size:.65rem;color:rgba(240,235,210,.25);line-height:1.45}
.ach-card.unlocked .ach-desc{color:rgba(240,235,210,.5)}
.ach-badge{position:absolute;top:8px;right:8px;background:var(--gold);color:var(--dark);font-size:.5rem;font-weight:700;letter-spacing:.08em;padding:2px 6px;border-radius:20px;text-transform:uppercase}

/* ══════════════════════════════
   ИИ ИСТОРИЯ РОДА
══════════════════════════════ */
.ai-story-wrap{background:linear-gradient(135deg,rgba(0,48,26,.15) 0%,rgba(14,18,16,.8) 100%);border:1px solid rgba(198,165,92,.18);border-radius:18px;padding:28px;position:relative;overflow:hidden}
.ai-story-wrap::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:.4}
.ai-story-title{font-family:"Playfair Display",serif;font-size:1.1rem;color:var(--gold);margin-bottom:4px}
.ai-story-sub{font-size:.68rem;color:var(--muted);margin-bottom:18px;letter-spacing:.04em}
.ai-story-text{font-family:"Playfair Display",serif;font-size:.95rem;line-height:1.85;color:rgba(240,235,210,.82);white-space:pre-wrap}
.ai-story-cursor{display:inline-block;width:2px;height:.9em;background:var(--gold);margin-left:2px;vertical-align:text-bottom;animation:blink .85s step-end infinite}
.ai-gen-btn{display:inline-flex;align-items:center;gap:8px;background:var(--gold);color:var(--dark);border:none;padding:12px 24px;border-radius:var(--r);font-family:"Inter",sans-serif;font-size:.82rem;font-weight:600;letter-spacing:.05em;cursor:pointer;transition:var(--tr)}
.ai-gen-btn:hover{background:var(--gold3);transform:translateY(-1px)}
.ai-gen-btn:disabled{opacity:.5;cursor:default;transform:none}

/* ══════════════════════════════
   ИСТОРИЧЕСКИЙ КОНТЕКСТ
══════════════════════════════ */
.hist-timeline{display:flex;flex-direction:column;gap:0;position:relative}
.hist-timeline::before{content:"";position:absolute;left:20px;top:0;bottom:0;width:1px;background:linear-gradient(180deg,rgba(198,165,92,.3),rgba(198,165,92,.05))}
.hist-row{display:flex;gap:16px;padding:14px 0;position:relative}
.hist-dot{width:41px;height:41px;border-radius:50%;background:rgba(0,63,37,.3);border:1.5px solid rgba(198,165,92,.25);display:flex;align-items:center;justify-content:center;font-size:.85rem;flex-shrink:0;z-index:1}
.hist-row.filled .hist-dot{background:rgba(0,63,37,.5);border-color:rgba(198,165,92,.5)}
.hist-content{flex:1}
.hist-gen{font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(198,165,92,.5);margin-bottom:3px}
.hist-name{font-family:"Playfair Display",serif;font-size:.9rem;font-weight:600;color:var(--text);margin-bottom:4px}
.hist-row.empty .hist-name{color:rgba(240,235,210,.28);font-style:italic}
.hist-event{font-size:.72rem;color:rgba(240,235,210,.45);line-height:1.5;border-left:2px solid rgba(198,165,92,.15);padding-left:8px;margin-top:4px}
.hist-year{font-size:.62rem;color:rgba(198,165,92,.4);margin-bottom:2px}

/* ══════════════════════════════
   СОВПАДЕНИЯ 7 АТА
══════════════════════════════ */
.match7-card{background:rgba(255,255,255,.03);border:1.5px solid rgba(198,165,92,.12);border-radius:14px;padding:16px;display:flex;align-items:center;gap:14px;transition:all .2s;cursor:default}
.match7-card.strong{border-color:rgba(198,165,92,.35);background:rgba(0,63,37,.12)}
.match7-av{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--green),var(--green2));border:1.5px solid rgba(198,165,92,.25);display:flex;align-items:center;justify-content:center;font-family:"Playfair Display",serif;font-size:1.1rem;color:var(--gold);flex-shrink:0}
.match7-name{font-size:.88rem;font-weight:600;margin-bottom:2px}
.match7-detail{font-size:.7rem;color:var(--muted);line-height:1.4}
.match7-strength{display:flex;align-items:center;gap:8px;margin-top:6px}
.match7-bar{flex:1;height:3px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden}
.match7-fill{height:100%;background:linear-gradient(90deg,var(--gold2),var(--gold3));border-radius:2px}

`;

/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════
   ACHIEVEMENTS DATA
═══════════════════════════════════════════════════════════ */
const ACHIEVEMENTS = [
  { id:"first_step",   icon:"🌱", name:"Первый шаг",        desc:"Зарегистрироваться в ABYZ",                  check: (p,n) => !!n },
  { id:"ru_chosen",    icon:"🏔", name:"Знаю свой род",      desc:"Выбрать свой ру",                            check: (p) => !!p.tribeId },
  { id:"city_chosen",  icon:"🏙", name:"Туған жер",          desc:"Указать город рождения",                     check: (p) => !!p.cityId },
  { id:"one_ata",      icon:"👤", name:"Помню отца",         desc:"Записать хотя бы одного предка",             check: (p) => (p.ancestors||[]).filter(Boolean).length >= 1 },
  { id:"three_ata",    icon:"👴", name:"Три поколения",      desc:"Записать 3 предков",                         check: (p) => (p.ancestors||[]).filter(Boolean).length >= 3 },
  { id:"all_ata",      icon:"🏆", name:"Жеті ата",           desc:"Заполнить все 7 поколений",                  check: (p) => (p.ancestors||[]).filter(Boolean).length >= 7 },
  { id:"rare_ru",      icon:"💎", name:"Редкий ру",          desc:"Ваш ру имеет менее 500 участников",          check: (p) => { const t=TRIBES.find(x=>x.id===p.tribeId); return t && t.members < 500; } },
  { id:"full_profile", icon:"⭐", name:"Полный профиль",     desc:"Заполнить ру, город и всех 7 ата",           check: (p) => !!p.tribeId && !!p.cityId && (p.ancestors||[]).filter(Boolean).length>=7 },
];

/* ═══════════════════════════════════════════════════════════
   HISTORICAL CONTEXT BY GENERATION
   Approximate years: gen1≈1960s, gen2≈1930s, gen3≈1900s...
═══════════════════════════════════════════════════════════ */
const HIST_CONTEXT = [
  { gen:1, period:"1950–1980-е", icon:"🏗", event:"Эпоха строительства советского Казахстана. Освоение целины, промышленный рост, урбанизация." },
  { gen:2, period:"1920–1950-е", icon:"⚔️", event:"Коллективизация, голод 1931–1933, Великая Отечественная война. Тяжелейшее время для казахского народа." },
  { gen:3, period:"1890–1920-е", icon:"📜", event:"Алаш Орда, движение за казахскую государственность. Революция 1917 года. Конец Российской империи." },
  { gen:4, period:"1860–1890-е", icon:"🌾", event:"Присоединение казахских земель к России. Колонизация степи. Восстание Кенесары ещё в памяти." },
  { gen:5, period:"1830–1860-е", icon:"🏇", event:"Последние годы независимости. Кенесары хан ведёт борьбу за свободу казахского народа (1837–1847)." },
  { gen:6, period:"1790–1830-е", icon:"🕌", event:"Эпоха Трёх жузов. Абылай хан объединил казахов. Расцвет степной дипломатии и военного искусства." },
  { gen:7, period:"1750–1790-е", icon:"🦅", event:"Анракайская битва (1730). Освобождение от джунгарского нашествия. Золотой век казахской государственности." },
];

/* Mock matches — в будущем заменить реальными данными из Supabase */
const MOCK_ATA_MATCHES = [
  { id:1, name:"Асхат Сейтқали",    city:"Алматы",    ru:"Арғын",   common:"Жақсыбек (3-е поколение)", strength:85 },
  { id:2, name:"Нұрлан Бекұлы",     city:"Астана",    ru:"Арғын",   common:"Дүйсен (2-е поколение)",   strength:72 },
  { id:3, name:"Гүлнәр Омарова",    city:"Шымкент",   ru:"Қыпшақ",  common:"Сейіт (4-е поколение)",    strength:61 },
];

const TRIBES = [
  /* ── Ұлы жүз · Старший жуз ── */
  { id:"dulat",       name:"Дулат", zhuz:"Ұлы жүз",  desc:"Ұлы жүздің ең ірі және ықпалды руларының бірі", region:"Оңтүстік Қазақстан", members:1840 },
  { id:"jalayir",     name:"Жалайыр", zhuz:"Ұлы жүз",  desc:"Бай тарихы мен дәстүрі бар Ұлы жүз руы", region:"Жамбыл облысы",         members:920 },
  { id:"shapyrashty", name:"Шапырашты", zhuz:"Ұлы жүз",  desc:"Алматы маңында орналасқан Ұлы жүздің ежелгі руы", region:"Алматы облысы",  members:680 },
  { id:"alban",       name:"Албан", zhuz:"Ұлы жүз",  desc:"Тянь-Шань баурайын мекендеген Ұлы жүздің батыр руы", region:"Алматы облысы", members:750 },
  { id:"suan",        name:"Суан", zhuz:"Ұлы жүз",  desc:"Іле өзені алқабын мекендеген ру", region:"Алматы облысы",                   members:320 },
  { id:"kanly",       name:"Қаңлы", zhuz:"Ұлы жүз",  desc:"Сырдарья бойын мекендеген ежелгі ру", region:"Оңтүстік Қазақстан",          members:480 },
  { id:"saryuysun",   name:"Сарыүйсін", zhuz:"Ұлы жүз",  desc:"Үйсін тайпасының тармағы, оңтүстік жерлерді мекендеген", region:"Оңтүстік Қазақстан", members:410 },
  { id:"sirgeli",     name:"Сіргелі", zhuz:"Ұлы жүз",  desc:"Алматы маңындағы Ұлы жүз руы", region:"Алматы облысы",                    members:290 },
  { id:"oshakty",     name:"Ошақты", zhuz:"Ұлы жүз",  desc:"Шу өзені алқабын мекендеген ру", region:"Жамбыл облысы",                   members:260 },
  { id:"ysty",        name:"Ысты", zhuz:"Ұлы жүз",  desc:"Оңтүстік Қазақстанды мекендеген ру", region:"Оңтүстік Қазақстан",           members:310 },
  { id:"shanyskhaly", name:"Шаңышқылы", zhuz:"Ұлы жүз",  desc:"Ұлы жүздің батыс шекарасын мекендеген ру", region:"Жамбыл облысы",         members:230 },

  /* ── Орта жүз · Средний жуз ── */
  { id:"argyn",   name:"Арғын", zhuz:"Орта жүз", desc:"Орта жүздің ең ірі және ықпалды тайпасы", region:"Орталық Қазақстан",          members:2400 },
  { id:"naiman",  name:"Найман", zhuz:"Орта жүз", desc:"Орта жүздің ежелгі қуатты тайпасы", region:"Шығыс Қазақстан",                 members:1820 },
  { id:"kipchak", name:"Қыпшақ", zhuz:"Орта жүз", desc:"Еуразия далаларының тарихи ықпалды тайпасы", region:"Солтүстік Қазақстан",    members:1560 },
  { id:"kongrat", name:"Қоңырат", zhuz:"Орта жүз", desc:"Орта жүздің ықпалды тайпасы, шығыс жерлерді мекендеген", region:"Шығыс Қазақстан", members:980 },
  { id:"kerey",   name:"Керей", zhuz:"Орта жүз", desc:"Қазақ хандығының негізін қалаушылардың бірі", region:"Шығыс Қазақстан",         members:870 },
  { id:"uak",     name:"Уақ", zhuz:"Орта жүз", desc:"Орта жүздің солтүстік-шығыс аймақтарын мекендеген ру", region:"Солтүстік Қазақстан", members:640 },

  /* ── Кіші жүз · Младший жуз ── */
  /* Алимулы */
  { id:"shekty",    name:"Шекті", zhuz:"Кіші жүз · Алимулы", desc:"Алимулы бірлестігінің ірі руы", region:"Батыс Қазақстан",          members:540 },
  { id:"karakesek", name:"Қаракесек", zhuz:"Кіші жүз · Алимулы", desc:"Алимулы бірлестігіне кіретін ру", region:"Батыс Қазақстан",         members:460 },
  { id:"kete",      name:"Кете", zhuz:"Кіші жүз · Алимулы", desc:"Сырдарья алқабын мекендеген ру", region:"Қызылорда облысы",         members:380 },
  { id:"tortkara",  name:"Төртқара", zhuz:"Кіші жүз · Алимулы", desc:"Батыс Қазақстан далаларын мекендеген ру", region:"Батыс Қазақстан", members:290 },
  { id:"shomekei",  name:"Шөмекей", zhuz:"Кіші жүз · Алимулы", desc:"Алимулы бірлестігінің руы", region:"Батыс Қазақстан",               members:310 },
  /* Байулы */
  { id:"adai",    name:"Адай", zhuz:"Кіші жүз · Байулы", desc:"Маңғыстауды мекендеген аңызға айналған мойымас ру", region:"Маңғыстау", members:1240 },
  { id:"berish",  name:"Беріш", zhuz:"Кіші жүз · Байулы", desc:"Байулы бірлестігінің ірі руы", region:"Атырау облысы",                 members:560 },
  { id:"taz",     name:"Таз", zhuz:"Кіші жүз · Байулы", desc:"Байулы бірлестігіне кіретін ру", region:"Батыс Қазақстан",              members:280 },
  /* Жетыру */
  { id:"tabyn",   name:"Табын", zhuz:"Кіші жүз · Жетіру", desc:"Жетіру бірлестігінің атақты руы, малшылар", region:"Батыс Қазақстан", members:720 },
  { id:"tama",    name:"Тама", zhuz:"Кіші жүз · Жетіру", desc:"Жетіру бірлестігінің руы", region:"Батыс Қазақстан",                   members:380 },
  { id:"jagalbayly", name:"Жағалбайлы", zhuz:"Кіші жүз · Жетіру", desc:"Орал өзені бойын мекендеген ру", region:"Батыс Қазақстан",        members:310 },

  /* ── Жүзден тыс · Вне жузов ── */
  { id:"tore",      name:"Төре", zhuz:"Жүзден тыс", desc:"Шыңғыс ханның ұрпақтары, хандар осы топтан сайланған", region:"Бүкіл Қазақстан", members:480 },
  { id:"koja",      name:"Қожа", zhuz:"Жүзден тыс", desc:"Исламды таратқан миссионерлердің ұрпақтары", region:"Оңтүстік Қазақстан",     members:360 },
  { id:"tolengit",  name:"Төленгіт", zhuz:"Жүзден тыс", desc:"Хандар мен сұлтандарға қызмет еткен сословие", region:"Бүкіл Қазақстан",    members:220 },
];

const CITIES = [
  /* ── Республикалық маңызы бар қалалар ── */
  { id:"astana",       name:"Астана",           oblast:"Астана қаласы",              type:"республикалық қала" },
  { id:"almaty",       name:"Алматы",           oblast:"Алматы қаласы",              type:"республикалық қала" },
  { id:"shymkent",     name:"Шымкент",          oblast:"Шымкент қаласы",             type:"республикалық қала" },

  /* ── Абай облысы ── */
  { id:"semey",        name:"Семей",            oblast:"Абай облысы",                type:"облыс орталығы" },
  { id:"ayagoz",       name:"Аягөз",            oblast:"Абай облысы",                type:"қала" },
  { id:"kurchatov",    name:"Курчатов",         oblast:"Абай облысы",                type:"қала" },
  { id:"zhangiztobe",  name:"Жаңғызтөбе",      oblast:"Абай облысы",                type:"кент" },
  { id:"shemonaikha",  name:"Шемонайха",        oblast:"Абай облысы",                type:"қала" },

  /* ── Ақмола облысы ── */
  { id:"kokshetau",    name:"Көкшетау",         oblast:"Ақмола облысы",              type:"облыс орталығы" },
  { id:"stepnogorsk",  name:"Степногорск",      oblast:"Ақмола облысы",              type:"қала" },
  { id:"atbasar",      name:"Атбасар",          oblast:"Ақмола облысы",              type:"қала" },
  { id:"shchuchinsk",  name:"Щучинск",          oblast:"Ақмола облысы",              type:"қала" },
  { id:"makinsk",      name:"Макінск",          oblast:"Ақмола облысы",              type:"қала" },
  { id:"esil",         name:"Есіл",             oblast:"Ақмола облысы",              type:"қала" },
  { id:"bayanaul",     name:"Баянауыл",         oblast:"Ақмола облысы",              type:"кент" },

  /* ── Ақтөбе облысы ── */
  { id:"aktobe",       name:"Ақтөбе",           oblast:"Ақтөбе облысы",              type:"облыс орталығы" },
  { id:"khromtau",     name:"Хромтау",          oblast:"Ақтөбе облысы",              type:"қала" },
  { id:"kandyagash",   name:"Қандыағаш",        oblast:"Ақтөбе облысы",              type:"қала" },
  { id:"embi",         name:"Ембі",             oblast:"Ақтөбе облысы",              type:"қала" },
  { id:"shalkar",      name:"Шалқар",           oblast:"Ақтөбе облысы",              type:"қала" },

  /* ── Алматы облысы ── */
  { id:"konaev",       name:"Қонаев",           oblast:"Алматы облысы",              type:"облыс орталығы" },
  { id:"kapshagay",    name:"Қапшағай",         oblast:"Алматы облысы",              type:"қала" },
  { id:"taldykorgan",  name:"Талдықорған",      oblast:"Алматы облысы",              type:"қала" },
  { id:"esik",         name:"Есік",             oblast:"Алматы облысы",              type:"қала" },
  { id:"kaskelen",     name:"Қасқелең",         oblast:"Алматы облысы",              type:"қала" },
  { id:"tekeli",       name:"Текелі",           oblast:"Алматы облысы",              type:"қала" },
  { id:"sarkand",      name:"Саркан",           oblast:"Алматы облысы",              type:"қала" },
  { id:"usharal",      name:"Ұшарал",           oblast:"Алматы облысы",              type:"қала" },
  { id:"uzynagash",    name:"Үзынағаш",         oblast:"Алматы облысы",              type:"кент" },
  { id:"shelek",       name:"Шелек",            oblast:"Алматы облысы",              type:"кент" },
  { id:"korday",       name:"Қордай",           oblast:"Алматы облысы",              type:"кент" },
  { id:"boralday",     name:"Боралдай",         oblast:"Алматы облысы",              type:"кент" },

  /* ── Атырау облысы ── */
  { id:"atyrau",       name:"Атырау",           oblast:"Атырау облысы",              type:"облыс орталығы" },
  { id:"kuryk",        name:"Құрық",            oblast:"Атырау облысы",              type:"кент" },
  { id:"makat",        name:"Мақат",            oblast:"Атырау облысы",              type:"кент" },
  { id:"dossor",       name:"Доссор",           oblast:"Атырау облысы",              type:"кент" },

  /* ── Батыс Қазақстан облысы ── */
  { id:"oral",         name:"Орал",             oblast:"Батыс Қазақстан облысы",     type:"облыс орталығы" },
  { id:"aksay",        name:"Ақсай",            oblast:"Батыс Қазақстан облысы",     type:"қала" },
  { id:"qazaly",       name:"Қазалы",           oblast:"Батыс Қазақстан облысы",     type:"кент" },

  /* ── Жамбыл облысы ── */
  { id:"taraz",        name:"Тараз",            oblast:"Жамбыл облысы",              type:"облыс орталығы" },
  { id:"shu",          name:"Шу",               oblast:"Жамбыл облысы",              type:"қала" },
  { id:"karatau",      name:"Қаратау",          oblast:"Жамбыл облысы",              type:"қала" },
  { id:"zhanatas",     name:"Жаңатас",          oblast:"Жамбыл облысы",              type:"қала" },
  { id:"merke",        name:"Мерке",            oblast:"Жамбыл облысы",              type:"кент" },

  /* ── Жетісу облысы ── */
  { id:"taldykorgan2", name:"Талдықорған",      oblast:"Жетісу облысы",              type:"облыс орталығы" },
  { id:"zharkent",     name:"Жаркент",          oblast:"Жетісу облысы",              type:"қала" },
  { id:"ushtobe",      name:"Үштөбе",           oblast:"Жетісу облысы",              type:"қала" },

  /* ── Қарағанды облысы ── */
  { id:"karaganda",    name:"Қарағанды",        oblast:"Қарағанды облысы",           type:"облыс орталығы" },
  { id:"temirtau",     name:"Теміртау",         oblast:"Қарағанды облысы",           type:"қала" },
  { id:"balkhash",     name:"Балқаш",           oblast:"Қарағанды облысы",           type:"қала" },
  { id:"saran",        name:"Саран",            oblast:"Қарағанды облысы",           type:"қала" },
  { id:"shakhtinsk",   name:"Шахтинск",         oblast:"Қарағанды облысы",           type:"қала" },
  { id:"abay_kg",      name:"Абай",             oblast:"Қарағанды облысы",           type:"қала" },
  { id:"karakaragay",  name:"Қарқаралы",        oblast:"Қарағанды облысы",           type:"кент" },
  { id:"priozersk",    name:"Приозерск",        oblast:"Қарағанды облысы",           type:"қала" },

  /* ── Қостанай облысы ── */
  { id:"kostanay",     name:"Қостанай",         oblast:"Қостанай облысы",            type:"облыс орталығы" },
  { id:"rudny",        name:"Рудный",           oblast:"Қостанай облысы",            type:"қала" },
  { id:"lisakovsk",    name:"Лисаковск",        oblast:"Қостанай облысы",            type:"қала" },
  { id:"arkalyk",      name:"Арқалық",          oblast:"Қостанай облысы",            type:"қала" },
  { id:"zhitikara",    name:"Жітіқара",         oblast:"Қостанай облысы",            type:"қала" },

  /* ── Қызылорда облысы ── */
  { id:"kyzylorda",    name:"Қызылорда",        oblast:"Қызылорда облысы",           type:"облыс орталығы" },
  { id:"baikonur",     name:"Байқоңыр",         oblast:"Қызылорда облысы",           type:"қала" },
  { id:"aral",         name:"Арал",             oblast:"Қызылорда облысы",           type:"қала" },
  { id:"zhosaly",      name:"Жосалы",           oblast:"Қызылорда облысы",           type:"кент" },
  { id:"zhalagash",    name:"Жалағаш",          oblast:"Қызылорда облысы",           type:"кент" },
  { id:"shiyeli",      name:"Шиелі",            oblast:"Қызылорда облысы",           type:"кент" },

  /* ── Маңғыстау облысы ── */
  { id:"aktau",        name:"Ақтау",            oblast:"Маңғыстау облысы",           type:"облыс орталығы" },
  { id:"zhanaozen",    name:"Жаңаөзен",         oblast:"Маңғыстау облысы",           type:"қала" },
  { id:"beyneu",       name:"Бейнеу",           oblast:"Маңғыстау облысы",           type:"кент" },
  { id:"kuryk_m",      name:"Құрық",            oblast:"Маңғыстау облысы",           type:"кент" },

  /* ── Павлодар облысы ── */
  { id:"pavlodar",     name:"Павлодар",         oblast:"Павлодар облысы",            type:"облыс орталығы" },
  { id:"ekibastuz",    name:"Екібастұз",        oblast:"Павлодар облысы",            type:"қала" },
  { id:"aksu_pav",     name:"Ақсу",             oblast:"Павлодар облысы",            type:"қала" },

  /* ── Солтүстік Қазақстан облысы ── */
  { id:"petropavl",    name:"Петропавл",        oblast:"Солтүстік Қазақстан облысы", type:"облыс орталығы" },

  /* ── Түркістан облысы ── */
  { id:"turkestan",    name:"Түркістан",        oblast:"Түркістан облысы",           type:"облыс орталығы" },
  { id:"kentau",       name:"Кентау",           oblast:"Түркістан облысы",           type:"қала" },
  { id:"arys",         name:"Арыс",             oblast:"Түркістан облысы",           type:"қала" },
  { id:"saryagash",    name:"Сарыағаш",         oblast:"Түркістан облысы",           type:"қала" },
  { id:"zhetisay",     name:"Жетісай",          oblast:"Түркістан облысы",           type:"қала" },
  { id:"lengir",       name:"Леңгір",           oblast:"Түркістан облысы",           type:"қала" },

  /* ── Ұлытау облысы ── */
  { id:"zhezkazgan",   name:"Жезқазған",        oblast:"Ұлытау облысы",              type:"облыс орталығы" },
  { id:"satpayev",     name:"Сәтпаев",          oblast:"Ұлытау облысы",              type:"қала" },
  { id:"ulytau",       name:"Ұлытау",           oblast:"Ұлытау облысы",              type:"кент" },

  /* ── Шығыс Қазақстан облысы ── */
  { id:"oskemen",      name:"Өскемен",          oblast:"Шығыс Қазақстан облысы",     type:"облыс орталығы" },
  { id:"ridder",       name:"Риддер",           oblast:"Шығыс Қазақстан облысы",     type:"қала" },
  { id:"zyryanovsk",   name:"Зыряновск",        oblast:"Шығыс Қазақстан облысы",     type:"қала" },
  { id:"altay_vg",     name:"Алтай",            oblast:"Шығыс Қазақстан облысы",     type:"қала" },
];

const PERSONS = [
  {id:1,  name:"Абылай хан",              era:"1711–1781", tribe:"argyn"},
  {id:2,  name:"Қазыбек би",              era:"1667–1763", tribe:"argyn"},
  {id:3,  name:"Бұқар жырау",             era:"1668–1781", tribe:"argyn"},
  {id:4,  name:"Толе би",                 era:"1663–1756", tribe:"uysun"},
  {id:5,  name:"Айтеке би",               era:"1644–1700", tribe:"adai"},
  {id:6,  name:"Кенесары хан",            era:"1802–1847", tribe:"argyn"},
  {id:7,  name:"Махамбет Өтемісов",       era:"1804–1846", tribe:"adai"},
  {id:8,  name:"Ыбырай Алтынсарин",       era:"1841–1889", tribe:"kipchak"},
  {id:9,  name:"Абай Құнанбаев",          era:"1845–1904", tribe:"argyn"},
  {id:10, name:"Шоқан Уәлиханов",         era:"1835–1865", tribe:"argyn"},
  {id:11, name:"Жамбыл Жабаев",           era:"1846–1945", tribe:"uysun"},
  {id:12, name:"Ахмет Байтұрсынов",       era:"1872–1937", tribe:"argyn"},
  {id:13, name:"Міржақып Дулатов",        era:"1885–1935", tribe:"argyn"},
  {id:14, name:"Мағжан Жұмабаев",         era:"1893–1938", tribe:"naiman"},
  {id:15, name:"Алихан Бөкейхан",         era:"1866–1937", tribe:"argyn"},
  {id:16, name:"Бейімбет Майлин",         era:"1894–1938", tribe:"kipchak"},
  {id:17, name:"Ілияс Жансүгіров",        era:"1894–1938", tribe:"uysun"},
  {id:18, name:"Мұхтар Әуезов",           era:"1897–1961", tribe:"argyn"},
  {id:19, name:"Сәкен Сейфуллин",         era:"1894–1938", tribe:"kipchak"},
  {id:20, name:"Сұлтанмахмұт Торайғыров", era:"1893–1920", tribe:"argyn"},
];

const GENS = ["Сіз","Әке","Ата","Баба","Бабасының атасы","Арғы ата","Түп ата"];

/* ═══════════════════════════════════════════════════════════
   ELDER SVG
═══════════════════════════════════════════════════════════ */
function ElderSVG({ size = 170 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 180 185" xmlns="http://www.w3.org/2000/svg" style={{position:"relative",zIndex:2}}>
      <ellipse cx="90" cy="155" rx="46" ry="28" fill="#003F25" opacity=".92"/>
      <path d="M48 152 Q60 112 90 110 Q120 112 132 152 Z" fill="#003F25"/>
      <line x1="75" y1="110" x2="65" y2="152" stroke="#C6A55C" strokeWidth=".9" opacity=".35"/>
      <line x1="105" y1="110" x2="115" y2="152" stroke="#C6A55C" strokeWidth=".9" opacity=".35"/>
      <line x1="90" y1="110" x2="90" y2="155" stroke="#C6A55C" strokeWidth=".7" opacity=".25"/>
      <rect x="83" y="92" width="14" height="20" rx="5" fill="#c9a67c"/>
      <ellipse cx="90" cy="77" rx="27" ry="30" fill="#c9a67c"/>
      <path d="M73 72 Q76 70 79 72" stroke="#a07850" strokeWidth=".7" fill="none" opacity=".5"/>
      <path d="M101 72 Q104 70 107 72" stroke="#a07850" strokeWidth=".7" fill="none" opacity=".5"/>
      <path d="M84 86 Q90 88 96 86" stroke="#b08860" strokeWidth=".6" fill="none" opacity=".4"/>
      <path d="M67 90 Q74 112 90 116 Q106 112 113 90 Q102 99 90 101 Q78 99 67 90Z" fill="#e9e0cc" opacity=".88"/>
      <path d="M77 85 Q90 91 103 85" stroke="#b0a088" strokeWidth="1.6" fill="none" opacity=".65"/>
      <ellipse cx="80" cy="73" rx="3.5" ry="3" fill="#2a1a08"/>
      <ellipse cx="100" cy="73" rx="3.5" ry="3" fill="#2a1a08"/>
      <circle cx="81.5" cy="72" r="1" fill="white" opacity=".55"/>
      <circle cx="101.5" cy="72" r="1" fill="white" opacity=".55"/>
      <path d="M75 67 Q80 64 86 67" stroke="#7a6040" strokeWidth="1.5" fill="none"/>
      <path d="M94 67 Q100 64 105 67" stroke="#7a6040" strokeWidth="1.5" fill="none"/>
      <path d="M88 76 Q87 81 90 83 Q93 81 92 76" stroke="#a07850" strokeWidth="1" fill="none"/>
      <ellipse cx="63" cy="77" rx="5" ry="7" fill="#c09468"/>
      <ellipse cx="117" cy="77" rx="5" ry="7" fill="#c09468"/>
      <path d="M72 110 Q90 120 108 110" stroke="#C6A55C" strokeWidth="1.5" fill="none" opacity=".8"/>
      <path d="M63 68 Q68 40 90 36 Q112 40 117 68" fill="#f5f0e5" stroke="#d4c8a0" strokeWidth=".5"/>
      <path d="M63 68 Q74 73 90 70 Q106 73 117 68" fill="#e8e0cc"/>
      <path d="M90 36 L90 70" stroke="#c8b88a" strokeWidth=".7" opacity=".55"/>
      <path d="M61 70 Q75 78 90 76 Q105 78 119 70" stroke="#C6A55C" strokeWidth="1.3" fill="none" opacity=".65"/>
      <ellipse cx="59" cy="135" rx="9" ry="6" fill="#c9a47a" transform="rotate(-18 59 135)"/>
      <ellipse cx="121" cy="135" rx="9" ry="6" fill="#c9a47a" transform="rotate(18 121 135)"/>
      <line x1="127" y1="133" x2="138" y2="182" stroke="#7a5a2c" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="138" cy="182" r="3.5" fill="#C6A55C"/>
      <circle cx="127" cy="133" r="4.5" fill="#C6A55C" opacity=".65"/>
      <path d="M52 151 Q59 146 66 151 Q73 156 80 151 Q87 146 94 151 Q101 156 108 151 Q115 146 122 151 Q127 154 132 151" stroke="#C6A55C" strokeWidth="1" fill="none" opacity=".42"/>
    </svg>
  );
}

function ElderCircle({ size = 220 }) {
  return (
    <div className="elder-wrap" style={{width:size,height:size}}>
      <div className="elder-glow"/>
      <div className="elder-ring"/>
      <div className="elder-ring2"/>
      <div className="elder-circle">
        <ElderSVG size={size * 0.82}/>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   TYPEWRITER
═══════════════════════════════════════════════════════════ */
function useTypewriter(text, speed = 24, delay = 600) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setOut(""); setDone(false);
    let i = 0;
    const t0 = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t0);
  }, [text]);
  return { out, done };
}

/* ═══════════════════════════════════════════════════════════
   SELECTION MODAL
═══════════════════════════════════════════════════════════ */
function SelectModal({ title, subtitle, items, selected, onSelect, onClose, renderItem }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() =>
    items.filter(x => x.name.toLowerCase().includes(q.toLowerCase())), [items, q]);

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">{title}</div>
        <div className="modal-sub">{subtitle}</div>
        <input className="modal-search" placeholder="Іздеу…" value={q} onChange={e => setQ(e.target.value)} autoFocus/>
        <div className="modal-list">
          {filtered.map(item => (
            <div key={item.id}
              className={`modal-item${selected === item.id ? " sel" : ""}`}
              onClick={() => onSelect(item.id)}>
              <div className="modal-item-icon" style={{fontFamily:"'Playfair Display',serif",fontSize:".9rem",color:"var(--gold)",fontWeight:700}}>{item.icon || item.name[0]}</div>
              <div>
                <div className="modal-item-name">{item.name}</div>
                <div className="modal-item-sub">{renderItem(item)}</div>
              </div>
              <div className="modal-check">✓</div>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button className="boutline" style={{flex:1}} onClick={onClose}>Сохранить</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SHEJIRE TREE COMPONENTS
═══════════════════════════════════════════════════════════ */

/* Single person card node */
function PersonNode({ name, genLabel, isUser, isEmpty, onClick, animDelay = 0 }) {
  const cls = isUser ? "sj-node sj-user" : isEmpty ? "sj-node sj-empty" : "sj-node sj-ancestor";
  return (
    <div
      className={cls}
      style={{ animationDelay: `${animDelay}ms` }}
      onClick={isEmpty ? onClick : undefined}
      title={isEmpty ? "Ата-баба қосу үшін басыңыз" : name}
    >
      {genLabel && <div className="sj-gen-label">{genLabel}</div>}
      <div className="sj-name">
        {isEmpty ? "+ Қосу" : name}
      </div>
    </div>
  );
}

/* Vertical connector line */
function Connector({ flipped = false }) {
  return <div className={flipped ? "sj-connector sj-conn-top" : "sj-connector"}/>;
}

/*
  ShejireTree — вертикальное дерево, пользователь внизу, предки вверх.
  Props:
    userName   — имя пользователя (корень)
    ancestors  — массив строк [0..6], 0 = отец, 6 = пра-пра-пра-прадед
    onAddAnc   — колбэк при клике на пустой узел
    compact    — уменьшенный режим для превью в профиле
*/
const ANC_GEN_LABELS = [
  "Әке", "Ата", "Баба",
  "Арғы ата", "Бесінші ата",
  "Алтыншы ата", "Жетінші ата",
];

function ShejireTree({ userName, ancestors = [], onAddAnc, compact = false }) {
  /* Build levels top→bottom: [gen6, gen5, ..., gen0, user]
     In compact mode only show first 3 ancestor slots + user */
  const slots = compact ? ancestors.slice(0, 3) : ancestors;
  /* Reverse so index 0 = oldest at top */
  const levels = [...slots].reverse();

  return (
    <div className="sj-tree" style={compact ? { padding: "8px 0" } : {}}>
      {levels.map((anc, revIdx) => {
        /* Real ancestor index (from ancestors array) */
        const ancIdx = slots.length - 1 - revIdx;
        const isEmpty = !anc;
        const delay   = revIdx * 80; /* stagger: oldest appears first */
        const label   = ANC_GEN_LABELS[ancIdx] || `Поколение ${ancIdx + 1}`;

        return (
          <div
            key={ancIdx}
            className="sj-level"
            style={{ animationDelay: `${delay}ms` }}
          >
            <PersonNode
              name={anc}
              genLabel={label}
              isEmpty={isEmpty}
              animDelay={delay}
              onClick={onAddAnc}
            />
            <Connector/>
          </div>
        );
      })}

      {/* User node — always at the bottom */}
      <div
        className="sj-level"
        style={{ animationDelay: `${levels.length * 80}ms` }}
      >
        <PersonNode
          name={userName || "Сіз"}
          genLabel="Сіз"
          isUser
          animDelay={levels.length * 80}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CITY PICKER — 2-step: oblast → city
═══════════════════════════════════════════════════════════ */
const OBLASTS = [
  "Астана қаласы","Алматы қаласы","Шымкент қаласы",
  "Абай облысы","Ақмола облысы","Ақтөбе облысы",
  "Алматы облысы","Атырау облысы","Батыс Қазақстан облысы",
  "Жамбыл облысы","Жетісу облысы","Қарағанды облысы",
  "Қостанай облысы","Қызылорда облысы","Маңғыстау облысы",
  "Павлодар облысы","Солтүстік Қазақстан облысы",
  "Түркістан облысы","Ұлытау облысы","Шығыс Қазақстан облысы",
];

function CityPicker({ cityId, setCityId }) {
  const [oblastQ,  setOblastQ]  = useState("");
  const [cityQ,    setCityQ]    = useState("");
  const [selOblast,setSelOblast]= useState(null);

  const city = CITIES.find(c => c.id === cityId);

  /* If already selected, show compact result */
  if (city && !selOblast) {
    return (
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(26,107,68,.15)",border:"1px solid var(--gold)",borderRadius:10,padding:"10px 14px"}}>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:".9rem",color:"var(--gold)",fontWeight:600}}>{city.name}</div>
          <div style={{fontSize:".62rem",color:"var(--muted)",marginTop:2}}>{city.type} · {city.oblast}</div>
        </div>
        <button onClick={() => { setCityId(null); setSelOblast(null); }}
          style={{background:"rgba(198,165,92,.1)",border:"1px solid rgba(198,165,92,.2)",borderRadius:6,color:"var(--muted)",cursor:"pointer",fontSize:".72rem",fontFamily:"inherit",padding:"4px 10px",transition:"all .18s"}}
          onMouseEnter={e=>{e.currentTarget.style.color="var(--gold)"}}
          onMouseLeave={e=>{e.currentTarget.style.color="var(--muted)"}}>
          Өзгерту
        </button>
      </div>
    );
  }

  /* Step 1: pick oblast */
  if (!selOblast) {
    const filteredOblasts = oblastQ
      ? OBLASTS.filter(o => o.toLowerCase().includes(oblastQ.toLowerCase()))
      : OBLASTS;
    return (
      <div>
        <div style={{fontSize:".6rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(198,165,92,.45)",marginBottom:8}}>1. Облысты таңдаңыз</div>
        <input
          style={{width:"100%",background:"var(--card)",border:"1px solid var(--border)",borderRadius:8,padding:"8px 12px",fontFamily:"'Inter',sans-serif",fontSize:".82rem",color:"var(--text)",outline:"none",marginBottom:8,transition:"border-color .18s"}}
          placeholder="Облыс іздеу…"
          value={oblastQ}
          onChange={e => setOblastQ(e.target.value)}
          onFocus={e=>e.target.style.borderColor="var(--gold)"}
          onBlur={e=>e.target.style.borderColor="var(--border)"}
          autoFocus
        />
        <div style={{display:"flex",flexDirection:"column",gap:4,maxHeight:180,overflowY:"auto"}}>
          {filteredOblasts.map(o => (
            <button key={o} onClick={() => { setSelOblast(o); setOblastQ(""); }}
              style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:8,padding:"9px 12px",cursor:"pointer",color:"var(--text)",fontFamily:"inherit",textAlign:"left",fontSize:".82rem",transition:"all .18s",display:"flex",alignItems:"center",justifyContent:"space-between"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(26,107,68,.12)";e.currentTarget.style.borderColor="rgba(198,165,92,.3)"}}
              onMouseLeave={e=>{e.currentTarget.style.background="var(--bg2)";e.currentTarget.style.borderColor="var(--border)"}}>
              {o}
              <span style={{color:"rgba(198,165,92,.4)",fontSize:".75rem"}}>›</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* Step 2: pick city within oblast */
  const oblastCities = CITIES.filter(c => c.oblast === selOblast &&
    (cityQ ? c.name.toLowerCase().includes(cityQ.toLowerCase()) : true));

  return (
    <div>
      <button onClick={() => { setSelOblast(null); setCityQ(""); }}
        style={{background:"none",border:"none",color:"rgba(198,165,92,.6)",cursor:"pointer",fontFamily:"inherit",fontSize:".72rem",marginBottom:8,padding:0,display:"flex",alignItems:"center",gap:4}}>
        ← {selOblast}
      </button>
      <div style={{fontSize:".6rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(198,165,92,.45)",marginBottom:8}}>2. Қала немесе кент таңдаңыз</div>
      <input
        style={{width:"100%",background:"var(--card)",border:"1px solid var(--border)",borderRadius:8,padding:"8px 12px",fontFamily:"'Inter',sans-serif",fontSize:".82rem",color:"var(--text)",outline:"none",marginBottom:8,transition:"border-color .18s"}}
        placeholder="Қала іздеу…"
        value={cityQ}
        onChange={e => setCityQ(e.target.value)}
        onFocus={e=>e.target.style.borderColor="var(--gold)"}
        onBlur={e=>e.target.style.borderColor="var(--border)"}
        autoFocus
      />
      <div style={{display:"flex",flexDirection:"column",gap:4,maxHeight:180,overflowY:"auto"}}>
        {oblastCities.map(c => (
          <button key={c.id} onClick={() => { setCityId(c.id); setSelOblast(null); setCityQ(""); }}
            style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:8,padding:"9px 12px",cursor:"pointer",color:"var(--text)",fontFamily:"inherit",textAlign:"left",transition:"all .18s",display:"flex",alignItems:"center",justifyContent:"space-between"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(26,107,68,.12)";e.currentTarget.style.borderColor="rgba(198,165,92,.3)"}}
            onMouseLeave={e=>{e.currentTarget.style.background="var(--bg2)";e.currentTarget.style.borderColor="var(--border)"}}>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:".85rem",fontWeight:500}}>{c.name}</div>
              <div style={{fontSize:".6rem",color:"var(--muted)",marginTop:1}}>{c.type}</div>
            </div>
          </button>
        ))}
        {oblastCities.length === 0 && (
          <div style={{fontSize:".75rem",color:"var(--muted)",textAlign:"center",padding:"12px 0"}}>Табылмады</div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ONBOARDING FLOW
═══════════════════════════════════════════════════════════ */

/* Линейные шаги онбординга */
const OB_STEPS       = ["intro","ask_name","pick_tribe","pick_city"];
const OB_STEPS_LABEL = ["Начало","Ваше имя","Ваш ру","Ваш город"];

const OB_SPEECHES = {
  intro:         "Я — Абыз. Хранитель родовой памяти. Я помогу тебе узнать историю твоего рода.",
  ask_name:      "Назови своё имя. Каждое имя — это нить, связывающая поколения.",
  profile:       "Это твоя история. Давай восстановим её вместе.",
  show_matches:  "Я нашёл связи в твоём роде... Нити времени тянутся сквозь века.",
};

/* ── MOCK DATA для show_matches ── */
const MOCK_MATCHES = [
  {
    id: 1,
    name: "Абылай хан",
    era: "1711–1781",
    relation: "Возможный предок по отцовской линии",
    tribe: "Арғын",
    tribeId: "argyn",
    connectionType: "Родовая связь",
    connectionStrength: 94,
    detail: "Через род Арғын, ветвь Атығай. Общий предок в 6-м поколении.",
    icon: "👑",
    blurred: false,
  },
  {
    id: 2,
    name: "Бұқар жырау",
    era: "1668–1781",
    relation: "Связь по материнской линии",
    tribe: "Арғын",
    tribeId: "argyn",
    connectionType: "Культурная связь",
    connectionStrength: 78,
    detail: "Жырау из того же аула. Возможное родство через ветвь Сыбан.",
    icon: "🎼",
    blurred: false,
  },
  {
    id: 3,
    name: "████████ ████",
    era: "17██–17██",
    relation: "███████ ██████ ██ ████████ ██████",
    tribe: "██████",
    tribeId: null,
    connectionType: "Прямая линия",
    connectionStrength: 87,
    detail: "████████████████████████████████████████",
    icon: "🔒",
    blurred: true,
  },
  {
    id: 4,
    name: "Қазыбек би",
    era: "1667–1763",
    relation: "Совпадение по роду",
    tribe: "Арғын",
    tribeId: "argyn",
    connectionType: "Родовая связь",
    connectionStrength: 65,
    detail: "Великий би из рода Арғын. Ветвь Қаракесек.",
    icon: "⚖️",
    blurred: false,
  },
  {
    id: 5,
    name: "████████████ ████████",
    era: "18██–18██",
    relation: "████████ ██████████ ████",
    tribe: "██████",
    tribeId: null,
    connectionType: "Неизвестная ветвь",
    connectionStrength: 71,
    detail: "████████ ██████ ████ █████████ ████████ ██████.",
    icon: "🔒",
    blurred: true,
  },
  {
    id: 6,
    name: "Кенесары хан",
    era: "1802–1847",
    relation: "Дальнее родство — 7-е поколение",
    tribe: "Арғын",
    tribeId: "argyn",
    connectionType: "Историческая связь",
    connectionStrength: 52,
    detail: "Последний хан казахов. Линия через ветвь Абылай.",
    icon: "🏇",
    blurred: false,
  },
];

/* Onboarding Progress Bar */
function ObProgress({ step }) {
  const idx = OB_STEPS.indexOf(step);
  const pct = idx <= 0 ? 0 : Math.round((idx / (OB_STEPS.length - 1)) * 100);
  return (
    <div className="ob-progress">
      <div className="ob-logo">abyz</div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
        <div className="ob-prog-label">{OB_STEPS_LABEL[Math.max(0,idx)]}</div>
        <div style={{display:"flex",gap:5,alignItems:"center"}}>
          {OB_STEPS.map((s,i) => (
            <div key={s} className={`ob-dot${i===idx?" active":i<idx?" done":""}`}/>
          ))}
        </div>
      </div>
      <div style={{width:60}}/>
    </div>
  );
}

/* Speech bubble with typewriter for onboarding */
function ObSpeech({ text, speed=22, delay=400 }) {
  const { out, done } = useTypewriter(text, speed, delay);
  return (
    <div className="speech" style={{marginBottom:24}}>
      <div className="sbub">
        <div className="sname">Абыз · Хранитель памяти</div>
        <div className="stext">{out}{!done && <span className="cur"/>}</div>
      </div>
    </div>
  );
}

/* Full onboarding component */
function OnboardingFlow({ onEnter }) {
  const [step,      setStep]      = useState("ask_name");
  const [exiting,   setExiting]   = useState(false);
  const [name,      setName]      = useState("");
  const [tribeId,   setTribeId]   = useState(null);
  const [cityId,    setCityId]    = useState(null);
  const [ancestors, setAncestors] = useState(Array(7).fill(""));
  const [photo,     setPhoto]     = useState(null);
  const [dob,       setDob]       = useState("");
  const [bio,       setBio]       = useState("");
  const [pickCityOblast,  setPickCityOblast]  = useState(null);
  const [pickCitySearch,  setPickCitySearch]  = useState("");
  const fileRef = useRef(null);

  const ANC_GENS = ["Отец (Әке)","Дед (Ата)","Прадед (Баба)","Пра-прадед","Пра-пра-прадед","Пра-пра-пра-прадед","Пра-пра-пра-пра-прадед"];

  const goTo = (nextStep) => {
    setExiting(true);
    setTimeout(() => { setStep(nextStep); setExiting(false); }, 300);
  };

  const goBack = () => {
    const idx = OB_STEPS.indexOf(step);
    if (idx > 0) goTo(OB_STEPS[idx - 1]);
  };

  const tribe = TRIBES.find(t => t.id === tribeId);
  const city  = CITIES.find(c => c.id === cityId);
  const filledAnc = ancestors.filter(Boolean);
  const score = (tribeId ? 30 : 0) + (cityId ? 30 : 0) + (filledAnc.length * Math.floor(40/7));
  const pct = Math.min(100, score);
  const canSearch = tribeId || cityId || filledAnc.length > 0;

  /* ─── ШАГ 0: INTRO ─── */
  if (step === "intro") return (
    <div className="ob-wrap">
      <div className="lbg"/><div className="ornament"/>
      <ObProgress step={step}/>
      <div className={exiting ? "ob-fade-out" : "ob-fade"} style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
        <ElderCircle size={200}/>
        <div style={{marginBottom:16,marginTop:4}}>
          <div className="intro-tagline">digital heritage · шежіре</div>
          <div className="intro-title">Узнай историю<br/>своего <em>рода</em></div>
          <div className="intro-sub">Абыз поможет тебе восстановить шежире — родословную твоего рода до седьмого поколения</div>
        </div>
        <ObSpeech text={OB_SPEECHES.intro} delay={600}/>
        <div className="ob-nav" style={{maxWidth:320}}>
          <button className="bgold" style={{flex:1}} onClick={() => goTo("ask_name")}>
            Начать путь →
          </button>
        </div>
      </div>
    </div>
  );

  /* ─── ШАГ 1: ИМЯ ─── */
  if (step === "ask_name") return (
    <div className="ob-wrap">
      <div className="lbg"/><div className="ornament"/>
      <ObProgress step={step}/>
      <div className={exiting ? "ob-fade-out" : "ob-fade"} style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
        <ElderCircle size={140}/>
        <ObSpeech text={OB_SPEECHES.ask_name} delay={300}/>
        <div className="oform">
          <div className="flabel">Ваше имя</div>
          <input className="ninput" placeholder="Введите своё имя…" value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key==="Enter" && name.trim() && goTo("pick_tribe")}
            autoFocus/>
          <div className="ob-nav" style={{marginTop:4}}>
            <button className="ob-back" onClick={goBack}>← Назад</button>
            <button className="bgold" style={{flex:1}} disabled={!name.trim()}
              onClick={() => goTo("pick_tribe")}>
              Далее →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  /* ─── ШАГ 1.5: ВЫБОР РУ ─── */
  if (step === "pick_tribe") {
    const ZHUZ_ICONS = {
      "Ұлы жүз":"🦅",
      "Орта жүз":"🏔",
      "Кіші жүз · Алимулы":"🌊",
      "Кіші жүз · Байулы":"⚔️",
      "Кіші жүз · Жетіру":"🐎",
      "Жүзден тыс":"👑",
    };
    const ZHUZ_LABELS = {
      "Ұлы жүз":"Ұлы жүз · Старший жуз",
      "Орта жүз":"Орта жүз · Средний жуз",
      "Кіші жүз · Алимулы":"Кіші жүз · Алимулы",
      "Кіші жүз · Байулы":"Кіші жүз · Байулы",
      "Кіші жүз · Жетіру":"Кіші жүз · Жетіру",
      "Жүзден тыс":"Жүзден тыс · Вне жузов",
    };
    const zhuzGroups = Object.keys(ZHUZ_LABELS);
    const selectedTribe = TRIBES.find(t => t.id === tribeId);

    return (
      <div className="ob-wrap" style={{justifyContent:"flex-start",paddingTop:90,paddingBottom:80}}>
        <div className="lbg"/><div className="ornament"/>
        <ObProgress step={step}/>
        <div className={exiting ? "ob-fade-out" : "ob-fade"} style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%",gap:20}}>

          {/* Header */}
          <div style={{textAlign:"center",marginBottom:4}}>
            <div style={{fontSize:".6rem",letterSpacing:".22em",textTransform:"uppercase",color:"rgba(198,165,92,.5)",marginBottom:8}}>Шаг 2 из 4</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:700,color:"var(--text)",letterSpacing:"-.02em",marginBottom:6}}>
              Выберите свой <span style={{color:"var(--gold)"}}>ру</span>
            </h2>
            <p style={{fontSize:".85rem",color:"rgba(240,235,210,.4)",lineHeight:1.6,maxWidth:480}}>
              Каждый казах принадлежит к роду. Знание своего ру — основа шежире.
            </p>
          </div>

          {/* Selected banner */}
          {selectedTribe && (
            <div className="tp-selected-banner">
              <div style={{width:48,height:48,borderRadius:12,background:"rgba(198,165,92,.12)",border:"1px solid rgba(198,165,92,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem",flexShrink:0}}>
                {selectedTribe.name[0]}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:".58rem",letterSpacing:".16em",textTransform:"uppercase",color:"rgba(198,165,92,.5)",marginBottom:3}}>Выбран род</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",fontWeight:700,color:"var(--gold)"}}>{selectedTribe.name}</div>
                <div style={{fontSize:".72rem",color:"rgba(240,235,210,.45)",marginTop:2}}>{selectedTribe.zhuz} · {selectedTribe.region}</div>
              </div>
              <button onClick={() => setTribeId(null)}
                style={{background:"none",border:"1px solid rgba(198,165,92,.2)",borderRadius:8,padding:"6px 12px",color:"rgba(240,235,210,.4)",fontSize:".72rem",cursor:"pointer",fontFamily:"inherit",flexShrink:0}}>
                Сбросить
              </button>
            </div>
          )}

          {/* Zhuz groups */}
          <div className="tp-wrap">
            {zhuzGroups.map(zhuz => {
              const group = TRIBES.filter(t => t.zhuz === zhuz);
              if (!group.length) return null;
              return (
                <div key={zhuz} className="tp-zhuz">
                  <div className="tp-zhuz-label">
                    {ZHUZ_ICONS[zhuz]} {ZHUZ_LABELS[zhuz]}
                  </div>
                  <div className="tp-grid">
                    {group.map(t => (
                      <div key={t.id}
                        className={`tp-card${tribeId===t.id?" sel":""}`}
                        onClick={() => setTribeId(tribeId===t.id?null:t.id)}>
                        <div className="tp-check">✓</div>
                        <span className="tp-icon">{t.name[0]}</span>
                        <div className="tp-name">{t.name}</div>
                        <div className="tp-region">{t.region}</div>
                        <div className="tp-desc">{t.desc}</div>
                        <div className="tp-members">👥 {t.members.toLocaleString()} участников</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Not sure option */}
          <button
            onClick={() => { setTribeId(null); goTo("pick_city"); }}
            style={{background:"none",border:"1px dashed rgba(198,165,92,.2)",borderRadius:10,padding:"12px 28px",color:"rgba(240,235,210,.3)",fontSize:".8rem",cursor:"pointer",fontFamily:"inherit",transition:"all .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(198,165,92,.4)";e.currentTarget.style.color="rgba(240,235,210,.55)"}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(198,165,92,.2)";e.currentTarget.style.color="rgba(240,235,210,.3)"}}>
            Не знаю своего рода — пропустить
          </button>

          {/* Nav */}
          <div className="ob-nav" style={{maxWidth:"100%",position:"sticky",bottom:20}}>
            <button className="ob-back" onClick={goBack}>← Назад</button>
            <button className="bgold" style={{flex:1,maxWidth:340}} onClick={() => goTo("pick_city")}>
              {tribeId ? `Продолжить с родом ${selectedTribe?.name} →` : "Продолжить →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

    /* ─── ШАГ 2.5: ВЫБОР ГОРОДА ─── */
  if (step === "pick_city") {
    const [selOblast, setSelOblast] = [pickCityOblast, setPickCityOblast];
    const [citySearch, setCitySearch] = [pickCitySearch, setPickCitySearch];

    const OBLAST_ICONS = {
      "Астана қаласы":"🏛","Алматы қаласы":"🏙","Шымкент қаласы":"🌺",
      "Абай облысы":"📚","Ақмола облысы":"🌾","Ақтөбе облысы":"🌅",
      "Алматы облысы":"🏔","Атырау облысы":"🛢","Батыс Қазақстан облысы":"🌿",
      "Жамбыл облысы":"🏺","Жетісу облысы":"🍎","Қарағанды облысы":"⛏",
      "Қостанай облысы":"🌾","Қызылорда облысы":"🍉","Маңғыстау облысы":"🌊",
      "Павлодар облысы":"🏭","Солтүстік Қазақстан облысы":"❄️",
      "Түркістан облысы":"🕌","Ұлытау облысы":"🗿","Шығыс Қазақстан облысы":"🏔",
    };

    const selectedCity = CITIES.find(c => c.id === cityId);
    const oblastCities = selOblast
      ? CITIES.filter(c => c.oblast === selOblast && (citySearch ? c.name.toLowerCase().includes(citySearch.toLowerCase()) : true))
      : [];

    return (
      <div className="ob-wrap" style={{justifyContent:"flex-start",paddingTop:90,paddingBottom:80}}>
        <div className="lbg"/><div className="ornament"/>
        <ObProgress step={step}/>
        <div className={exiting ? "ob-fade-out" : "ob-fade"} style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%",gap:20}}>

          {/* Header */}
          <div style={{textAlign:"center",marginBottom:4}}>
            <div style={{fontSize:".6rem",letterSpacing:".22em",textTransform:"uppercase",color:"rgba(198,165,92,.5)",marginBottom:8}}>Шаг 3 из 5</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:700,color:"var(--text)",letterSpacing:"-.02em",marginBottom:6}}>
              {selOblast ? <><span style={{color:"var(--gold)"}}>{selOblast}</span></> : <>Выберите <span style={{color:"var(--gold)"}}>регион</span></>}
            </h2>
            <p style={{fontSize:".85rem",color:"rgba(240,235,210,.4)",lineHeight:1.6,maxWidth:480}}>
              {selOblast ? "Теперь выберите город или населённый пункт" : "Откуда вы родом? Выберите область Казахстана."}
            </p>
          </div>

          {/* Selected city banner */}
          {selectedCity && !selOblast && (
            <div style={{background:"linear-gradient(135deg,rgba(0,63,37,.3),rgba(198,165,92,.08))",border:"1px solid rgba(198,165,92,.3)",borderRadius:14,padding:"16px 20px",display:"flex",alignItems:"center",gap:16,width:"100%",maxWidth:900}}>
              <div style={{fontSize:"2rem"}}>{OBLAST_ICONS[selectedCity.oblast]||"🏙"}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:".58rem",letterSpacing:".16em",textTransform:"uppercase",color:"rgba(198,165,92,.5)",marginBottom:3}}>Выбран город</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",fontWeight:700,color:"var(--gold)"}}>{selectedCity.name}</div>
                <div style={{fontSize:".72rem",color:"rgba(240,235,210,.45)",marginTop:2}}>{selectedCity.type} · {selectedCity.oblast}</div>
              </div>
              <button onClick={() => { setCityId(null); }}
                style={{background:"none",border:"1px solid rgba(198,165,92,.2)",borderRadius:8,padding:"6px 12px",color:"rgba(240,235,210,.4)",fontSize:".72rem",cursor:"pointer",fontFamily:"inherit"}}>
                Сбросить
              </button>
            </div>
          )}

          {/* Oblast back button */}
          {selOblast && (
            <button onClick={() => { setSelOblast(null); setCitySearch(""); }}
              style={{alignSelf:"flex-start",background:"none",border:"1px solid rgba(198,165,92,.2)",borderRadius:8,padding:"8px 16px",color:"rgba(198,165,92,.65)",fontSize:".8rem",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6,transition:"all .18s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor="var(--gold)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(198,165,92,.2)"}>
              ← {selOblast}
            </button>
          )}

          {/* Regions grid */}
          {!selOblast && (
            <div className="cp-regions">
              {OBLASTS.map(o => {
                const count = CITIES.filter(c => c.oblast === o).length;
                const center = CITIES.filter(c => c.oblast === o).find(c => c.type === "облыс орталығы" || c.type === "республикалық қала");
                return (
                  <div key={o}
                    className={`cp-region${cityId && CITIES.find(c=>c.id===cityId)?.oblast===o?" sel":""}`}
                    onClick={() => setSelOblast(o)}>
                    <span className="cp-region-icon">{OBLAST_ICONS[o]||"📍"}</span>
                    <div className="cp-region-name">{o.replace(" облысы","").replace(" қаласы","")}</div>
                    {center && <div style={{fontSize:".68rem",color:"rgba(240,235,210,.35)",marginBottom:3}}>{center.name}</div>}
                    <div className="cp-region-count">{count} нас. пунктов</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Cities within oblast */}
          {selOblast && (
            <>
              <input className="cp-search"
                placeholder="Поиск города…"
                value={citySearch}
                onChange={e => setCitySearch(e.target.value)}
                autoFocus
              />
              <div className="cp-cities-grid">
                {oblastCities.map(c => (
                  <div key={c.id}
                    className={`cp-city${cityId===c.id?" sel":""}`}
                    onClick={() => { setCityId(c.id); setSelOblast(null); setCitySearch(""); }}>
                    <div className="cp-city-name">{c.name}</div>
                    <div className="cp-city-type">{c.type}</div>
                  </div>
                ))}
                {oblastCities.length === 0 && (
                  <div style={{fontSize:".78rem",color:"var(--muted)",gridColumn:"1/-1",textAlign:"center",padding:"20px 0"}}>Ничего не найдено</div>
                )}
              </div>
            </>
          )}

          {/* Nav */}
          <div className="ob-nav" style={{maxWidth:"100%",marginTop:8}}>
            <button className="ob-back" onClick={goBack}>← Назад</button>
            <button className="bgold" style={{flex:1,maxWidth:340}} onClick={() => onEnter(name.trim()||"Путник", { tribeId, cityId, ancestors })}>
              {cityId ? `Войти в ABYZ — ${CITIES.find(c=>c.id===cityId)?.name} →` : "Войти в ABYZ →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

    return null;
}

/* Keep LandingPage as alias (App uses it) */
function LandingPage({ onEnter }) {
  return <OnboardingFlow onEnter={onEnter}/>;
}

/* ═══════════════════════════════════════════════════════════
   HEADER
═══════════════════════════════════════════════════════════ */
function Header({ page, setPage }) {
  const nav = [
    {id:"personal", label:"Моя страница"},
    {id:"list",     label:"Личности"},
    {id:"clans",    label:"Рода"},
    {id:"cities",   label:"Города"},
    {id:"my-tree",  label:"Шежире"},
  ];
  return (
    <header className="hdr">
      <div onClick={() => setPage({id:"personal"})} style={{cursor:"pointer"}}>
        <div className="logo">abyz</div>
        <div className="logo-sub">digital heritage</div>
      </div>
      <nav className="nav">
        {nav.map(n => (
          <button key={n.id} className={`nbtn${page.id===n.id?" on":""}`}
            onClick={() => setPage({id:n.id})}>{n.label}</button>
        ))}
      </nav>

    </header>
  );
}

function Footer() {
  return <footer className="footer">© 2025 ABYZ · digital heritage · abyz.kz</footer>;
}


/* ═══════════════════════════════════════════════════════════
   ACHIEVEMENTS COMPONENT
═══════════════════════════════════════════════════════════ */
function AchievementsSection({ profile, userName }) {
  const unlocked = ACHIEVEMENTS.filter(a => a.check(profile, userName));
  const newUnlocked = unlocked.length;
  return (
    <div style={{maxWidth:1060,margin:"0 auto",padding:"0 24px 48px"}}>
      <div style={{borderTop:"1px solid rgba(198,165,92,.1)",paddingTop:44,marginBottom:24,display:"flex",alignItems:"baseline",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.7rem",fontWeight:700,letterSpacing:"-.02em"}}>
          🏆 Достижения
        </h2>
        <div style={{fontSize:".75rem",color:"rgba(198,165,92,.5)"}}>{newUnlocked} / {ACHIEVEMENTS.length} открыто</div>
      </div>
      <div className="ach-grid">
        {ACHIEVEMENTS.map(a => {
          const on = a.check(profile, userName);
          return (
            <div key={a.id} className={`ach-card${on?" unlocked":""}`}>
              {on && <div className="ach-badge">✓</div>}
              <div className="ach-icon">{a.icon}</div>
              <div className="ach-name">{a.name}</div>
              <div className="ach-desc">{a.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   AI STORY COMPONENT
═══════════════════════════════════════════════════════════ */
function AIStorySection({ profile, userName }) {
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const tribe = TRIBES.find(t => t.id === profile.tribeId);
  const city  = CITIES.find(c => c.id === profile.cityId);
  const ancestors = (profile.ancestors||[]).filter(Boolean);

  const generate = async () => {
    setLoading(true); setStory(""); setDone(false);
    const prompt = `Ты — хранитель казахской родословной. Напиши красивую историю рода (3-4 абзаца, ~250 слов) на русском языке.
Данные:
- Имя: ${userName}
- Ру (род): ${tribe?.name || "не указан"} ${tribe ? "("+tribe.zhuz+")" : ""}
- Город: ${city?.name || "не указан"}
- 7 Ата (предки по отцу): ${ancestors.length > 0 ? ancestors.join(", ") : "не указаны"}

Пиши поэтично, с уважением к традициям. Упомяни исторический контекст эпохи предков. Не используй заголовки, пиши как единый текст.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          messages:[{role:"user",content:prompt}]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "Не удалось получить ответ.";
      // Typewriter effect
      let i = 0;
      const interval = setInterval(() => {
        setStory(text.slice(0, i));
        i += 3;
        if (i > text.length) { setStory(text); clearInterval(interval); setDone(true); }
      }, 16);
    } catch(e) {
      setStory("Ошибка соединения. Попробуйте позже.");
      setDone(true);
    }
    setLoading(false);
  };

  const hasData = tribe || city || ancestors.length > 0;

  return (
    <div style={{maxWidth:1060,margin:"0 auto",padding:"0 24px 48px"}}>
      <div style={{borderTop:"1px solid rgba(198,165,92,.1)",paddingTop:44,marginBottom:24,display:"flex",alignItems:"baseline",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.7rem",fontWeight:700,letterSpacing:"-.02em"}}>
          📖 История рода
        </h2>
        <div style={{fontSize:".72rem",color:"rgba(240,235,210,.3)"}}>Генерируется ИИ на основе ваших данных</div>
      </div>

      {!hasData ? (
        <div style={{background:"rgba(255,255,255,.02)",border:"1px dashed rgba(198,165,92,.15)",borderRadius:16,padding:"32px",textAlign:"center"}}>
          <div style={{fontSize:"2rem",marginBottom:12,opacity:.4}}>📜</div>
          <div style={{fontSize:".85rem",color:"rgba(240,235,210,.35)",lineHeight:1.6}}>Заполните ру, город или предков — и ИИ напишет историю вашего рода</div>
        </div>
      ) : story ? (
        <div className="ai-story-wrap">
          <div className="ai-story-title">История рода {tribe?.name || userName}</div>
          <div className="ai-story-sub">Сгенерировано Абызом · {new Date().toLocaleDateString("ru")}</div>
          <div className="ai-story-text">{story}{!done && <span className="ai-story-cursor"/>}</div>
          {done && (
            <button className="boutline" style={{marginTop:20,padding:"9px 20px",fontSize:".78rem"}} onClick={() => {setStory("");setDone(false);}}>
              ↺ Сгенерировать заново
            </button>
          )}
        </div>
      ) : (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16,padding:"32px 0"}}>
          <div style={{fontSize:".88rem",color:"rgba(240,235,210,.4)",textAlign:"center",maxWidth:480,lineHeight:1.65}}>
            Абыз изучит ваш ру <strong style={{color:"var(--gold)"}}>{tribe?.name||"—"}</strong>, 
            город <strong style={{color:"var(--gold)"}}>{city?.name||"—"}</strong> и имена предков, 
            и напишет историю вашей линии.
          </div>
          <button className="ai-gen-btn" onClick={generate} disabled={loading}>
            {loading ? "⏳ Пишу историю…" : "✨ Написать историю рода"}
          </button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HISTORICAL CONTEXT SECTION
═══════════════════════════════════════════════════════════ */
function HistoricalContextSection({ profile }) {
  const ancestors = profile.ancestors || [];
  const ANC_GENS = ["Отец","Дед","Прадед","Пра-прадед","Пра-пра-прадед","Пра-пра-пра-прадед","7-й дед"];

  return (
    <div style={{maxWidth:1060,margin:"0 auto",padding:"0 24px 48px"}}>
      <div style={{borderTop:"1px solid rgba(198,165,92,.1)",paddingTop:44,marginBottom:24,display:"flex",alignItems:"baseline",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.7rem",fontWeight:700,letterSpacing:"-.02em"}}>
          📜 Эпоха предков
        </h2>
        <div style={{fontSize:".72rem",color:"rgba(240,235,210,.3)"}}>Что происходило когда жил каждый ата</div>
      </div>
      <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(198,165,92,.1)",borderRadius:18,padding:"24px 28px"}}>
        <div className="hist-timeline">
          {HIST_CONTEXT.map((h, i) => {
            const name = ancestors[i];
            return (
              <div key={i} className={`hist-row${name?" filled":""}`}>
                <div className="hist-dot">{h.icon}</div>
                <div className="hist-content">
                  <div className="hist-gen">{ANC_GENS[i]} · {h.period}</div>
                  <div className="hist-name">{name || "— не указан —"}</div>
                  <div className="hist-event">{h.event}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MATCHES BY 7 ATA SECTION
═══════════════════════════════════════════════════════════ */
function AataMatchesSection({ profile, userName }) {
  const ancestors = (profile.ancestors||[]).filter(Boolean);
  const tribe = TRIBES.find(t => t.id === profile.tribeId);

  // Filter mock matches to show only if user has ancestors
  const matches = ancestors.length > 0
    ? MOCK_ATA_MATCHES.filter(m => !tribe || m.ru === tribe.name || Math.random() > 0.3)
    : [];

  return (
    <div style={{maxWidth:1060,margin:"0 auto",padding:"0 24px 48px"}}>
      <div style={{borderTop:"1px solid rgba(198,165,92,.1)",paddingTop:44,marginBottom:24,display:"flex",alignItems:"baseline",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.7rem",fontWeight:700,letterSpacing:"-.02em"}}>
          🧬 Совпадения по 7 ата
        </h2>
        <div style={{fontSize:".72rem",color:"rgba(240,235,210,.3)"}}>Люди с общими предками</div>
      </div>

      {ancestors.length === 0 ? (
        <div style={{background:"rgba(255,255,255,.02)",border:"1px dashed rgba(198,165,92,.15)",borderRadius:16,padding:"32px",textAlign:"center"}}>
          <div style={{fontSize:"2rem",marginBottom:12,opacity:.4}}>🧬</div>
          <div style={{fontSize:".85rem",color:"rgba(240,235,210,.35)",lineHeight:1.6,maxWidth:400,margin:"0 auto"}}>
            Заполните имена предков в шежире — система найдёт людей с общими атами
          </div>
        </div>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {matches.slice(0,3).map(m => (
            <div key={m.id} className={`match7-card${m.strength>80?" strong":""}`}>
              <div className="match7-av">{m.name[0]}</div>
              <div style={{flex:1}}>
                <div className="match7-name">{m.name}</div>
                <div className="match7-detail">
                  {m.ru} · {m.city}<br/>
                  <span style={{color:"var(--gold)",fontWeight:500}}>Общий предок:</span> {m.common}
                </div>
                <div className="match7-strength">
                  <div className="match7-bar"><div className="match7-fill" style={{width:`${m.strength}%`}}/></div>
                  <span style={{fontSize:".65rem",color:"var(--gold2)",flexShrink:0}}>{m.strength}%</span>
                </div>
              </div>
            </div>
          ))}
          <div style={{textAlign:"center",marginTop:8,fontSize:".75rem",color:"rgba(240,235,210,.25)"}}>
            В будущей версии — реальные совпадения с другими пользователями через Supabase
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PERSONAL PAGE
═══════════════════════════════════════════════════════════ */
function PersonalPage({ userName, profile, setProfile, setPage }) {
  const tribe = TRIBES.find(t => t.id === profile.tribeId);
  const city  = CITIES.find(c => c.id === profile.cityId);
  const ancestors = profile.ancestors || [];
  const filledAnc = ancestors.filter(Boolean);

  // ── AI Story state ──
  const [aiStory, setAiStory]       = useState(null);
  const [aiLoading, setAiLoading]   = useState(false);
  const [aiError, setAiError]       = useState(null);
  const [showEditTribe, setShowEditTribe] = useState(false);
  const [showEditCity,  setShowEditCity]  = useState(false);
  const [editingAta,    setEditingAta]    = useState(null);
  const [ataEditVal,    setAtaEditVal]    = useState("");
  const ataInputRef = useRef(null);

  // ── 7 Ата inline edit ──
  const ANC_GENS_SHORT = ["Отец","Дед","Прадед","Пра-прадед","Пра-пра-прадед","6-й дед","7-й дед"];
  const [localAnc, setLocalAnc] = useState(() =>
    ancestors.length ? [...ancestors] : Array(7).fill("")
  );

  const saveAnc = (i, val) => {
    const a = [...localAnc]; a[i] = val; setLocalAnc(a);
    setProfile(p => ({ ...p, ancestors: a }));
  };

  // ── Achievements ──
  const ACHIEVEMENTS = [
    { id:"first",    icon:"🌱", label:"Первый шаг",       desc:"Вошёл в ABYZ",                        done: true },
    { id:"tribe",    icon:"🏔", label:"Знаток рода",       desc:"Выбрал свой ру",                      done: !!tribe },
    { id:"city",     icon:"🏙", label:"Сын города",        desc:"Указал город рождения",               done: !!city },
    { id:"ata1",     icon:"👤", label:"1 Ата",             desc:"Знаешь хотя бы одного предка",        done: filledAnc.length >= 1 },
    { id:"ata7",     icon:"👑", label:"7 Ата",             desc:"Знаешь всех 7 предков",               done: filledAnc.length >= 7 },
    { id:"story",    icon:"📖", label:"Летописец",         desc:"Сгенерировал историю рода",           done: !!aiStory },
  ];

  // ── Historical epochs per generation ──
  const EPOCHS = [
    { gen:"Отец",         years:"1950–1990-е", era:"Советский Казахстан", event:"Индустриализация, освоение целины, период расцвета КазССР." },
    { gen:"Дед",          years:"1920–1950-е", era:"Ранний СССР",         event:"Коллективизация, репрессии 30-х годов, Великая Отечественная война." },
    { gen:"Прадед",       years:"1890–1920-е", era:"Российская империя",  event:"Восстание 1916 года, революция, Алаш-Орда и борьба за автономию." },
    { gen:"Пра-прадед",   years:"1860–1890-е", era:"Колонизация степи",   event:"Присоединение Казахстана к России, строительство городов и крепостей." },
    { gen:"5-й дед",      years:"1800–1860-е", era:"Кенесары хан",        event:"Последнее крупное восстание казахов под руководством Кенесары Касымова." },
    { gen:"6-й дед",      years:"1750–1800-е", era:"Абылай хан",          event:"Объединение трёх жузов, противостояние с джунгарами и укрепление ханства." },
    { gen:"7-й дед",      years:"1700–1750-е", era:"Джунгарское нашествие", event:"Годы великого бедствия (Ақтабан шұбырынды) — самое тяжёлое испытание народа." },
  ];

  // ── Generate AI Story ──
  const generateStory = async () => {
    setAiLoading(true);
    setAiError(null);
    try {
      const prompt = `Ты — мудрый казахский акын и историк. Напиши красивый, поэтичный рассказ об истории рода человека на русском языке. 

Данные:
- Имя: ${userName}
- Ру (род): ${tribe ? tribe.name + " (" + tribe.zhuz + ")" : "неизвестен"}
- Город: ${city ? city.name + ", " + city.oblast : "неизвестен"}
- Известные предки: ${filledAnc.length > 0 ? localAnc.map((n,i)=>n?`${ANC_GENS_SHORT[i]}: ${n}`:"").filter(Boolean).join(", ") : "не указаны"}

Напиши 3 абзаца (150-200 слов). Стиль — торжественный, тёплый, с казахскими традициями. Упоминай конкретный ру и его историческую роль. Заверши словами о связи поколений.`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text||"").join("") || "";
      setAiStory(text);
      setProfile(p => ({ ...p, aiStory: text }));
    } catch(e) {
      setAiError("Не удалось сгенерировать историю. Попробуйте ещё раз.");
    }
    setAiLoading(false);
  };

  // ── Mock matches ──
  const MATCHES = [
    { name:"Асхат Найманов",   tribe:"Найман",  city:"Алматы",  common:"Общий предок: Есенберген ата", strength:87 },
    { name:"Гүлнар Арғынова",  tribe:"Арғын",   city:"Астана",  common:"Одна ветвь рода Атығай",       strength:74 },
    { name:"███████ ████████", tribe:"██████",  city:"██████",  common:"████████████████",               strength:91, locked:true },
    { name:"Бауыржан Керейов", tribe:"Керей",   city:"Семей",   common:"Жетінші ата по отцовской линии", strength:61 },
  ];

  return (
    <div className="shell pe" style={{paddingBottom:80}}>

      {/* ══ ШАПКА ══ */}
      <div style={{background:"linear-gradient(180deg,rgba(0,63,37,.18) 0%,transparent 100%)",borderBottom:"1px solid rgba(198,165,92,.1)",padding:"40px 24px 32px",maxWidth:1060,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:24,flexWrap:"wrap"}}>
          {/* Avatar */}
          <div style={{width:80,height:80,borderRadius:"50%",background:"linear-gradient(135deg,var(--green3),var(--green2))",border:"2px solid rgba(198,165,92,.4)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 0 0 4px rgba(198,165,92,.08)"}}>
            <span style={{fontFamily:"'Playfair Display',serif",fontSize:"2rem",color:"var(--gold)"}}>{userName?.[0]?.toUpperCase()||"?"}</span>
          </div>
          {/* Info */}
          <div style={{flex:1,minWidth:200}}>
            <div style={{fontSize:".6rem",letterSpacing:".2em",textTransform:"uppercase",color:"rgba(198,165,92,.5)",marginBottom:4}}>Участник ABYZ</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:700,color:"var(--text)",lineHeight:1.1,marginBottom:8}}>{userName}</div>

          </div>
          {/* Quick actions */}
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <button className="boutline" onClick={() => setPage({id:"my-tree"})}>🌳 Шежире</button>
            <button className="bghost" onClick={() => setPage({id:"list"})}>📜 Личности</button>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1060,margin:"0 auto",padding:"0 24px"}}>

        {/* ══ РУ + ГОРОД + 7 АТА ══ */}
        <section style={{marginTop:36}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 2fr",gap:12}}>

            {/* РУ */}
            <div onClick={()=>setShowEditTribe(true)} style={{background:"linear-gradient(135deg,rgba(0,63,37,.28) 0%,rgba(0,48,26,.15) 100%)",border:"1px solid rgba(198,165,92,.2)",borderRadius:16,padding:"20px 18px",cursor:"pointer",transition:"all .22s",position:"relative",overflow:"hidden"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.transform="translateY(-2px)"}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(198,165,92,.2)";e.currentTarget.style.transform="translateY(0)"}}>
              <div style={{position:"absolute",top:0,right:0,width:80,height:80,background:"radial-gradient(circle,rgba(198,165,92,.08) 0%,transparent 70%)",borderRadius:"0 16px 0 0"}}/>
              <div style={{fontSize:".55rem",letterSpacing:".2em",textTransform:"uppercase",color:"rgba(198,165,92,.5)",marginBottom:10}}>Ру · Род</div>
              {tribe ? (<>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.6rem",fontWeight:700,color:"var(--gold)",marginBottom:4,lineHeight:1}}>{tribe.name}</div>
                <div style={{fontSize:".72rem",color:"rgba(240,235,210,.45)",lineHeight:1.5}}>{tribe.zhuz}</div>
                <div style={{fontSize:".68rem",color:"rgba(240,235,210,.3)",marginTop:6}}>{tribe.region}</div>
                <div style={{marginTop:12,display:"inline-flex",alignItems:"center",gap:6,background:"rgba(198,165,92,.1)",border:"1px solid rgba(198,165,92,.15)",borderRadius:8,padding:"4px 10px",fontSize:".65rem",color:"rgba(198,165,92,.7)"}}>
                  👥 {tribe.members.toLocaleString()} уч.
                </div>
              </>) : (
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:8,paddingTop:4}}>
                  <div style={{fontSize:"2rem",opacity:.25}}>🏔</div>
                  <div style={{fontSize:".8rem",color:"rgba(240,235,210,.22)",fontStyle:"italic"}}>Ру не указан</div>
                </div>
              )}
            </div>

            {/* ГОРОД */}
            <div onClick={()=>setShowEditCity(true)} style={{background:"linear-gradient(135deg,rgba(0,48,26,.2) 0%,rgba(14,18,16,.6) 100%)",border:"1px solid rgba(198,165,92,.15)",borderRadius:16,padding:"20px 18px",cursor:"pointer",transition:"all .22s",position:"relative",overflow:"hidden"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.transform="translateY(-2px)"}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(198,165,92,.15)";e.currentTarget.style.transform="translateY(0)"}}>
              <div style={{position:"absolute",top:0,right:0,width:80,height:80,background:"radial-gradient(circle,rgba(198,165,92,.06) 0%,transparent 70%)",borderRadius:"0 16px 0 0"}}/>
              <div style={{fontSize:".55rem",letterSpacing:".2em",textTransform:"uppercase",color:"rgba(198,165,92,.5)",marginBottom:10}}>Город · Туған қала</div>
              {city ? (<>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.6rem",fontWeight:700,color:"var(--text)",marginBottom:4,lineHeight:1}}>{city.name}</div>
                <div style={{fontSize:".72rem",color:"rgba(240,235,210,.4)",lineHeight:1.5}}>{city.oblast}</div>
                <div style={{fontSize:".68rem",color:"rgba(240,235,210,.28)",marginTop:6}}>{city.type}</div>
              </>) : (
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:8,paddingTop:4}}>
                  <div style={{fontSize:"2rem",opacity:.25}}>🏙</div>
                  <div style={{fontSize:".8rem",color:"rgba(240,235,210,.22)",fontStyle:"italic"}}>Город не указан</div>
                </div>
              )}
            </div>

            {/* 7 АТА */}
            <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(198,165,92,.12)",borderRadius:16,padding:"20px 18px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <div style={{fontSize:".55rem",letterSpacing:".2em",textTransform:"uppercase",color:"rgba(198,165,92,.5)"}}>7 Ата · Предки</div>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{height:4,width:80,background:"rgba(255,255,255,.06)",borderRadius:2,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${(filledAnc.length/7)*100}%`,background:"linear-gradient(90deg,var(--green),var(--gold))",borderRadius:2,transition:"width .5s"}}/>
                  </div>
                  <span style={{fontSize:".65rem",color:"var(--gold)",fontWeight:600,fontFamily:"'Playfair Display',serif"}}>{filledAnc.length}/7</span>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                {["Отец","Дед","Прадед","Пра-прадед","5-й","6-й","7-й"].map((gen,i) => {
                  const val = localAnc[i];
                  const isEditing = editingAta === i;
                  return (
                    <div key={i}
                      onClick={() => { if(!isEditing){ setEditingAta(i); setAtaEditVal(val||""); setTimeout(()=>ataInputRef.current?.focus(),50); } }}
                      style={{display:"flex",alignItems:"center",gap:8,background:isEditing?"rgba(0,63,37,.28)":val?"rgba(0,63,37,.18)":"rgba(255,255,255,.02)",border:`1px solid ${isEditing?"var(--gold)":val?"rgba(198,165,92,.25)":"rgba(198,165,92,.07)"}`,borderRadius:9,padding:"7px 10px",transition:"all .18s",cursor:"pointer",boxShadow:isEditing?"0 0 0 2px rgba(198,165,92,.1)":"none"}}
                      onMouseEnter={e=>{ if(!isEditing) e.currentTarget.style.borderColor="rgba(198,165,92,.3)"; }}
                      onMouseLeave={e=>{ if(!isEditing) e.currentTarget.style.borderColor=val?"rgba(198,165,92,.25)":"rgba(198,165,92,.07)"; }}>
                      <div style={{width:20,height:20,borderRadius:"50%",background:val?"rgba(198,165,92,.2)":"rgba(255,255,255,.04)",border:`1px solid ${val?"rgba(198,165,92,.4)":"rgba(198,165,92,.1)"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <span style={{fontFamily:"'Playfair Display',serif",fontSize:".6rem",color:"var(--gold)",opacity:val?1:.4}}>{i+1}</span>
                      </div>
                      <div style={{minWidth:0,flex:1}}>
                        <div style={{fontSize:".55rem",color:"rgba(198,165,92,.4)",letterSpacing:".08em"}}>{gen}</div>
                        {isEditing ? (
                          <input
                            ref={ataInputRef}
                            value={ataEditVal}
                            onChange={e=>setAtaEditVal(e.target.value)}
                            onBlur={()=>{ saveAnc(i, ataEditVal); setEditingAta(null); }}
                            onKeyDown={e=>{ if(e.key==="Enter"||e.key==="Tab"){ saveAnc(i,ataEditVal); setEditingAta(null); } if(e.key==="Escape") setEditingAta(null); }}
                            onClick={e=>e.stopPropagation()}
                            style={{width:"100%",background:"none",border:"none",outline:"none",fontFamily:"'Playfair Display',serif",fontSize:".78rem",color:"var(--text)",padding:0}}
                            placeholder="Имя предка…"
                          />
                        ) : (
                          <div style={{fontSize:".78rem",fontFamily:"'Playfair Display',serif",color:val?"var(--text)":"rgba(240,235,210,.25)",fontStyle:val?"normal":"italic",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{val||"не указан"}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ══ СЕКЦИЯ 1: ИИ-ИСТОРИЯ РОДА ══ */}
        <section style={{marginTop:48}}>
          <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:10}}>
            <div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.6rem",fontWeight:700,letterSpacing:"-.02em"}}>📖 История рода</h2>
              <p style={{fontSize:".8rem",color:"rgba(240,235,210,.35)",marginTop:4}}>ИИ генерирует рассказ о твоей линии на основе данных</p>
            </div>
            {!aiStory && !aiLoading && (
              <button className="bgold" style={{padding:"10px 24px",fontSize:".82rem"}} onClick={generateStory}>
                ✨ Сгенерировать историю
              </button>
            )}
          </div>

          {aiLoading && (
            <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(198,165,92,.12)",borderRadius:16,padding:32,textAlign:"center"}}>
              <div style={{fontSize:"2rem",marginBottom:12,animation:"gpulse 1.5s ease-in-out infinite"}}>📜</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",color:"var(--gold)",marginBottom:6}}>Абыз изучает твой род...</div>
              <div style={{fontSize:".78rem",color:"rgba(240,235,210,.35)"}}>Составляем историю поколений</div>
            </div>
          )}

          {aiError && (
            <div style={{background:"rgba(200,60,60,.08)",border:"1px solid rgba(200,60,60,.2)",borderRadius:12,padding:"16px 20px",color:"rgba(240,180,180,.8)",fontSize:".84rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              {aiError}
              <button className="boutline" style={{padding:"6px 14px",fontSize:".75rem"}} onClick={generateStory}>Повторить</button>
            </div>
          )}

          {aiStory && (
            <div style={{background:"linear-gradient(135deg,rgba(0,63,37,.15) 0%,rgba(198,165,92,.04) 100%)",border:"1px solid rgba(198,165,92,.18)",borderRadius:16,padding:"28px 32px",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,var(--gold),transparent)",opacity:.5}}/>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:".95rem",lineHeight:1.85,color:"rgba(240,235,210,.88)",whiteSpace:"pre-wrap"}}>{aiStory}</div>
              <button style={{marginTop:20,background:"none",border:"none",fontSize:".72rem",color:"rgba(198,165,92,.4)",cursor:"pointer",fontFamily:"inherit"}} onClick={generateStory}>
                ↺ Сгенерировать заново
              </button>
            </div>
          )}

          {!aiStory && !aiLoading && !aiError && (
            <div style={{background:"rgba(255,255,255,.02)",border:"1.5px dashed rgba(198,165,92,.15)",borderRadius:16,padding:32,textAlign:"center",cursor:"pointer"}} onClick={generateStory}>
              <div style={{fontSize:"2.5rem",marginBottom:12,opacity:.4}}>📖</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",color:"rgba(240,235,210,.5)",marginBottom:6}}>История вашего рода ещё не написана</div>
              <div style={{fontSize:".78rem",color:"rgba(240,235,210,.25)"}}>Нажмите «Сгенерировать» — ИИ составит рассказ о вашей линии</div>
            </div>
          )}
        </section>

        {/* ══ СЕКЦИЯ 2: 7 АТА + ЭПОХА ══ */}
        <section style={{marginTop:56}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.6rem",fontWeight:700,letterSpacing:"-.02em",marginBottom:6}}>📜 Эпоха предков</h2>
          <p style={{fontSize:".8rem",color:"rgba(240,235,210,.35)",marginBottom:24}}>Что происходило в мире, когда жил каждый из твоих атов</p>

          <div style={{display:"flex",flexDirection:"column",gap:0}}>
            {EPOCHS.map((ep, i) => {
              const ancName = localAnc[i];
              return (
                <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 3px 1fr",gap:"0 20px",marginBottom:i<6?32:0}}>
                  {/* Left: ata input */}
                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",paddingTop:4}}>
                    <div style={{fontSize:".58rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(198,165,92,.45)",marginBottom:5,textAlign:"right"}}>{ep.gen}</div>
                    <input
                      style={{width:"100%",maxWidth:220,background:"rgba(255,255,255,.92)",border:`1.5px solid ${ancName?"rgba(198,165,92,.5)":"rgba(198,165,92,.2)"}`,borderRadius:10,padding:"9px 14px",fontFamily:"'Playfair Display',serif",fontSize:".88rem",color:"#111",WebkitTextFillColor:"#111",caretColor:"#333",outline:"none",transition:"all .2s",textAlign:"right"}}
                      placeholder="Имя предка…"
                      value={ancName||""}
                      onChange={e => saveAnc(i, e.target.value)}
                      onFocus={e=>{e.target.style.borderColor="var(--gold)";e.target.style.background="#fff"}}
                      onBlur={e=>{e.target.style.borderColor=localAnc[i]?"rgba(198,165,92,.5)":"rgba(198,165,92,.2)";e.target.style.background="rgba(255,255,255,.92)"}}
                    />
                    <div style={{fontSize:".62rem",color:"rgba(198,165,92,.35)",marginTop:5,textAlign:"right"}}>{ep.years}</div>
                  </div>

                  {/* Center: timeline */}
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <div style={{width:12,height:12,borderRadius:"50%",background:ancName?"var(--gold)":"rgba(198,165,92,.2)",border:"2px solid rgba(198,165,92,.35)",marginTop:4,flexShrink:0,transition:"background .3s"}}/>
                    {i < 6 && <div style={{flex:1,width:2,background:"linear-gradient(180deg,rgba(198,165,92,.3),rgba(198,165,92,.08))",marginTop:4}}/>}
                  </div>

                  {/* Right: epoch info */}
                  <div style={{paddingTop:2}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:".9rem",fontWeight:600,color:ancName?"var(--gold)":"var(--text)",marginBottom:4}}>{ep.era}</div>
                    <div style={{fontSize:".78rem",color:"rgba(240,235,210,.45)",lineHeight:1.6}}>{ep.event}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══ СЕКЦИЯ 3: СОВПАДЕНИЯ ══ */}
        <section style={{marginTop:56}}>
          <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:10}}>
            <div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.6rem",fontWeight:700,letterSpacing:"-.02em"}}>🧬 Возможные родственники</h2>
              <p style={{fontSize:".8rem",color:"rgba(240,235,210,.35)",marginTop:4}}>Люди с совпадающими именами в 7 ата или одного рода</p>
            </div>
            <div style={{fontSize:".7rem",color:"rgba(198,165,92,.45)",letterSpacing:".08em"}}>{MATCHES.filter(m=>!m.locked).length} открыто · {MATCHES.filter(m=>m.locked).length} скрыто</div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>
            {MATCHES.map((m,i) => (
              <div key={i} style={{background:m.locked?"rgba(255,255,255,.02)":"rgba(255,255,255,.04)",border:`1px solid ${m.locked?"rgba(198,165,92,.07)":"rgba(198,165,92,.14)"}`,borderRadius:14,padding:18,position:"relative",overflow:"hidden",cursor:m.locked?"default":"pointer",transition:"all .2s"}}
                onClick={()=>!m.locked&&alert(`${m.name}

${m.common}
Совпадение: ${m.strength}%`)}
                onMouseEnter={e=>{if(!m.locked)e.currentTarget.style.borderColor="rgba(198,165,92,.3)"}}
                onMouseLeave={e=>{if(!m.locked)e.currentTarget.style.borderColor="rgba(198,165,92,.14)"}}>
                {m.locked && (
                  <div style={{position:"absolute",inset:0,background:"rgba(14,18,16,.7)",backdropFilter:"blur(4px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:14,zIndex:2}}>
                    <div style={{fontSize:"1.4rem",marginBottom:6,opacity:.5}}>🔒</div>
                    <div style={{fontSize:".68rem",letterSpacing:".1em",textTransform:"uppercase",color:"rgba(198,165,92,.4)"}}>Закрыто</div>
                  </div>
                )}
                <div style={{filter:m.locked?"blur(4px)":"none"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                    <div style={{width:38,height:38,borderRadius:"50%",background:"linear-gradient(135deg,var(--green3),var(--green2))",border:"1px solid rgba(198,165,92,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontSize:".95rem",color:"var(--gold)",flexShrink:0}}>{m.name[0]}</div>
                    <div>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:".92rem",fontWeight:600}}>{m.name}</div>
                      <div style={{fontSize:".65rem",color:"var(--muted)"}}>{m.tribe} · {m.city}</div>
                    </div>
                  </div>
                  <div style={{fontSize:".75rem",color:"rgba(240,235,210,.5)",lineHeight:1.5,marginBottom:10}}>{m.common}</div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{flex:1,height:3,background:"rgba(255,255,255,.06)",borderRadius:2,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${m.strength}%`,background:"linear-gradient(90deg,var(--gold2),var(--gold3))",borderRadius:2}}/>
                    </div>
                    <span style={{fontSize:".68rem",color:"var(--gold2)",fontFamily:"'Playfair Display',serif"}}>{m.strength}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ СЕКЦИЯ 4: ДОСТИЖЕНИЯ ══ */}
        <section style={{marginTop:56,marginBottom:60}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.6rem",fontWeight:700,letterSpacing:"-.02em",marginBottom:6}}>🏆 Достижения</h2>
          <p style={{fontSize:".8rem",color:"rgba(240,235,210,.35)",marginBottom:24}}>Открывай награды, исследуя свою историю</p>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
            {ACHIEVEMENTS.map(a => (
              <div key={a.id} style={{background:a.done?"rgba(0,63,37,.2)":"rgba(255,255,255,.03)",border:`1.5px solid ${a.done?"rgba(198,165,92,.3)":"rgba(255,255,255,.06)"}`,borderRadius:14,padding:"16px 14px",display:"flex",flexDirection:"column",alignItems:"center",gap:8,textAlign:"center",transition:"all .3s",position:"relative",overflow:"hidden"}}>
                {a.done && <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,var(--gold),transparent)"}}/>}
                <div style={{fontSize:"1.8rem",filter:a.done?"none":"grayscale(1)",opacity:a.done?1:.3,transition:"all .3s"}}>{a.icon}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:".88rem",fontWeight:600,color:a.done?"var(--gold)":"rgba(240,235,210,.3)"}}>{a.label}</div>
                <div style={{fontSize:".68rem",color:a.done?"rgba(240,235,210,.5)":"rgba(240,235,210,.2)",lineHeight:1.4}}>{a.desc}</div>
                {a.done && <div style={{fontSize:".6rem",letterSpacing:".1em",textTransform:"uppercase",color:"rgba(198,165,92,.5)"}}>✓ Открыто</div>}
              </div>
            ))}
          </div>
        </section>

      </div>
      <Footer/>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   CLANS LIST PAGE
═══════════════════════════════════════════════════════════ */
function ClansPage({ setPage }) {
  const [q, setQ] = useState("");
  const [selZhuz, setSelZhuz] = useState("all");

  const zhuzList = ["all","Ұлы жүз","Орта жүз","Кіші жүз · Алимулы","Кіші жүз · Байулы","Кіші жүз · Жетіру","Жүзден тыс"];
  const zhuzLabels = {"all":"Барлығы","Ұлы жүз":"Ұлы жүз","Орта жүз":"Орта жүз","Кіші жүз · Алимулы":"Алимулы","Кіші жүз · Байулы":"Байулы","Кіші жүз · Жетіру":"Жетіру","Жүзден тыс":"Жүзден тыс"};

  const list = useMemo(() => TRIBES.filter(t => {
    const matchQ = t.name.toLowerCase().includes(q.toLowerCase());
    const matchZ = selZhuz === "all" || t.zhuz === selZhuz;
    return matchQ && matchZ;
  }), [q, selZhuz]);

  return (
    <div className="shell pe">
      <div className="wrap">
        <div className="sh">
          <h2>Қазақ рулары</h2>
          <span className="sh-count">{list.length} ру</span>
        </div>
        <p className="sdesc">Қазақ рулары (ру) — шежіренің негізі. Жүзді таңдап, руды іздеңіз.</p>

        <div className="swrap" style={{marginBottom:10}}>
          <span className="sicon">⌕</span>
          <input className="sinput" placeholder="Ру іздеу…" value={q} onChange={e => setQ(e.target.value)}/>
        </div>

        {/* Zhuz filter */}
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>
          {zhuzList.map(z => (
            <button key={z}
              onClick={() => setSelZhuz(z)}
              style={{background:selZhuz===z?"rgba(26,107,68,.25)":"rgba(255,255,255,.03)",border:`1px solid ${selZhuz===z?"var(--gold)":"rgba(198,165,92,.12)"}`,borderRadius:20,padding:"5px 13px",fontSize:".71rem",color:selZhuz===z?"var(--gold)":"var(--muted)",cursor:"pointer",fontFamily:"inherit",transition:"all .18s",whiteSpace:"nowrap"}}>
              {zhuzLabels[z]}
            </button>
          ))}
        </div>

        <div className="tribes-grid">
          {list.map(t => (
            <div key={t.id} className="tribe-card" onClick={() => setPage({id:"community", data:{type:"tribe", itemId:t.id}})}>
              <div style={{width:40,height:40,borderRadius:10,background:"rgba(26,107,68,.15)",border:"1px solid rgba(198,165,92,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",color:"var(--gold)",fontWeight:700,flexShrink:0}}>
                {t.name[0]}
              </div>
              <div>
                <div className="tribe-name">{t.name}</div>
                <div className="tribe-sub">{t.desc}</div>
                <div className="tribe-count">👥 {t.members.toLocaleString()} уч. · {t.zhuz}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CITIES LIST PAGE — two-step: oblast → city
═══════════════════════════════════════════════════════════ */
function CitiesPage({ setPage }) {
  const [selOblast, setSelOblast] = useState(null);
  const [q, setQ] = useState("");

  const oblastCities = useMemo(() =>
    selOblast ? CITIES.filter(c => c.oblast === selOblast &&
      (q ? c.name.toLowerCase().includes(q.toLowerCase()) : true))
    : [], [selOblast, q]);

  /* Oblast list with city counts */
  const oblastList = useMemo(() => {
    return OBLASTS.map(o => ({
      name: o,
      count: CITIES.filter(c => c.oblast === o).length,
    }));
  }, []);

  /* Global search across all cities */
  const globalSearch = q && !selOblast
    ? CITIES.filter(c => c.name.toLowerCase().includes(q.toLowerCase()) ||
        c.oblast.toLowerCase().includes(q.toLowerCase()))
    : [];

  return (
    <div className="shell pe">
      <div className="wrap">
        <div className="sh">
          <h2>Қазақстан елді мекендері</h2>
          <span className="sh-count">{CITIES.length}+ елді мекен</span>
        </div>

        {/* Global search bar always visible */}
        <div className="swrap" style={{marginBottom:20}}>
          <span className="sicon">⌕</span>
          <input className="sinput"
            placeholder="Кез келген қала немесе облыс іздеу…"
            value={q}
            onChange={e => { setQ(e.target.value); if (selOblast && e.target.value) setSelOblast(null); }}
          />
        </div>

        {/* Global search results */}
        {globalSearch.length > 0 && (
          <div style={{marginBottom:24}}>
            <div style={{fontSize:".6rem",letterSpacing:".16em",textTransform:"uppercase",color:"rgba(198,165,92,.45)",marginBottom:10}}>
              Іздеу нәтижелері — {globalSearch.length} елді мекен
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:7}}>
              {globalSearch.map(c => (
                <div key={c.id} className="tribe-card" style={{padding:"10px 14px",gap:10,cursor:"pointer"}}
                  onClick={() => setPage({id:"community",data:{type:"city",itemId:c.id}})}>
                  <div style={{width:32,height:32,borderRadius:7,background:"rgba(26,107,68,.15)",border:"1px solid rgba(198,165,92,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontSize:".95rem",color:"var(--gold)",fontWeight:700,flexShrink:0}}>
                    {c.name[0]}
                  </div>
                  <div style={{minWidth:0}}>
                    <div style={{fontSize:".84rem",fontWeight:500,lineHeight:1.2}}>{c.name}</div>
                    <div style={{fontSize:".6rem",color:"rgba(198,165,92,.5)",marginTop:2}}>{c.type}</div>
                    <div style={{fontSize:".58rem",color:"var(--muted)",marginTop:1}}>{c.oblast}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: oblast grid (when no search, no oblast selected) */}
        {!selOblast && !q && (
          <>
            <div style={{fontSize:".6rem",letterSpacing:".16em",textTransform:"uppercase",color:"rgba(198,165,92,.45)",marginBottom:12}}>
              Облысты таңдаңыз
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:8,paddingBottom:60}}>
              {oblastList.map(({name,count}) => (
                <div key={name} className="tribe-card"
                  style={{padding:"14px 16px",gap:0,flexDirection:"column",alignItems:"flex-start",cursor:"pointer"}}
                  onClick={() => setSelOblast(name)}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",marginBottom:4}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:".95rem",fontWeight:600}}>{name}</div>
                    <div style={{fontSize:".65rem",color:"rgba(198,165,92,.5)",background:"rgba(198,165,92,.08)",borderRadius:20,padding:"2px 8px"}}>{count}</div>
                  </div>
                  <div style={{fontSize:".65rem",color:"var(--muted)"}}>
                    {CITIES.filter(c=>c.oblast===name).filter(c=>c.type==="облыс орталығы")[0]?.name || ""}
                    {count > 1 ? ` және тағы ${count-1}` : ""}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Step 2: cities within selected oblast */}
        {selOblast && (
          <>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
              <button onClick={() => { setSelOblast(null); setQ(""); }}
                style={{background:"none",border:"1px solid var(--border)",borderRadius:20,padding:"5px 14px",cursor:"pointer",color:"var(--muted)",fontFamily:"inherit",fontSize:".75rem",transition:"all .18s",display:"flex",alignItems:"center",gap:5}}
                onMouseEnter={e=>e.currentTarget.style.borderColor="var(--gold)"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
                ← Облыстар
              </button>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",fontWeight:700}}>{selOblast}</div>
                <div style={{fontSize:".65rem",color:"var(--muted)"}}>{CITIES.filter(c=>c.oblast===selOblast).length} елді мекен</div>
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:7,paddingBottom:60}}>
              {oblastCities.map(c => (
                <div key={c.id} className="tribe-card" style={{padding:"10px 14px",gap:10,cursor:"pointer"}}
                  onClick={() => setPage({id:"community",data:{type:"city",itemId:c.id}})}>
                  <div style={{width:34,height:34,borderRadius:8,background:"rgba(26,107,68,.15)",border:"1px solid rgba(198,165,92,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Playfair Display',serif",fontSize:"1rem",color:"var(--gold)",fontWeight:700,flexShrink:0}}>
                    {c.name[0]}
                  </div>
                  <div style={{minWidth:0}}>
                    <div style={{fontSize:".84rem",fontWeight:500}}>{c.name}</div>
                    <div style={{fontSize:".62rem",color:"rgba(198,165,92,.5)",marginTop:2}}>{c.type}</div>
                  </div>
                </div>
              ))}
              {oblastCities.length === 0 && (
                <div className="empty" style={{gridColumn:"1/-1"}}>
                  <div className="empty-i" style={{fontSize:"1.4rem"}}>🔍</div>
                  <div className="empty-t">Табылмады</div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <Footer/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMMUNITY PAGE (shared for tribes & cities)
═══════════════════════════════════════════════════════════ */
function CommunityPage({ data, setPage }) {
  const { type, itemId } = data;
  const [tab, setTab] = useState("persons");

  const item = type === "tribe"
    ? TRIBES.find(t => t.id === itemId)
    : CITIES.find(c => c.id === itemId);

  const relatedPersons = useMemo(() => {
    if (type === "tribe") return PERSONS.filter(p => p.tribe === itemId);
    return PERSONS.slice(0, 5); // mock for city
  }, [type, itemId]);

  const communityMembers = [
    {name:"Асхат Сейтқали", city:"Алматы", joined:"2024"},
    {name:"Гүлнәр Бекова",  city:"Астана", joined:"2024"},
    {name:"Нұрлан Жақсыбеков", city:"Шымкент", joined:"2025"},
    {name:"Айгерім Дәулет", city:"Қарағанды", joined:"2025"},
    {name:"Бауыржан Өмір",  city:"Семей", joined:"2025"},
  ];

  if (!item) return null;

  const backPage = type === "tribe" ? "clans" : "cities";

  return (
    <div className="shell pe">
      <div className="wrap">
        <button className="back" onClick={() => setPage({id: backPage})}>
          ← Артқа к {type === "tribe" ? "родам" : "городам"}
        </button>

        {/* BANNER */}
        <div className="comm-hero">
          <div className="comm-banner">
            <div className="comm-icon">{item.icon}</div>
            <div className="comm-type-tag">{type === "tribe" ? "Ру · Казахский род" : "Туған қала · Город"}</div>
            <div className="comm-title">{item.name}</div>
            <div className="comm-desc-text">{item.desc}</div>
          </div>

          {/* STATS */}
          <div className="comm-stats">
            <div className="cstat"><div className="cstat-n">{type === "tribe" ? item.members?.toLocaleString() : item.pop}</div><div className="cstat-l">{type === "tribe" ? "Мүше" : "Тұрғын"}</div></div>
            <div className="cstat"><div className="cstat-n">{relatedPersons.length}</div><div className="cstat-l">Личностей</div></div>
            <div className="cstat"><div className="cstat-n">{communityMembers.length}</div><div className="cstat-l">В базе</div></div>
            <div className="cstat"><div className="cstat-n">{type === "tribe" ? item.region : item.region}</div><div className="cstat-l">Регион</div></div>
          </div>

          {/* TABS */}
          <div className="tabs">
            <button className={`tab${tab==="persons"?" on":""}`} onClick={() => setTab("persons")}>Исторические личности</button>
            <button className={`tab${tab==="members"?" on":""}`} onClick={() => setTab("members")}>Участники</button>
          </div>

          {tab === "persons" && (
            <div>
              <div className="comm-members">
                <h3>Тарихи тұлғалар {type === "tribe" ? `рода ${item.name}` : `қаласынан ${item.name}`}</h3>
                {relatedPersons.length === 0
                  ? <div className="empty"><div className="empty-i">📜</div><div className="empty-t">Данные пополняются</div></div>
                  : relatedPersons.map(p => (
                    <div key={p.id} className="member-row" onClick={() => setPage({id:"person", data:p})}>
                      <div className="mav">{p.name[0]}</div>
                      <div>
                        <div className="mname">{p.name}</div>
                        <div className="mera">{p.era}</div>
                      </div>
                      <div style={{marginLeft:"auto",fontSize:".72rem",color:"var(--gold2)",opacity:.6}}>›</div>
                    </div>
                  ))
                }
              </div>
            </div>
          )}

          {tab === "members" && (
            <div className="comm-members">
              <h3>Мүшелер сообщества</h3>
              {communityMembers.map((m, i) => (
                <div key={i} className="member-row">
                  <div className="mav" style={{fontSize:".75rem",background:"rgba(198,165,92,.1)"}}>{m.name[0]}</div>
                  <div>
                    <div className="mname">{m.name}</div>
                    <div className="mera">{m.city} · Зарегистрирован {m.joined}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PERSON LIST
═══════════════════════════════════════════════════════════ */
function PersonListPage({ setPage }) {
  const [q, setQ] = useState("");
  const [alpha, setAlpha] = useState("");
  const letters = "АБВҒДЕЖЗИЙКҚЛМНҢОӨПРСТУҮФХЧШЫІЭЮ".split("");
  const list = useMemo(() =>
    PERSONS.filter(p =>
      p.name.toLowerCase().includes(q.toLowerCase()) &&
      (alpha ? p.name.startsWith(alpha) : true)
    ), [q, alpha]);

  return (
    <div className="shell pe">
      <div className="wrap">
        <div className="sh">
          <h2>Исторические личности</h2>
          <span className="sh-count">{list.length} / {PERSONS.length}</span>
        </div>
        <div className="swrap">
          <span className="sicon">⌕</span>
          <input className="sinput" placeholder="Поиск по имени…" value={q} onChange={e => setQ(e.target.value)}/>
        </div>
        <div className="abar">
          <button className={`abtn${alpha===""?" on":""}`} onClick={() => setAlpha("")}>Все</button>
          {letters.map(l => (
            <button key={l} className={`abtn${alpha===l?" on":""}`}
              onClick={() => setAlpha(alpha===l?"":l)}>{l}</button>
          ))}
        </div>
        {list.length === 0
          ? <div className="empty"><div className="empty-i">🔍</div><div className="empty-t">Ничего не найдено</div></div>
          : <div className="pgrid">
              {list.map(p => (
                <div key={p.id} className="pcard" onClick={() => setPage({id:"person", data:p})}>
                  <div className="pav">{p.name[0]}</div>
                  <div className="pname">{p.name}</div>
                  <div className="pera">{p.era}</div>
                  {p.tribe && <div style={{fontSize:".65rem",color:"var(--gold2)",opacity:.6,marginTop:5}}>
                    {TRIBES.find(t=>t.id===p.tribe)?.icon} {TRIBES.find(t=>t.id===p.tribe)?.name}
                  </div>}
                </div>
              ))}
            </div>
        }
      </div>
      <Footer/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PERSON PAGE
═══════════════════════════════════════════════════════════ */
function PersonPage({ person, setPage }) {
  const tribe = TRIBES.find(t => t.id === person.tribe);
  return (
    <div className="shell pe">
      <div className="wrap">
        <div className="ppg">
          <button className="back" onClick={() => setPage({id:"list"})}>← Артқа к списку</button>
          <div className="phero">
            <div className="pbigav">{person.name[0]}</div>
            <div>
              <div className="pbigname">{person.name}</div>
              <div className="pbigera">{person.era}</div>
              {tribe && (
                <div style={{marginTop:6,fontSize:".75rem",color:"var(--gold2)"}}>
                  <span style={{cursor:"pointer",textDecoration:"underline",textUnderlineOffset:3}}
                    onClick={() => setPage({id:"community",data:{type:"tribe",itemId:tribe.id}})}>
                    {tribe.name}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="igrid">
            {[
              {l:"Биография", t:"Подробная биография будет добавлена в следующей версии базы."},
              {l:"Родственные связи", t:"Данные о племенной принадлежности и родственных связях."},
              {l:"Источники", t:"Список исторических источников, летописей и научных трудов."},
            ].map(b => (
              <div key={b.l} className="iblock">
                <div className="ilbl">{b.l}</div>
                <div className="iph">{b.t}</div>
              </div>
            ))}
          </div>
          <div className="pcta">
            <button className="bgold" onClick={() => setPage({id:"my-tree", data:{ancestor:person.name}})}>
              🌳 Создать шежире от этого человека
            </button>
            {tribe && (
              <button className="boutline" onClick={() => setPage({id:"community",data:{type:"tribe",itemId:tribe.id}})}>
                Ру беті {tribe.name}
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   INTERACTIVE TREE
═══════════════════════════════════════════════════════════ */

// Layout: generations from bottom (you) to top (ancestor)
// Horizontal: each generation can have siblings in future, for now linear
function computeLayout(count, nodeW, nodeH, hGap, vGap, canvasW) {
  const positions = [];
  const cx = canvasW / 2 - nodeW / 2;
  for (let i = 0; i < count; i++) {
    // slight horizontal offset for visual interest
    const offset = i % 2 === 0 ? 0 : 16;
    positions.push({
      x: cx + offset,
      y: (count - 1 - i) * (nodeH + vGap) + 20,
    });
  }
  return positions;
}

function InteractiveTree({ rootName, ancestorName }) {
  const NODE_W = 200, NODE_H = 76, V_GAP = 36;
  const COUNT = 7;
  const CANVAS_W = 560;
  const CANVAS_H = COUNT * (NODE_H + V_GAP) + 60;

  const initNames = Array(COUNT).fill("").map((_, i) =>
    i === 0 ? (rootName || "") : (i === COUNT - 1 && ancestorName ? ancestorName : "")
  );
  const [names, setNames] = useState(initNames);
  const [editing, setEditing] = useState(null);
  const [editVal, setEditVal] = useState("");
  const [zoom, setZoom] = useState(1);
  const inputRef = useRef(null);

  const positions = useMemo(() => computeLayout(COUNT, NODE_W, NODE_H, V_GAP, 0, CANVAS_W), []);

  const startEdit = useCallback((i) => {
    if (i === 0 && rootName) return; // root fixed
    setEditing(i);
    setEditVal(names[i]);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [names, rootName]);

  const commitEdit = useCallback(() => {
    if (editing !== null) {
      setNames(prev => { const n = [...prev]; n[editing] = editVal; return n; });
      setEditing(null);
    }
  }, [editing, editVal]);

  const updateName = useCallback((i, v) => {
    setNames(prev => { const n = [...prev]; n[i] = v; return n; });
  }, []);

  // Build connector paths between consecutive nodes
  const connectors = useMemo(() => {
    const paths = [];
    for (let i = 0; i < COUNT - 1; i++) {
      const from = positions[i];
      const to = positions[i + 1];
      const x1 = from.x + NODE_W / 2;
      const y1 = from.y;
      const x2 = to.x + NODE_W / 2;
      const y2 = to.y + NODE_H;
      // Bezier for slight curve
      const cy = (y1 + y2) / 2;
      paths.push({ d: `M${x1},${y1} C${x1},${cy} ${x2},${cy} ${x2},${y2}`, i });
    }
    return paths;
  }, [positions]);

  const progress = names.filter(n => n.trim()).length;

  return (
    <div>
      {/* PROGRESS */}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:180}}>
          <div style={{fontSize:".65rem",letterSpacing:".12em",textTransform:"uppercase",color:"var(--gold2)",opacity:.65,marginBottom:6}}>
            Заполнено {progress} из {COUNT} поколений
          </div>
          <div style={{height:4,background:"rgba(255,255,255,.06)",borderRadius:4,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${(progress/COUNT)*100}%`,background:"var(--gold)",borderRadius:4,transition:"width .4s ease"}}/>
          </div>
        </div>
        <div className="zoom-ctrls">
          <button className="zbtn" onClick={() => setZoom(z => Math.min(z + .15, 1.6))}>+</button>
          <button className="zbtn" onClick={() => setZoom(z => Math.max(z - .15, 0.5))}>{Math.round(zoom*100)}%</button>
          <button className="zbtn" onClick={() => setZoom(1)}>↺</button>
        </div>
      </div>

      {/* EDITOR PANEL */}
      {editing !== null && (
        <div className="tree-editor">
          <div style={{flex:0}}>
            <div className="te-gen">{GENS[editing]}</div>
            <div className="te-name">Поколение {editing + 1}</div>
          </div>
          <input
            ref={inputRef}
            className="te-inp"
            value={editVal}
            onChange={e => setEditVal(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") commitEdit(); if (e.key === "Escape") setEditing(null); }}
            placeholder="Введите имя предка…"
          />
          <div style={{display:"flex",gap:8,flexShrink:0}}>
            <button className="boutline" style={{padding:"8px 16px"}} onClick={commitEdit}>✓ Сохранить</button>
            <button className="bghost" style={{padding:"8px 14px"}} onClick={() => setEditing(null)}>✕</button>
          </div>
        </div>
      )}

      {/* CANVAS */}
      <div className="tree-canvas-wrap">
        <div className="tree-canvas" style={{width:CANVAS_W, height:CANVAS_H, transform:`scale(${zoom})`, transformOrigin:"top center", marginBottom: zoom < 1 ? `-${(1-zoom)*CANVAS_H}px` : 0}}>

          {/* SVG CONNECTORS */}
          <svg className="tree-svg" width={CANVAS_W} height={CANVAS_H}>
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C6A55C" stopOpacity=".5"/>
                <stop offset="100%" stopColor="#C6A55C" stopOpacity=".12"/>
              </linearGradient>
            </defs>
            {connectors.map(c => (
              <path key={c.i} d={c.d} fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray={names[c.i] && names[c.i+1] ? "none" : "5,4"}/>
            ))}
            {/* dots at joints */}
            {positions.map((p, i) => (
              <circle key={i} cx={p.x + NODE_W/2} cy={p.y + NODE_H - 1} r="3"
                fill={names[i] ? "var(--gold)" : "rgba(198,165,92,.2)"}
                style={{transition:"fill .3s"}}/>
            ))}
          </svg>

          {/* NODES */}
          {positions.map((pos, i) => {
            const isRoot  = i === 0;
            const isAnc   = i === COUNT - 1 && ancestorName;
            const filled  = !!names[i];
            const isEdit  = editing === i;
            return (
              <div
                key={i}
                className={`tn${isRoot?" root":""}${isEdit?" editing":""}`}
                style={{
                  left: pos.x,
                  top:  pos.y,
                  width: NODE_W,
                  opacity: 1,
                  animation: `fup .3s ${i * 0.04}s ease both`,
                }}
                onClick={() => !isEdit && startEdit(i)}
              >
                <div className="tn-inner" style={{minHeight:NODE_H}}>
                  <div className="tn-gen">{GENS[i] || `Поколение ${i+1}`}</div>
                  {isEdit
                    ? <div className="tn-name">✏️ редактирование…</div>
                    : <div className={`tn-name${filled?"":" empty"}`}>
                        {filled ? names[i] : (isRoot ? "Вы" : "— не указано —")}
                      </div>
                  }
                  <div className="tn-num">{String(i+1).padStart(2,"0")} / {COUNT}</div>
                  {!isRoot && !isEdit && (
                    <button className="tn-edit-btn" onClick={e => { e.stopPropagation(); startEdit(i); }}>✏</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LEGEND */}
      <div className="tree-legend" style={{marginTop:16}}>
        <div className="leg-item"><div className="leg-dot" style={{background:"var(--gold)"}}/> Заполнено</div>
        <div className="leg-item"><div className="leg-dot" style={{background:"rgba(198,165,92,.2)"}}/> Нажмите для редактирования</div>
        <div className="leg-item"><div style={{width:20,height:2,borderTop:"1.5px dashed rgba(198,165,92,.3)"}}/> Неизвестная связь</div>
      </div>
    </div>
  );
}

/* ── MY TREE PAGE wrapper ── */
function MyTreePage({ userName, profile, initialData, setPage }) {
  const [showExport, setShowExport] = useState(false);
  const tribe = TRIBES.find(t => t.id === profile?.tribeId);
  const ancestorName = initialData?.ancestor || null;

  return (
    <div className="shell pe">
      <div className="wrap">
        <div className="tree-page">
          <div className="tree-header">
            <div>
              <div style={{fontSize:".6rem",letterSpacing:".2em",textTransform:"uppercase",color:"rgba(198,165,92,.5)",marginBottom:4}}>Шежире</div>
              <div className="tree-title">🌳 {userName || "Моё дерево"}</div>
              {tribe && <div style={{fontSize:".75rem",color:"rgba(198,165,92,.55)",marginTop:3}}>🏔 {tribe.name} · {tribe.zhuz}</div>}
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <button className="boutline" onClick={() => setPage({id:"list"})}>🔍 Найти предка</button>
              <button className="bgold" style={{padding:"10px 20px"}} onClick={() => setShowExport(e => !e)}>
                {showExport ? "✕ Закрыть" : "📤 Экспорт"}
              </button>
            </div>
          </div>

          {ancestorName && (
            <div className="abadge" style={{marginBottom:16}}>
              Исторический предок: <strong>{ancestorName}</strong>
            </div>
          )}

          {showExport && <ExportPanel userName={userName} profile={profile}/>}

          <InteractiveTree rootName={userName} ancestorName={ancestorName}/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

/* ── Inline export panel ── */
function ExportPanel({ userName, profile }) {
  const tribe = TRIBES.find(t => t.id === profile?.tribeId);
  const city  = CITIES.find(c => c.id === profile?.cityId);
  const ancs  = profile?.ancestors || [];
  const ANC_GENS = ["Отец","Дед","Прадед","Пра-прадед","Пра-пра-прадед","Пра-пра-пра-прадед","7-й дед"];
  const [tab, setTab]     = useState("pdf");
  const [loading, setLoading] = useState(false);
  const [done, setDone]   = useState("");
  const pdfRef    = useRef(null);
  const posterRef = useRef(null);
  const filled = ancs.filter(Boolean);

  const getH2C = async () => (await import("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.esm.min.js")).default;

  const downloadPDF = async () => {
    setLoading(true);
    try {
      const html2canvas = await getH2C();
      const { jsPDF } = await import("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
      const canvas = await html2canvas(pdfRef.current, { scale:2, useCORS:true, backgroundColor:"#0e1210" });
      const pdf = new jsPDF({ orientation:"portrait", unit:"mm", format:"a4" });
      const w = pdf.internal.pageSize.getWidth();
      pdf.addImage(canvas.toDataURL("image/jpeg",.92), "JPEG", 0, 0, w, (canvas.height*w)/canvas.width);
      pdf.save(`${userName||"shejire"}_shejire.pdf`);
      setDone("pdf");
    } catch { alert("Ошибка PDF."); }
    setLoading(false); setTimeout(() => setDone(""), 3000);
  };

  const downloadPoster = async () => {
    setLoading(true);
    try {
      const html2canvas = await getH2C();
      const canvas = await html2canvas(posterRef.current, { scale:3, useCORS:true, backgroundColor:"#0a1a0f" });
      const a = document.createElement("a");
      a.download = `${userName||"shejire"}_poster.png`;
      a.href = canvas.toDataURL("image/png"); a.click();
      setDone("poster");
    } catch { alert("Ошибка постера."); }
    setLoading(false); setTimeout(() => setDone(""), 3000);
  };

  const TreePreview = ({ refProp, isPoster }) => (
    <div ref={refProp} style={{
      background: isPoster ? "linear-gradient(160deg,#0a1a0f,#071209,#0e1a0a)" : "#0e1210",
      border:"1px solid rgba(198,165,92,.18)", borderRadius:12,
      padding: isPoster ? "28px 24px" : "28px 24px",
      fontFamily:"'Playfair Display',serif", color:"#f0ebd2",
      position:"relative", overflow:"hidden",
      ...(isPoster ? {aspectRatio:"4/5", display:"flex", flexDirection:"column", justifyContent:"space-between"} : {})
    }}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#C6A55C,transparent)"}}/>
      {isPoster && <div style={{position:"absolute",top:-30,right:-30,width:120,height:120,borderRadius:"50%",border:"1px solid rgba(198,165,92,.07)"}}/>}
      <div style={{textAlign: isPoster?"left":"center", marginBottom:20, paddingBottom:16, borderBottom:"1px solid rgba(198,165,92,.1)"}}>
        <div style={{fontSize:".45rem",letterSpacing:".25em",textTransform:"uppercase",color:"rgba(198,165,92,.4)",marginBottom:6}}>
          {isPoster ? "ШЕЖІРЕ · РОДОСЛОВНОЕ ДЕРЕВО" : "Казахское родословное дерево"}
        </div>
        <div style={{fontSize: isPoster?"1.6rem":"1.5rem", fontWeight:700, color:"#C6A55C", lineHeight:1.1}}>{userName||"Шежире"}</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:6}}>
          {tribe && <span style={{background:"rgba(198,165,92,.1)",border:"1px solid rgba(198,165,92,.2)",borderRadius:20,padding:"2px 8px",fontSize:".55rem",color:"#C6A55C"}}>🏔 {tribe.name}</span>}
          {city  && <span style={{background:"rgba(198,165,92,.06)",border:"1px solid rgba(198,165,92,.13)",borderRadius:20,padding:"2px 8px",fontSize:".55rem",color:"rgba(240,235,210,.55)"}}>🏙 {city.name}</span>}
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column", gap: isPoster?4:0, alignItems: isPoster?"stretch":"center"}}>
        {[...Array(7)].map((_,ri) => {
          const i=6-ri; const nm=i===0?(userName||"Вы"):ancs[i]; const isYou=i===0;
          return isPoster ? (
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,opacity:nm?1:0.2}}>
              <div style={{width:20,height:20,borderRadius:"50%",background:isYou?"rgba(198,165,92,.15)":"rgba(255,255,255,.04)",border:`1px solid ${isYou?"rgba(198,165,92,.45)":"rgba(198,165,92,.12)"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{fontSize:".5rem",color:isYou?"#C6A55C":"rgba(198,165,92,.45)"}}>{i+1}</span>
              </div>
              <div style={{flex:1,height:1,background:nm?"linear-gradient(90deg,rgba(198,165,92,.2),transparent)":"rgba(255,255,255,.04)"}}/>
              <div style={{fontSize:isYou?".78rem":".68rem",fontWeight:isYou?700:400,color:isYou?"#C6A55C":nm?"#f0ebd2":"rgba(240,235,210,.18)",maxWidth:120,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{nm||"—"}</div>
            </div>
          ) : (
            <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <div style={{minWidth:180,padding:"8px 14px",borderRadius:8,textAlign:"center",background:isYou?"linear-gradient(135deg,rgba(0,63,37,.4),rgba(0,48,26,.3))":nm?"rgba(255,255,255,.04)":"rgba(255,255,255,.02)",border:isYou?"2px solid rgba(198,165,92,.5)":nm?"1px solid rgba(198,165,92,.18)":"1px dashed rgba(198,165,92,.1)"}}>
                <div style={{fontSize:".42rem",letterSpacing:".12em",textTransform:"uppercase",color:"rgba(198,165,92,.38)",marginBottom:2}}>{ANC_GENS[i]}</div>
                <div style={{fontSize:isYou?".85rem":".78rem",fontWeight:700,color:isYou?"#C6A55C":nm?"#f0ebd2":"rgba(240,235,210,.18)"}}>{nm||"—"}</div>
              </div>
              {ri<7 && <div style={{width:1,height:14,background:"rgba(198,165,92,.18)"}}/>}
            </div>
          );
        })}
      </div>
      {isPoster && <div style={{display:"flex",justifyContent:"space-between",marginTop:16}}>
        <div style={{fontSize:".85rem",fontWeight:700,color:"rgba(198,165,92,.4)"}}>abyz</div>
        <div style={{fontSize:".4rem",letterSpacing:".15em",textTransform:"uppercase",color:"rgba(198,165,92,.22)"}}>digital heritage · {new Date().getFullYear()}</div>
      </div>}
      {!isPoster && <div style={{textAlign:"center",marginTop:16,paddingTop:12,borderTop:"1px solid rgba(198,165,92,.08)",fontSize:".44rem",letterSpacing:".12em",textTransform:"uppercase",color:"rgba(198,165,92,.25)"}}>ABYZ · Digital Heritage · {new Date().getFullYear()}</div>}
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#C6A55C,transparent)"}}/>
    </div>
  );

  return (
    <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(198,165,92,.18)",borderRadius:16,padding:24,marginBottom:28}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18,flexWrap:"wrap"}}>
        <div style={{flex:1}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.05rem",fontWeight:700,marginBottom:2}}>Сохранить шежире</div>
          <div style={{fontSize:".74rem",color:"rgba(240,235,210,.38)"}}>PDF для печати или постер для Instagram</div>
        </div>
        <div className="tabs" style={{margin:0}}>
          <button className={`tab${tab==="pdf"?" on":""}`} onClick={() => setTab("pdf")}>📄 PDF</button>
          <button className={`tab${tab==="poster"?" on":""}`} onClick={() => setTab("poster")}>🖼️ Постер</button>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 180px",gap:20,alignItems:"start"}}>
        <div style={{overflowX:"auto",maxWidth:"100%"}}>
          {tab==="pdf"
            ? <TreePreview refProp={pdfRef} isPoster={false}/>
            : <TreePreview refProp={posterRef} isPoster={true}/>
          }
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(198,165,92,.1)",borderRadius:10,padding:"12px 14px"}}>
            {tab==="pdf" ? (
              <><div style={{fontSize:".58rem",color:"rgba(198,165,92,.45)",marginBottom:6,letterSpacing:".1em",textTransform:"uppercase"}}>PDF</div>
              <div style={{fontSize:".72rem",color:"rgba(240,235,210,.4)",lineHeight:1.6}}>Формат A4<br/>Высокое качество<br/>{filled.length}/7 предков</div></>
            ) : (
              <><div style={{fontSize:".58rem",color:"rgba(198,165,92,.45)",marginBottom:6,letterSpacing:".1em",textTransform:"uppercase"}}>Постер</div>
              <div style={{fontSize:".72rem",color:"rgba(240,235,210,.4)",lineHeight:1.6}}>1080×1350 px<br/>PNG · 3× резкость<br/>Instagram Ready</div></>
            )}
          </div>
          <button className="bgold" onClick={tab==="pdf"?downloadPDF:downloadPoster} disabled={loading} style={{padding:"11px 0",fontSize:".8rem"}}>
            {loading?"Создаётся…":done?"✓ Готово!":`⬇️ ${tab==="pdf"?"PDF":"Постер"}`}
          </button>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   EXPORT PAGE — PDF + Постер
═══════════════════════════════════════════════════════════ */
function ExportPage({ userName, profile, setPage }) {
  const tribe  = TRIBES.find(t => t.id === profile.tribeId);
  const city   = CITIES.find(c => c.id === profile.cityId);
  const ancs   = profile.ancestors || [];
  const ANC_GENS = ["Отец (Әке)","Дед (Ата)","Прадед (Баба)","Пра-прадед","Пра-пра-прадед","Пра-пра-пра-прадед","7-й дед"];
  const [tab, setTab] = useState("pdf");
  const [loading, setLoading] = useState(false);
  const [posterDone, setPosterDone] = useState(false);
  const posterRef = useRef(null);
  const pdfRef    = useRef(null);

  const downloadPDF = async () => {
    setLoading(true);
    try {
      const { default: html2canvas } = await import("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.esm.min.js");
      const { jsPDF } = await import("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
      const canvas = await html2canvas(pdfRef.current, { scale:2, useCORS:true, backgroundColor:"#0e1210" });
      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      const pdf = new jsPDF({ orientation:"portrait", unit:"mm", format:"a4" });
      const w = pdf.internal.pageSize.getWidth();
      const h = (canvas.height * w) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, w, h);
      pdf.save(`${userName || "shejire"}_shejire.pdf`);
    } catch(e) {
      alert("Ошибка при создании PDF. Попробуйте ещё раз.");
    }
    setLoading(false);
  };

  const downloadPoster = async () => {
    setLoading(true);
    try {
      const { default: html2canvas } = await import("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.esm.min.js");
      const canvas = await html2canvas(posterRef.current, { scale:3, useCORS:true, backgroundColor:"#0a1a0f" });
      const link = document.createElement("a");
      link.download = `${userName || "shejire"}_poster.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setPosterDone(true);
      setTimeout(() => setPosterDone(false), 3000);
    } catch(e) {
      alert("Ошибка при создании постера.");
    }
    setLoading(false);
  };

  const filled = ancs.filter(Boolean);

  return (
    <div className="shell pe">
      <div className="wrap">
        <button className="back" onClick={() => setPage({id:"personal"})}>← Назад</button>

        <div style={{marginBottom:28}}>
          <div style={{fontSize:".6rem",letterSpacing:".22em",textTransform:"uppercase",color:"rgba(198,165,92,.5)",marginBottom:6}}>Экспорт</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"2rem",fontWeight:700,letterSpacing:"-.02em",marginBottom:6}}>
            Сохранить <span style={{color:"var(--gold)"}}>шежире</span>
          </h1>
          <p style={{fontSize:".85rem",color:"rgba(240,235,210,.4)",lineHeight:1.6}}>
            Сохраните своё родословное дерево как PDF для печати или как постер для Instagram.
          </p>
        </div>

        {/* Tabs */}
        <div className="tabs" style={{marginBottom:28}}>
          <button className={`tab${tab==="pdf"?" on":""}`} onClick={() => setTab("pdf")}>📄 PDF для печати</button>
          <button className={`tab${tab==="poster"?" on":""}`} onClick={() => setTab("poster")}>🖼️ Постер Instagram</button>
        </div>

        {/* ── PDF TAB ── */}
        {tab === "pdf" && (
          <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:24,alignItems:"start"}}>
            {/* Preview */}
            <div ref={pdfRef} style={{background:"#0e1210",border:"1px solid rgba(198,165,92,.2)",borderRadius:16,padding:"40px 36px",fontFamily:"'Playfair Display',serif",color:"#f0ebd2",position:"relative",overflow:"hidden"}}>
              {/* Header ornament */}
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,#C6A55C 30%,#e8c97a 50%,#C6A55C 70%,transparent)"}}/>
              <div style={{position:"absolute",bottom:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,#C6A55C 30%,#e8c97a 50%,#C6A55C 70%,transparent)"}}/>

              {/* Title */}
              <div style={{textAlign:"center",marginBottom:32,paddingBottom:24,borderBottom:"1px solid rgba(198,165,92,.15)"}}>
                <div style={{fontSize:".55rem",letterSpacing:".3em",textTransform:"uppercase",color:"rgba(198,165,92,.5)",marginBottom:8}}>Казахское родословное дерево</div>
                <div style={{fontSize:"2.2rem",fontWeight:700,color:"#C6A55C",letterSpacing:"-.02em",marginBottom:4}}>{userName || "Шежире"}</div>
                {tribe && <div style={{fontSize:".85rem",color:"rgba(240,235,210,.55)",marginBottom:2}}>Род: <span style={{color:"#C6A55C"}}>{tribe.name}</span> · {tribe.zhuz}</div>}
                {city  && <div style={{fontSize:".78rem",color:"rgba(240,235,210,.4)"}}>Туған қала: {city.name}</div>}
              </div>

              {/* Tree */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:0}}>
                {/* Ancestors top to bottom */}
                {[...Array(7)].map((_,ri) => {
                  const i = 6 - ri;
                  const name = ancs[i];
                  const isYou = i === 0;
                  return (
                    <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                      <div style={{
                        minWidth:220,padding:"10px 18px",borderRadius:10,textAlign:"center",
                        background: isYou ? "linear-gradient(135deg,rgba(0,63,37,.5),rgba(0,48,26,.3))" : name ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.02)",
                        border: isYou ? "2px solid rgba(198,165,92,.6)" : name ? "1px solid rgba(198,165,92,.22)" : "1px dashed rgba(198,165,92,.12)",
                      }}>
                        <div style={{fontSize:".5rem",letterSpacing:".15em",textTransform:"uppercase",color:"rgba(198,165,92,.45)",marginBottom:3}}>{ANC_GENS[i] || "Предок"}</div>
                        <div style={{fontSize: isYou ? "1rem" : ".88rem",fontWeight:700,color: isYou ? "#C6A55C" : name ? "#f0ebd2" : "rgba(240,235,210,.2)"}}>{isYou ? (userName||"Вы") : (name || "— не указано —")}</div>
                      </div>
                      {ri < 7 && <div style={{width:1,height:20,background:"linear-gradient(180deg,rgba(198,165,92,.35),rgba(198,165,92,.1))"}}/>}
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div style={{textAlign:"center",marginTop:28,paddingTop:20,borderTop:"1px solid rgba(198,165,92,.1)",fontSize:".55rem",letterSpacing:".15em",textTransform:"uppercase",color:"rgba(198,165,92,.3)"}}>
                ABYZ · Digital Heritage · abyz.kz · {new Date().getFullYear()}
              </div>
            </div>

            {/* Controls */}
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(198,165,92,.12)",borderRadius:14,padding:18}}>
                <div style={{fontSize:".6rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(198,165,92,.5)",marginBottom:12}}>Информация</div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {[
                    {label:"Формат",   val:"A4 (210×297 мм)"},
                    {label:"Качество", val:"Высокое (2×)"},
                    {label:"Язык",     val:"Русский / Казахский"},
                    {label:"Заполнено", val:`${filled.length} из 7 предков`},
                  ].map(({label,val}) => (
                    <div key={label} style={{display:"flex",justifyContent:"space-between",fontSize:".78rem"}}>
                      <span style={{color:"rgba(240,235,210,.4)"}}>{label}</span>
                      <span style={{color:"var(--text)"}}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="bgold" onClick={downloadPDF} disabled={loading}
                style={{padding:"14px 0",fontSize:".85rem",letterSpacing:".06em"}}>
                {loading ? "Создаётся…" : "⬇️ Скачать PDF"}
              </button>

              <div style={{fontSize:".7rem",color:"rgba(240,235,210,.22)",textAlign:"center",lineHeight:1.5}}>
                PDF будет создан из текущего предпросмотра слева. Заполните больше предков для полного дерева.
              </div>
            </div>
          </div>
        )}

        {/* ── POSTER TAB ── */}
        {tab === "poster" && (
          <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:24,alignItems:"start"}}>
            {/* Poster preview */}
            <div ref={posterRef} style={{
              width:540,background:"linear-gradient(160deg,#0a1a0f 0%,#071209 50%,#0e1a0a 100%)",
              borderRadius:20,padding:"48px 40px",fontFamily:"'Playfair Display',serif",color:"#f0ebd2",
              position:"relative",overflow:"hidden",aspectRatio:"4/5",display:"flex",flexDirection:"column",justifyContent:"space-between"
            }}>
              {/* bg ornament circles */}
              <div style={{position:"absolute",top:-60,right:-60,width:220,height:220,borderRadius:"50%",border:"1px solid rgba(198,165,92,.06)"}}/>
              <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",border:"1px solid rgba(198,165,92,.1)"}}/>
              <div style={{position:"absolute",bottom:-80,left:-80,width:280,height:280,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,63,37,.25) 0%,transparent 70%)"}}/>

              {/* Top label */}
              <div>
                <div style={{fontSize:".5rem",letterSpacing:".35em",textTransform:"uppercase",color:"rgba(198,165,92,.45)",marginBottom:16}}>ШЕЖІРЕ · РОДОСЛОВНОЕ ДЕРЕВО</div>
                <div style={{fontSize:"2.8rem",fontWeight:700,color:"#C6A55C",lineHeight:1,letterSpacing:"-.03em",marginBottom:8}}>{userName||"Шежире"}</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:10}}>
                  {tribe && <span style={{background:"rgba(198,165,92,.1)",border:"1px solid rgba(198,165,92,.25)",borderRadius:20,padding:"4px 12px",fontSize:".65rem",color:"#C6A55C",letterSpacing:".06em"}}>🏔 {tribe.name}</span>}
                  {city  && <span style={{background:"rgba(198,165,92,.07)",border:"1px solid rgba(198,165,92,.18)",borderRadius:20,padding:"4px 12px",fontSize:".65rem",color:"rgba(240,235,210,.65)",letterSpacing:".06em"}}>🏙 {city.name}</span>}
                </div>
              </div>

              {/* Ancestors */}
              <div style={{display:"flex",flexDirection:"column",gap:6,margin:"24px 0"}}>
                {[...Array(7)].map((_,ri) => {
                  const i = 6 - ri;
                  const nm = i === 0 ? (userName||"Вы") : ancs[i];
                  const isYou = i === 0;
                  const hasName = !!nm;
                  return (
                    <div key={i} style={{display:"flex",alignItems:"center",gap:10,opacity: hasName ? 1 : 0.25}}>
                      <div style={{width:28,height:28,borderRadius:"50%",background: isYou ? "rgba(198,165,92,.2)" : "rgba(255,255,255,.05)",border:`1px solid ${isYou?"rgba(198,165,92,.6)":"rgba(198,165,92,.2)"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <span style={{fontSize:".6rem",color:isYou?"#C6A55C":"rgba(198,165,92,.6)"}}>{i+1}</span>
                      </div>
                      <div style={{flex:1,height:1,background: hasName ? "linear-gradient(90deg,rgba(198,165,92,.3),transparent)" : "rgba(255,255,255,.05)"}}/>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize: isYou ? ".95rem" : ".82rem",fontWeight: isYou ? 700 : 400,color: isYou ? "#C6A55C" : hasName ? "#f0ebd2" : "rgba(240,235,210,.25)",textAlign:"right",maxWidth:160,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                        {nm || "—"}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom */}
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{fontSize:"1.2rem",fontWeight:700,color:"rgba(198,165,92,.5)",letterSpacing:".08em",fontFamily:"'Playfair Display',serif"}}>abyz</div>
                <div style={{fontSize:".48rem",letterSpacing:".2em",textTransform:"uppercase",color:"rgba(198,165,92,.3)"}}>digital heritage · {new Date().getFullYear()}</div>
              </div>
            </div>

            {/* Controls */}
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(198,165,92,.12)",borderRadius:14,padding:18}}>
                <div style={{fontSize:".6rem",letterSpacing:".18em",textTransform:"uppercase",color:"rgba(198,165,92,.5)",marginBottom:12}}>Формат</div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {[
                    {label:"Размер",   val:"1080×1350 px"},
                    {label:"Формат",   val:"PNG (прозрачный)"},
                    {label:"Качество", val:"3× (ретина)"},
                    {label:"Для",      val:"Instagram, печать"},
                  ].map(({label,val}) => (
                    <div key={label} style={{display:"flex",justifyContent:"space-between",fontSize:".78rem"}}>
                      <span style={{color:"rgba(240,235,210,.4)"}}>{label}</span>
                      <span style={{color:"var(--text)"}}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="bgold" onClick={downloadPoster} disabled={loading}
                style={{padding:"14px 0",fontSize:".85rem",letterSpacing:".06em"}}>
                {loading ? "Создаётся…" : posterDone ? "✓ Сохранено!" : "⬇️ Скачать постер"}
              </button>

              <div style={{background:"rgba(0,63,37,.1)",border:"1px solid rgba(198,165,92,.12)",borderRadius:10,padding:"12px 14px",fontSize:".72rem",color:"rgba(240,235,210,.35)",lineHeight:1.6}}>
                💡 Совет: загрузите постер в Instagram Stories или распечатайте как фото 15×20 см.
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [userName, setUserName] = useState(null);
  const [profile,  setProfile]  = useState({ tribeId: null, cityId: null });
  const [page,     setPage]     = useState({ id: "personal" });

  const handleEnter = useCallback((name, obData) => {
    setUserName(name);
    setProfile(p => ({
      ...p,
      tribeId:   obData?.tribeId   || p.tribeId,
      cityId:    obData?.cityId    || p.cityId,
      ancestors: obData?.ancestors || p.ancestors || [],
    }));
    setPage({ id: "personal" });
  }, []);

  if (!userName) {
    return (
      <>
        <style>{CSS}</style>

        <LandingPage onEnter={handleEnter}/>
      </>
    );
  }

  const render = () => {
    switch (page.id) {
      case "personal":  return <PersonalPage userName={userName} profile={profile} setProfile={setProfile} setPage={setPage}/>;
      case "list":      return <PersonListPage setPage={setPage}/>;
      case "person":    return <PersonPage person={page.data} setPage={setPage}/>;
      case "clans":     return <ClansPage setPage={setPage}/>;
      case "cities":    return <CitiesPage setPage={setPage}/>;
      case "community": return <CommunityPage data={page.data} setPage={setPage}/>;
      case "my-tree":   return <MyTreePage userName={userName} profile={profile} initialData={page.data} setPage={setPage}/>;
      case "export":    return <ExportPage userName={userName} profile={profile} setPage={setPage}/>;
      default:          return <PersonalPage userName={userName} profile={profile} setProfile={setProfile} setPage={setPage}/>;
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <Header page={page} setPage={setPage}/>
      {render()}
    </>
  );
}
