"use strict";

const title = document.querySelector(".title");
const btnContainer = document.querySelector(".buttons");
const yesBtn = document.querySelector(".btn-yes");
const noBtn = document.querySelector(".btn-no");
const img = document.querySelector(".img");

const bgMusic = document.getElementById("bg-music");
const heartbeat = document.getElementById("heartbeat");
const congratsSound = document.getElementById("congrats-sound");
const escapeSound = document.getElementById("escape-sound");
const overlay = document.getElementById("start-overlay");

const MAX_NO_CLICKS = 7;
const RUN_AWAY_AT = 4;

let play = true;
let noCount = 0;
let noButtonSize = 1;
let yesButtonSize = 1;

/* ================= START OVERLAY ================= */

overlay.addEventListener("click", () => {
  overlay.style.display = "none";

  bgMusic.volume = 0;
  bgMusic.play();

  heartbeat.volume = 0.2;
  heartbeat.play();

  fadeInMusic(bgMusic, 0.3);
});

/* ================= YES CLICK ================= */

yesBtn.addEventListener("click", () => {

  typeWriter("Yupieeeeee I Love You More Baby Nka ! 💗", title, 50);

  btnContainer.classList.add("hidden");

  // 🌈 Rainbow background
  document.body.classList.add("rainbow-bg");

  // ✨ Glow YES
  yesBtn.classList.add("glow");

  // 📳 Shake screen
  document.body.classList.add("shake");
  setTimeout(() => {
    document.body.classList.remove("shake");
  }, 400);

  fadeOutMusic(bgMusic);
  heartbeat.pause();

  congratsSound.play();

  launchFireworks();

  heartExplosion();
});


/* ================= NO CLICK ================= */

noBtn.addEventListener("click", () => {
  if (!play) return;

  noCount++;

  resizeYesButton();
  shrinkNoButton();
  updateNoButtonText();

  if (noCount >= RUN_AWAY_AT) {
    makeNoRunAway();
  }

  if (noCount >= MAX_NO_CLICKS) {
    startHeartRain();
    noBtn.style.opacity = "0";
    noBtn.style.pointerEvents = "none";
    play = false;
  }
});

/* ================= FUNCTIONS ================= */

function resizeYesButton() {
  if (yesButtonSize < 6) {
    yesButtonSize *= 1.4;
    yesBtn.style.transform = `scale(${yesButtonSize})`;
  }
}

function shrinkNoButton() {
  noButtonSize *= 0.9;
  noBtn.style.transform = `scale(${noButtonSize})`;
}

function updateNoButtonText() {
  const messages = [
    "No 😔",
    "Kom jg ban ot baby 🥺",
    "Na Oun Nka Na 🥹",
    "Ot teh min pit teh baby 😭",
    "Baby B somvor Nka 😭",
    "B chue Jab baby 💔",
    "I gonna Cry baby 😭💔",
  ];
  noBtn.innerHTML = messages[Math.min(noCount - 1, messages.length - 1)];
}

function makeNoRunAway() {
  const x = Math.random() * (window.innerWidth - 120);
  const y = Math.random() * (window.innerHeight - 60);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  escapeSound.play();

  if (navigator.vibrate) {
    navigator.vibrate(100);
  }
}

function startHeartRain() {
  const hearts = document.querySelector(".hearts");

  setInterval(() => {
    const heart = document.createElement("span");
    heart.innerHTML = "💗";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    hearts.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
  }, 300);
}

/* ================= EXTRA EFFECTS ================= */

function fadeInMusic(audio, targetVolume) {
  let fade = setInterval(() => {
    if (audio.volume < targetVolume) {
      audio.volume += 0.02;
    } else {
      clearInterval(fade);
    }
  }, 100);
}

function fadeOutMusic(audio) {
  let fade = setInterval(() => {
    if (audio.volume > 0.05) {
      audio.volume -= 0.05;
    } else {
      audio.pause();
      clearInterval(fade);
    }
  }, 100);
}

function typeWriter(text, element, speed) {
  element.innerHTML = "";
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

function launchConfetti() {
  confetti({
    particleCount: 200,
    spread: 80,
    origin: { y: 0.6 }
  });
}
function launchFireworks() {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 100,
      origin: { x: 0 }
    });

    confetti({
      particleCount: 6,
      angle: 120,
      spread: 100,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

function heartExplosion() {
  for (let i = 0; i < 40; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "💗";
    heart.style.position = "fixed";
    heart.style.left = "50%";
    heart.style.top = "50%";
    heart.style.fontSize = "24px";
    heart.style.transform = `translate(-50%, -50%)`;
    heart.style.transition = "all 1s ease-out";

    document.body.appendChild(heart);

    setTimeout(() => {
      const x = (Math.random() - 0.5) * 500;
      const y = (Math.random() - 0.5) * 500;
      heart.style.transform = `translate(${x}px, ${y}px)`;
      heart.style.opacity = "0";
    }, 50);

    setTimeout(() => {
      heart.remove();
    }, 1000);
  }
}
function animateLoveCounter() {
  const counter = document.getElementById("love-counter");
  let count = 0;
  const interval = setInterval(() => {
    count++;
    counter.innerHTML = `Love Level: ${count}% 💗`;
    if (count >= 100) clearInterval(interval);
  }, 30);
}
animateLoveCounter();
function sparkleEffect() {
  setInterval(() => {
    const sparkle = document.createElement("div");
    sparkle.innerHTML = "✨";
    sparkle.style.position = "fixed";
    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.top = Math.random() * 100 + "vh";
    sparkle.style.opacity = 1;
    sparkle.style.transition = "opacity 2s";
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.style.opacity = 0, 100);
    setTimeout(() => sparkle.remove(), 2000);
  }, 300);
}
sparkleEffect();


