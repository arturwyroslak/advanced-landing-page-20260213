// main.js - Interactivity for Advanced Landing Page
// Features: smooth scroll, basic form validation & simulated submission, modal success

document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').slice(1);
      var target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Simple email validation
  function validateEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
  }

  // Modal utilities
  function createModal() {
    var modal = document.createElement('div');
    modal.className = 'aw-modal';
    modal.innerHTML = '\n      <div class="aw-modal-backdrop" tabindex="-1"></div>\n      <div class="aw-modal-panel" role="dialog" aria-modal="true">\n        <button class="aw-modal-close" aria-label="Zamknij">✕</button>\n        <div class="aw-modal-content">\n          <h3>Dziękujemy za zapis!</h3>\n          <p>Wysłaliśmy potwierdzenie na Twój adres e-mail (symulacja).</p>\n        </div>\n      </div>';
    document.body.appendChild(modal);

    modal.querySelector('.aw-modal-close').addEventListener('click', function () {
      modal.remove();
    });
    modal.querySelector('.aw-modal-backdrop').addEventListener('click', function () {
      modal.remove();
    });
  }

  // Hook up forms
  document.querySelectorAll('.signup-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      if (!input) return;
      var email = input.value.trim();
      if (!validateEmail(email)) {
        input.classList.add('invalid');
        input.setAttribute('aria-invalid', 'true');
        // simple accessible live region fallback
        alert('Proszę podać poprawny adres e-mail');
        return;
      }
      // Simulate submission delay
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wysyłanie...';
      }
      setTimeout(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Zapisz się';
        }
        // Clear input
        input.value = '';
        createModal();
      }, 900);
    });
  });
});
