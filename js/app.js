// Main application orchestrator for Stack & Queue presentation
class PresentationApp {
  constructor() {
    this.slides = window.slidesData || [];
    this.currentIndex = 0;
    this.stageEl = document.getElementById('slide-stage');
    this.counterEl = document.getElementById('slide-counter');
    this.progressBarEl = document.getElementById('progress-bar');
    this.sectionPillEl = document.getElementById('current-section-pill');
    this.overviewModal = document.getElementById('overview-modal');
    this.notesModal = document.getElementById('notes-modal');
    this.notesBody = document.getElementById('notes-body');
    this.themeMenu = document.getElementById('theme-menu');
    this.isLaserPointerActive = false;
    this.laserDot = null;
    this.isHeaderHidden = localStorage.getItem('dsa_header_hidden') === 'true';
    this.currentTheme = localStorage.getItem('dsa_presentation_theme') || 'theme-cyber-indigo';
  }

  init() {
    // Apply saved theme
    this.setTheme(this.currentTheme);

    // Apply header hidden state
    if (this.isHeaderHidden) {
      document.body.classList.add('header-hidden');
      const fBtn = document.getElementById('footer-header-toggle-btn');
      if (fBtn) fBtn.classList.add('active');
    }

    // Check URL hash for direct slide link
    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide-')) {
      const num = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(num) && num >= 1 && num <= this.slides.length) {
        this.currentIndex = num - 1;
      }
    }

    this.renderSlide(this.currentIndex);
    this.bindEvents();
    this.buildOverviewGrid();
    this.initLaserPointer();
  }

  setTheme(themeName) {
    document.body.classList.remove('theme-cyber-indigo', 'theme-academic-light', 'theme-sunset-glow', 'theme-matrix-neon');
    document.body.classList.add(themeName);
    this.currentTheme = themeName;
    localStorage.setItem('dsa_presentation_theme', themeName);
    if (this.themeMenu) this.themeMenu.classList.remove('show');
  }

  toggleThemeMenu() {
    if (this.themeMenu) {
      this.themeMenu.classList.toggle('show');
    }
  }

  renderSlide(index) {
    if (index < 0 || index >= this.slides.length) return;
    this.currentIndex = index;
    const slide = this.slides[index];

    // Update section pill & header
    if (this.sectionPillEl) {
      this.sectionPillEl.innerText = slide.part;
    }

    // Render slide HTML
    const html = `
      <div class="slide active" id="slide-${slide.id}">
        <div class="slide-header">
          <div class="slide-tag">
            <span aria-hidden="true">●</span>
            <span>${slide.part}</span>
          </div>
          <h1 class="slide-title">${slide.title}</h1>
          <div class="slide-subtitle">${slide.subtitle}</div>
        </div>
        <div class="slide-body">
          ${slide.render()}
        </div>
      </div>
    `;

    this.stageEl.innerHTML = html;

    // Execute slide init function if provided
    if (typeof slide.init === 'function') {
      try {
        slide.init();
      } catch (err) {
        console.error(`Error initializing slide ${slide.id}:`, err);
      }
    }

    // Update controls
    this.updateControls();

    // Update URL hash without breaking browser history
    window.history.replaceState(null, null, `#slide-${slide.id}`);

    // Update speaker notes
    if (this.notesBody) {
      this.notesBody.innerHTML = `
        <h3 style="color: var(--stack-color); margin-bottom: 0.5rem;">Slide ${slide.id}: ${slide.title}</h3>
        <p style="font-size: 1.05rem; color: var(--text-primary); line-height: 1.6;">${slide.notes || 'No notes for this slide.'}</p>
      `;
    }
  }

  updateControls() {
    const total = this.slides.length;
    const current = this.currentIndex + 1;

    if (this.counterEl) {
      const paddedCurrent = String(current).padStart(2, '0');
      const paddedTotal = String(total).padStart(2, '0');
      this.counterEl.innerHTML = `SLIDE <b>${paddedCurrent}</b> / ${paddedTotal}`;
    }

    if (this.progressBarEl) {
      const pct = (current / total) * 100;
      this.progressBarEl.style.width = `${pct}%`;
    }

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    if (prevBtn) prevBtn.disabled = this.currentIndex === 0;
    if (nextBtn) nextBtn.disabled = this.currentIndex === total - 1;

    // Highlight active in overview grid if open
    document.querySelectorAll('.overview-thumb').forEach((thumb, i) => {
      thumb.classList.toggle('active', i === this.currentIndex);
    });
  }

  nextSlide() {
    if (this.currentIndex < this.slides.length - 1) {
      soundEngine.playSlide();
      this.renderSlide(this.currentIndex + 1);
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      soundEngine.playSlide();
      this.renderSlide(this.currentIndex - 1);
    }
  }

  goToSlide(slideNumber) {
    const targetIdx = slideNumber - 1;
    if (targetIdx >= 0 && targetIdx < this.slides.length) {
      soundEngine.playSlide();
      this.renderSlide(targetIdx);
      this.closeModals();
    }
  }

  bindEvents() {
    // Keyboard controls
    window.addEventListener('keydown', (e) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ': // Spacebar
        case 'PageDown':
          e.preventDefault();
          this.nextSlide();
          break;
        case 'ArrowLeft':
        case 'Backspace':
        case 'PageUp':
          e.preventDefault();
          this.prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          this.goToSlide(1);
          break;
        case 'End':
          e.preventDefault();
          this.goToSlide(this.slides.length);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          this.toggleFullscreen();
          break;
        case 'o':
        case 'O':
          e.preventDefault();
          this.toggleOverview();
          break;
        case 'Escape':
          e.preventDefault();
          this.closeModals();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          this.toggleNotes();
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          this.toggleAudio();
          break;
        case 'l':
        case 'L':
          e.preventDefault();
          this.toggleLaserPointer();
          break;
        case 'h':
        case 'H':
          e.preventDefault();
          this.toggleHeader();
          break;
      }
    });

    // Touch swipe support for tablets & mobile
    let touchStartX = 0;
    window.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 60) {
        if (diff < 0) this.nextSlide();
        else this.prevSlide();
      }
    }, { passive: true });

    // Close theme menu on outside click
    window.addEventListener('click', (e) => {
      if (this.themeMenu && !e.target.closest('.theme-selector-dropdown')) {
        this.themeMenu.classList.remove('show');
      }
    });
  }

  toggleHeader() {
    this.isHeaderHidden = !this.isHeaderHidden;
    document.body.classList.toggle('header-hidden', this.isHeaderHidden);
    localStorage.setItem('dsa_header_hidden', this.isHeaderHidden ? 'true' : 'false');
    soundEngine.playTone(this.isHeaderHidden ? 440 : 660);
    const fBtn = document.getElementById('footer-header-toggle-btn');
    if (fBtn) {
      fBtn.classList.toggle('active', this.isHeaderHidden);
      const label = fBtn.querySelector('.btn-label-text');
      if (label) label.innerText = this.isHeaderHidden ? 'Show Header (H)' : 'Header (H)';
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }

  toggleAudio() {
    const isMuted = soundEngine.toggleMute();
    const btn = document.getElementById('sound-toggle-btn');
    if (btn) {
      const label = btn.querySelector('.btn-label-text');
      if (label) label.innerText = isMuted ? 'Muted' : 'Sound';
      btn.classList.toggle('active', !isMuted);
    }
  }

  initLaserPointer() {
    this.laserDot = document.createElement('div');
    this.laserDot.id = 'classroom-laser-dot';
    this.laserDot.style.cssText = `
      position: fixed;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #ef4444;
      box-shadow: 0 0 16px 4px #ef4444, 0 0 4px #ffffff;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      display: none;
      transition: transform 0.05s ease-out;
    `;
    document.body.appendChild(this.laserDot);

    window.addEventListener('mousemove', (e) => {
      if (this.isLaserPointerActive && this.laserDot) {
        this.laserDot.style.left = `${e.clientX}px`;
        this.laserDot.style.top = `${e.clientY}px`;
      }
    });
  }

  toggleLaserPointer() {
    this.isLaserPointerActive = !this.isLaserPointerActive;
    if (this.laserDot) {
      this.laserDot.style.display = this.isLaserPointerActive ? 'block' : 'none';
    }
    const btn = document.getElementById('laser-toggle-btn');
    if (btn) {
      btn.classList.toggle('active', this.isLaserPointerActive);
    }
  }

  toggleOverview() {
    if (this.overviewModal) {
      const isOpen = this.overviewModal.classList.contains('open');
      if (isOpen) {
        this.overviewModal.classList.remove('open');
      } else {
        this.closeModals();
        this.overviewModal.classList.add('open');
      }
    }
  }

  openOverview() {
    if (this.overviewModal) {
      this.closeModals();
      this.overviewModal.classList.add('open');
    }
  }

  toggleNotes() {
    if (this.notesModal) {
      const isOpen = this.notesModal.classList.contains('open');
      if (isOpen) {
        this.notesModal.classList.remove('open');
      } else {
        this.closeModals();
        this.notesModal.classList.add('open');
      }
    }
  }

  closeModals() {
    if (this.overviewModal) this.overviewModal.classList.remove('open');
    if (this.notesModal) this.notesModal.classList.remove('open');
    if (this.themeMenu) this.themeMenu.classList.remove('show');
  }

  buildOverviewGrid() {
    const grid = document.getElementById('overview-grid');
    if (!grid) return;

    grid.innerHTML = this.slides.map((s, idx) => `
      <button class="overview-thumb ${idx === this.currentIndex ? 'active' : ''}" onclick="app.goToSlide(${s.id})" aria-label="Jump to Slide ${s.id}: ${s.title}">
        <span class="overview-thumb-num">SLIDE ${String(s.id).padStart(2, '0')}</span>
        <span class="overview-thumb-title">${s.title}</span>
        <span style="font-size: 0.72rem; color: var(--text-muted);">${s.part}</span>
      </button>
    `).join('');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new PresentationApp();
  app.init();
});
