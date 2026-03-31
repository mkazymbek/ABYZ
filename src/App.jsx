import { useState, useMemo, useCallback, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   CSS
═══════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

:root {
  --green:#003F25; --green2:#00301A; --green3:#1a3d2b; --green4:#0a2518;
  --gold:#C6A55C;  --gold2:#AF8F51;  --gold3:#e8c97a;  --gold4:#f5dfa0;
  --dark:#0e1210;  --dark2:#161a14;  --dark3:#1e231c;
  --text:#f0ebd2;  --muted:rgba(240,235,210,.38);
  --r:14px; --tr:all .22s cubic-bezier(.4,0,.2,1);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;background:var(--dark);color:var(--text);min-height:100vh;-webkit-font-smoothing:antialiased;overflow-x:hidden}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--green);border-radius:3px}

/* HEADER */
.hdr{position:fixed;top:0;left:0;right:0;z-index:300;height:54px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;background:rgba(14,18,16,.9);backdrop-filter:blur(18px);border-bottom:1px solid rgba(198,165,92,.1)}
.logo{font-family:'Playfair Display',serif;font-size:1.35rem;font-weight:700;color:var(--gold);cursor:pointer;letter-spacing:.02em;user-select:none}
.logo-sub{font-size:.52rem;letter-spacing:.22em;color:rgba(198,165,92,.4);text-transform:uppercase;font-weight:300;margin-top:-3px}
.nav{display:flex;gap:2px}
.nbtn{background:none;border:none;font-family:inherit;font-size:.73rem;letter-spacing:.04em;color:rgba(240,235,210,.4);padding:5px 10px;border-radius:8px;cursor:pointer;transition:var(--tr)}
.nbtn:hover,.nbtn.on{color:var(--gold);background:rgba(198,165,92,.07)}

/* LANDING */
.landing{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:80px 24px 60px}
.lbg{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 90% 55% at 50% 12%,rgba(0,63,37,.6) 0%,transparent 65%),radial-gradient(ellipse 40% 45% at 88% 80%,rgba(0,48,26,.3) 0%,transparent 55%)}
.ornament{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold) 30%,var(--gold3) 50%,var(--gold) 70%,transparent);opacity:.45}

/* ELDER */
.elder-wrap{position:relative;width:220px;height:220px;margin-bottom:24px;flex-shrink:0}
.elder-glow{position:absolute;inset:-24px;border-radius:50%;background:radial-gradient(circle,rgba(0,63,37,.7) 0%,transparent 70%);animation:gpulse 3.5s ease-in-out infinite}
@keyframes gpulse{0%,100%{opacity:.5;transform:scale(.94)}50%{opacity:1;transform:scale(1.06)}}
.elder-ring{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(198,165,92,.2);animation:rspin 20s linear infinite}
.elder-ring2{position:absolute;inset:10px;border-radius:50%;border:1px dashed rgba(198,165,92,.1);animation:rspin 32s linear infinite reverse}
@keyframes rspin{to{transform:rotate(360deg)}}
.elder-circle{position:absolute;inset:20px;border-radius:50%;background:linear-gradient(155deg,var(--green3) 0%,var(--green2) 55%,var(--dark) 100%);border:1.5px solid rgba(198,165,92,.3);overflow:hidden;display:flex;align-items:center;justify-content:center}

/* SPEECH BUBBLE */
.speech{max-width:500px;width:100%;margin-bottom:28px;animation:fup .5s ease both}
@keyframes fup{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.sbub{background:rgba(0,48,26,.22);border:1px solid rgba(198,165,92,.18);border-radius:18px;padding:20px 24px;position:relative}
.sbub::before{content:'';position:absolute;top:-9px;left:50%;transform:translateX(-50%);border:9px solid transparent;border-bottom-color:rgba(198,165,92,.18);border-top:none}
.sbub::after{content:'';position:absolute;top:-7px;left:50%;transform:translateX(-50%);border:8px solid transparent;border-bottom-color:rgba(0,48,26,.4);border-top:none}
.sname{font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);opacity:.7;margin-bottom:9px}
.stext{font-family:'Playfair Display',serif;font-size:1rem;line-height:1.65;color:var(--text);opacity:.88}
.cur{display:inline-block;width:2px;height:1em;background:var(--gold);margin-left:2px;vertical-align:text-bottom;animation:blink .85s step-end infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}

/* FORM */
.oform{width:100%;max-width:340px;animation:fup .4s .1s ease both}
.flabel{font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(198,165,92,.58);margin-bottom:9px}
.ninput{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(198,165,92,.2);border-radius:var(--r);padding:13px 18px;font-family:'Playfair Display',serif;font-size:1rem;color:var(--text);outline:none;transition:var(--tr);margin-bottom:12px;text-align:center}
.ninput::placeholder{color:rgba(240,235,210,.2);font-family:'Inter',sans-serif;font-size:.87rem}
.ninput:focus{border-color:rgba(198,165,92,.5);background:rgba(255,255,255,.06)}

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
.shell{padding-top:54px}
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
.modal-overlay{position:fixed;inset:0;z-index:500;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;padding:24px;animation:fup .2s ease}
.modal{background:var(--dark2);border:1px solid rgba(198,165,92,.2);border-radius:20px;padding:28px;width:100%;max-width:480px;max-height:80vh;display:flex;flex-direction:column}
.modal-title{font-family:'Playfair Display',serif;font-size:1.3rem;margin-bottom:6px}
.modal-sub{font-size:.78rem;color:var(--muted);margin-bottom:18px}
.modal-search{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(198,165,92,.15);border-radius:10px;padding:10px 14px;font-family:'Inter',sans-serif;font-size:.85rem;color:var(--text);outline:none;margin-bottom:14px;transition:var(--tr)}
.modal-search:focus{border-color:rgba(198,165,92,.4)}
.modal-list{overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:6px}
.modal-item{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:10px;cursor:pointer;transition:var(--tr);border:1px solid transparent}
.modal-item:hover{background:rgba(198,165,92,.06);border-color:rgba(198,165,92,.12)}
.modal-item.sel{background:rgba(0,63,37,.2);border-color:rgba(198,165,92,.3)}
.modal-item-icon{font-size:1.1rem;width:32px;text-align:center;flex-shrink:0}
.modal-item-name{font-size:.88rem;font-weight:500}
.modal-item-sub{font-size:.7rem;color:var(--muted);margin-top:1px}
.modal-check{margin-left:auto;color:var(--gold);font-size:1rem;opacity:0}
.modal-item.sel .modal-check{opacity:1}
.modal-footer{margin-top:16px;display:flex;gap:10px}

/* STATS ROW */
.stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:24px}
.scard{background:rgba(255,255,255,.03);border:1px solid rgba(198,165,92,.09);border-radius:12px;padding:14px;text-align:center}
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
.sinput{width:100%;max-width:460px;background:rgba(255,255,255,.035);border:1px solid rgba(198,165,92,.13);border-radius:var(--r);padding:11px 15px 11px 38px;font-family:'Inter',sans-serif;font-size:.86rem;color:var(--text);outline:none;transition:var(--tr)}
.sinput::placeholder{color:rgba(240,235,210,.2)}
.sinput:focus{border-color:rgba(198,165,92,.38);background:rgba(255,255,255,.05)}

/* ALPHA */
.abar{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:20px}
.abtn{background:rgba(255,255,255,.03);border:1px solid rgba(198,165,92,.08);color:rgba(240,235,210,.3);width:29px;height:29px;border-radius:7px;font-size:.7rem;cursor:pointer;transition:var(--tr);font-family:'Inter',sans-serif;display:flex;align-items:center;justify-content:center}
.abtn:hover,.abtn.on{background:rgba(198,165,92,.1);border-color:var(--gold);color:var(--gold)}

