import fs from 'fs';
import {en, ar} from './content.mjs';
const t = k => { if(!(k in en)) throw new Error('missing '+k); if(!(k in ar)) throw new Error('missing ar '+k); return en[k]; };
const a = k => `data-i18n="${k}"`;
const T = (k, tag='span', cls='') => `<${tag}${cls?` class="${cls}"`:''} ${a(k)}>${t(k)}</${tag}>`;

const logo = `<svg class="logo-mark" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#ff6a2b"/><path d="M9 20.5c3.2 3 9.6 3.2 12.2-.4 2.2-3-.2-5.2-3.7-5.9-3.3-.7-5.3-1.7-4.3-3.6 1.1-2 5.2-2 7.8-.1" fill="none" stroke="#14110f" stroke-width="2.6" stroke-linecap="round"/></svg>`;
const BASE = 'https://sentora-studio.vercel.app';

const works = [
 {id:'clinicdesk',img:'clinicdesk-pro',demo:'https://clinicdesk-pro.vercel.app',code:'https://github.com/DrrNadaGamal/clinicdesk-pro',tags:['tag.custom','tag.bi'],cat:'apps',feat:1},
 {id:'supportdesk',img:'supportdesk',demo:'https://supportdesk-orpin-mu.vercel.app',code:'https://github.com/DrrNadaGamal/supportdesk',tags:['tag.custom','tag.bi'],cat:'apps',feat:1},
 {id:'contentpilot',img:'contentpilot',demo:'https://contentpilot-rho.vercel.app',code:'https://github.com/DrrNadaGamal/contentpilot',tags:['tag.custom','tag.bi'],cat:'apps',feat:1},
 {id:'invoiceflow',img:'invoiceflow',demo:'https://invoiceflow-lac-seven.vercel.app',code:'https://github.com/DrrNadaGamal/invoiceflow',tags:['tag.custom','tag.bi'],cat:'apps',feat:1},
 {id:'leadflow',img:'leadflow',demo:'https://leadflow-pi-two.vercel.app',code:'https://github.com/DrrNadaGamal/leadflow',tags:['tag.custom','tag.bi'],cat:'apps',feat:1},
 {id:'sofra',img:'sofra',demo:'https://sofra-restaurant-alpha.vercel.app',code:'https://github.com/DrrNadaGamal/sofra-restaurant-system',tags:['tag.custom','tag.bi'],cat:'apps',feat:1},
 {id:'northwind',img:'northwind',demo:'https://portfolio-nada-software-dev.vercel.app/demos/northwind/index.html',code:'https://github.com/DrrNadaGamal/ecommerce-admin-dashboard',tags:['tag.custom'],cat:'apps'},
 {id:'novalearn',img:'novalearn',demo:'https://portfolio-nada-software-dev.vercel.app/demos/novalearn/index.html',code:'https://github.com/DrrNadaGamal/novalearn-lms',tags:['tag.custom'],cat:'apps'},
 {id:'plugins',art:'plug',code:'https://github.com/DrrNadaGamal/ng-clinic-studio',tags:['tag.wp','tag.bi'],cat:'wp'},
 {id:'clinic',art:'clinic',progress:1,tags:['tag.wp','tag.bi'],cat:'wp'},
];
const card = w => `<article class="card work-card" data-cat="${w.cat}">
 <div class="shot">${w.img?`<img src="/assets/work/${w.img}.webp" alt="" width="1000" height="625">`:`<div class="art art-${w.art}" aria-hidden="true">${w.art==='plug'?'<span></span><span></span><span></span>':'<i></i><i></i><i></i><i></i>'}</div>`}
 ${w.progress?`<span class="badge warn" ${a('work.progress')}>${t('work.progress')}</span>`:(w.demo?`<span class="badge" ${a('work.demo')}>${t('work.demo')}</span>`:'')}</div>
 <div class="work-body"><h3>${t(`w.${w.id}.t`)==='x'?'':''}<span ${a(`w.${w.id}.t`)}>${t(`w.${w.id}.t`)}</span></h3>
 <p ${a(`w.${w.id}.d`)}>${t(`w.${w.id}.d`)}</p>
 <div class="tags">${w.tags.map(k=>`<span class="tag" ${a(k)}>${t(k)}</span>`).join('')}</div>
 <div class="links">${w.demo?`<a class="link" href="${w.demo}" target="_blank" rel="noopener"><span ${a('work.demo')}>${t('work.demo')}</span> ↗</a>`:''}${w.code?`<a class="link" href="${w.code}" target="_blank" rel="noopener"><span ${a('work.code')}>${t('work.code')}</span> ↗</a>`:''}</div></div></article>`;

