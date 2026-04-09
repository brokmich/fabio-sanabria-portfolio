import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import fabioImg from "../../assets/character/fabio.png";
import keyboardImg from "../../assets/items/keyboard.png";
import "./Hero.css";

const ROLES = [
  "Software Developer",
  "Full-Stack Engineer",
  "Cloud Enthusiast",
  "Problem Solver",
];

function Typewriter({ texts }) {
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    let timeout;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, 80);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, 40);
    } else {
      setDeleting(false);
      setIndex((i) => (i + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, index, texts]);

  return (
    <span className="hero__typewriter">
      {display}
      <span className="hero__cursor">_</span>
    </span>
  );
}

/* Six firefly dots with random trajectories via CSS vars */
const FIREFLIES = [
  {
    style: {
      left: "15%",
      top: "40%",
      "--fx": "30px",
      "--fy": "-20px",
      animationDuration: "4s",
      animationDelay: "0s",
    },
  },
  {
    style: {
      left: "25%",
      top: "60%",
      "--fx": "-20px",
      "--fy": "-35px",
      animationDuration: "5s",
      animationDelay: "1.2s",
    },
  },
  {
    style: {
      left: "70%",
      top: "30%",
      "--fx": "25px",
      "--fy": "20px",
      animationDuration: "6s",
      animationDelay: "0.4s",
    },
  },
  {
    style: {
      left: "80%",
      top: "55%",
      "--fx": "-30px",
      "--fy": "-15px",
      animationDuration: "4.5s",
      animationDelay: "2s",
    },
  },
  {
    style: {
      left: "50%",
      top: "25%",
      "--fx": "15px",
      "--fy": "30px",
      animationDuration: "7s",
      animationDelay: "0.8s",
    },
  },
  {
    style: {
      left: "60%",
      top: "70%",
      "--fx": "-25px",
      "--fy": "-25px",
      animationDuration: "5.5s",
      animationDelay: "1.6s",
    },
  },
];

// ── Night star assets ──
import star1 from "../../assets/night/star-1.png";
import star2 from "../../assets/night/star-2.png";
import star3 from "../../assets/night/star-3.png";
import star4 from "../../assets/night/star-4.png";
import star5 from "../../assets/night/star-5.png";
import star6 from "../../assets/night/star-6.png";
import star7 from "../../assets/night/star-7.png";
import star8 from "../../assets/night/star-8.png";
import star9 from "../../assets/night/star-9.png";

// ── Sun / moon assets ──
import morningSun   from "../../assets/morning/sun.png";
import afternoonSun from "../../assets/afternoon/sun.png";
import eveningSun   from "../../assets/evening/sun.png";
import nightMoon    from "../../assets/night/moon.png";

// ── Morning bird assets ──
import bird1 from "../../assets/morning/bird-1.png";
import bird2 from "../../assets/morning/bird-2.png";

// ── Afternoon cloud assets ──
import afCloud1 from "../../assets/afternoon/cloud-1.png";
import afCloud2 from "../../assets/afternoon/cloud-2.png";
import afCloudSmall from "../../assets/afternoon/cloud-small.png";

// ── Evening cloud assets ──
import evCloud1 from "../../assets/evening/cloud-1.png";
import evCloud2 from "../../assets/evening/cloud-2.png";
import evCloudSmall from "../../assets/evening/cloud-small.png";

const STAR_IMGS = [
  star1,
  star2,
  star3,
  star4,
  star5,
  star6,
  star7,
  star8,
  star9,
];

const STAR_SIZES = [24, 10, 18, 8, 20, 12, 16, 8, 14];

const STARS = Array.from({ length: 40 }, (_, i) => ({
  src: STAR_IMGS[i % STAR_IMGS.length],
  left: `${(i * 73 + 17 * (i % 5) + 3) % 99}%`,
  top: `${(i * 41 + 23 * (i % 7) + 11) % 85}%`,
  size: STAR_SIZES[i % STAR_SIZES.length],
  delay: `${(i * 0.37) % 4}s`,
  dur: `${2 + (i % 5) * 0.4}s`,
}));

// Frames cycle: bird2 → bird3 → bird1 → bird3
const BIRD_FRAMES = [bird1, bird2];

const BIRDS = [
  { top: "15%", dur: "14s", delay: "0s", size: 48 },
  { top: "10%", dur: "18s", delay: "3s", size: 16 },
  { top: "22%", dur: "12s", delay: "6s", size: 60 },
  { top: "13%", dur: "16s", delay: "1.5s", size: 12 },
  { top: "8%", dur: "20s", delay: "4s", size: 20 },
  { top: "20%", dur: "10s", delay: "7s", size: 72 },
];

