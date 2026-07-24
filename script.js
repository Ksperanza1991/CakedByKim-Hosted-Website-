const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.site-nav');
menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>nav.classList.remove('open')));
document.querySelectorAll('.menu-tab').forEach(tab=>tab.addEventListener('click',()=>{
  document.querySelectorAll('.menu-tab').forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false');});
  document.querySelectorAll('.menu-panel').forEach(p=>p.classList.remove('active'));
  tab.classList.add('active');tab.setAttribute('aria-selected','true');
  document.getElementById(tab.dataset.target).classList.add('active');
}));
document.getElementById('year').textContent=new Date().getFullYear();
