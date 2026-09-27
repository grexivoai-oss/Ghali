/**
 * "The Story of Us" — Netflix-Style Relationship Web Application
 * Fully personalized for: My Ghali, My Biwi, Khurat Biwi, Meri Gundi, Mera Bacho Ki Maa, Meri Sabkuch
 * - Hero background: Image 17
 * - Sizing: Compact, authentic Netflix desktop & mobile scale
 * - Polaroids: Displayed in their normal, un-cropped natural sizes with authentic Polaroid framing
 * - Background Soundtrack: 3 songs looping continuously; slows down & ducks gently when video plays (never stops!)
 * - Duplicate 29.mp4 removed (23 unique video episodes + 20 polaroids)
 */

(function () {
  'use strict';

  // --- APPLICATION STATE ---
  const state = {
    currentScreen: 'screen-profiles',
    selectedProfile: null,
    currentEpisodeId: 1, // 1 to 23 for video episodes, or 'p-1'..'p-20' for photos
    currentMediaItem: null,
    isPlaying: false,
    isMuted: false,
    volume: 1,
    isScrubbing: false,
    idleTimeout: null,
    nextEpCountdown: null,
    isPhotoTimer: null,
    photoProgress: 0,

    // Background Music State
    currentSongIndex: 0,
    isMusicPlaying: false,
    normalMusicVolume: 0.6,
    duckedMusicVolume: 0.15,
  };

  // --- DOM CACHE ---
  const screens = {
    profiles: document.getElementById('screen-profiles'),
    browse: document.getElementById('screen-browse'),
    player: document.getElementById('screen-player'),
  };

  const el = {
    // Music Elements
    bgMusic: document.getElementById('bg-music'),
    musicPillWidget: document.getElementById('music-pill-widget'),
    musicEqAnim: document.getElementById('music-eq-anim'),
    musicTitle: document.getElementById('music-title'),
    musicArtist: document.getElementById('music-artist'),
    musicBtnPlaypause: document.getElementById('music-btn-playpause'),
    musicPlaypauseIcon: document.getElementById('music-playpause-icon'),
    musicBtnNext: document.getElementById('music-btn-next'),

    // Profiles Elements
    profilesGrid: document.getElementById('profiles-grid'),
    btnManageProfiles: document.getElementById('btn-manage-profiles'),

    // Browse Elements
    heroBgImg: document.getElementById('hero-bg-img'),
    heroShowTitle: document.getElementById('hero-show-title'),
    heroShowDesc: document.getElementById('hero-show-desc'),
    heroMetaMatch: document.getElementById('hero-meta-match'),
    heroMetaYear: document.getElementById('hero-meta-year'),
    heroMetaSeasons: document.getElementById('hero-meta-seasons'),
    btnHeroPlay: document.getElementById('btn-hero-play'),
    btnHeroInfo: document.getElementById('btn-hero-info'),
    browseContentRows: document.getElementById('browse-content-rows'),
    heroRightShowcase: document.getElementById('hero-right-showcase'),
    sidebarUserAvatar: document.getElementById('sidebar-user-avatar'),
    mobileUserAvatar: document.getElementById('mobile-user-avatar'),

    // Player Elements
    playerViewport: document.getElementById('player-viewport'),
    playerVideo: document.getElementById('player-video'),
    playerImageWrapper: document.getElementById('player-image-wrapper'),
    playerImage: document.getElementById('player-image'),
    playerImageBlur: document.getElementById('player-image-blur'),
    centerIndicator: document.getElementById('center-indicator'),
    centerIndicatorIcon: document.getElementById('center-indicator-icon'),
    btnPlayerBack: document.getElementById('btn-player-back'),
    playerEpisodeTitle: document.getElementById('player-episode-title'),
    playerShowName: document.getElementById('player-show-name'),
    scrubContainer: document.getElementById('player-scrub-container'),
    scrubBuffer: document.getElementById('player-scrub-buffer'),
    scrubProgress: document.getElementById('player-scrub-progress'),
    timeDisplay: document.getElementById('player-time-display'),
    btnPlayPause: document.getElementById('btn-player-playpause'),
    iconPlayPauseUse: document.getElementById('icon-playpause-use'),
    btnRewind: document.getElementById('btn-player-rewind'),
    btnForward: document.getElementById('btn-player-forward'),
    btnMute: document.getElementById('btn-player-mute'),
    iconVolumeUse: document.getElementById('icon-volume-use'),
    btnToggleEpisodes: document.getElementById('btn-toggle-episodes'),
    btnToggleSubtitles: document.getElementById('btn-toggle-subtitles'),
    btnPlayerNextEp: document.getElementById('btn-player-next-ep'),
    btnFullscreen: document.getElementById('btn-player-fullscreen'),
    episodesDrawer: document.getElementById('player-episodes-drawer'),
    drawerSeasonSelect: document.getElementById('drawer-season-select'),
    drawerEpisodesList: document.getElementById('drawer-episodes-list'),
    btnCloseDrawer: document.getElementById('btn-close-episodes-drawer'),
    audioDialog: document.getElementById('player-audio-dialog'),
    nextEpCard: document.getElementById('next-ep-card'),
    nextCardThumb: document.getElementById('next-card-thumb'),
    nextCardTitle: document.getElementById('next-card-title'),
    nextCardTimer: document.getElementById('next-card-timer'),
    btnPlayNextNow: document.getElementById('btn-play-next-now'),

    // Modals
    moreInfoModal: document.getElementById('more-info-modal'),
    btnCloseInfoModal: document.getElementById('btn-close-info-modal'),
    modalHeroImg: document.getElementById('modal-hero-img'),
    modalShowTitle: document.getElementById('modal-show-title'),
    modalShowDesc: document.getElementById('modal-show-desc'),
    btnModalPlay: document.getElementById('btn-modal-play'),
    modalSeasonSelect: document.getElementById('modal-season-select'),
    modalEpisodesList: document.getElementById('modal-episodes-list'),
  };

  // ========================================================================
  // BACKGROUND MUSIC PLAYLIST & AUDIO DUCKING / SLOWING
  // ========================================================================
  let musicSourceLoaded = false;

  function initBackgroundMusic() {
    if (!CONFIG.songs || CONFIG.songs.length === 0) return;

    // Continuous loop across the 3 songs
    el.bgMusic.addEventListener('ended', () => {
      state.currentSongIndex = (state.currentSongIndex + 1) % CONFIG.songs.length;
      loadSong(state.currentSongIndex, true);
    });

    // Music widget buttons
    el.musicBtnPlaypause.addEventListener('click', (e) => {
      e.stopPropagation();
      ensureMusicSourceLoaded();
      toggleMusicPlayPause();
    });

    el.musicBtnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      ensureMusicSourceLoaded();
      nextSong();
    });

    // Start audio on first user touch / click anywhere if not yet started
    const startAudioOnce = () => {
      ensureMusicSourceLoaded();
      if (!state.isMusicPlaying) {
        startMusicPlayback();
      }
      window.removeEventListener('click', startAudioOnce);
      window.removeEventListener('keydown', startAudioOnce);
      window.removeEventListener('touchstart', startAudioOnce);
    };
    window.addEventListener('click', startAudioOnce, { once: true });
    window.addEventListener('keydown', startAudioOnce, { once: true });
    window.addEventListener('touchstart', startAudioOnce, { once: true });
  }

  function ensureMusicSourceLoaded() {
    if (!musicSourceLoaded) {
      loadSong(state.currentSongIndex, false);
    }
  }

  function loadSong(index, autoPlay = true) {
    const song = CONFIG.songs[index];
    if (!song) return;

    musicSourceLoaded = true;
    el.bgMusic.src = song.src;
    el.bgMusic.volume = state.normalMusicVolume;
    el.bgMusic.playbackRate = 1.0;

    el.musicTitle.textContent = song.title;
    el.musicArtist.textContent = song.artist;

    if (autoPlay) {
      startMusicPlayback();
    }
  }

  function startMusicPlayback() {
    ensureMusicSourceLoaded();
    el.bgMusic.play().then(() => {
      state.isMusicPlaying = true;
      updateMusicWidgetUI(true);
    }).catch((err) => {
      console.log('Music autoplay pending user click:', err);
      state.isMusicPlaying = false;
      updateMusicWidgetUI(false);
    });
  }

  function toggleMusicPlayPause() {
    if (el.bgMusic.paused) {
      startMusicPlayback();
    } else {
      el.bgMusic.pause();
      state.isMusicPlaying = false;
      updateMusicWidgetUI(false);
    }
  }

  function nextSong() {
    state.currentSongIndex = (state.currentSongIndex + 1) % CONFIG.songs.length;
    loadSong(state.currentSongIndex, true);
  }

  function updateMusicWidgetUI(isPlaying) {
    if (isPlaying) {
      el.musicEqAnim.classList.remove('paused');
      el.musicPlaypauseIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>`;
    } else {
      el.musicEqAnim.classList.add('paused');
      el.musicPlaypauseIcon.innerHTML = `<path d="M8 5v14l11-7z" fill="currentColor"/>`;
    }
  }

  /**
   * User explicitly requested:
   * "when a video plays it should slow the song but not stop"
   */
  function onVideoPlay() {
    if (!el.bgMusic.paused) {
      // Slow down the song tempo to 0.8
      el.bgMusic.playbackRate = 0.8;
      // Softly duck volume to 0.15 so video dialogue/audio is clear
      el.bgMusic.volume = state.duckedMusicVolume;
    }
  }

  function onVideoPauseOrEnd() {
    if (!el.bgMusic.paused) {
      // Restore normal playback speed and volume
      el.bgMusic.playbackRate = 1.0;
      el.bgMusic.volume = state.normalMusicVolume;
    }
  }

  // ========================================================================
  // NAVIGATION BETWEEN SCREENS
  // ========================================================================
  function showScreen(screenId) {
    Object.values(screens).forEach((s) => {
      s.classList.remove('active');
    });

    const targetScreen = screens[screenId.replace('screen-', '')];
    if (targetScreen) {
      targetScreen.classList.add('active');
      state.currentScreen = screenId;
      window.scrollTo(0, 0);
    }
  }

  // ========================================================================
  // SCREEN 1: PROFILE PICKER
  // ========================================================================
  function initProfiles() {
    el.profilesGrid.innerHTML = '';

    CONFIG.profiles.forEach((profile) => {
      const card = document.createElement('div');
      card.className = 'profile-card';
      card.tabIndex = 0;
      card.innerHTML = `
        <div class="profile-avatar-wrap">
          <img src="${profile.avatar}" alt="${profile.name}" loading="lazy">
        </div>
        <div class="profile-name">${profile.name}</div>
        <div class="profile-subtitle">${profile.subtitle}</div>
      `;

      const selectProfile = () => {
        if (screens.profiles.classList.contains('launching')) return;

        startMusicPlayback();

        // 1. Zoom in and highlight clicked card
        card.classList.add('selected');

        // 2. Dim out other profile cards
        el.profilesGrid.querySelectorAll('.profile-card').forEach((c) => {
          if (c !== card) c.classList.add('dimmed');
        });

        // 3. Fade out title and manage button
        screens.profiles.classList.add('launching');

        // 4. Cinematic blur and dissolve
        setTimeout(() => {
          screens.profiles.classList.add('fade-dissolve');
        }, 380);

        // 5. Smoothly reveal Screen 2
        setTimeout(() => {
          state.selectedProfile = profile;
          el.sidebarUserAvatar.src = profile.avatar;
          el.mobileUserAvatar.src = profile.avatar;
          showScreen('screen-browse');

          // Reset profile screen classes for clean future returns
          card.classList.remove('selected');
          el.profilesGrid.querySelectorAll('.profile-card').forEach((c) => c.classList.remove('dimmed'));
          screens.profiles.classList.remove('launching', 'fade-dissolve');
        }, 700);
      };

      card.addEventListener('click', selectProfile);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectProfile();
        }
      });

      el.profilesGrid.appendChild(card);
    });

    el.sidebarUserAvatar.addEventListener('click', () => showScreen('screen-profiles'));
    el.mobileUserAvatar.addEventListener('click', () => showScreen('screen-profiles'));

    el.btnManageProfiles.addEventListener('click', () => {
      alert("All profiles unlocked for my Ghali, my biwi, my khurat biwi, meri gundi & meri sabkuch! ❤️");
    });
  }

  // ========================================================================
  // SCREEN 2: BROWSE & HERO
  // ========================================================================
  function initBrowse() {
    // Populate Hero with Image 17 as requested!
    if (el.heroShowTitle) el.heroShowTitle.textContent = CONFIG.show.title;
    if (el.heroShowDesc) el.heroShowDesc.textContent = CONFIG.show.synopsis;
    if (el.heroBgImg) el.heroBgImg.src = CONFIG.show.heroImage;
    if (el.heroMetaMatch) el.heroMetaMatch.textContent = CONFIG.show.badge;
    if (el.heroMetaYear) el.heroMetaYear.textContent = CONFIG.show.year;
    if (el.heroMetaSeasons) el.heroMetaSeasons.textContent = CONFIG.show.seasons;

    // Render All Carousel Rows
    if (!el.browseContentRows) return;
    el.browseContentRows.innerHTML = '';

    // Render Season 1, Season 2, Season 3 (23 unique video episodes)
    CONFIG.seasons.forEach((season) => {
      const section = document.createElement('section');
      section.className = 'row-container';
      section.innerHTML = `
        <div class="row-header">
          <h2 class="row-title">${season.seasonTitle}</h2>
          <span class="row-see-all view-season-btn" data-season="${season.seasonNumber}">See all episodes &gt;</span>
        </div>
        <div class="carousel-wrapper">
          <button class="carousel-arrow arrow-left" aria-label="Previous">
            <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/></svg>
          </button>
          <div class="carousel-track"></div>
          <button class="carousel-arrow arrow-right" aria-label="Next">
            <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor"/></svg>
          </button>
        </div>
      `;

      const track = section.querySelector('.carousel-track');
      const arrowLeft = section.querySelector('.arrow-left');
      const arrowRight = section.querySelector('.arrow-right');

      arrowLeft.addEventListener('click', () => track.scrollBy({ left: -420, behavior: 'smooth' }));
      arrowRight.addEventListener('click', () => track.scrollBy({ left: 420, behavior: 'smooth' }));

      section.querySelector('.view-season-btn').addEventListener('click', () => {
        el.modalSeasonSelect.value = season.seasonNumber;
        openMoreInfoModal();
      });

      season.episodes.forEach((episode) => {
        const card = document.createElement('div');
        card.className = 'poster-card';
        card.innerHTML = `
          <svg class="card-n-badge" viewBox="0 0 24 24">
            <text x="12" y="18" font-family="Arial Black" font-size="16" font-weight="900" fill="#E50914" text-anchor="middle">G</text>
          </svg>
          <img src="${episode.posterImage}" alt="${episode.posterTitle}" loading="lazy">
          <div class="card-play-hover-icon">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
          </div>
          <div class="card-overlay">
            <div class="card-title">${episode.posterTitle}</div>
            <div class="card-subtitle">${episode.season}: ${episode.episode} • ${episode.episodeTitle}</div>
          </div>
        `;

        card.addEventListener('click', () => {
          playVideoEpisode(episode.id);
        });

        track.appendChild(card);
      });

      el.browseContentRows.appendChild(section);
    });

    // Render Camera Roll Row — Polaroids in NORMAL NATURAL SIZES
    const photoSection = document.createElement('section');
    photoSection.className = 'row-container';
    photoSection.innerHTML = `
      <div class="row-header">
        <h2 class="row-title">Our Camera Roll • Polaroids of My Ghali (20 Memories)</h2>
        <span class="row-see-all view-photos-btn">View full album &gt;</span>
      </div>
      <div class="carousel-wrapper">
        <button class="carousel-arrow arrow-left" aria-label="Previous">
          <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/></svg>
        </button>
        <div class="carousel-track"></div>
        <button class="carousel-arrow arrow-right" aria-label="Next">
          <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor"/></svg>
        </button>
      </div>
    `;

    const photoTrack = photoSection.querySelector('.carousel-track');
    const photoArrowLeft = photoSection.querySelector('.arrow-left');
    const photoArrowRight = photoSection.querySelector('.arrow-right');

    photoArrowLeft.addEventListener('click', () => photoTrack.scrollBy({ left: -380, behavior: 'smooth' }));
    photoArrowRight.addEventListener('click', () => photoTrack.scrollBy({ left: 380, behavior: 'smooth' }));

    photoSection.querySelector('.view-photos-btn').addEventListener('click', () => {
      el.modalSeasonSelect.value = 'photos';
      openMoreInfoModal();
    });

    CONFIG.photoMemories.forEach((photo) => {
      const card = document.createElement('div');
      card.className = 'polaroid-card';
      card.innerHTML = `
        <div class="polaroid-photo-frame">
          <img src="${photo.image}" alt="${photo.title}" loading="lazy">
        </div>
        <div class="polaroid-caption">${photo.title}</div>
        <div class="polaroid-note">${photo.note}</div>
      `;

      card.addEventListener('click', () => {
        playPhotoMemory(photo.id);
      });

      photoTrack.appendChild(card);
    });

    el.browseContentRows.appendChild(photoSection);

    // Hero buttons & showcase card
    if (el.btnHeroPlay) el.btnHeroPlay.addEventListener('click', () => playVideoEpisode(1));
    if (el.btnHeroInfo) el.btnHeroInfo.addEventListener('click', openMoreInfoModal);
    if (el.heroRightShowcase) {
      el.heroRightShowcase.addEventListener('click', () => playVideoEpisode(1));
    }
  }

  // ========================================================================
  // MORE INFO MODAL
  // ========================================================================
  function openMoreInfoModal() {
    el.modalHeroImg.src = CONFIG.show.heroImage;
    el.modalShowTitle.textContent = CONFIG.show.title;
    el.modalShowDesc.textContent = CONFIG.show.synopsis;

    renderModalEpisodeList();
    el.moreInfoModal.classList.add('open');
    el.moreInfoModal.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }

  function closeMoreInfoModal() {
    el.moreInfoModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderModalEpisodeList() {
    el.modalEpisodesList.innerHTML = '';
    const selected = el.modalSeasonSelect.value;

    if (selected === 'photos') {
      CONFIG.photoMemories.forEach((photo, idx) => {
        const item = document.createElement('div');
        item.className = 'modal-ep-item';
        item.innerHTML = `
          <div class="modal-ep-num">#${idx + 1}</div>
          <img src="${photo.image}" class="modal-ep-thumb" alt="${photo.title}" style="object-fit:contain; background:#111;">
          <div class="modal-ep-text">
            <div class="modal-ep-title">${photo.title}</div>
            <div class="modal-ep-desc">${photo.note}</div>
          </div>
        `;
        item.addEventListener('click', () => {
          closeMoreInfoModal();
          playPhotoMemory(photo.id);
        });
        el.modalEpisodesList.appendChild(item);
      });
    } else {
      const seasonNum = parseInt(selected, 10) || 1;
      const seasonObj = CONFIG.seasons.find((s) => s.seasonNumber === seasonNum) || CONFIG.seasons[0];

      seasonObj.episodes.forEach((ep) => {
        const item = document.createElement('div');
        item.className = 'modal-ep-item';
        item.innerHTML = `
          <div class="modal-ep-num">${ep.id}</div>
          <img src="${ep.posterImage}" class="modal-ep-thumb" alt="${ep.episodeTitle}">
          <div class="modal-ep-text">
            <div class="modal-ep-title">${ep.season}: ${ep.episode}: ${ep.posterTitle} — ${ep.episodeTitle}</div>
            <div class="modal-ep-desc">${ep.description}</div>
          </div>
        `;
        item.addEventListener('click', () => {
          closeMoreInfoModal();
          playVideoEpisode(ep.id);
        });
        el.modalEpisodesList.appendChild(item);
      });
    }
  }

  el.modalSeasonSelect.addEventListener('change', renderModalEpisodeList);
  el.btnCloseInfoModal.addEventListener('click', closeMoreInfoModal);
  el.btnModalPlay.addEventListener('click', () => {
    closeMoreInfoModal();
    playVideoEpisode(1);
  });
  el.moreInfoModal.addEventListener('click', (e) => {
    if (e.target === el.moreInfoModal) closeMoreInfoModal();
  });

  // ========================================================================
  // SCREEN 3: CINEMATIC EPISODE PLAYER
  // ========================================================================
  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function playVideoEpisode(episodeId) {
    const ep = CONFIG.allEpisodes.find((e) => e.id === episodeId) || CONFIG.allEpisodes[0];
    state.currentEpisodeId = ep.id;
    state.currentMediaItem = ep;

    closeMoreInfoModal();
    hideNextEpisodeCard();
    closeEpisodesDrawer();
    closeAudioDialog();

    el.playerEpisodeTitle.textContent = `${ep.season}: ${ep.episode}: ${ep.posterTitle} • ${ep.episodeTitle}`;
    el.playerShowName.textContent = `FOR MY GHALI — THE STORY OF US`;

    showScreen('screen-player');
    loadMedia(ep.mediaSource, 'video', ep.posterImage);

    const seasonNumber = parseInt(ep.season.replace('S', ''), 10) || 1;
    el.drawerSeasonSelect.value = seasonNumber;
    populateEpisodesDrawer();
  }

  function playPhotoMemory(photoId) {
    const photo = CONFIG.photoMemories.find((p) => p.id === photoId) || CONFIG.photoMemories[0];
    state.currentEpisodeId = photo.id;
    state.currentMediaItem = photo;

    closeMoreInfoModal();
    hideNextEpisodeCard();
    closeEpisodesDrawer();
    closeAudioDialog();

    el.playerEpisodeTitle.textContent = `Camera Roll: ${photo.title} • ${photo.note}`;
    el.playerShowName.textContent = `FOR MY GHALI — MEMORIES`;

    showScreen('screen-player');
    loadMedia(photo.image, 'image', photo.image);

    el.drawerSeasonSelect.value = 'photos';
    populateEpisodesDrawer();
  }

  function loadMedia(sourceUrl, type, fallbackImg) {
    if (state.isPhotoTimer) {
      clearInterval(state.isPhotoTimer);
      state.isPhotoTimer = null;
    }

    if (type === 'video') {
      el.playerImageWrapper.style.display = 'none';
      el.playerVideo.style.display = 'block';

      el.playerVideo.src = sourceUrl;
      el.playerVideo.load();
      el.playerVideo.muted = state.isMuted;
      el.playerVideo.volume = state.volume;

      el.playerVideo.play().then(() => {
        state.isPlaying = true;
        updatePlayPauseIcons(true);
        onVideoPlay(); // Slows down background song and ducks volume!
      }).catch((e) => {
        console.log('Autoplay restriction or error:', e);
        state.isPlaying = false;
        updatePlayPauseIcons(false);
      });
    } else {
      // Photo Normal Size Display Mode
      el.playerVideo.style.display = 'none';
      el.playerVideo.pause();
      onVideoPauseOrEnd(); // Restore background music speed/volume

      el.playerImageWrapper.style.display = 'flex';
      el.playerImage.src = fallbackImg || sourceUrl;
      if (el.playerImageBlur) {
        el.playerImageBlur.src = fallbackImg || sourceUrl;
      }

      state.isPlaying = true;
      updatePlayPauseIcons(true);
      state.photoProgress = 0;
      const photoDuration = 12;

      state.isPhotoTimer = setInterval(() => {
        if (!state.isPlaying) return;
        state.photoProgress += 0.2;
        const pct = (state.photoProgress / photoDuration) * 100;
        el.scrubProgress.style.width = `${pct}%`;
        el.timeDisplay.textContent = `${formatTime(state.photoProgress)} / ${formatTime(photoDuration)}`;

        if (state.photoProgress >= photoDuration - 4 && !el.nextEpCard.classList.contains('show')) {
          showNextEpisodeCard();
        }

        if (state.photoProgress >= photoDuration) {
          clearInterval(state.isPhotoTimer);
          state.isPhotoTimer = null;
          advanceNextChapter();
        }
      }, 200);
    }

    resetIdleTimer();
  }

  function togglePlayPause() {
    if (el.playerVideo.style.display !== 'none') {
      if (el.playerVideo.paused) {
        el.playerVideo.play();
        state.isPlaying = true;
        showCenterAnimation('play');
        onVideoPlay();
      } else {
        el.playerVideo.pause();
        state.isPlaying = false;
        showCenterAnimation('pause');
        onVideoPauseOrEnd();
      }
    } else {
      state.isPlaying = !state.isPlaying;
      showCenterAnimation(state.isPlaying ? 'play' : 'pause');
    }
    updatePlayPauseIcons(state.isPlaying);
  }

  function updatePlayPauseIcons(isPlaying) {
    el.iconPlayPauseUse.setAttribute('href', isPlaying ? '#icon-pause' : '#icon-play');
  }

  function showCenterAnimation(type) {
    el.centerIndicatorIcon.setAttribute('href', type === 'play' ? '#icon-play' : '#icon-pause');
    el.centerIndicator.classList.add('animate');
    setTimeout(() => {
      el.centerIndicator.classList.remove('animate');
    }, 400);
  }

  // --- VIDEO LISTENERS & FINALE REDIRECT ON COMPLETION ---
  function markNetflixWatched() {
    sessionStorage.setItem('ghali_netflix_watched', 'true');
  }

  let isRedirecting = false;
  function redirectToFinaleOnComplete() {
    if (isRedirecting) return;
    isRedirecting = true;
    markNetflixWatched();

    const overlay = document.getElementById('netflix-completion-overlay');
    if (overlay) {
      overlay.style.display = 'flex';
      requestAnimationFrame(() => {
        overlay.style.opacity = '1';
      });
      setTimeout(() => {
        window.location.href = "index.html?stage=finale";
      }, 1400);
    } else {
      window.location.href = "index.html?stage=finale";
    }
  }

  el.playerVideo.addEventListener('play', () => {
    onVideoPlay();
    markNetflixWatched();
  });

  el.playerVideo.addEventListener('pause', () => {
    onVideoPauseOrEnd();
  });

  el.playerVideo.addEventListener('timeupdate', () => {
    if (state.isScrubbing) return;
    const current = el.playerVideo.currentTime;
    const duration = el.playerVideo.duration || 1;
    const pct = (current / duration) * 100;

    el.scrubProgress.style.width = `${pct}%`;
    el.timeDisplay.textContent = `${formatTime(current)} / ${formatTime(duration)}`;

    // Mark as watched once she has played 10 seconds or 30% of the video
    if (current > 10 || pct > 30) {
      markNetflixWatched();
    }

    if (duration - current <= 5 && !el.nextEpCard.classList.contains('show')) {
      showNextEpisodeCard();
    }
  });

  el.playerVideo.addEventListener('progress', () => {
    if (el.playerVideo.buffered.length > 0) {
      const bufferedEnd = el.playerVideo.buffered.end(el.playerVideo.buffered.length - 1);
      const duration = el.playerVideo.duration || 1;
      el.scrubBuffer.style.width = `${(bufferedEnd / duration) * 100}%`;
    }
  });

  el.playerVideo.addEventListener('ended', () => {
    onVideoPauseOrEnd();
    markNetflixWatched();
    redirectToFinaleOnComplete();
  });

  // --- SCRUBBER SEEKING ---
  function seekToPosition(e) {
    const rect = el.scrubContainer.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

    if (el.playerVideo.style.display !== 'none' && el.playerVideo.duration) {
      el.playerVideo.currentTime = pos * el.playerVideo.duration;
      el.scrubProgress.style.width = `${pos * 100}%`;
    } else {
      state.photoProgress = pos * 12;
      el.scrubProgress.style.width = `${pos * 100}%`;
    }
  }

  el.scrubContainer.addEventListener('mousedown', (e) => {
    state.isScrubbing = true;
    seekToPosition(e);
  });
  window.addEventListener('mousemove', (e) => {
    if (state.isScrubbing) seekToPosition(e);
  });
  window.addEventListener('mouseup', () => {
    state.isScrubbing = false;
  });

  el.scrubContainer.addEventListener('touchstart', (e) => {
    state.isScrubbing = true;
    seekToPosition(e.touches[0]);
  }, { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (state.isScrubbing) seekToPosition(e.touches[0]);
  }, { passive: true });
  window.addEventListener('touchend', () => {
    state.isScrubbing = false;
  });

  // --- PLAYER CONTROLS ---
  el.btnPlayPause.addEventListener('click', togglePlayPause);
  el.playerViewport.addEventListener('click', (e) => {
    if (e.target === el.playerViewport || e.target === el.playerVideo || e.target === el.playerImageWrapper || e.target === el.playerImage) {
      togglePlayPause();
    }
  });

  el.btnRewind.addEventListener('click', () => {
    if (el.playerVideo.style.display !== 'none') {
      el.playerVideo.currentTime = Math.max(0, el.playerVideo.currentTime - 10);
    }
  });

  el.btnForward.addEventListener('click', () => {
    if (el.playerVideo.style.display !== 'none') {
      el.playerVideo.currentTime = Math.min(el.playerVideo.duration, el.playerVideo.currentTime + 10);
    }
  });

  el.btnMute.addEventListener('click', () => {
    state.isMuted = !state.isMuted;
    el.playerVideo.muted = state.isMuted;
    el.iconVolumeUse.setAttribute('href', state.isMuted ? '#icon-mute' : '#icon-volume');
  });

  el.btnPlayerBack.addEventListener('click', () => {
    if (state.isPhotoTimer) clearInterval(state.isPhotoTimer);
    el.playerVideo.pause();
    onVideoPauseOrEnd(); // Restore background music speed & volume
    showScreen('screen-browse');
  });

  el.btnPlayerNextEp.addEventListener('click', () => {
    advanceNextChapter();
  });

  el.btnFullscreen.addEventListener('click', toggleFullscreen);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      screens.player.requestFullscreen().catch((err) => {
        console.log(`Fullscreen error: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  // --- EPISODES DRAWER ---
  function populateEpisodesDrawer() {
    el.drawerEpisodesList.innerHTML = '';
    const selectedVal = el.drawerSeasonSelect.value;

    if (selectedVal === 'photos') {
      CONFIG.photoMemories.forEach((photo) => {
        const item = document.createElement('div');
        item.className = `drawer-item ${photo.id === state.currentEpisodeId ? 'active' : ''}`;
        item.innerHTML = `
          <img src="${photo.image}" class="drawer-thumb" alt="${photo.title}" style="object-fit:contain; background:#111;">
          <div class="drawer-item-info">
            <span class="drawer-item-title">${photo.title}</span>
            <span class="drawer-item-ep">${photo.note}</span>
          </div>
        `;
        item.addEventListener('click', () => playPhotoMemory(photo.id));
        el.drawerEpisodesList.appendChild(item);
      });
    } else {
      const seasonNum = parseInt(selectedVal, 10) || 1;
      const seasonObj = CONFIG.seasons.find((s) => s.seasonNumber === seasonNum) || CONFIG.seasons[0];

      seasonObj.episodes.forEach((ep) => {
        const item = document.createElement('div');
        item.className = `drawer-item ${ep.id === state.currentEpisodeId ? 'active' : ''}`;
        item.innerHTML = `
          <img src="${ep.posterImage}" class="drawer-thumb" alt="${ep.posterTitle}">
          <div class="drawer-item-info">
            <span class="drawer-item-title">${ep.posterTitle} • ${ep.episodeTitle}</span>
            <span class="drawer-item-ep">${ep.season}: ${ep.episode} • ${ep.duration}</span>
          </div>
        `;
        item.addEventListener('click', () => playVideoEpisode(ep.id));
        el.drawerEpisodesList.appendChild(item);
      });
    }
  }

  el.drawerSeasonSelect.addEventListener('change', populateEpisodesDrawer);

  function toggleEpisodesDrawer() {
    el.episodesDrawer.classList.toggle('open');
    closeAudioDialog();
  }
  function closeEpisodesDrawer() {
    el.episodesDrawer.classList.remove('open');
  }

  el.btnToggleEpisodes.addEventListener('click', toggleEpisodesDrawer);
  el.btnCloseDrawer.addEventListener('click', closeEpisodesDrawer);

  // --- AUDIO & SUBTITLES DIALOG ---
  function toggleAudioDialog() {
    el.audioDialog.classList.toggle('open');
    closeEpisodesDrawer();
  }
  function closeAudioDialog() {
    el.audioDialog.classList.remove('open');
  }

  el.btnToggleSubtitles.addEventListener('click', toggleAudioDialog);

  el.audioDialog.querySelectorAll('.dialog-option').forEach((opt) => {
    opt.addEventListener('click', function () {
      const parent = this.parentElement;
      parent.querySelectorAll('.dialog-option').forEach((o) => o.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  // --- NEXT EPISODE AUTO-PROMPT ---
  function showNextEpisodeCard() {
    let nextItem = null;

    if (typeof state.currentEpisodeId === 'number') {
      const nextEpId = state.currentEpisodeId + 1;
      if (nextEpId <= CONFIG.allEpisodes.length) {
        nextItem = CONFIG.allEpisodes.find((e) => e.id === nextEpId);
      }
    } else {
      const currIdx = CONFIG.photoMemories.findIndex((p) => p.id === state.currentEpisodeId);
      if (currIdx !== -1 && currIdx + 1 < CONFIG.photoMemories.length) {
        nextItem = CONFIG.photoMemories[currIdx + 1];
      }
    }

    if (!nextItem) return;

    el.nextCardThumb.src = nextItem.posterImage || nextItem.image;
    el.nextCardTitle.textContent = nextItem.posterTitle || nextItem.title;

    let secondsLeft = 5;
    el.nextCardTimer.textContent = `Playing in ${secondsLeft}s...`;
    el.nextEpCard.classList.add('show');

    if (state.nextEpCountdown) clearInterval(state.nextEpCountdown);
    state.nextEpCountdown = setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) {
        clearInterval(state.nextEpCountdown);
        advanceNextChapter();
      } else {
        el.nextCardTimer.textContent = `Playing in ${secondsLeft}s...`;
      }
    }, 1000);
  }

  function hideNextEpisodeCard() {
    if (state.nextEpCountdown) {
      clearInterval(state.nextEpCountdown);
      state.nextEpCountdown = null;
    }
    el.nextEpCard.classList.remove('show');
  }

  el.btnPlayNextNow.addEventListener('click', () => {
    hideNextEpisodeCard();
    advanceNextChapter();
  });

  function advanceNextChapter() {
    hideNextEpisodeCard();

    if (typeof state.currentEpisodeId === 'number') {
      const nextId = state.currentEpisodeId + 1;
      if (nextId <= CONFIG.allEpisodes.length) {
        playVideoEpisode(nextId);
      } else {
        alert("You've watched all 23 episodes of our story! Here are some polaroids from our camera roll. ❤️");
        playPhotoMemory(CONFIG.photoMemories[0].id);
      }
    } else {
      const currIdx = CONFIG.photoMemories.findIndex((p) => p.id === state.currentEpisodeId);
      if (currIdx !== -1 && currIdx + 1 < CONFIG.photoMemories.length) {
        playPhotoMemory(CONFIG.photoMemories[currIdx + 1].id);
      } else {
        alert("You've watched all memories! Our love story has no ending, my Ghali. ❤️");
        showScreen('screen-browse');
      }
    }
  }

  // --- AUTO-HIDE CONTROLS ON IDLE ---
  function resetIdleTimer() {
    screens.player.classList.remove('user-idle');
    clearTimeout(state.idleTimeout);
    state.idleTimeout = setTimeout(() => {
      if (state.currentScreen === 'screen-player' && state.isPlaying && !el.episodesDrawer.classList.contains('open') && !el.audioDialog.classList.contains('open')) {
        screens.player.classList.add('user-idle');
      }
    }, 3500);
  }

  screens.player.addEventListener('mousemove', resetIdleTimer);
  screens.player.addEventListener('touchstart', resetIdleTimer, { passive: true });

  // --- KEYBOARD SHORTCUTS ---
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && el.moreInfoModal && el.moreInfoModal.classList.contains('open')) {
      closeMoreInfoModal();
      return;
    }

    if (state.currentScreen !== 'screen-player') return;

    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      togglePlayPause();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      el.btnRewind.click();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      el.btnForward.click();
    } else if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === 'm' || e.key === 'M') {
      e.preventDefault();
      el.btnMute.click();
    } else if (e.key === 'Escape') {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        el.btnPlayerBack.click();
      }
    }
  });

  // ========================================================================
  // INITIALIZATION
  // ========================================================================
  function init() {
    initProfiles();
    initBrowse();
    initBackgroundMusic();
    showScreen('screen-profiles');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