/* PERSON GRID */
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(188px,1fr));gap:10px;padding-bottom:60px}
.pcard{background:rgba(255,255,255,.03);border:1px solid rgba(198,165,92,.09);border-radius:var(--r);padding:16px;cursor:pointer;transition:var(--tr);position:relative;overflow:hidden}
.pcard::after{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:0;transition:var(--tr)}
.pcard:hover{background:rgba(198,165,92,.05);border-color:rgba(198,165,92,.22);transform:translateY(-2px)}
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
.iblock{background:rgba(255,255,255,.025);border:1px solid rgba(198,165,92,.09);border-radius:var(--r);padding:19px}
.ilbl{font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold2);opacity:.6;margin-bottom:8px}
.iph{font-size:.82rem;color:rgba(240,235,210,.2);font-style:italic;line-height:1.65}
.pcta{display:flex;gap:10px;flex-wrap:wrap}

/* ═══ COMMUNITY PAGE ═══ */
.comm-hero{padding:44px 0 28px}
.comm-banner{background:linear-gradient(135deg,var(--green) 0%,var(--green2) 60%,var(--dark) 100%);border:1px solid rgba(198,165,92,.2);border-radius:20px;padding:32px;margin-bottom:28px;position:relative;overflow:hidden}
.comm-banner::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 90% 50%,rgba(198,165,92,.08) 0%,transparent 65%);pointer-events:none}
.comm-icon{font-size:2.4rem;margin-bottom:10px}
.comm-type-tag{font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(198,165,92,.6);margin-bottom:8px}
.comm-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:700;margin-bottom:8px}
.comm-desc-text{font-size:.87rem;color:rgba(240,235,210,.5);line-height:1.7;max-width:560px}
.comm-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:28px}
.cstat{background:rgba(255,255,255,.03);border:1px solid rgba(198,165,92,.09);border-radius:12px;padding:14px;text-align:center}
.cstat-n{font-family:'Playfair Display',serif;font-size:1.4rem;color:var(--gold);font-weight:700}
.cstat-l{font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(240,235,210,.27);margin-top:3px}
.comm-members{margin-bottom:36px}
.comm-members h3{font-family:'Playfair Display',serif;font-size:1.1rem;margin-bottom:14px}
.member-row{display:flex;align-items:center;gap:12px;padding:11px 14px;background:rgba(255,255,255,.025);border:1px solid rgba(198,165,92,.08);border-radius:10px;margin-bottom:7px;cursor:pointer;transition:var(--tr)}
.member-row:hover{background:rgba(198,165,92,.06);border-color:rgba(198,165,92,.2)}
.mav{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--green),var(--green2));border:1px solid rgba(198,165,92,.18);display:flex;align-items:center;justify-content:center;font-size:.85rem;color:var(--gold);font-family:'Playfair Display',serif;flex-shrink:0}
.mname{font-size:.85rem;font-weight:500}
.mera{font-size:.68rem;color:var(--muted)}
.tribe-card{background:rgba(255,255,255,.025);border:1px solid rgba(198,165,92,.1);border-radius:14px;padding:18px;cursor:pointer;transition:var(--tr);display:flex;align-items:flex-start;gap:14px}
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
.tn-inner{background:rgba(22,26,20,.9);border:1.5px solid rgba(198,165,92,.18);border-radius:14px;padding:14px 14px 12px;position:relative;transition:var(--tr)}
.tn:hover .tn-inner,.tn.focused .tn-inner{border-color:rgba(198,165,92,.55);background:rgba(0,63,37,.22)}
.tn.root .tn-inner{background:rgba(0,63,37,.28);border-color:rgba(198,165,92,.45);border-width:2px}
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
.empty{text-align:center;padding:60px 24px;color:rgba(240,235,210,.22)}
.empty-i{font-size:2rem;margin-bottom:8px;opacity:.3}
.empty-t{font-size:.83rem}
.footer{border-top:1px solid rgba(198,165,92,.07);padding:24px;text-align:center;font-size:.67rem;letter-spacing:.1em;color:rgba(240,235,210,.18)}

/* TAB BAR */
.tabs{display:flex;gap:4px;background:rgba(255,255,255,.025);border:1px solid rgba(198,165,92,.1);border-radius:12px;padding:4px;margin-bottom:22px;width:fit-content}
.tab{background:none;border:none;font-family:inherit;font-size:.78rem;color:rgba(240,235,210,.4);padding:8px 16px;border-radius:9px;cursor:pointer;transition:var(--tr)}
.tab.on{background:rgba(0,63,37,.35);color:var(--gold);border:1px solid rgba(198,165,92,.2)}

/* MOBILE */
@media(max-width:700px){
  .pper{grid-template-columns:1fr;gap:24px;padding:32px 16px}
  .pside{display:none}
  .comm-stats{grid-template-columns:repeat(2,1fr)}
}

/* ══════════════════════════════
   ONBOARDING FLOW
══════════════════════════════ */
.ob-wrap{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:80px 24px 60px}
.ob-fade{animation:obfade .45s cubic-bezier(.4,0,.2,1) both}
@keyframes obfade{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.ob-fade-out{animation:obfadeout .3s cubic-bezier(.4,0,.2,1) both}
@keyframes obfadeout{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-12px)}}

/* Progress bar */
.ob-progress{position:fixed;top:0;left:0;right:0;z-index:400;display:flex;align-items:center;justify-content:space-between;padding:14px 28px;background:rgba(14,18,16,.88);backdrop-filter:blur(18px);border-bottom:1px solid rgba(198,165,92,.08)}
.ob-prog-label{font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(198,165,92,.5)}
.ob-prog-track{width:180px;height:3px;background:rgba(198,165,92,.1);border-radius:2px;overflow:hidden}
.ob-prog-fill{height:100%;background:linear-gradient(90deg,var(--gold2),var(--gold3));border-radius:2px;transition:width .5s cubic-bezier(.4,0,.2,1)}
.ob-logo{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:var(--gold);letter-spacing:.02em}

/* Tribe grid */
.tribe-grid-ob{display:grid;grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:8px;width:100%;max-width:500px;margin-bottom:18px;max-height:280px;overflow-y:auto;padding-right:4px}
.tribe-btn{background:rgba(255,255,255,.03);border:1.5px solid rgba(198,165,92,.12);border-radius:12px;padding:12px 14px;cursor:pointer;transition:var(--tr);text-align:left;font-family:inherit;color:var(--text);display:flex;align-items:center;gap:9px}
.tribe-btn:hover{background:rgba(0,63,37,.18);border-color:rgba(198,165,92,.35)}
.tribe-btn.sel{background:rgba(0,63,37,.28);border-color:var(--gold);box-shadow:0 0 0 2px rgba(198,165,92,.12)}
.tribe-btn .tb-icon{font-size:1.2rem;flex-shrink:0}
.tribe-btn .tb-name{font-size:.82rem;font-weight:500;line-height:1.2}
.tribe-btn .tb-reg{font-size:.65rem;color:var(--muted);margin-top:2px}
.tribe-unknown{background:none;border:1px dashed rgba(198,165,92,.2);color:rgba(240,235,210,.35);font-size:.8rem;padding:11px 20px;border-radius:10px;cursor:pointer;font-family:inherit;transition:var(--tr);display:block;width:100%;max-width:500px;margin-bottom:6px;text-align:center}
.tribe-unknown:hover{border-color:rgba(198,165,92,.4);color:rgba(240,235,210,.6)}

/* Ancestor fields */
.anc-list{display:flex;flex-direction:column;gap:10px;width:100%;max-width:400px;margin-bottom:18px}
.anc-row{display:flex;align-items:center;gap:10px}
.anc-num{font-family:'Playfair Display',serif;font-size:.9rem;color:var(--gold);opacity:.7;width:20px;flex-shrink:0;text-align:right}
.anc-gen{font-size:.62rem;color:var(--muted);width:110px;flex-shrink:0;line-height:1.3}
.anc-inp{flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(198,165,92,.14);border-radius:9px;padding:10px 14px;font-family:'Playfair Display',serif;font-size:.87rem;color:var(--text);outline:none;transition:var(--tr)}
.anc-inp:focus{border-color:rgba(198,165,92,.42);background:rgba(255,255,255,.06)}
.anc-inp::placeholder{font-family:'Inter',sans-serif;font-size:.78rem;color:rgba(240,235,210,.18)}
.anc-inp.filled{border-color:rgba(198,165,92,.32)}

