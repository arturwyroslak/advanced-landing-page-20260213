// Main JS for Advanced Landing Page
// - IntersectionObserver for entry animations
// - Smooth scrolling for internal links
// - Simple form validation with fake submission
// - Sticky CTA behavior

(function(){
  'use strict';

  // helper: select
  const $ = (sel, ctx=document)=> (ctx || document).querySelector(sel);
  const $$ = (sel, ctx=document)=> Array.from((ctx || document).querySelectorAll(sel));

  // ENTRY ANIMATIONS
  function initEntryObserver(){
    const els = $$('.fade-in');
    if(!els.length || !('IntersectionObserver' in window)){
      els.forEach(e=>e.classList.add('visible'));
      return;
    }
    const ob = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      })
    },{threshold:0.12});
    els.forEach(e=>ob.observe(e));
  }

  // SMOOTH SCROLL
  function initSmoothScroll(){
    const links = $$('a[href^="#"]');
    links.forEach(link=>{
      link.addEventListener('click', e=>{
        const href = link.getAttribute('href');
        if(!href || href==="#") return;
        const target = document.querySelector(href);
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block:'start'});
          history.pushState(null,'',href);
        }
      })
    })
  }

  // FORM HANDLING
  function initForm(){
    const form = $('#signup-form');
    if(!form) return;
    const email = form.querySelector('input[type="email"]');
    const msg = $('#signup-msg');

    function validateEmail(v){
      return /\S+@\S+\.\S+/.test(v);
    }

    form.addEventListener('submit', e=>{
      e.preventDefault();
      if(!email) return;
      const val = email.value.trim();
      if(!validateEmail(val)){
        msg.textContent = 'Proszę podać poprawny adres email.';
        msg.style.color = '#ffb4b4';
        email.focus();
        return;
      }
      // simulate submission
      msg.textContent = 'Wysyłam...';
      msg.style.color = '#94a3b8';
      setTimeout(()=>{
        msg.textContent = 'Dziękujemy! Sprawdź swoją skrzynkę — wysłaliśmy potwierdzenie.';
        msg.style.color = 'lightgreen';
        form.reset();
      },1000);
    })
  }

  // STICKY CTA on scroll for mobile
  function initStickyCTA(){
    const cta = document.querySelector('.cta-bar');
    if(!cta) return;
    let lastScroll = window.scrollY;
    window.addEventListener('scroll', ()=>{
      const cur = window.scrollY;
      if(cur > 120 && cur > lastScroll){
        // scrolling down -> hide
        cta.style.transform = 'translateY(110%)';
      } else {
        cta.style.transform = 'translateY(0)';
      }
      lastScroll = cur;
    })
  }

  // INIT
  document.addEventListener('DOMContentLoaded', ()=>{
    initEntryObserver();
    initSmoothScroll();
    initForm();
    initStickyCTA();
  });

})();
