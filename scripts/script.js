// Small interactive bits for the prototype
document.addEventListener('DOMContentLoaded', function(){
  // Set year in footers
  var y = new Date().getFullYear();
  ['year','year-2','year-3','year-4'].forEach(function(id){
    var el = document.getElementById(id); if(el) el.textContent = y;
  });

  // Navigation toggle (supports drawer + backdrop)
  var toggles = Array.from(document.querySelectorAll('.nav-toggle'));
  var navLists = Array.from(document.querySelectorAll('.nav-list'));

  // create backdrop if needed
  var backdrop = document.querySelector('.nav-backdrop');
  if(!backdrop){
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);
  }

  // initialize nav lists as hidden on mobile by default
  navLists.forEach(function(n){ if(!n.classList.contains('visible')) n.classList.add('hidden'); });

  toggles.forEach(function(btn){
    btn.addEventListener('click', function(){
      var target = document.getElementById(this.getAttribute('aria-controls')) || navLists[0];
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', (!expanded).toString());
      this.classList.toggle('open');
      if(target.classList.contains('visible')){
        target.classList.remove('visible'); target.classList.add('hidden'); backdrop.classList.remove('visible');
      } else {
        target.classList.remove('hidden'); target.classList.add('visible'); backdrop.classList.add('visible');
      }
    });
  });

  // clicking a nav link closes any open drawers (mobile behaviour)
  try{
    document.querySelectorAll('.nav-list a').forEach(function(link){
      link.addEventListener('click', function(){
        navLists.forEach(function(list){ if(list.classList.contains('visible')){ list.classList.remove('visible'); list.classList.add('hidden'); }});
        document.querySelectorAll('.nav-toggle.open').forEach(function(b){ b.classList.remove('open'); b.setAttribute('aria-expanded','false'); });
        backdrop.classList.remove('visible');
      });
    });
  }catch(e){}

  // backdrop click closes nav
  backdrop.addEventListener('click', function(){
    navLists.forEach(function(list){ if(list.classList.contains('visible')){ list.classList.remove('visible'); list.classList.add('hidden'); }});
    document.querySelectorAll('.nav-toggle.open').forEach(function(b){ b.classList.remove('open'); b.setAttribute('aria-expanded','false'); });
    backdrop.classList.remove('visible');
  });

  // Ensure nav visibility matches viewport (desktop shows nav)
  function ensureNavForViewport(){
    try{
      var isMobile = window.matchMedia && window.matchMedia('(max-width:800px)').matches;
      navLists.forEach(function(n){
        if(isMobile){ if(!n.classList.contains('visible')) n.classList.add('hidden'); }
        else { n.classList.remove('hidden'); n.classList.add('visible'); }
      });
    }catch(e){}
  }
  ensureNavForViewport();
  window.addEventListener('resize', ensureNavForViewport, {passive:true});

  // If user previously selected a preferred hero, clear it so the site uses the original by default
  try { sessionStorage.removeItem('preferredHero'); } catch(e) { /* ignore */ }

});

// Expose helper to change hero from other pages (if needed)
function setHeroBackground(path){
  sessionStorage.setItem('preferredHero', path);
  var h = document.querySelector('.hero');
  if(h) h.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.25)),url("'+path+'")';
}
window.setHeroBackground = setHeroBackground;
