(function(){
 var D=window.I18N, root=document.documentElement, lang='en';
 try{var q=new URLSearchParams(location.search).get('lang');lang=(q==='ar'||q==='en')?q:(localStorage.getItem('sentora-lang')||'en')}catch(e){}
 function apply(l){
  lang=l; var d=D[l];
  root.lang=l; root.dir=l==='ar'?'rtl':'ltr';
  document.querySelectorAll('[data-i18n]').forEach(function(n){var v=d[n.dataset.i18n]; if(v!=null) n.innerHTML=v;});
  document.querySelectorAll('[data-i18n-ph]').forEach(function(n){var v=d[n.dataset.i18nPh]; if(v!=null) n.placeholder=v;});
  try{localStorage.setItem('sentora-lang',l)}catch(e){}
  var m=document.querySelectorAll('.msg.err'); m.forEach(function(x){x.className='msg';x.innerHTML=''});
 }
 apply(lang);
 document.getElementById('lang').addEventListener('click',function(){apply(lang==='en'?'ar':'en')});
 var b=document.getElementById('burger'), menu=document.getElementById('menu');
 b.addEventListener('click',function(){var o=menu.classList.toggle('open');b.setAttribute('aria-expanded',o)});
 menu.addEventListener('click',function(e){if(e.target.tagName==='A'){menu.classList.remove('open');b.setAttribute('aria-expanded',false)}});
 // filters
 document.querySelectorAll('.chip').forEach(function(c){c.addEventListener('click',function(){
  document.querySelectorAll('.chip').forEach(function(x){x.classList.toggle('on',x===c)});
  var f=c.dataset.f; document.querySelectorAll('#works .work-card').forEach(function(w){w.style.display=(f==='all'||w.dataset.cat===f)?'':'none'});
 })});
 // forms
 document.querySelectorAll('form.intake').forEach(function(f){
  f.addEventListener('submit',function(e){
   e.preventDefault();
   var msg=f.querySelector('.msg'), d=D[lang];
   var idea=f.idea.value.trim(), contact=f.contact.value.trim(), name=f.name.value.trim();
   function err(k){msg.className='msg err';msg.innerHTML=d[k]}
   if(idea.length<10) return err('form.short');
   if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) && contact.replace(/\D/g,'').length<7) return err('form.badContact');
   f.setAttribute('aria-busy','true'); msg.className='msg'; msg.textContent=d['form.sending'];
   fetch('/api/intake',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({idea:idea,name:name,contact:contact,website:f.website.value,lang:lang,page:location.pathname})})
   .then(function(r){if(!r.ok) throw new Error(r.status); return r.json()})
   .then(function(){msg.className='msg ok';msg.innerHTML='<strong>'+d['form.okTitle']+'</strong>'+d['form.okBody'];f.reset()})
   .catch(function(){err('form.err')})
   .finally(function(){f.removeAttribute('aria-busy')});
  });
 });
 // reveal
 if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll('.step,.plan,.work-card,.faq details').forEach(function(n){n.classList.add('reveal');io.observe(n)});}
})();
