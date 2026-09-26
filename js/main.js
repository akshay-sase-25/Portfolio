// Single Dot Cursor (No Outer Circle)
const cur = document.getElementById('cur');
if (cur) {
  window.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px';
    cur.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .btn-solid, .btn-out, .sub-btn, .tab, .stb, .menu-btn, .proj-link, .tag, .skill-card, .edu-card, .cert-card, .proj-card, .java-pill').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cur-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover'));
  });
}

// Navigation & Scroll to Top
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  const stb = document.getElementById('stb');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
  if (stb) stb.classList.toggle('show', window.scrollY > 300);
});

// Mobile Menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Smooth Scrolling for In-Page Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const targetId = a.getAttribute('href');
    if (targetId && targetId !== '#') {
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Skills Category Tabs
function switchTab(btn, id) {
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('on'));
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('on'));
  btn.classList.add('on');
  const targetPanel = document.getElementById(id);
  if (targetPanel) {
    targetPanel.classList.add('on');
  }
}
window.switchTab = switchTab;

// Scroll Reveal Animations
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('vis');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Animated Number Counters
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const text = el.textContent;
      const num = parseFloat(text);
      if (!isNaN(num) && !el.dataset.counted) {
        el.dataset.counted = '1';
        let start = 0, dur = 1500, step = 16;
        const inc = num / (dur / step);
        const timer = setInterval(() => {
          start += inc;
          if (start >= num) {
            start = num;
            clearInterval(timer);
          }
          el.textContent = (Number.isInteger(num) ? Math.floor(start) : start.toFixed(0)) + 
            (text.includes('+') ? '+' : text.includes('%') ? '%' : '');
        }, step);
      }
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => countObs.observe(el));

// Contact Form Submission Handler
function handleForm(e) {
  e.preventDefault();
  const btn = document.getElementById('subBtn');
  if (btn) {
    btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
    btn.style.background = 'linear-gradient(135deg, #15803d, #16a34a)';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.style.background = '';
      e.target.reset();
    }, 3000);
  }
}
window.handleForm = handleForm;