const form = (id) => `<div class="intake mailcard" id="${id}"><h2 class="mt" ${a('mail.title')}>${t('mail.title')}</h2>
 <a class="btn btn-primary btn-lg" href="mailto:nadagamal8510@gmail.com?subject=Sentora%20Studio%20project%20idea" ${a('mail.btn')}>${t('mail.btn')}</a>
 <p class="note">nadagamal8510@gmail.com</p><p class="note" ${a('mail.note')}>${t('mail.note')}</p></div>`;

const pricing = (full=false) => {
 const plans = [
  {k:'p1',price:'$120'},{k:'p2',price:'$300',hot:1},{k:'p3',price:'$600'}];
 return `<div class="plans">${plans.map(p=>`<article class="card plan${p.hot?' hot':''}">
 ${p.hot?`<span class="badge hotb" ${a('p2.badge')}>${t('p2.badge')}</span>`:''}
 <h3 ${a(p.k+'.n')}>${t(p.k+'.n')}</h3>
 <p class="plan-d" ${a(p.k+'.d')}>${t(p.k+'.d')}</p>
 <p class="price"><small ${a('price.from')}>${t('price.from')}</small> <span dir="ltr">${p.price}</span></p>
 <ul>${[1,2,3,4].map(i=>`<li ${a(`${p.k}.f${i}`)}>${t(`${p.k}.f${i}`)}</li>`).join('')}</ul>
 <a class="btn ${p.hot?'btn-primary':'btn-ghost'}" href="/#start" ${a('price.cta')}>${t('price.cta')}</a></article>`).join('')}</div>
 <p class="muted center" ${a('price.note')}>${t('price.note')}</p>`;
};

const faq = `<div class="faq">${[1,2,3,4,5,6].map(i=>`<details><summary ${a(`faq.${i}.q`)}>${t(`faq.${i}.q`)}</summary><p ${a(`faq.${i}.a`)}>${t(`faq.${i}.a`)}</p></details>`).join('')}</div>`;

const nav = (cur) => `<header class="site-header"><div class="wrap nav">
 <a class="brand" href="/" aria-label="Sentora Studio">${logo}<span>Sentora<b>Studio</b></span></a>
 <nav class="menu" id="menu" aria-label="Main">${[['home','/'],['pricing','/pricing'],['work','/work'],['about','/about'],['contact','/contact']].map(([k,h])=>`<a href="${h}" ${cur===k?'aria-current="page"':''} ${a('nav.'+k)}>${t('nav.'+k)}</a>`).join('')}
 <a class="btn btn-primary menu-cta" href="/#start" ${a('nav.cta')}>${t('nav.cta')}</a></nav>
 <div class="nav-tools"><button class="lang" id="lang" type="button" aria-label="Language" ${a('lang.toggle')}>${t('lang.toggle')}</button>
 <button class="burger" id="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="menu"><span></span><span></span></button></div></div></header>`;

const footer = `<footer class="site-footer"><div class="wrap foot"><div><a class="brand" href="/">${logo}<span>Sentora<b>Studio</b></span></a><p class="muted" ${a('brand.tag')}>${t('brand.tag')}</p></div>
 <div class="foot-links"><a href="/pricing" ${a('nav.pricing')}>${t('nav.pricing')}</a><a href="/work" ${a('nav.work')}>${t('nav.work')}</a><a href="/about" ${a('nav.about')}>${t('nav.about')}</a><a href="/contact" ${a('nav.contact')}>${t('nav.contact')}</a></div>
 <div class="muted small"><p ${a('foot.rights')}>${t('foot.rights')}</p><p ${a('foot.demo')}>${t('foot.demo')}</p></div></div></footer>`;

const page = (cur, title, desc, body) => `<!doctype html>
<html lang="en" dir="ltr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><meta name="description" content="${desc}"><meta name="robots" content="noindex, nofollow">
<meta property="og:title" content="${title}"><meta property="og:description" content="${desc}"><meta property="og:type" content="website"><meta property="og:image" content="${BASE}/assets/og.png"><meta name="theme-color" content="#faf6ee">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css"></head><body data-page="${cur}">
<a class="skip" href="#main" ${a('skip')}>${t('skip')}</a>${nav(cur)}<main id="main">${body}</main>${footer}
<script src="/assets/i18n.js"></script><script src="/assets/app.js"></script></body></html>`;