function BirdSprite({ top, dur, delay, size }) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setFrame((f) => (f + 1) % BIRD_FRAMES.length),
      150,
    );
    return () => clearInterval(id);
  }, []);
  return (
    <img
      src={BIRD_FRAMES[frame]}
      alt=""
      className="hero__bird"
      style={{
        top,
        animationDuration: dur,
        animationDelay: delay,
        height: size,
      }}
    />
  );
}

export default function Hero() {
  const { theme } = useTheme();

  const isNight = theme === "night";
  const isMorning = theme === "morning";
  const isEvening = theme === "evening";

  return (
    <section className={`hero section hero--${theme}`} id="home">
      {/* ── Sky ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={theme}
          className={`hero__sky hero__sky--${theme}`}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
        >
          <img
            src={isNight ? nightMoon : isMorning ? morningSun : isEvening ? eveningSun : afternoonSun}
            alt=""
            className={isNight ? "hero__moon" : "hero__sun"}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Stars (night only) ── */}
      {isNight && (
        <div className="hero__stars" aria-hidden="true">
          {STARS.map((s, i) => (
            <img
              key={i}
              src={s.src}
              alt=""
              className="hero__star"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                animationDelay: s.delay,
                animationDuration: s.dur,
              }}
            />
          ))}
        </div>
      )}

      {/* ── Birds (morning only) ── */}
      {isMorning && (
        <div className="hero__birds" aria-hidden="true">
          {BIRDS.map((b, i) => (
            <BirdSprite
              key={i}
              top={b.top}
              dur={b.dur}
              delay={b.delay}
              size={b.size}
            />
          ))}
        </div>
      )}

      {/* ── Clouds (afternoon + evening) ── */}
      {theme === "afternoon" && (
        <div className="hero__clouds" aria-hidden="true">
          <img src={afCloud1} alt="" className="hero__cloud hero__cloud--1" />
          <img src={afCloud2} alt="" className="hero__cloud hero__cloud--2" />
          <img
            src={afCloudSmall}
            alt=""
            className="hero__cloud hero__cloud--3"
          />
        </div>
      )}
      {isEvening && (
        <div className="hero__clouds" aria-hidden="true">
          <img src={evCloud1} alt="" className="hero__cloud hero__cloud--1" />
          <img src={evCloud2} alt="" className="hero__cloud hero__cloud--2" />
          <img
            src={evCloudSmall}
            alt=""
            className="hero__cloud hero__cloud--3"
          />
        </div>
      )}

      <div className="hero__hills" aria-hidden="true" />

      {/* ── Fireflies (evening + night only) ── */}
      {(isNight || isEvening) && (
        <div className="hero__fireflies" aria-hidden="true">
          {FIREFLIES.map((f, i) => (
            <div key={i} className="hero__firefly" style={f.style} />
          ))}
        </div>
      )}

      {/* ── Main content ── */}
      <div className="container hero__inner">
        {/* Left: text */}
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="hero__greeting section-label">
            ✦ NEW PLAYER HAS ARRIVED
          </p>

          <h1 className="hero__name">
            Fabio
            <br />
            Sanabria
          </h1>

          <p className="hero__role">
            <Typewriter texts={ROLES} />
          </p>

          <p className="hero__bio">
            Building robust software by day, exploring digital worlds by night.
            I craft clean, efficient code with the same dedication I bring to
            levelling up in any adventure.
          </p>

          <div className="hero__ctas">
            <a href="#projects" className="btn btn--primary">
              ▶ VIEW WORK
            </a>
            <a href="#contact" className="btn btn--outline">
              ✉ CONTACT ME
            </a>
          </div>
        </motion.div>

        {/* Right: sprite display */}
        <motion.div
          className="hero__sprite-area"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          {/* Wooden frame */}
          <div className="hero__sprite-frame">
            <div className="hero__sprite-nameplate">
              <span>★</span> PLAYER ONE <span>★</span>
            </div>

            <img
              src={fabioImg}
              alt="Fabio Sanabria — pixel art character"
              className="hero__sprite-img"
            />

            <img
              src={keyboardImg}
              alt="Pixel art keyboard"
              className="hero__item-img"
            />
          </div>

          {/* PLACEHOLDER: animal companion — replace with pixel art */}
          <div
            className="hero__placeholder hero__placeholder--pet"
            title="Placeholder: pet / animal companion"
          >
            <span className="hero__placeholder-label">🐾 PET SLOT</span>
          </div>
        </motion.div>
      </div>

      {/* ── Ground strip ── */}
      <div className="hero__ground" aria-hidden="true">
        <div className="hero__ground-inner" />
      </div>

      {/* PLACEHOLDER: background scene painting — replace with landscape pixel art */}
      <div
        className="hero__placeholder hero__placeholder--bg"
        aria-label="Placeholder: background landscape art"
      >
        <span className="hero__placeholder-label">🖼 BACKGROUND ART</span>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-label section-label">SCROLL</span>
        <div className="hero__scroll-arrow">▼</div>
      </div>
    </section>
  );
}
