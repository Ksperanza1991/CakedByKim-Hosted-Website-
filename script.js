const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('.site-nav');
menuButton.addEventListener('click',()=>{
  const open=navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded',String(open));
});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>navigation.classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();