/* Nav row */
.ob-nav{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;width:100%;max-width:400px}
.ob-back{background:none;border:1px solid rgba(240,235,210,.1);color:rgba(240,235,210,.3);padding:11px 22px;border-radius:var(--r);font-family:'Inter',sans-serif;font-size:.8rem;cursor:pointer;transition:var(--tr)}
.ob-back:hover{border-color:rgba(198,165,92,.3);color:rgba(198,165,92,.7)}

/* Tree reveal */
.tree-reveal{animation:treeReveal .8s cubic-bezier(.4,0,.2,1) both}
@keyframes treeReveal{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}

/* ══════════════════════════════
   SHOW MATCHES STEP
══════════════════════════════ */
.matches-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px;width:100%;max-width:860px;margin-bottom:20px}
.match-card{background:rgba(255,255,255,.03);border:1px solid rgba(198,165,92,.13);border-radius:16px;padding:18px;position:relative;overflow:hidden;transition:var(--tr)}
.match-card:not(.blurred):hover{background:rgba(0,63,37,.12);border-color:rgba(198,165,92,.28);transform:translateY(-2px)}
.match-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:0;transition:var(--tr)}
.match-card:not(.blurred):hover::before{opacity:.7}

.match-card.blurred .mc-body{filter:blur(6px);user-select:none;pointer-events:none}
.match-card.blurred{border-color:rgba(198,165,92,.07);cursor:default}
.mc-lock{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;z-index:2;background:rgba(10,16,12,.55);backdrop-filter:blur(1px);border-radius:16px}
.mc-lock-icon{font-size:1.4rem;opacity:.6}
.mc-lock-text{font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(198,165,92,.45)}

.mc-head{display:flex;align-items:center;gap:12px;margin-bottom:12px}
.mc-icon{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--green),var(--green2));border:1.5px solid rgba(198,165,92,.25);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0}
.mc-name{font-family:'Playfair Display',serif;font-size:.95rem;font-weight:700;line-height:1.2;margin-bottom:2px}
.mc-era{font-size:.65rem;color:var(--muted);letter-spacing:.05em}

.mc-type-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(0,63,37,.2);border:1px solid rgba(198,165,92,.15);border-radius:20px;padding:4px 10px;font-size:.63rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(198,165,92,.7);margin-bottom:10px}

.mc-relation{font-size:.78rem;color:rgba(240,235,210,.55);line-height:1.5;margin-bottom:10px}
.mc-detail{font-size:.74rem;color:rgba(240,235,210,.3);line-height:1.55;margin-bottom:12px;font-style:italic}

.mc-strength{display:flex;align-items:center;gap:8px}
.mc-strength-label{font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(198,165,92,.4);flex-shrink:0}
.mc-strength-track{flex:1;height:3px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden}
.mc-strength-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--gold2),var(--gold3));transition:width 1s cubic-bezier(.4,0,.2,1)}
.mc-strength-pct{font-size:.65rem;color:var(--gold2);flex-shrink:0;font-family:'Playfair Display',serif}

/* Unlock banner */
.unlock-banner{width:100%;max-width:860px;background:linear-gradient(135deg,rgba(0,63,37,.25) 0%,rgba(198,165,92,.06) 100%);border:1px solid rgba(198,165,92,.22);border-radius:16px;padding:22px 28px;display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap;margin-bottom:20px}
.unlock-left{display:flex;align-items:center;gap:14px}
.unlock-sparkle{font-size:1.8rem;flex-shrink:0}
.unlock-title{font-family:'Playfair Display',serif;font-size:1rem;margin-bottom:3px}
.unlock-sub{font-size:.74rem;color:rgba(240,235,210,.4);line-height:1.5}
.unlock-btn{background:var(--gold);color:var(--dark);border:none;padding:12px 24px;border-radius:var(--r);font-family:'Inter',sans-serif;font-size:.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;transition:var(--tr);white-space:nowrap;flex-shrink:0}
.unlock-btn:hover{background:var(--gold3);transform:translateY(-1px);box-shadow:0 4px 18px rgba(198,165,92,.25)}

/* Matches count header */
.matches-header{display:flex;align-items:center;justify-content:space-between;width:100%;max-width:860px;margin-bottom:16px;flex-wrap:wrap;gap:8px}
.matches-title{font-family:'Playfair Display',serif;font-size:1.1rem}
.matches-count{font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(198,165,92,.5)}
.matches-hint{font-size:.72rem;color:rgba(240,235,210,.25);display:flex;align-items:center;gap:5px}

/* ══════════════════════════════
   PROFILE STEP
══════════════════════════════ */
.prof-layout{width:100%;max-width:860px;display:grid;grid-template-columns:280px 1fr;gap:28px;align-items:start}
@media(max-width:680px){.prof-layout{grid-template-columns:1fr}}

/* Avatar upload */
.prof-avatar-wrap{display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;position:relative}
.prof-avatar{width:110px;height:110px;border-radius:50%;border:2px solid rgba(198,165,92,.3);overflow:hidden;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--green3),var(--green2));transition:var(--tr);position:relative}
.prof-avatar:hover{border-color:var(--gold)}
.prof-avatar img{width:100%;height:100%;object-fit:cover}
.prof-avatar-placeholder{font-family:'Playfair Display',serif;font-size:2.4rem;color:var(--gold);opacity:.7}
.prof-avatar-overlay{position:absolute;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;opacity:0;transition:var(--tr);border-radius:50%;font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(240,235,210,.8)}
.prof-avatar-wrap:hover .prof-avatar-overlay{opacity:1}
.prof-avatar-hint{font-size:.62rem;color:rgba(240,235,210,.25);letter-spacing:.06em}

/* Left sidebar card */
.prof-sidebar{background:rgba(255,255,255,.02);border:1px solid rgba(198,165,92,.1);border-radius:18px;padding:24px;display:flex;flex-direction:column;align-items:center;gap:16px}
.prof-name-big{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;color:var(--text);text-align:center}
.prof-tribe-badge{display:flex;align-items:center;gap:7px;background:rgba(0,63,37,.2);border:1px solid rgba(198,165,92,.18);border-radius:20px;padding:6px 14px;font-size:.78rem;cursor:pointer;transition:var(--tr);width:100%;justify-content:center}
.prof-tribe-badge:hover{background:rgba(0,63,37,.32);border-color:var(--gold)}
.prof-tribe-badge .ptb-val{color:var(--gold);font-weight:500}
.prof-tribe-badge .ptb-lbl{color:rgba(240,235,210,.38);font-size:.65rem}
.prof-empty-tribe{width:100%;border:1px dashed rgba(198,165,92,.18);border-radius:10px;padding:12px;text-align:center;font-size:.78rem;color:rgba(240,235,210,.28);cursor:pointer;transition:var(--tr);background:none;font-family:inherit}
.prof-empty-tribe:hover{border-color:rgba(198,165,92,.38);color:rgba(240,235,210,.55)}

/* Right content */
.prof-content{display:flex;flex-direction:column;gap:16px}
.prof-section{background:rgba(255,255,255,.025);border:1px solid rgba(198,165,92,.09);border-radius:14px;padding:18px}
.prof-section-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.prof-section-title{font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(198,165,92,.55)}
.prof-section-action{font-size:.72rem;color:var(--gold2);cursor:pointer;background:none;border:none;font-family:inherit;transition:var(--tr);padding:3px 8px;border-radius:6px}
.prof-section-action:hover{color:var(--gold);background:rgba(198,165,92,.08)}

/* Tree placeholder */
.prof-tree-ph{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:110px;gap:8px;border:1px dashed rgba(198,165,92,.13);border-radius:10px;cursor:pointer;transition:var(--tr)}
.prof-tree-ph:hover{border-color:rgba(198,165,92,.3);background:rgba(0,63,37,.08)}
.prof-tree-ph-icon{font-size:2rem;opacity:.3}
.prof-tree-ph-text{font-size:.78rem;color:rgba(240,235,210,.28)}
.prof-tree-ph-sub{font-size:.66rem;color:rgba(198,165,92,.35)}

