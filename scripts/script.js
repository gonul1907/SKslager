// Small interactive bits for the prototype
document.addEventListener('DOMContentLoaded', function(){
  // Set year in footers
  var y = new Date().getFullYear();
  ['year','year-2','year-3','year-4'].forEach(function(id){
    var el = document.getElementById(id); if(el) el.textContent = y;
  });

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var navList = document.getElementById('nav-list');
  if(toggle && navList){
    toggle.addEventListener('click', function(){
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', (!expanded).toString());
      if(navList.style.display === 'block') navList.style.display = '';
      else navList.style.display = 'block';
    });
  }
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
