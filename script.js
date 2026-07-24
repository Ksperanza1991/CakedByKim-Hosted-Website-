const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.site-nav');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
document.querySelectorAll('.site-nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.querySelectorAll('.tab').forEach(tab=>tab.addEventListener('click',()=>{
 document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
 document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
 tab.classList.add('active');document.getElementById(tab.dataset.tab).classList.add('active');
}));
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(e=>obs.observe(e));
document.getElementById('year').textContent=new Date().getFullYear();