/* Tree mini preview (when has ancestors) */
.prof-tree-mini{display:flex;flex-wrap:wrap;gap:6px;min-height:80px;align-items:center}
.ptm-node{background:rgba(0,63,37,.18);border:1px solid rgba(198,165,92,.18);border-radius:8px;padding:5px 10px;font-size:.74rem;font-family:'Playfair Display',serif;color:var(--text);position:relative}
.ptm-node.root-node{border-color:rgba(198,165,92,.45);color:var(--gold);background:rgba(0,63,37,.3)}
.ptm-node .ptm-gen{font-size:.52rem;color:rgba(198,165,92,.4);display:block;margin-bottom:1px;letter-spacing:.08em}

/* Ancestors mini list */
.anc-mini-list{display:flex;flex-direction:column;gap:7px}
.anc-mini-row{display:flex;align-items:center;gap:9px;padding:7px 10px;border-radius:8px;background:rgba(255,255,255,.02)}
.anc-mini-num{font-size:.65rem;color:var(--gold2);opacity:.6;width:16px;text-align:right;flex-shrink:0}
.anc-mini-gen{font-size:.67rem;color:var(--muted);width:100px;flex-shrink:0}
.anc-mini-val{font-size:.8rem;font-family:'Playfair Display',serif;color:var(--text)}
.anc-mini-empty{font-size:.75rem;color:rgba(240,235,210,.18);font-style:italic}

/* CTA row */
.prof-cta-row{display:flex;gap:10px;flex-wrap:wrap}

/* ══════════════════════════════
   SHEJIRE TREE COMPONENT
══════════════════════════════ */
.sj-tree{display:flex;flex-direction:column;align-items:center;padding:12px 0}
.sj-level{display:flex;flex-direction:column;align-items:center;opacity:0;transform:translateY(12px);animation:sj-appear .45s cubic-bezier(.4,0,.2,1) forwards}
@keyframes sj-appear{to{opacity:1;transform:translateY(0)}}

/* Node card */
.sj-node{position:relative;min-width:160px;max-width:200px;border-radius:12px;padding:12px 16px;text-align:center;cursor:default;transition:var(--tr)}
.sj-node.sj-user{background:linear-gradient(135deg,rgba(0,63,37,.55),rgba(0,48,26,.4));border:2px solid rgba(198,165,92,.55);box-shadow:0 0 20px rgba(0,63,37,.4)}
.sj-node.sj-user:hover{border-color:var(--gold)}
.sj-node.sj-ancestor{background:rgba(255,255,255,.04);border:1.5px solid rgba(198,165,92,.2)}
.sj-node.sj-ancestor:hover{background:rgba(0,63,37,.15);border-color:rgba(198,165,92,.38)}
.sj-node.sj-empty{background:rgba(255,255,255,.02);border:1.5px dashed rgba(198,165,92,.14);cursor:pointer}
.sj-node.sj-empty:hover{background:rgba(0,63,37,.1);border-color:rgba(198,165,92,.32)}

.sj-gen-label{font-size:.52rem;letter-spacing:.16em;text-transform:uppercase;margin-bottom:5px}
.sj-user .sj-gen-label{color:rgba(198,165,92,.65)}
.sj-ancestor .sj-gen-label{color:rgba(240,235,210,.28)}
.sj-empty .sj-gen-label{color:rgba(240,235,210,.2)}

.sj-name{font-family:'Playfair Display',serif;font-size:.95rem;font-weight:600;color:var(--text);line-height:1.25}
.sj-user .sj-name{color:var(--gold);font-size:1.05rem}
.sj-empty .sj-name{font-size:.8rem;color:rgba(240,235,210,.3);font-family:'Inter',sans-serif;font-weight:400;font-style:italic}

/* User glow pulse */
.sj-node.sj-user::after{content:'';position:absolute;inset:-4px;border-radius:15px;border:1px solid rgba(198,165,92,.18);animation:npulse 2.5s ease-in-out infinite;pointer-events:none}

