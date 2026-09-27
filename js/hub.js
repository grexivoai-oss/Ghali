/**
 * The Birthday Gift Hub for My Ghali
 * Interactive Multi-Stage Romantic Experience
 */

(function () {
  'use strict';

  // --- CONFIGURATION & ASSETS ---
  const HUB_CONFIG = {
    // 21 pictures from "new pictures" for ambient bubbles
    bubblePhotos: [
      "new pictures/50.jpeg", "new pictures/51.jpeg", "new pictures/52.jpeg",
      "new pictures/53.jpeg", "new pictures/54.jpeg", "new pictures/55.jpeg",
      "new pictures/56.jpeg", "new pictures/57.jpeg", "new pictures/58.jpeg",
      "new pictures/59.jpeg", "new pictures/60.jpeg", "new pictures/61.jpeg",
      "new pictures/62.jpeg", "new pictures/63.jpeg", "new pictures/64.jpeg",
      "new pictures/65.jpeg", "new pictures/66.jpeg", "new pictures/67.jpeg",
      "new pictures/68.jpeg", "new pictures/69.jpeg", "new pictures/70.jpeg",
    ],

    // Video surprise
    surpriseVideo: "new pictures/kitni ghali hai tu.mp4",

    // Family Wishes Videos
    familyVideos: [],

    // Background soundtrack
    songs: [
      { title: "Can't Help Falling in Love", artist: "Elvis Presley", src: "songs/cant-help-falling-in-love.mp3" },
      { title: "her", artist: "JVKE", src: "songs/jvke-her.mp3" },
      { title: "First Born Daughter", artist: "Max McNown", src: "songs/first-born-daughter.mp3" },
    ],

    // Passwords & Hints
    gate: {
      hint: "Vo din jis din tu mera se 3 din tak sharmayi thi or ap ap kar ka baat ki thi 😂",
      validPasswords: ["april18", "18april", "18-04", "18/04", "1804", "april 18", "18 april"],
    },
    gift1: {
      password: "110902",
      hint: "We both have this password on our phone 📱🔐",
    },
    gift2: {
      password: "mirhaal",
      hint: "mini ghali 👶🍼",
    },
  };

  // --- STATE ---
  const state = {
    currentStage: 'stage-gate',
    currentSongIndex: 0,
    isMusicPlaying: false,
    activeGiftModal: null, // 'gift1' or 'gift2'
    hasOpenedGift1: sessionStorage.getItem('ghali_gift1_opened') === 'true',
  };

  // --- DOM ELEMENTS ---
  const el = {
    // Audio
    bgMusic: document.getElementById('hub-bg-music'),
    musicTitle: document.getElementById('hub-music-title'),
    musicArtist: document.getElementById('hub-music-artist'),
    musicBtnPlaypause: document.getElementById('hub-music-playpause'),
    musicBtnNext: document.getElementById('hub-music-next'),
    musicPlayIcon: document.getElementById('hub-music-play-icon'),
    musicPauseIcon: document.getElementById('hub-music-pause-icon'),

    // Stages
    stageGate: document.getElementById('stage-gate'),
    stageWelcome: document.getElementById('stage-welcome'),
    stageVideo: document.getElementById('stage-video'),
    stageGifts: document.getElementById('stage-gifts'),
    stageFinale: document.getElementById('stage-finale'),

    // Gate Form
    gateForm: document.getElementById('gate-form'),
    gatePasswordInput: document.getElementById('gate-password-input'),
    gateCardWrapper: document.getElementById('gate-card-wrapper'),
    gateErrorMsg: document.getElementById('gate-error-msg'),

    // Welcome Stage
    btnSomethingForYou: document.getElementById('btn-something-for-you'),

    // Confirmation Modal
    modalConfirm: document.getElementById('modal-confirm'),
    btnConfirmYes: document.getElementById('btn-confirm-yes'),
    btnConfirmNo: document.getElementById('btn-confirm-no'),
    confirmDialogTitle: document.getElementById('confirm-dialog-title'),
    confirmDialogMsg: document.getElementById('confirm-dialog-msg'),
    confirmDialogEmoji: document.getElementById('confirm-dialog-emoji'),

    // Celebration Pop-up
    modalCelebrate: document.getElementById('modal-celebrate'),
    btnCelebrateProceed: document.getElementById('btn-celebrate-proceed'),

    // Surprise Video Stage
    surpriseVideoElem: document.getElementById('surprise-video-elem'),
    btnProceedGifts: document.getElementById('btn-proceed-gifts'),

    // Gifts Portal
    btnOpenGift1: document.getElementById('btn-open-gift-1'),
    btnOpenGift2: document.getElementById('btn-open-gift-2'),
    gift2RibbonTag: document.getElementById('gift2-ribbon-tag'),
    gift2IconWrap: document.getElementById('gift2-icon-wrap'),

    // Gift 2 Locked Warning Modal
    modalGift2Locked: document.getElementById('modal-gift2-locked'),
    btnGift2LockedOk: document.getElementById('btn-gift2-locked-ok'),

    // Gift Password Modal
    modalGiftPassword: document.getElementById('modal-gift-password'),
    giftPasswordTitle: document.getElementById('gift-pwd-title'),
    giftPasswordHint: document.getElementById('gift-pwd-hint'),
    giftPasswordInput: document.getElementById('gift-pwd-input'),
    giftPasswordForm: document.getElementById('gift-pwd-form'),
    giftPasswordError: document.getElementById('gift-pwd-error'),
    btnCloseGiftModal: document.getElementById('btn-close-gift-modal'),

    // Love Letter Modal
    modalLoveLetter: document.getElementById('modal-love-letter'),
    btnCloseLetter: document.getElementById('btn-close-letter'),
    btnLetterProceedGift2: document.getElementById('btn-letter-proceed-gift2'),
    btnLetterProceedFinale: document.getElementById('btn-letter-proceed-finale'),
    familyVideosGrid: document.getElementById('family-videos-grid'),

    // Final Chapter Stage Elements
    btnOpenFinale: document.getElementById('btn-open-finale'),
    btnFinaleBack: document.getElementById('btn-finale-back'),
    btnNowGetReady: document.getElementById('btn-now-get-ready'),
    sectionDateInvite: document.getElementById('section-date-invite'),
    dateInviteActions: document.getElementById('date-invite-actions'),
    btnDateYes: document.getElementById('btn-date-yes'),
    btnDateNo: document.getElementById('btn-date-no'),
    modalDateNo: document.getElementById('modal-date-no'),
    btnDateModalYes: document.getElementById('btn-date-modal-yes'),
    dateBookedCard: document.getElementById('date-booked-card'),
    btnImReady: document.getElementById('btn-im-ready'),
    surprisesRevealContainer: document.getElementById('surprises-reveal-container'),
    btnToFinalScreen: document.getElementById('btn-to-final-screen'),
    finalScreenCurtain: document.getElementById('final-screen-curtain'),
    btnCurtainRestart: document.getElementById('btn-curtain-restart'),

    // Floating Bubbles Container
    bubblesContainer: document.getElementById('photo-bubbles-container'),
  };

  // ========================================================================
  // STAGE ROUTING
  // ========================================================================
  function showStage(stageId) {
    [el.stageGate, el.stageWelcome, el.stageVideo, el.stageGifts, el.stageFinale].forEach((stage) => {
      if (stage) stage.classList.remove('active');
    });

    const target = document.getElementById(stageId);
    if (target) {
      target.classList.add('active');
      state.currentStage = stageId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // User requirement: Starting page (stage-gate) should NOT show bubbles!
    if (el.bubblesContainer) {
      if (stageId === 'stage-gate') {
        el.bubblesContainer.style.display = 'none';
      } else {
        el.bubblesContainer.style.display = 'block';
      }
    }
  }

  // ========================================================================
  // BACKGROUND MUSIC
  // ========================================================================
  function initMusic() {
    loadSong(state.currentSongIndex, false);

    el.bgMusic.addEventListener('ended', () => {
      state.currentSongIndex = (state.currentSongIndex + 1) % HUB_CONFIG.songs.length;
      loadSong(state.currentSongIndex, true);
    });

    el.musicBtnPlaypause.addEventListener('click', toggleMusic);
    el.musicBtnNext.addEventListener('click', nextSong);

    // Autoplay on first click anywhere
    const startAudioOnce = () => {
      if (!state.isMusicPlaying) startMusic();
      window.removeEventListener('click', startAudioOnce);
      window.removeEventListener('keydown', startAudioOnce);
      window.removeEventListener('touchstart', startAudioOnce);
    };
    window.addEventListener('click', startAudioOnce, { once: true });
    window.addEventListener('keydown', startAudioOnce, { once: true });
    window.addEventListener('touchstart', startAudioOnce, { once: true });
  }

  function loadSong(index, autoPlay = true) {
    const song = HUB_CONFIG.songs[index];
    if (!song) return;
    el.bgMusic.src = song.src;
    el.musicTitle.textContent = song.title;
    el.musicArtist.textContent = song.artist;
    el.bgMusic.volume = 0.55;

    if (autoPlay) {
      startMusic();
    }
  }

  function startMusic() {
    el.bgMusic.play().then(() => {
      state.isMusicPlaying = true;
      el.musicPlayIcon.style.display = 'none';
      el.musicPauseIcon.style.display = 'block';
    }).catch(() => {});
  }

  function pauseMusic() {
    el.bgMusic.pause();
    state.isMusicPlaying = false;
    el.musicPlayIcon.style.display = 'block';
    el.musicPauseIcon.style.display = 'none';
  }

  function toggleMusic() {
    if (state.isMusicPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  }

  function nextSong() {
    state.currentSongIndex = (state.currentSongIndex + 1) % HUB_CONFIG.songs.length;
    loadSong(state.currentSongIndex, true);
  }

  // ========================================================================
  // FLOATING PHOTO BUBBLES GENERATOR
  // ========================================================================
  function initPhotoBubbles() {
    if (!el.bubblesContainer) return;

    let photoIndex = 0;

    function spawnBubble() {
      const bubble = document.createElement('div');
      bubble.className = 'photo-bubble';

      const photoSrc = HUB_CONFIG.bubblePhotos[photoIndex % HUB_CONFIG.bubblePhotos.length];
      photoIndex++;

      const size = Math.floor(Math.random() * 60) + 60; // 60px to 120px
      const leftPos = Math.floor(Math.random() * 90) + 3; // 3% to 93%
      const duration = (Math.random() * 6 + 11).toFixed(1); // 11s to 17s

      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${leftPos}%`;
      bubble.style.animationDuration = `${duration}s`;

      bubble.innerHTML = `<img src="${photoSrc}" alt="Memory" loading="lazy">`;

      bubble.addEventListener('click', () => {
        burstConfetti(leftPos / 100, 0.6);
      });

      el.bubblesContainer.appendChild(bubble);

      // Clean up after animation finishes
      setTimeout(() => {
        if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
      }, duration * 1000 + 500);
    }

    // Spawn generous first wave (more bubbles!)
    for (let i = 0; i < 16; i++) {
      setTimeout(spawnBubble, i * 200);
    }

    // Continuously spawn bubbles frequently (every 850ms, with bonus twins)
    setInterval(() => {
      spawnBubble();
      if (Math.random() > 0.5) {
        setTimeout(spawnBubble, 250);
      }
    }, 850);
  }

  // ========================================================================
  // CONFETTI EFFECT
  // ========================================================================
  function burstConfetti(x = 0.5, y = 0.5) {
    const colors = ['#E11D48', '#BE123C', '#F43F5E', '#D4AF37', '#FB7185', '#FFF1F3'];
    for (let i = 0; i < 45; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.left = `${x * 100}vw`;
      particle.style.top = `${y * 100}vh`;
      particle.style.width = `${Math.random() * 8 + 6}px`;
      particle.style.height = `${Math.random() * 8 + 6}px`;
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      particle.style.zIndex = '9999';
      particle.style.pointerEvents = 'none';

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 180 + 80;
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity - 60;

      particle.style.transition = 'all 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)';
      document.body.appendChild(particle);

      requestAnimationFrame(() => {
        particle.style.transform = `translate(${destX}px, ${destY}px) rotate(${Math.random() * 360}deg) scale(0)`;
        particle.style.opacity = '0';
      });

      setTimeout(() => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
      }, 1000);
    }
  }

  // ========================================================================
  // STAGE 1: ENTRANCE GATE VALIDATION
  // ========================================================================
  function initGate() {
    el.gateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputVal = el.gatePasswordInput.value.trim().toLowerCase().replace(/[\s\-_/]/g, '');

      // Check valid passwords: april18, 18april, 1804, etc.
      const isValid = HUB_CONFIG.gate.validPasswords.some((pwd) => {
        return inputVal.includes(pwd.replace(/[\s\-_/]/g, ''));
      });

      if (isValid) {
        // Success!
        burstConfetti(0.5, 0.5);
        startMusic();
        el.gateErrorMsg.style.display = 'none';

        el.gateCardWrapper.style.transform = 'scale(0.96)';
        el.gateCardWrapper.style.opacity = '0';
        el.gateCardWrapper.style.transition = 'all 0.5s ease';

        setTimeout(() => {
          showStage('stage-welcome');
          burstConfetti(0.5, 0.3);
        }, 550);
      } else {
        // Shaking Error
        el.gateErrorMsg.textContent = "Galat password meri jaan! Read the hint carefully 😉❤️";
        el.gateErrorMsg.style.display = 'block';
        el.gateCardWrapper.classList.add('shake-anim');
        setTimeout(() => el.gateCardWrapper.classList.remove('shake-anim'), 500);
        el.gatePasswordInput.focus();
      }
    });
  }

  // ========================================================================
  // STAGE 2: BIRTHDAY WELCOME & "SOMETHING FOR YOU"
  // ========================================================================
  function initWelcome() {
    el.btnSomethingForYou.addEventListener('click', () => {
      // Open "Are you sure?" modal
      resetConfirmDialog();
      el.modalConfirm.classList.add('open');
    });
  }

  // ========================================================================
  // STAGE 3: PLAYFUL CONFIRMATION FLOW & SURPRISE VIDEO
  // ========================================================================
  let noClickCount = 0;

  function resetConfirmDialog() {
    noClickCount = 0;
    el.confirmDialogEmoji.textContent = "🥺";
    el.confirmDialogTitle.textContent = "Are you sure?";
    el.confirmDialogMsg.textContent = "You are about to unlock a very special surprise prepared just for my Ghali...";
    el.btnConfirmNo.textContent = "No";
    el.btnConfirmNo.style.display = 'inline-block';
  }

  function initConfirmDialog() {
    // If she clicks NO:
    el.btnConfirmNo.addEventListener('click', () => {
      noClickCount++;
      burstConfetti(0.5, 0.4);

      // Funny dialog demanded by user:
      el.confirmDialogEmoji.textContent = "😤❤️";
      el.confirmDialogTitle.textContent = "Batameez!";
      el.confirmDialogMsg.textContent = "tujha kia lagta no ab option hai? Tu ab Sirf or Sirf meri hai chup chap Yes kar Batameez 😤❤️";

      // Shake dialog
      el.modalConfirm.querySelector('.hub-dialog-card').classList.add('shake-anim');
      setTimeout(() => {
        el.modalConfirm.querySelector('.hub-dialog-card').classList.remove('shake-anim');
      }, 500);

      // Make "No" button disappear or transform
      el.btnConfirmNo.textContent = "Yes Meri Jaan ❤️";
      el.btnConfirmNo.className = "hub-btn-yes";
      el.btnConfirmNo.onclick = handleYesConfirmed;
    });

    // If she clicks YES:
    el.btnConfirmYes.addEventListener('click', handleYesConfirmed);

    function handleYesConfirmed() {
      el.modalConfirm.classList.remove('open');

      // Pop "ALLAHH JAAANNNNN MUAAHHHHHH" celebration!
      burstConfetti(0.5, 0.5);
      el.modalCelebrate.classList.add('open');
    }

    // From celebration pop-up to video stage:
    el.btnCelebrateProceed.addEventListener('click', () => {
      el.modalCelebrate.classList.remove('open');
      showStage('stage-video');

      // Play "kitni ghali hai tu.mp4"
      pauseMusic(); // pause bg music so video sound is clear
      el.surpriseVideoElem.src = HUB_CONFIG.surpriseVideo;
      el.surpriseVideoElem.play().catch(() => {});
    });

    // When video ends or she clicks "Proceed to Your Gifts":
    el.surpriseVideoElem.addEventListener('ended', () => {
      startMusic();
    });

    el.btnProceedGifts.addEventListener('click', () => {
      el.surpriseVideoElem.pause();
      startMusic();
      showStage('stage-gifts');
      burstConfetti(0.5, 0.3);
    });
  }

  // ========================================================================
  // STAGE 4: THE 2 GIFTS PORTAL & PASSWORDS
  // ========================================================================
  function initGifts() {
    updateGift2LockUI();

    // Gift 1: Love Letter
    el.btnOpenGift1.addEventListener('click', () => {
      openGiftPasswordModal('gift1');
    });

    // Gift 2: Locked until Gift 1 has been opened!
    el.btnOpenGift2.addEventListener('click', () => {
      if (!state.hasOpenedGift1) {
        // User requested: "ok gift 2 should be locked and when she presses it it should say bohot uchalti hai tu meri choti gundi gift 1 dekh phela phir aa 2 per"
        el.modalGift2Locked.classList.add('open');
        const card = el.modalGift2Locked.querySelector('.hub-dialog-card');
        if (card) {
          card.classList.add('shake-anim');
          setTimeout(() => card.classList.remove('shake-anim'), 500);
        }
        return;
      }
      openGiftPasswordModal('gift2');
    });

    // Dismiss Gift 2 locked modal and direct her to open Gift 1
    if (el.btnGift2LockedOk) {
      el.btnGift2LockedOk.addEventListener('click', () => {
        el.modalGift2Locked.classList.remove('open');
        openGiftPasswordModal('gift1');
      });
    }

    // Close gift password modal
    el.btnCloseGiftModal.addEventListener('click', () => {
      el.modalGiftPassword.classList.remove('open');
    });

    // Gift Password Form Submit
    el.giftPasswordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const entered = el.giftPasswordInput.value.trim().toLowerCase();

      if (state.activeGiftModal === 'gift1') {
        // Password: 110902
        if (entered === HUB_CONFIG.gift1.password) {
          burstConfetti(0.5, 0.5);
          el.modalGiftPassword.classList.remove('open');
          openLoveLetter();
        } else {
          showGiftPasswordError("Wrong password! Check hint: " + HUB_CONFIG.gift1.hint);
        }
      } else if (state.activeGiftModal === 'gift2') {
        // Password: mirhaal
        if (entered === HUB_CONFIG.gift2.password) {
          burstConfetti(0.5, 0.5);
          el.modalGiftPassword.classList.remove('open');
          // Launch Netflix platform!
          window.location.href = "netflix.html";
        } else {
          showGiftPasswordError("Wrong password! Check hint: " + HUB_CONFIG.gift2.hint);
        }
      }
    });

    // Love Letter Modal
    el.btnCloseLetter.addEventListener('click', () => {
      el.modalLoveLetter.classList.remove('open');
      document.body.style.overflow = '';
    });

    el.btnLetterProceedGift2.addEventListener('click', () => {
      el.modalLoveLetter.classList.remove('open');
      document.body.style.overflow = '';
      openGiftPasswordModal('gift2');
    });
  }

  function updateGift2LockUI() {
    if (!el.gift2RibbonTag || !el.gift2IconWrap) return;
    if (state.hasOpenedGift1) {
      el.gift2RibbonTag.textContent = 'GIFT 2 🎁';
      el.gift2RibbonTag.style.background = 'var(--rose-light)';
      el.gift2RibbonTag.style.color = 'var(--primary-rose)';
      el.gift2IconWrap.textContent = '🎁';
    } else {
      el.gift2RibbonTag.textContent = 'LOCKED 🔒';
      el.gift2RibbonTag.style.background = '#F3F4F6';
      el.gift2RibbonTag.style.color = '#6B7280';
      el.gift2IconWrap.textContent = '🔒';
    }
  }

  function openGiftPasswordModal(giftType) {
    state.activeGiftModal = giftType;
    el.giftPasswordInput.value = '';
    el.giftPasswordError.style.display = 'none';

    // User requested: "dont tell her what in this gift just show gifts on both and say open gift and when pressed should say Unlock gift only with hint"
    el.giftPasswordTitle.textContent = "Unlock Gift";
    if (giftType === 'gift1') {
      el.giftPasswordHint.textContent = HUB_CONFIG.gift1.hint;
    } else {
      el.giftPasswordHint.textContent = HUB_CONFIG.gift2.hint;
    }

    el.modalGiftPassword.classList.add('open');
    setTimeout(() => el.giftPasswordInput.focus(), 150);
  }

  function showGiftPasswordError(msg) {
    el.giftPasswordError.textContent = msg;
    el.giftPasswordError.style.display = 'block';
    const card = el.modalGiftPassword.querySelector('.hub-dialog-card');
    card.classList.add('shake-anim');
    setTimeout(() => card.classList.remove('shake-anim'), 500);
  }

  function openLoveLetter() {
    burstConfetti(0.5, 0.4);
    // Gift 1 is now officially opened -> unlocks Gift 2!
    state.hasOpenedGift1 = true;
    sessionStorage.setItem('ghali_gift1_opened', 'true');
    updateGift2LockUI();

    el.modalLoveLetter.classList.add('open');
    // Ensure modal and body start from the very top
    el.modalLoveLetter.scrollTop = 0;
    window.scrollTo(0, 0);
    renderFamilyVideos();
    document.body.style.overflow = 'hidden';
  }

  function renderFamilyVideos() {
    if (!el.familyVideosGrid) return;
    el.familyVideosGrid.innerHTML = '';
    if (HUB_CONFIG.familyVideos && HUB_CONFIG.familyVideos.length > 0) {
      HUB_CONFIG.familyVideos.forEach((v, idx) => {
        const card = document.createElement('div');
        card.className = 'family-video-card';
        card.innerHTML = `
          <video controls playsinline preload="metadata">
            <source src="${v.src}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <div class="family-video-name">${v.title || `Family Message ${idx + 1}`}</div>
        `;
        el.familyVideosGrid.appendChild(card);
      });
    } else {
      const emptyNote = document.createElement('div');
      emptyNote.style.cssText = 'grid-column:1/-1; background:rgba(255,255,255,0.75); border-radius:12px; padding:18px; color:#BE123C; font-weight:600; font-size:0.92rem;';
      emptyNote.innerHTML = '✨ Family birthday video messages will appear here once added ✨';
      el.familyVideosGrid.appendChild(emptyNote);
    }
  }

  // ========================================================================
  // FINAL CHAPTER: "ONE LAST THING, GHALI..." (MULTI-PAGE BOOKLET)
  // ========================================================================
  function initFinale() {
    let currentSlide = 1;
    const totalSlides = 5;

    function goToSlide(slideNum) {
      if (slideNum < 1 || slideNum > totalSlides) return;
      currentSlide = slideNum;

      for (let i = 1; i <= totalSlides; i++) {
        const slide = document.getElementById('finale-slide-' + i);
        if (slide) {
          if (i === currentSlide) {
            slide.classList.add('active');
          } else {
            slide.classList.remove('active');
          }
        }
      }

      // Update step dots & counter
      const dots = document.querySelectorAll('.finale-steps-indicator .step-dot');
      dots.forEach((dot, idx) => {
        if (idx + 1 === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });

      const counter = document.getElementById('finale-step-counter');
      if (counter) {
        counter.textContent = 'Page ' + currentSlide + ' of ' + totalSlides;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Step dots clickable
    const dots = document.querySelectorAll('.finale-steps-indicator .step-dot');
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const step = parseInt(dot.getAttribute('data-step'), 10);
        if (step) goToSlide(step);
      });
    });

    // Exit back to hub
    const exitBtn = document.getElementById('btn-finale-exit');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        showStage('stage-gifts');
      });
    }

    // Open Finale from Gifts Portal
    const openFinaleBtn = document.getElementById('btn-open-finale');
    if (openFinaleBtn) {
      openFinaleBtn.addEventListener('click', () => {
        goToSlide(1);
        showStage('stage-finale');
        burstConfetti(0.5, 0.4);
      });
    }

    // Open Finale directly from Love Letter modal button
    const letterProceedFinale = document.getElementById('btn-letter-proceed-finale');
    if (letterProceedFinale) {
      letterProceedFinale.addEventListener('click', () => {
        el.modalLoveLetter.classList.remove('open');
        document.body.style.overflow = '';
        goToSlide(1);
        showStage('stage-finale');
        burstConfetti(0.5, 0.4);
      });
    }

    // Slide 1 Nav
    const slide1Next = document.getElementById('btn-slide-1-next');
    if (slide1Next) {
      slide1Next.addEventListener('click', () => {
        goToSlide(2);
      });
    }

    // Slide 2 Date Invitation logic
    const slide2BackInit = document.getElementById('btn-slide-2-back-init');
    if (slide2BackInit) {
      slide2BackInit.addEventListener('click', () => goToSlide(1));
    }

    const slide2Back = document.getElementById('btn-slide-2-back');
    if (slide2Back) {
      slide2Back.addEventListener('click', () => goToSlide(1));
    }

    const btnDateNo = document.getElementById('btn-date-no');
    const modalDateNo = document.getElementById('modal-date-no');
    const btnDateModalYes = document.getElementById('btn-date-modal-yes');
    const btnDateYes = document.getElementById('btn-date-yes');
    const dateChoiceActions = document.getElementById('date-choice-actions');
    const dateNavDefault = document.getElementById('date-nav-default');
    const dateConfirmedWrap = document.getElementById('date-confirmed-wrap');

    if (btnDateNo) {
      btnDateNo.addEventListener('click', () => {
        const card = document.querySelector('#finale-slide-2 .finale-card');
        if (card) {
          card.classList.add('shake-anim');
          setTimeout(() => card.classList.remove('shake-anim'), 500);
        }
        if (modalDateNo) modalDateNo.classList.add('open');
      });
    }

    if (btnDateModalYes) {
      btnDateModalYes.addEventListener('click', () => {
        if (modalDateNo) modalDateNo.classList.remove('open');
        confirmDateYes();
      });
    }

    if (btnDateYes) {
      btnDateYes.addEventListener('click', confirmDateYes);
    }

    function confirmDateYes() {
      burstConfetti(0.5, 0.5);
      setTimeout(() => burstConfetti(0.3, 0.4), 250);
      setTimeout(() => burstConfetti(0.7, 0.4), 500);

      if (dateChoiceActions) dateChoiceActions.style.display = 'none';
      if (dateNavDefault) dateNavDefault.style.display = 'none';
      if (dateConfirmedWrap) dateConfirmedWrap.style.display = 'block';
    }

    const slide2Next = document.getElementById('btn-slide-2-next');
    if (slide2Next) {
      slide2Next.addEventListener('click', () => {
        goToSlide(3);
        burstConfetti(0.5, 0.4);
      });
    }

    // Slide 3 Uni Pickup Nav
    const slide3Back = document.getElementById('btn-slide-3-back');
    if (slide3Back) {
      slide3Back.addEventListener('click', () => goToSlide(2));
    }
    const slide3Next = document.getElementById('btn-slide-3-next');
    if (slide3Next) {
      slide3Next.addEventListener('click', () => {
        goToSlide(4);
        burstConfetti(0.5, 0.4);
      });
    }

    // Slide 4 Meeting Twice Nav
    const slide4Back = document.getElementById('btn-slide-4-back');
    if (slide4Back) {
      slide4Back.addEventListener('click', () => goToSlide(3));
    }
    const slide4Next = document.getElementById('btn-slide-4-next');
    if (slide4Next) {
      slide4Next.addEventListener('click', () => {
        goToSlide(5);
        burstConfetti(0.5, 0.5);
      });
    }

    // Slide 5 Final Curtain restart to hub & back to slide 4
    const slide5BackTop = document.getElementById('btn-slide-5-back');
    if (slide5BackTop) {
      slide5BackTop.addEventListener('click', () => goToSlide(4));
    }
    const slide5BackBottom = document.getElementById('btn-slide-5-back-bottom');
    if (slide5BackBottom) {
      slide5BackBottom.addEventListener('click', () => goToSlide(4));
    }
    const btnCurtainHub = document.getElementById('btn-curtain-hub');
    if (btnCurtainHub) {
      btnCurtainHub.addEventListener('click', () => {
        showStage('stage-gifts');
      });
    }
  }

  // ========================================================================
  // INITIALIZATION
  // ========================================================================
  function init() {
    initMusic();
    initPhotoBubbles();
    initGate();
    initWelcome();
    initConfirmDialog();
    initGifts();
    initFinale();

    const urlParams = new URLSearchParams(window.location.search);
    const targetStage = urlParams.get('stage');
    if (targetStage === 'finale') {
      showStage('stage-finale');
    } else if (targetStage === 'gifts') {
      showStage('stage-gifts');
    } else {
      showStage('stage-gate');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
