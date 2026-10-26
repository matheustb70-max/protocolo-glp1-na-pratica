document.documentElement.classList.add('js-enabled');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}})},{threshold:.06,rootMargin:'0px 0px 25px 0px'});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}

document.querySelectorAll('[data-accordion-group]').forEach(group=>{
 const setItem=(item,open)=>{const trigger=item.querySelector('.accordion-trigger');const panel=item.querySelector('.accordion-panel');item.classList.toggle('open',open);trigger.setAttribute('aria-expanded',String(open));panel.setAttribute('aria-hidden',String(!open));panel.inert=!open;};
 group.querySelectorAll('.accordion-trigger').forEach(trigger=>trigger.addEventListener('click',()=>{const item=trigger.closest('.accordion-item');const opening=trigger.getAttribute('aria-expanded')!=='true';group.querySelectorAll('.accordion-item.open').forEach(other=>{if(other!==item)setItem(other,false);});setItem(item,opening);}));
});

const track=document.querySelector('.testimonial-track');
const prev=document.querySelector('.carousel-prev');
const next=document.querySelector('.carousel-next');
const position=document.querySelector('.carousel-position');
const bar=document.querySelector('.carousel-line>span');
const cards=[...track.children];
const step=()=>cards[0].getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap);
function updateCarousel(){if(!track.clientWidth||!cards[0].getBoundingClientRect().width)return;const index=Math.min(cards.length-1,Math.max(0,Math.round(track.scrollLeft/step())));const visible=Math.max(1,Math.round((track.clientWidth+parseFloat(getComputedStyle(track).gap))/step()));const end=Math.min(cards.length,index+visible);prev.disabled=track.scrollLeft<2;next.disabled=track.scrollLeft>=track.scrollWidth-track.clientWidth-3;position.textContent=visible>1?`${String(index+1).padStart(2,'0')}–${String(end).padStart(2,'0')} / 07`:`${String(index+1).padStart(2,'0')} / 07`;bar.style.width=`${(end/7)*100}%`;}
function moveCarousel(direction){track.scrollBy({left:step()*direction,behavior:reduced.matches?'instant':'smooth'});}
prev.addEventListener('click',()=>moveCarousel(-1));next.addEventListener('click',()=>moveCarousel(1));
track.addEventListener('scroll',updateCarousel,{passive:true});
track.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();moveCarousel(e.key==='ArrowRight'?1:-1);}if(e.key==='Home'){e.preventDefault();track.scrollTo({left:0,behavior:reduced.matches?'instant':'smooth'});}if(e.key==='End'){e.preventDefault();track.scrollTo({left:track.scrollWidth,behavior:reduced.matches?'instant':'smooth'});}});
window.addEventListener('resize',updateCarousel,{passive:true});updateCarousel();
if('ResizeObserver' in window)new ResizeObserver(updateCarousel).observe(track);
