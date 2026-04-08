import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import baseImg   from '../../assets/character/base.png'
import casualImg from '../../assets/character/casual.png'
import armorImg  from '../../assets/character/armor.png'
import swimImg   from '../../assets/character/swim.png'
import './About.css'

const CHARACTERS = [
  { img: casualImg, label: 'DEVELOPER', class: 'Full-Stack Dev',  color: 'var(--emerald)',  hp: 92, mp: 78 },
  { img: armorImg,  label: 'KNIGHT',    class: 'Bug Slayer',      color: 'var(--sapphire)', hp: 100, mp: 45 },
  { img: swimImg,   label: 'SWIMMER',   class: 'Off the Clock',   color: 'var(--topaz)',    hp: 80, mp: 95 },
]

const STATS = [
  { label: 'NAME',     value: 'Fabio Sanabria' },
  { label: 'CLASS',    value: 'Software Developer' },
  { label: 'LOCATION', value: 'Cartago, Costa Rica' },
  { label: 'XP',       value: '1+ Year' },
  { label: 'LANG',     value: 'EN / ES' },
]

const INTERESTS = [
  { icon: '⚔️', label: 'RPG Games' },
  { icon: '🧩', label: 'Problem Solving' },
  { icon: '☁️', label: 'Cloud Tech' },
  { icon: '📚', label: 'Learning' },
  { icon: '🎮', label: 'Game Dev' },
  { icon: '🎵', label: 'Music' },
]

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [charIdx, setCharIdx] = useState(0)
  const [dir, setDir] = useState(1)

  const prev = () => { setDir(-1); setCharIdx(i => (i - 1 + CHARACTERS.length) % CHARACTERS.length) }
  const next = () => { setDir(1);  setCharIdx(i => (i + 1) % CHARACTERS.length) }

  const char = CHARACTERS[charIdx]

  return (
    <section className="about section" id="about" ref={ref}>
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="about__header"
        >
          <p className="section-label">// PLAYER.INFO</p>
          <h2 className="section-heading">About Me</h2>
          <p className="section-sub">A look at the character behind the keyboard.</p>
        </motion.div>

        <div className="about__grid">

          {/* Character Sheet */}
          <motion.div
            className="about__sheet pixel-border"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="about__sheet-header">
              <span className="about__sheet-title">CHARACTER SHEET</span>
              <span className="badge badge--emerald">● ONLINE</span>
            </div>

            {/* Character selector */}
            <div className="about__char-select">
              <button className="about__char-arrow" onClick={prev} aria-label="Previous character">◀</button>

              <div className="about__char-stage">
                <div className="about__char-slide">
                  <motion.div
                    className="about__avatar-grid"
                    style={{ borderColor: char.color, boxShadow: `3px 3px 0 0 ${char.color}` }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="about__avatar-wrap">
                      <img
                        src={baseImg}
                        alt="Fabio base"
                        className="about__avatar-img"
                      />
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={charIdx}
                          src={char.img}
                          alt={`Fabio — ${char.label}`}
                          className="about__avatar-img about__avatar-outfit"
                          initial={{ opacity: 0, x: dir * 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: dir * -40 }}
                          transition={{ duration: 0.15, ease: 'easeInOut' }}
                        />
                      </AnimatePresence>
                    </div>
                  </motion.div>
                  <motion.div
                    key={`label-${charIdx}`}
                    className="about__char-label"
                    style={{ color: char.color }}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    ★ {char.label} ★
                  </motion.div>
                  <motion.div
                    key={`class-${charIdx}`}
                    className="about__char-class"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 }}
                  >
                    {char.class}
                  </motion.div>
                </div>
              </div>

              <button className="about__char-arrow" onClick={next} aria-label="Next character">▶</button>
            </div>

            {/* Dot indicators */}
            <div className="about__char-dots">
              {CHARACTERS.map((_, i) => (
                <button
                  key={i}
                  className={`about__char-dot${i === charIdx ? ' about__char-dot--active' : ''}`}
                  onClick={() => setCharIdx(i)}
                  aria-label={`Select ${CHARACTERS[i].label}`}
                />
              ))}
            </div>

            {/* HP/MP bars */}
            <div className="about__hp-bar-group">
              <div className="about__bar-row">
                <span>HP</span>
                <div className="about__mini-bar">
                  <motion.div
                    className="about__mini-fill"
                    style={{ background: 'var(--emerald)' }}
                    animate={{ width: `${char.hp}%` }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  />
                </div>
                <span>{char.hp}/100</span>
              </div>
              <div className="about__bar-row">
                <span>MP</span>
                <div className="about__mini-bar">
                  <motion.div
                    className="about__mini-fill"
                    style={{ background: 'var(--sapphire)' }}
                    animate={{ width: `${char.mp}%` }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  />
                </div>
                <span>{char.mp}/100</span>
              </div>
            </div>

            <table className="about__stats-table">
              <tbody>
                {STATS.map(({ label, value }) => (
                  <tr key={label}>
                    <td className="about__stat-label">{label}</td>
                    <td className="about__stat-value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Bio */}
          <motion.div
            className="about__bio-block"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="about__bio-title">My Story</h3>
            <p className="about__bio-text">
              I&apos;m a Software Engineer based in Cartago, Costa Rica. I recently
              graduated from the Universidad de Costa Rica with a Bachelor&apos;s in
              Computer Science — Software Engineering emphasis — earning a 9.2/10 GPA.
              Currently working as a Junior Software Developer at Flecha Roja
              Technologies, where I build and maintain enterprise-grade platforms.
            </p>
            <p className="about__bio-text">
              My toolkit spans the full stack: Java and C++ for systems work,
              TypeScript and React for modern web apps, Angular and .NET Core for
              enterprise software, and AWS &amp; Oracle Cloud for scalable infrastructure.
              I earned three OCI certifications in 2025 and keep levelling up daily.
            </p>
            <p className="about__bio-text">
              When I&apos;m not shipping code you&apos;ll find me exploring open-world RPGs,
              studying game mechanics, or picking up a new framework. I believe
              great software — like great games — is built with intention and care
              for those who use it.
            </p>

            <div className="about__interests">
              <p className="about__interests-label section-label">INTERESTS</p>
              <div className="about__interests-grid">
                {INTERESTS.map(({ icon, label }) => (
                  <div key={label} className="about__interest-chip">
                    <span>{icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
