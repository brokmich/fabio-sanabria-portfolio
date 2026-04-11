import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Skills.css'

const SKILL_CATEGORIES = [
  {
    title: 'Languages',
    icon: '⌨',
    color: 'var(--amethyst)',
    skills: [
      { name: 'JavaScript',  level: 76 },
      { name: 'TypeScript',  level: 75 },
      { name: 'C#',  level: 65 },
      { name: 'Java',        level: 45 },
      { name: 'Python',      level: 40 },
    ],
  },
  {
    title: 'Frameworks',
    icon: '⚙',
    color: 'var(--sapphire)',
    skills: [
      { name: 'React',       level: 88 },
      { name: 'Angular',     level: 78 },
      { name: '.NET Core',   level: 82 },
      { name: 'Blazor',      level: 70 },
    ],
  },
  {
    title: 'Cloud & Tools',
    icon: '🛠',
    color: 'var(--emerald)',
    skills: [
      { name: 'Git',         level: 92 },
      { name: 'AWS',         level: 78 },
      { name: 'Docker',      level: 73 },
      { name: 'SQL Server',  level: 77 },
    ],
  },
]

const SEGMENT_OPACITIES = [1, 0.78, 0.6, 0.45]

function SkillBar({ name, level, color, delay }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [showMax, setShowMax] = useState(false)
  const isMax = level >= 90

  useEffect(() => {
    if (!inView || !isMax) return
    const t = setTimeout(() => setShowMax(true), (delay + 1) * 1000)
    return () => clearTimeout(t)
  }, [inView, isMax, delay])

  const segments = [0, 1, 2, 3].map(i => ({
    filled: Math.min(Math.max(level - i * 25, 0), 25) / 25,
    opacity: SEGMENT_OPACITIES[i],
  }))

  return (
    <div className="skill-bar" ref={ref}>
      <div className="skill-bar__header">
        <span className="skill-bar__name">{name}</span>
        <span className="skill-bar__level" style={{ color }}>
          LVL {level}
          {showMax && <span className="skill-bar__max"> ★MAX</span>}
        </span>
      </div>
      <div className="skill-bar__track">
        {segments.map((seg, i) => (
          <div key={i} className="skill-bar__segment">
            <motion.div
              className="skill-bar__seg-fill"
              style={{ background: color, opacity: seg.opacity }}
              initial={{ width: '0%' }}
              animate={inView ? { width: `${seg.filled * 100}%` } : {}}
              transition={{ duration: 0.8, delay: delay + i * 0.1, ease: 'easeOut' }}
            />
          </div>
        ))}
        <div className="skill-bar__notches" aria-hidden="true">
          {[25, 50, 75].map(v => (
            <div key={v} className="skill-bar__notch" style={{ left: `${v}%` }} />
          ))}
        </div>
      </div>
      <div className="skill-bar__tiers" aria-hidden="true">
        <span>Basic</span>
        <span>Intermediate</span>
        <span>Advanced</span>
        <span>Expert</span>
      </div>
    </div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="skills section" id="skills">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="skills__header"
        >
          <p className="section-label">// SKILLS.EXE</p>
          <h2 className="section-heading">Tech Stack</h2>
          <p className="section-sub">
            The tools and languages I&apos;ve levelled up through real projects.
          </p>
        </motion.div>

        <div className="skills__grid">
          {SKILL_CATEGORIES.map(({ title, icon, color, skills }, catIdx) => (
            <motion.div
              key={title}
              className="skills__category pixel-border"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + catIdx * 0.1 }}
            >
              <div className="skills__cat-header">
                <span className="skills__cat-icon">{icon}</span>
                <span className="skills__cat-title" style={{ color }}>{title}</span>
              </div>
              <div className="skills__bars">
                {skills.map(({ name, level }, i) => (
                  <SkillBar
                    key={name}
                    name={name}
                    level={level}
                    color={color}
                    delay={0.1 + i * 0.08}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