const heroArt = `<div class="hero-art" aria-hidden="true">
 <div class="sheet s1"><div class="bar"><i></i><i></i><i></i></div><div class="ln w60"></div><div class="ln w90"></div><div class="blk"></div><div class="two"><div class="blk sm"></div><div class="blk sm"></div></div></div>
 <div class="sheet s2"><div class="bar"><i></i><i></i><i></i></div><div class="chartbars"><b style="height:40%"></b><b style="height:70%"></b><b style="height:55%"></b><b style="height:90%"></b><b style="height:65%"></b></div><div class="ln w60"></div></div>
 <div class="spark"><svg viewBox="0 0 64 64"><path d="M32 4l5 20 20 5-20 5-5 20-5-20-20-5 20-5z" fill="#ff6a2b"/></svg></div>
</div>`;

const pages = {};
pages['index.html'] = page('home','Sentora Studio | Describe your idea in one sentence. I build it.','Sentora Studio builds WordPress sites and custom web apps from a one-sentence idea. Fixed price per project, no subscription. English and Arabic.',`
<section class="hero"><div class="wrap hero-grid"><div class="hero-copy">
 ${T('hero.eyebrow','p','eyebrow')}
 <h1 ${a('hero.title')}>${t('hero.title')}</h1>
 <p class="lead" ${a('hero.sub')}>${t('hero.sub')}</p>
 <div id="start" class="intake-wrap">${form('intake')}</div>
 <ul class="chips">${[1,2,3,4].map(i=>`<li ${a('chips.'+i)}>${t('chips.'+i)}</li>`).join('')}</ul></div>${heroArt}</div></section>
<section class="section" id="how"><div class="wrap">${T('how.eyebrow','p','eyebrow')}<h2 ${a('how.title')}>${t('how.title')}</h2>
 <ol class="steps">${[1,2,3].map(i=>`<li class="card step"><span class="num">${i}</span><h3 ${a(`how.${i}.t`)}>${t(`how.${i}.t`)}</h3><p ${a(`how.${i}.d`)}>${t(`how.${i}.d`)}</p></li>`).join('')}</ol></div></section>
<section class="section alt" id="pricing"><div class="wrap">${T('price.eyebrow','p','eyebrow')}<h2 ${a('price.title')}>${t('price.title')}</h2><p class="sub" ${a('price.sub')}>${t('price.sub')}</p>${pricing()}</div></section>
<section class="section" id="work"><div class="wrap">${T('work.eyebrow','p','eyebrow')}<h2 ${a('work.title')}>${t('work.title')}</h2><p class="sub" ${a('work.sub')}>${t('work.sub')}</p>
 <div class="grid works">${works.filter(w=>w.feat).map(card).join('')}</div>
 <p class="center"><a class="btn btn-ghost" href="/work" ${a('work.more')}>${t('work.more')}</a></p><p class="muted center small" ${a('work.note')}>${t('work.note')}</p></div></section>
<section class="section alt" id="faq"><div class="wrap narrow">${T('faq.eyebrow','p','eyebrow')}<h2 ${a('faq.title')}>${t('faq.title')}</h2>${faq}</div></section>
<section class="cta"><div class="wrap center"><h2 ${a('cta.title')}>${t('cta.title')}</h2><p ${a('cta.sub')}>${t('cta.sub')}</p><a class="btn btn-primary btn-lg" href="#start" ${a('cta.btn')}>${t('cta.btn')}</a></div></section>`);

const head = (k) => `<section class="page-head"><div class="wrap"><h1 ${a(`page.${k}.title`)}>${t(`page.${k}.title`)}</h1><p class="lead" ${a(`page.${k}.sub`)}>${t(`page.${k}.sub`)}</p></div></section>`;
pages['pricing.html'] = page('pricing','Pricing | Sentora Studio','Pay per project with a fixed quote. Spark, Studio and Build plans for websites and web apps.',`${head('pricing')}
<section class="section tight"><div class="wrap">${pricing()}</div></section>
<section class="section alt"><div class="wrap narrow"><h2 ${a('price.faqT')}>${t('price.faqT')}</h2><ol class="paysteps">${[1,2,3].map(i=>`<li ${a('price.step'+i)}>${t('price.step'+i)}</li>`).join('')}</ol></div></section>
<section class="section"><div class="wrap narrow">${T('faq.eyebrow','p','eyebrow')}<h2 ${a('faq.title')}>${t('faq.title')}</h2>${faq}</div></section>
<section class="cta"><div class="wrap center"><h2 ${a('cta.title')}>${t('cta.title')}</h2><p ${a('cta.sub')}>${t('cta.sub')}</p><a class="btn btn-primary btn-lg" href="/#start" ${a('cta.btn')}>${t('cta.btn')}</a></div></section>`);

