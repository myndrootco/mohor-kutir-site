(function(){
  document.documentElement.classList.add('js');

  // Solid nav on scroll — only for pages that open on a photo hero
  // (nav starts transparent). Pages that hardcode is-solid (interior
  // pages, with a plain hero-quiet) must stay solid at all times —
  // never strip that class on load.
  var nav = document.querySelector('.site-nav');
  var dynamicNav = nav && !nav.classList.contains('is-solid');
  function onScroll(){
    if(!nav || !dynamicNav) return;
    if(window.scrollY > 40){ nav.classList.add('is-solid'); }
    else { nav.classList.remove('is-solid'); }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.querySelector('.mobile-panel');
  if(toggle && panel){
    toggle.addEventListener('click', function(){
      var open = panel.classList.toggle('is-open');
      toggle.textContent = open ? '✕' : '☰';
      document.body.style.overflow = open ? 'hidden' : '';
    });
    panel.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        panel.classList.remove('is-open');
        toggle.textContent = '☰';
        document.body.style.overflow = '';
      });
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && reveals.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -60px 0px'});
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('is-visible'); });
  }
})();
