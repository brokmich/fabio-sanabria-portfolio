import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import fabioImg from "../../assets/character/fabio.png";
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

export default function Hero() {
  return (
    <section className="hero section" id="home">
      {/* ── Background landscape layers ── */}
      <div className="hero__sky" aria-hidden="true">
        <div className="hero__sun" />
      </div>

      <div className="hero__clouds" aria-hidden="true">
        <div className="hero__cloud hero__cloud--1" />
        <div className="hero__cloud hero__cloud--2" />
        <div className="hero__cloud hero__cloud--3" />
      </div>

      <div className="hero__hills" aria-hidden="true" />

      {/* Fireflies */}
      <div className="hero__fireflies" aria-hidden="true">
        {FIREFLIES.map((f, i) => (
          <div key={i} className="hero__firefly" style={f.style} />
        ))}
      </div>

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

            {/* PLACEHOLDER: seasonal decoration / item — replace with pixel art */}
            <div
              className="hero__placeholder hero__placeholder--item"
              title="Placeholder: seasonal item art"
            >
              <span className="hero__placeholder-label">🌱 ITEM SLOT</span>
            </div>
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