pages['work.html'] = page('work','Work | Sentora Studio','Live demo projects: clinic management, helpdesk, CRM, invoicing, restaurant system and WordPress plugins.',`${head('work')}
<section class="section tight"><div class="wrap"><div class="filters" role="group"><button class="chip on" data-f="all" ${a('work.all')}>${t('work.all')}</button><button class="chip" data-f="apps" ${a('work.apps')}>${t('work.apps')}</button><button class="chip" data-f="wp" ${a('work.wp')}>${t('work.wp')}</button></div>
<div class="grid works" id="works">${works.map(card).join('')}</div><p class="muted center small" ${a('work.note')}>${t('work.note')}</p></div></section>
<section class="cta"><div class="wrap center"><h2 ${a('cta.title')}>${t('cta.title')}</h2><p ${a('cta.sub')}>${t('cta.sub')}</p><a class="btn btn-primary btn-lg" href="/#start" ${a('cta.btn')}>${t('cta.btn')}</a></div></section>`);

pages['about.html'] = page('about','About | Sentora Studio','Sentora Studio is a one-person web studio run by Nada Gamal, building WordPress sites and custom web apps in English and Arabic.',`${head('about')}
<section class="section tight"><div class="wrap about-grid"><div class="prose"><p ${a('about.p1')}>${t('about.p1')}</p><p ${a('about.p2')}>${t('about.p2')}</p><p ${a('about.p3')}>${t('about.p3')}</p>
<p class="links-row"><b ${a('about.links')}>${t('about.links')}</b><a class="link" href="https://github.com/DrrNadaGamal" target="_blank" rel="noopener">GitHub ↗</a><a class="link" href="https://www.linkedin.com/in/nada-gamal-a078561b0" target="_blank" rel="noopener">LinkedIn ↗</a></p></div>
<div class="card values"><h3 ${a('about.v.t')}>${t('about.v.t')}</h3>${[1,2,3].map(i=>`<div class="val"><b ${a(`about.v${i}.t`)}>${t(`about.v${i}.t`)}</b><span ${a(`about.v${i}.d`)}>${t(`about.v${i}.d`)}</span></div>`).join('')}</div></div></section>
<section class="cta"><div class="wrap center"><h2 ${a('cta.title')}>${t('cta.title')}</h2><p ${a('cta.sub')}>${t('cta.sub')}</p><a class="btn btn-primary btn-lg" href="/#start" ${a('cta.btn')}>${t('cta.btn')}</a></div></section>`);

pages['contact.html'] = page('contact','Contact | Sentora Studio','Send your idea in one sentence to Sentora Studio and get a fixed quote.',`${head('contact')}
<section class="section tight"><div class="wrap contact-grid"><div class="intake-wrap">${form('intake2')}</div>
<aside class="card contact-card"><h3 ${a('contact.email')}>${t('contact.email')}</h3><p><a class="link" href="mailto:nadagamal8510@gmail.com">nadagamal8510@gmail.com</a></p>
<h3>GitHub</h3><p><a class="link" href="https://github.com/DrrNadaGamal" target="_blank" rel="noopener">github.com/DrrNadaGamal ↗</a></p>
<h3>LinkedIn</h3><p><a class="link" href="https://www.linkedin.com/in/nada-gamal-a078561b0" target="_blank" rel="noopener">Nada Gamal ↗</a></p><p class="muted small" ${a('contact.where')}>${t('contact.where')}</p></aside></div></section>`);

fs.mkdirSync('public/assets',{recursive:true});
for (const [f,h] of Object.entries(pages)) fs.writeFileSync('public/'+f,h);
fs.writeFileSync('public/assets/i18n.js','window.I18N='+JSON.stringify({en,ar})+';');
console.log('built',Object.keys(pages));