/* Connector line */
.sj-connector{width:2px;height:28px;background:linear-gradient(180deg,rgba(198,165,92,.12),rgba(198,165,92,.35));flex-shrink:0}
.sj-connector.sj-conn-top{background:linear-gradient(180deg,rgba(198,165,92,.35),rgba(198,165,92,.12))}
`;



/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */
const TRIBES = [
  { id:"argyn",   name:"Арғын",    icon:"🏔", desc:"Один из крупнейших родов Среднего жуза", region:"Орталық Қазақстан", members:1240 },
  { id:"naiman",  name:"Найман",   icon:"🦅", desc:"Древний могущественный род Среднего жуза", region:"Шығыс Қазақстан", members:980 },
  { id:"kipchak", name:"Қыпшақ",   icon:"⚔️", desc:"Исторически значимый род Среднего жуза", region:"Солтүстік Қазақстан", members:870 },
  { id:"kerey",   name:"Керей",    icon:"🌿", desc:"Один из основателей Казахского ханства", region:"Шығыс Қазақстан", members:760 },
  { id:"kongrat", name:"Қоңырат",  icon:"🌊", desc:"Влиятельный род Старшего жуза", region:"Батыс Қазақстан", members:650 },
  { id:"uysun",   name:"Үйсін",    icon:"🌞", desc:"Древнейший род Старшего жуза", region:"Оңтүстік Қазақстан", members:920 },
  { id:"kerei2",  name:"Жалайыр",  icon:"🌺", desc:"Род Старшего жуза с богатой историей", region:"Жамбыл облысы", members:540 },
  { id:"alban",   name:"Албан",    icon:"🏕", desc:"Воинственный род Старшего жуза", region:"Алматы облысы", members:680 },
  { id:"tabyn",   name:"Табын",    icon:"🐎", desc:"Род Кіші жуза, известные коневоды", region:"Батыс Қазақстан", members:490 },
  { id:"adai",    name:"Адай",     icon:"🌊", desc:"Легендарный непокорный род Кіші жуза", region:"Маңғыстау", members:720 },
  { id:"shapyrashty", name:"Шапырашты", icon:"🌲", desc:"Древний род Старшего жуза", region:"Алматы облысы", members:410 },
  { id:"sieyt",   name:"Сіергелі", icon:"🏞", desc:"Род Старшего жуза близ Алматы", region:"Алматы облысы", members:380 },
];

const CITIES = [
  { id:"almaty",   name:"Алматы",       icon:"🏙", region:"Алматы",  pop:"2.1М", desc:"Южная столица Казахстана, культурный центр" },
  { id:"astana",   name:"Астана",        icon:"🏛", region:"Астана",  pop:"1.4М", desc:"Столица Казахстана, город будущего" },
  { id:"shymkent", name:"Шымкент",       icon:"🌺", region:"Оңтүстік", pop:"1.2М", desc:"Третий по величине город страны" },
  { id:"karaganda", name:"Қарағанды",    icon:"⛏", region:"Орталық", pop:"490К", desc:"Промышленное сердце Казахстана" },
  { id:"aktobe",   name:"Ақтөбе",        icon:"🌅", region:"Батыс",  pop:"380К", desc:"Нефтяная столица западного Казахстана" },
  { id:"taraz",    name:"Тараз",         icon:"🏺", region:"Жамбыл", pop:"320К", desc:"Один из древнейших городов Средней Азии" },
  { id:"pavlodar", name:"Павлодар",      icon:"🏭", region:"Солтүстік", pop:"310К", desc:"Промышленный центр севера" },
  { id:"ust-kamenogorsk", name:"Өскемен", icon:"🏔", region:"Шығыс", pop:"295К", desc:"Столица Восточного Казахстана" },
  { id:"semey",    name:"Семей",         icon:"📚", region:"Шығыс",  pop:"270К", desc:"Родина Абая, культурная столица востока" },
  { id:"atyrau",   name:"Атырау",        icon:"🛢", region:"Батыс",  pop:"265К", desc:"Нефтяная столица Казахстана" },
  { id:"kostanay", name:"Қостанай",      icon:"🌾", region:"Солтүстік", pop:"245К", desc:"Зерновая столица Казахстана" },
  { id:"kyzylorda", name:"Қызылорда",    icon:"🍉", region:"Оңтүстік", pop:"220К", desc:"Рисовая столица Казахстана" },
  { id:"oral",     name:"Орал",          icon:"🌿", region:"Батыс",  pop:"195К", desc:"Центр Западно-Казахстанской области" },
  { id:"petropavlovsk", name:"Петропавл", icon:"❄️", region:"Солтүстік", pop:"185К", desc:"Северный форпост Казахстана" },
  { id:"aktau",    name:"Ақтау",         icon:"🌊", region:"Маңғыстау", pop:"178К", desc:"Каспийский порт Казахстана" },
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

const GENS = ["Вы","Отец (Әке)","Дед (Ата)","Прадед (Баба)","Пра-прадед","Пра-пра-прадед","Пра-пра-пра-прадед"];

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
        <input className="modal-search" placeholder="Поиск…" value={q} onChange={e => setQ(e.target.value)} autoFocus/>
        <div className="modal-list">
          {filtered.map(item => (
            <div key={item.id}
              className={`modal-item${selected === item.id ? " sel" : ""}`}
              onClick={() => onSelect(item.id)}>
              <div className="modal-item-icon">{item.icon}</div>
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
      title={isEmpty ? "Нажмите чтобы добавить предка" : name}
    >
      {genLabel && <div className="sj-gen-label">{genLabel}</div>}
      <div className="sj-name">
        {isEmpty ? "+ Добавить" : name}
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
  "Отец", "Дед", "Прадед",
  "Пра-прадед", "Пра-пра-прадед",
  "Пра-пра-пра-прадед", "Пра-пра-пра-пра-прадед",
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
          name={userName || "Вы"}
          genLabel="Вы"
          isUser
          animDelay={levels.length * 80}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ONBOARDING FLOW
═══════════════════════════════════════════════════════════ */

/* Линейные шаги для прогресс-бара (profile — хаб, не линейный) */
const OB_STEPS       = ["intro","ask_name","profile","show_tree","show_matches"];
const OB_STEPS_LABEL = ["Знакомство","Ваше имя","Ваш профиль","Шежире","Связи рода"];

const OB_SPEECHES = {
  intro:         "Я — ABYZ. Я помогу тебе узнать историю твоего рода.",
  ask_name:      "Назови своё имя. Каждое имя — это нить, связывающая поколения.",
  profile:       "Это твоя история. Давай восстановим её вместе.",
  add_tribe:     "Каждый человек принадлежит к роду. Знание своего ру — это знание себя.",
  add_ancestors: "Твои предки — основа твоей истории. Даже одно имя — уже свет.",
  show_tree:     "Теперь я вижу очертания твоего рода... Он обретает форму.",
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
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
        <div className="ob-prog-label">Шаг {Math.max(1,idx+1)} из {OB_STEPS.length} · {OB_STEPS_LABEL[Math.max(0,idx)]}</div>
        <div className="ob-prog-track"><div className="ob-prog-fill" style={{width:`${pct}%`}}/></div>
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

/* Full onboarding component (replaces LandingPage) */
function OnboardingFlow({ onEnter }) {
  const [step,      setStep]      = useState("intro");
  const [exiting,   setExiting]   = useState(false);
  const [name,      setName]      = useState("");
  const [tribeId,   setTribeId]   = useState(null);
  const [ancestors, setAncestors] = useState(Array(7).fill(""));
  const [photo,     setPhoto]     = useState(null); // base64 or object URL
  const [prevStep,  setPrevStep]  = useState(null); // for returning to profile

  const ANC_GENS = ["Отец (Әке)","Дед (Ата)","Прадед (Баба)","Пра-прадед","Пра-пра-прадед","Пра-пра-пра-прадед","Пра-пра-пра-пра-прадед"];
  const fileRef = useRef(null);

  /* Animated step transition */
  const goTo = (nextStep) => {
    setExiting(true);
    setTimeout(() => { setStep(nextStep); setExiting(false); }, 300);
  };

  /* Go to sub-step, remembering to return to profile */
  const goToSub = (sub) => { setPrevStep("profile"); goTo(sub); };

  /* Return to hub */
  const goBack = () => {
    if (prevStep) { setPrevStep(null); goTo(prevStep); }
    else {
      const idx = OB_STEPS.indexOf(step);
      if (idx > 0) goTo(OB_STEPS[idx - 1]);
    }
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhoto(url);
  };

  const hasData  = tribeId || ancestors.some(Boolean);
  const tribe    = TRIBES.find(t => t.id === tribeId);
  const filledAnc = ancestors.filter(Boolean);

  /* ─── INTRO ─── */
  if (step === "intro") return (
    <div className="ob-wrap">
      <div className="lbg"/><div className="ornament"/>
      <ObProgress step={step}/>
      <div className={exiting ? "ob-fade-out" : "ob-fade"} style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
        <ElderCircle size={210}/>
        <ObSpeech text={OB_SPEECHES.intro} delay={500}/>
        <div className="ob-nav">
          <button className="bgold" style={{maxWidth:300,width:"100%"}} onClick={() => goTo("ask_name")}>
            Начать →
          </button>
        </div>
      </div>
    </div>
  );

  /* ─── ASK NAME ─── */
  if (step === "ask_name") return (
    <div className="ob-wrap">
      <div className="lbg"/><div className="ornament"/>
      <ObProgress step={step}/>
      <div className={exiting ? "ob-fade-out" : "ob-fade"} style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
        <ElderCircle size={160}/>
        <ObSpeech text={OB_SPEECHES.ask_name} delay={300}/>
        <div className="oform">
          <div className="flabel">Ваше имя</div>
          <input className="ninput" placeholder="Введите своё имя…" value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key==="Enter" && name.trim() && goTo("profile")}
            autoFocus/>
          <div className="ob-nav">
            <button className="ob-back" onClick={goBack}>← Назад</button>
            <button className="bgold" style={{flex:1}} disabled={!name.trim()}
              onClick={() => goTo("profile")}>
              Далее →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  /* ─── PROFILE HUB ─── */
  if (step === "profile") return (
    <div className="ob-wrap" style={{justifyContent:"flex-start",paddingTop:90}}>
      <div className="lbg"/><div className="ornament"/>
      <ObProgress step={step}/>
      <div className={exiting ? "ob-fade-out" : "ob-fade"} style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%",gap:20}}>

        {/* ABYZ mini speech */}
        <div style={{display:"flex",alignItems:"center",gap:16,width:"100%",maxWidth:860,marginBottom:4}}>
          <ElderCircle size={72}/>
          <div className="speech" style={{margin:0,flex:1}}>
            <div className="sbub" style={{padding:"12px 18px"}}>
              <div className="sname">Абыз</div>
              <div className="stext" style={{fontSize:".88rem"}}>{OB_SPEECHES.profile}</div>
            </div>
          </div>
        </div>

        {/* Profile layout */}
        <div className="prof-layout">

          {/* LEFT SIDEBAR */}
          <div className="prof-sidebar">
            {/* Avatar upload */}
            <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handlePhoto}/>
            <div className="prof-avatar-wrap" onClick={() => fileRef.current?.click()}>
              <div className="prof-avatar">
                {photo
                  ? <img src={photo} alt="avatar"/>
                  : <div className="prof-avatar-placeholder">{name?.[0]?.toUpperCase() || "?"}</div>
                }
                <div className="prof-avatar-overlay">Изменить</div>
              </div>
              <div className="prof-avatar-hint">Нажмите чтобы загрузить фото</div>
            </div>

            {/* Name */}
            <div className="prof-name-big">{name || "Путник"}</div>

            {/* Tribe badge or add button */}
            {tribe ? (
              <div className="prof-tribe-badge" onClick={() => goToSub("add_tribe")}>
                <span style={{fontSize:"1.1rem"}}>{tribe.icon}</span>
                <div>
                  <div className="ptb-lbl">Род</div>
                  <div className="ptb-val">{tribe.name}</div>
                </div>
                <span style={{color:"rgba(198,165,92,.4)",fontSize:".75rem",marginLeft:"auto"}}>›</span>
              </div>
            ) : (
              <button className="prof-empty-tribe" onClick={() => goToSub("add_tribe")}>
                🏔 Добавить род
              </button>
            )}

            {/* Stats */}
            <div style={{width:"100%",borderTop:"1px solid rgba(198,165,92,.08)",paddingTop:14,display:"flex",justifyContent:"space-around"}}>
              <div style={{textAlign:"center"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",color:"var(--gold)"}}>{filledAnc.length}</div>
                <div style={{fontSize:".6rem",letterSpacing:".1em",textTransform:"uppercase",color:"rgba(240,235,210,.28)",marginTop:2}}>Предков</div>
              </div>
              <div style={{textAlign:"center"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",color:"var(--gold)"}}>{tribe?1:0}</div>
                <div style={{fontSize:".6rem",letterSpacing:".1em",textTransform:"uppercase",color:"rgba(240,235,210,.28)",marginTop:2}}>Ру</div>
              </div>
              <div style={{textAlign:"center"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",color:"var(--gold)"}}>{hasData?filledAnc.length+1:0}</div>
                <div style={{fontSize:".6rem",letterSpacing:".1em",textTransform:"uppercase",color:"rgba(240,235,210,.28)",marginTop:2}}>Уровней</div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="prof-content">

            {/* Tree section */}
            <div className="prof-section">
              <div className="prof-section-head">
                <div className="prof-section-title">🌳 Шежире</div>
                {hasData && (
                  <button className="prof-section-action" onClick={() => goTo("show_tree")}>
                    Открыть полное →
                  </button>
                )}
              </div>
              {hasData ? (
                <ShejireTree
                  userName={name}
                  ancestors={ancestors}
                  onAddAnc={() => goToSub("add_ancestors")}
                  compact
                />
              ) : (
                <div className="prof-tree-ph" onClick={() => goToSub("add_ancestors")}>
                  <div className="prof-tree-ph-icon">🌱</div>
                  <div className="prof-tree-ph-text">Шежире пока пустое</div>
                  <div className="prof-tree-ph-sub">Добавьте предков или род, чтобы начать</div>
                </div>
              )}
            </div>

            {/* Ancestors section */}
            <div className="prof-section">
              <div className="prof-section-head">
                <div className="prof-section-title">👤 Предки (7 ата)</div>
                <button className="prof-section-action" onClick={() => goToSub("add_ancestors")}>
                  {filledAnc.length > 0 ? "Редактировать" : "Добавить"} →
                </button>
              </div>
              {filledAnc.length > 0 ? (
                <div className="anc-mini-list">
                  {ancestors.map((a, i) => (
                    <div key={i} className="anc-mini-row">
                      <span className="anc-mini-num">{i+1}</span>
                      <span className="anc-mini-gen">{ANC_GENS[i]}</span>
                      {a
                        ? <span className="anc-mini-val">{a}</span>
                        : <span className="anc-mini-empty">не указан</span>
                      }
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{fontSize:".78rem",color:"rgba(240,235,210,.22)",fontStyle:"italic",padding:"8px 0"}}>
                  Предки не добавлены
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="prof-cta-row">
              {hasData ? (
                <>
                  <button className="bgold" style={{flex:1}} onClick={() => goTo("show_tree")}>
                    🌳 Смотреть шежире →
                  </button>
                  <button className="boutline" onClick={() => goTo("show_matches")}>
                    Найти связи
                  </button>
                </>
              ) : (
                <>
                  <button className="bgold" style={{flex:1}} onClick={() => goToSub("add_tribe")}>
                    🏔 Добавить род
                  </button>
                  <button className="boutline" style={{flex:1}} onClick={() => goToSub("add_ancestors")}>
                    👤 Добавить предков
                  </button>
                </>
              )}
            </div>

            <div style={{textAlign:"center"}}>
              <button style={{background:"none",border:"none",fontSize:".75rem",color:"rgba(240,235,210,.25)",cursor:"pointer",fontFamily:"inherit"}}
                onClick={() => onEnter(name.trim()||"Путник", { tribeId, ancestors })}>
                Пропустить и войти →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ─── ADD TRIBE (sub-step, returns to profile) ─── */
  if (step === "add_tribe") return (
    <div className="ob-wrap">
      <div className="lbg"/><div className="ornament"/>
      <ObProgress step="profile"/>
      <div className={exiting ? "ob-fade-out" : "ob-fade"} style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
        <ElderCircle size={110}/>
        <ObSpeech text={OB_SPEECHES.add_tribe} delay={250}/>
        <div className="tribe-grid-ob">
          {TRIBES.map(t => (
            <button key={t.id} className={`tribe-btn${tribeId===t.id?" sel":""}`} onClick={() => setTribeId(t.id)}>
              <span className="tb-icon">{t.icon}</span>
              <div>
                <div className="tb-name">{t.name}</div>
                <div className="tb-reg">{t.region}</div>
              </div>
            </button>
          ))}
        </div>
        <button className="tribe-unknown" onClick={() => { setTribeId(null); goTo("profile"); }}>
          Не знаю своего рода
        </button>
        <div className="ob-nav">
          <button className="ob-back" onClick={goBack}>← Назад</button>
          <button className="bgold" style={{flex:1}} onClick={() => goTo("profile")}>
            {tribeId ? "Сохранить →" : "Пропустить →"}
          </button>
        </div>
      </div>
    </div>
  );

  /* ─── ADD ANCESTORS (sub-step, returns to profile) ─── */
  if (step === "add_ancestors") return (
    <div className="ob-wrap">
      <div className="lbg"/><div className="ornament"/>
      <ObProgress step="profile"/>
      <div className={exiting ? "ob-fade-out" : "ob-fade"} style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
        <ElderCircle size={110}/>
        <ObSpeech text={OB_SPEECHES.add_ancestors} delay={250}/>
        <div className="anc-list">
          {ANC_GENS.map((gen, i) => (
            <div className="anc-row" key={i}>
              <span className="anc-num">{i+1}</span>
              <span className="anc-gen">{gen}</span>
              <input
                className={`anc-inp${ancestors[i] ? " filled" : ""}`}
                placeholder="Имя предка…"
                value={ancestors[i]}
                onChange={e => { const a=[...ancestors]; a[i]=e.target.value; setAncestors(a); }}
              />
            </div>
          ))}
        </div>
        <div className="ob-nav">
          <button className="ob-back" onClick={goBack}>← Назад</button>
          <button className="bgold" style={{flex:1}} onClick={() => goTo("profile")}>
            Сохранить →
          </button>
        </div>
      </div>
    </div>
  );

  /* ─── SHOW TREE ─── */
  if (step === "show_tree") {
    const topAncestor = ancestors.filter(Boolean).pop() || null;
    return (
      <div className="ob-wrap" style={{justifyContent:"flex-start",paddingTop:100}}>
        <div className="lbg"/><div className="ornament"/>
        <ObProgress step={step}/>
        <div className={exiting ? "ob-fade-out" : "ob-fade"} style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
          <ElderCircle size={110}/>
          <ObSpeech text={OB_SPEECHES.show_tree} delay={200}/>
          <div className="tree-reveal" style={{width:"100%",maxWidth:520,margin:"0 auto 24px",background:"rgba(0,48,26,.1)",border:"1px solid rgba(198,165,92,.14)",borderRadius:18,padding:"24px 16px",display:"flex",flexDirection:"column",alignItems:"center",gap:0}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",color:"var(--gold)",marginBottom:4,letterSpacing:"-.01em"}}>
              🌳 Шежире · {name}
            </div>
            {tribe && (
              <div className="abadge" style={{marginBottom:12}}>{tribe.icon} Род: <strong>{tribe.name}</strong></div>
            )}
            <ShejireTree
              userName={name}
              ancestors={ancestors}
              onAddAnc={() => goTo("profile")}
            />
          </div>
          <div className="ob-nav">
            <button className="ob-back" onClick={() => goTo("profile")}>← Профиль</button>
            <button className="bgold" style={{flex:1,maxWidth:280}} onClick={() => goTo("show_matches")}>
              Найти связи →
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── SHOW MATCHES ─── */
  if (step === "show_matches") {
    const matches = tribeId
      ? [...MOCK_MATCHES].sort((a,b) => (b.tribeId===tribeId?1:0)-(a.tribeId===tribeId?1:0))
      : MOCK_MATCHES;
    const visibleCount = matches.filter(m => !m.blurred).length;
    const lockedCount  = matches.filter(m => m.blurred).length;

    return (
      <div className="ob-wrap" style={{justifyContent:"flex-start",paddingTop:110}}>
        <div className="lbg"/><div className="ornament"/>
        <ObProgress step={step}/>
        <div className={exiting ? "ob-fade-out" : "ob-fade"} style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%",gap:0}}>
          <ElderCircle size={100}/>
          <ObSpeech text={OB_SPEECHES.show_matches} delay={200}/>

          <div className="unlock-banner">
            <div className="unlock-left">
              <div className="unlock-sparkle">✨</div>
              <div>
                <div className="unlock-title">Открыть полную информацию</div>
                <div className="unlock-sub">{lockedCount} связи скрыты · Узнай имена, эпохи и прямые линии рода</div>
              </div>
            </div>
            <button className="unlock-btn" onClick={() => alert("Доступно в полной версии ABYZ!")}>
              🔓 Открыть доступ
            </button>
          </div>

          <div className="matches-header">
            <div>
              <div className="matches-title">Связи твоего рода</div>
              {tribe && <div className="matches-hint">🏔 По роду {tribe.name} · {tribe.region}</div>}
            </div>
            <div className="matches-count">{visibleCount} открыто · {lockedCount} скрыто</div>
          </div>

          <div className="matches-grid">
            {matches.map((m, i) => (
              <div key={m.id} className={`match-card${m.blurred?" blurred":""}`}
                style={{animationDelay:`${i*0.07}s`}}
                onClick={() => !m.blurred && alert(`${m.name}\n\n${m.detail}`)}>
                {m.blurred && (
                  <div className="mc-lock">
                    <div className="mc-lock-icon">🔒</div>
                    <div className="mc-lock-text">Закрытая запись</div>
                  </div>
                )}
                <div className="mc-body">
                  <div className="mc-head">
                    <div className="mc-icon">{m.icon}</div>
                    <div>
                      <div className="mc-name">{m.name}</div>
                      <div className="mc-era">{m.era}</div>
                    </div>
                  </div>
                  <div className="mc-type-badge"><span>⟡</span>{m.connectionType}</div>
                  <div className="mc-relation">{m.relation}</div>
                  <div className="mc-detail">{m.detail}</div>
                  <div className="mc-strength">
                    <span className="mc-strength-label">Совпадение</span>
                    <div className="mc-strength-track">
                      <div className="mc-strength-fill" style={{width:`${m.blurred?0:m.connectionStrength}%`}}/>
                    </div>
                    <span className="mc-strength-pct">{m.connectionStrength}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="ob-nav" style={{marginTop:8}}>
            <button className="ob-back" onClick={() => goTo("show_tree")}>← Назад</button>
            <button className="bgold" style={{flex:1,maxWidth:280}}
              onClick={() => onEnter(name.trim()||"Путник", { tribeId, ancestors })}>
              Войти в ABYZ →
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
   PERSONAL PAGE
═══════════════════════════════════════════════════════════ */
function PersonalPage({ userName, profile, setProfile, setPage }) {
  const [showTribeModal, setShowTribeModal] = useState(false);
  const [showCityModal, setShowCityModal]   = useState(false);

  const tribe = TRIBES.find(t => t.id === profile.tribeId);
  const city  = CITIES.find(c => c.id === profile.cityId);

  return (
    <div className="shell pe">
      <div className="pper">
        {/* LEFT */}
        <div className="ptext">
          <div className="eyebrow">Личная страница</div>
          <h1>Сәлем,<br/><span>{userName}</span></h1>

          {/* PROFILE CHIPS */}
          <div className="profile-chips">
            <div className="chip" onClick={() => setShowTribeModal(true)}>
              <span className="chip-icon">🏔</span>
              <div>
                <div className="chip-lbl">Род / Ру</div>
                {tribe
                  ? <div className="chip-val">{tribe.name}</div>
                  : <div className="chip-empty">Выбрать род</div>
                }
              </div>
              <span className="chip-arrow">›</span>
            </div>
            <div className="chip" onClick={() => setShowCityModal(true)}>
              <span className="chip-icon">🏙</span>
              <div>
                <div className="chip-lbl">Город рождения</div>
                {city
                  ? <div className="chip-val">{city.name}</div>
                  : <div className="chip-empty">Выбрать город</div>
                }
              </div>
              <span className="chip-arrow">›</span>
            </div>
          </div>

          {/* COMMUNITY LINKS */}
          {(tribe || city) && (
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
              {tribe && (
                <button className="bsmall" onClick={() => setPage({id:"community", data:{type:"tribe", itemId:tribe.id}})}>
                  {tribe.icon} Страница рода {tribe.name} →
                </button>
              )}
              {city && (
                <button className="bsmall" onClick={() => setPage({id:"community", data:{type:"city", itemId:city.id}})}>
                  {city.icon} Страница {city.name} →
                </button>
              )}
            </div>
          )}

          <p className="pdesc">Исследуйте базу исторических личностей, постройте шежире до 7 поколений и откройте связи вашего рода с историей.</p>

          <div className="qactions">
            <button className="bgold" onClick={() => setPage({id:"my-tree"})}>🌳 Моё шежире</button>
            <button className="boutline" onClick={() => setPage({id:"list"})}>📜 Исторические личности</button>
            <button className="bghost" onClick={() => setPage({id:"clans"})}>🏔 Все рода</button>
          </div>

          <div className="stats-row" style={{marginTop:24}}>
            <div className="scard"><div className="snum">20</div><div className="slbl">Личностей</div></div>
            <div className="scard"><div className="snum">12</div><div className="slbl">Родов</div></div>
            <div className="scard"><div className="snum">15</div><div className="slbl">Городов</div></div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="pside">
          <div className="elder-side">
            <div className="elder-glow"/>
            <div className="elder-ring"/>
            <div className="elder-ring2"/>
            <div className="elder-circle" style={{inset:18}}>
              <ElderSVG size={210}/>
            </div>
          </div>
          {tribe && (
            <div style={{background:"rgba(0,63,37,.12)",border:"1px solid rgba(198,165,92,.15)",borderRadius:14,padding:"14px 16px",textAlign:"center",width:"100%"}}>
              <div style={{fontSize:1.8+"rem",marginBottom:6}}>{tribe.icon}</div>
              <div style={{fontSize:".7rem",color:"var(--gold2)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:4}}>Ваш род</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",color:"var(--text)"}}>{tribe.name}</div>
              <div style={{fontSize:".72rem",color:"var(--muted)",marginTop:4}}>{tribe.members.toLocaleString()} участников</div>
            </div>
          )}
        </div>
      </div>

      {showTribeModal && (
        <SelectModal
          title="Выберите ваш род"
          subtitle="Ру — родовая принадлежность по отцовской линии"
          items={TRIBES}
          selected={profile.tribeId}
          onSelect={id => setProfile(p => ({...p, tribeId: id}))}
          onClose={() => setShowTribeModal(false)}
          renderItem={t => `${t.region} · ${t.members.toLocaleString()} уч.`}
        />
      )}
      {showCityModal && (
        <SelectModal
          title="Выберите город рождения"
          subtitle="Туған қала — ваш родной город"
          items={CITIES}
          selected={profile.cityId}
          onSelect={id => setProfile(p => ({...p, cityId: id}))}
          onClose={() => setShowCityModal(false)}
          renderItem={c => `${c.region} · ${c.pop}`}
        />
      )}
      <Footer/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CLANS LIST PAGE
═══════════════════════════════════════════════════════════ */
function ClansPage({ setPage }) {
  const [q, setQ] = useState("");
  const list = useMemo(() => TRIBES.filter(t => t.name.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <div className="shell pe">
      <div className="wrap">
        <div className="sh">
          <h2>Рода Казахстана</h2>
          <span className="sh-count">{list.length} родов</span>
        </div>
        <p className="sdesc">Казахские рода (ру) — основа шежире. Выберите род, чтобы увидеть историческую страницу и участников.</p>
        <div className="swrap">
          <span className="sicon">⌕</span>
          <input className="sinput" placeholder="Поиск рода…" value={q} onChange={e => setQ(e.target.value)}/>
        </div>
        <div className="tribes-grid">
          {list.map(t => (
            <div key={t.id} className="tribe-card" onClick={() => setPage({id:"community", data:{type:"tribe", itemId:t.id}})}>
              <div className="tribe-icon">{t.icon}</div>
              <div>
                <div className="tribe-name">{t.name}</div>
                <div className="tribe-sub">{t.desc}</div>
                <div className="tribe-count">👥 {t.members.toLocaleString()} участников · {t.region}</div>
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
   CITIES LIST PAGE
═══════════════════════════════════════════════════════════ */
function CitiesPage({ setPage }) {
  const [q, setQ] = useState("");
  const list = useMemo(() => CITIES.filter(c => c.name.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <div className="shell pe">
      <div className="wrap">
        <div className="sh">
          <h2>Города Казахстана</h2>
          <span className="sh-count">{list.length} городов</span>
        </div>
        <p className="sdesc">Выберите город, чтобы открыть его страницу — известные личности, история и участники сообщества.</p>
        <div className="swrap">
          <span className="sicon">⌕</span>
          <input className="sinput" placeholder="Поиск города…" value={q} onChange={e => setQ(e.target.value)}/>
        </div>
        <div className="tribes-grid">
          {list.map(c => (
            <div key={c.id} className="tribe-card" onClick={() => setPage({id:"community", data:{type:"city", itemId:c.id}})}>
              <div className="tribe-icon">{c.icon}</div>
              <div>
                <div className="tribe-name">{c.name}</div>
                <div className="tribe-sub">{c.desc}</div>
                <div className="tribe-count">👥 {c.pop} жителей · {c.region}</div>
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
          ← Назад к {type === "tribe" ? "родам" : "городам"}
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
            <div className="cstat"><div className="cstat-n">{type === "tribe" ? item.members?.toLocaleString() : item.pop}</div><div className="cstat-l">{type === "tribe" ? "Участников" : "Жителей"}</div></div>
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
                <h3>Исторические личности {type === "tribe" ? `рода ${item.name}` : `из ${item.name}`}</h3>
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
              <h3>Участники сообщества</h3>
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
          <button className="back" onClick={() => setPage({id:"list"})}>← Назад к списку</button>
          <div className="phero">
            <div className="pbigav">{person.name[0]}</div>
            <div>
              <div className="pbigname">{person.name}</div>
              <div className="pbigera">{person.era}</div>
              {tribe && (
                <div style={{marginTop:6,fontSize:".75rem",color:"var(--gold2)"}}>
                  {tribe.icon} <span style={{cursor:"pointer",textDecoration:"underline",textUnderlineOffset:3}}
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
                {tribe.icon} Страница рода {tribe.name}
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
        <div className="leg-item"><div className="leg-dot" style={{background:"rgba(198,165,92,.2)"}}/> Пусто — нажмите для редактирования</div>
        <div className="leg-item"><div style={{width:20,height:2,borderTop:"1.5px dashed rgba(198,165,92,.3)"}}/> Неизвестная связь</div>
      </div>
    </div>
  );
}

/* ── MY TREE PAGE wrapper ── */
function MyTreePage({ userName, initialData, setPage }) {
  const [localName, setLocalName] = useState("");
  const [treeRoot, setTreeRoot] = useState(null);

  if (!treeRoot && initialData?.ancestor) {
    return (
      <div className="shell pe">
        <div className="wrap">
          <div className="mtc">
            <h2>Ваше шежире</h2>
            <p>Верхний предок: <strong style={{color:"var(--gold)"}}>{initialData.ancestor}</strong>.<br/>Введите своё имя, чтобы начать.</p>
            <div style={{width:"100%",marginBottom:12}}>
              <div className="flabel" style={{textAlign:"left"}}>Ваше имя</div>
              <input className="ninput" placeholder="Введите имя…" value={localName}
                onChange={e => setLocalName(e.target.value)}
                onKeyDown={e => e.key==="Enter" && setTreeRoot({user:localName.trim()||userName, ancestor:initialData.ancestor})}/>
            </div>
            <button className="bgold" onClick={() => setTreeRoot({user:localName.trim()||userName, ancestor:initialData.ancestor})}>Построить дерево</button>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }

  if (treeRoot) {
    return (
      <div className="shell pe">
        <div className="wrap">
          <div className="tree-page">
            <div className="tree-header">
              <div className="tree-title">🌳 Шежире · {treeRoot.user}</div>
              <div style={{display:"flex",gap:8}}>
                <button className="bghost" onClick={() => setTreeRoot(null)}>← Изменить</button>
                <button className="boutline" onClick={() => setPage({id:"list"})}>Найти предка</button>
              </div>
            </div>
            {treeRoot.ancestor && (
              <div className="abadge">
                Исторический предок (7-е поколение): <strong>{treeRoot.ancestor}</strong>
              </div>
            )}
            <InteractiveTree rootName={treeRoot.user} ancestorName={treeRoot.ancestor}/>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }

  return (
    <div className="shell pe">
      <div className="wrap">
        <div className="mtc">
          <h2>Моё шежире</h2>
          <p>Постройте интерактивное родословное дерево до 7 поколений. Нажимайте на узлы, чтобы заполнить имена предков.</p>
          <div style={{width:"100%",marginBottom:12}}>
            <div className="flabel" style={{textAlign:"left"}}>Ваше имя</div>
            <input className="ninput" placeholder={userName} value={localName}
              onChange={e => setLocalName(e.target.value)}
              onKeyDown={e => e.key==="Enter" && setTreeRoot({user:localName.trim()||userName, ancestor:null})}/>
          </div>
          <button className="bgold" onClick={() => setTreeRoot({user:localName.trim()||userName, ancestor:null})}>
            Создать шежире
          </button>
          <div style={{marginTop:28,fontSize:".75rem",color:"rgba(240,235,210,.28)"}}>
            или{" "}
            <span style={{color:"var(--gold)",cursor:"pointer"}} onClick={() => setPage({id:"list"})}>
              найдите историческую личность
            </span>{" "}и начните дерево от неё
          </div>
        </div>
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
    if (obData?.tribeId) setProfile(p => ({ ...p, tribeId: obData.tribeId }));
    setPage({ id: "personal" });
  }, []);

  if (!userName) {
    return (<><style>{CSS}</style><LandingPage onEnter={handleEnter}/></>);
  }

  const render = () => {
    switch (page.id) {
      case "personal":  return <PersonalPage userName={userName} profile={profile} setProfile={setProfile} setPage={setPage}/>;
      case "list":      return <PersonListPage setPage={setPage}/>;
      case "person":    return <PersonPage person={page.data} setPage={setPage}/>;
      case "clans":     return <ClansPage setPage={setPage}/>;
      case "cities":    return <CitiesPage setPage={setPage}/>;
      case "community": return <CommunityPage data={page.data} setPage={setPage}/>;
      case "my-tree":   return <MyTreePage userName={userName} initialData={page.data} setPage={setPage}/>;
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
