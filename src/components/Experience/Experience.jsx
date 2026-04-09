import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Experience.css'

const JOBS = [
  {
    role: 'Junior Software Developer',
    company: 'Flecha Roja Technologies',
    period: 'May 2025 – Present',
    color: 'var(--emerald)',
    badgeCls: 'badge--emerald',
    statusLabel: 'ACTIVE',
    xp: '+500 XP',
    bullets: [
      'Refactored core code of critical projects: SignumOne (digital signature platform) and EVEX PRO (electronic invoicing system).',
      'Fixed reported bugs and implemented requested changes based on tickets and feedback from the team lead.',
      'Worked with AWS services — EC2, Lambdas, API Gateway, and DynamoDB — for cloud-based backend integration.',
      'Participated in daily agile team meetings to track sprint progress.',
    ],
  },
  {
    role: 'Business Analyst & Support Developer Intern',
    company: 'Aldeas Infantiles SOS Costa Rica',
    period: 'Aug 2024 – Dec 2024',
    color: 'var(--sapphire)',
    badgeCls: 'badge--sapphire',
    statusLabel: 'COMPLETED',
    xp: '+350 XP',
    bullets: [
      'Led requirement gathering sessions with clients to define system needs.',
      'Maintained continuous communication with the development team, providing guidance using agile methodologies.',
      'Created technical and user documentation for delivered features.',
      'Supported the team by identifying and resolving bugs during development.',
    ],
  },
]

const CERTS = [
  'Oracle Cloud Infrastructure 2025 Certified Architect Associate',
  'Oracle Cloud Infrastructure 2025 Certified Foundations Associate',
  'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
]

function JobCard({ job, delay }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [showXP, setShowXP] = useState(false)

  useEffect(() => {
    if (!inView) return
    const t1 = setTimeout(() => setShowXP(true),  (delay + 0.5) * 1000)
    const t2 = setTimeout(() => setShowXP(false), (delay + 1.8) * 1000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [inView, delay])

  return (
    <motion.div
      ref={ref}
      className="exp-card pixel-border"
      style={{ '--exp-color': job.color }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay }}
    >
      {showXP && (
        <motion.span
          className="exp-card__xp-pop"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -36 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          {job.xp}
        </motion.span>
      )}
      <div className="exp-card__top">
        <span className={`badge ${job.badgeCls}`}>{job.statusLabel}</span>
        <span className="exp-card__period">{job.period}</span>
      </div>
      <h3 className="exp-card__role">{job.role}</h3>
      <p className="exp-card__company" style={{ color: job.color }}>
        ▸ {job.company}
      </p>
      <ul className="exp-card__bullets">
        {job.bullets.map((b, i) => (
          <li key={i} className="exp-card__bullet">{b}</li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="experience section" id="experience">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="experience__header"
        >
          <p className="section-label">// WORK.HISTORY</p>
          <h2 className="section-heading">Experience</h2>
          <p className="section-sub">
            Quests completed in the field — professional roles and responsibilities.
          </p>
        </motion.div>

        <div className="experience__timeline">
          <div className="experience__timeline-end">
            <span className="experience__timeline-end-dot" />
            <span className="experience__timeline-end-label">PRESENT</span>
          </div>

          {JOBS.map((job, i) => (
            <div key={job.company} className="experience__timeline-item">
              <div className="experience__timeline-node" style={{ color: job.color }}>◆</div>
              <JobCard job={job} delay={0.1 + i * 0.15} />
            </div>
          ))}

          <div className="experience__timeline-start">
            <span className="experience__timeline-start-dot" />
            <span className="experience__timeline-start-label">START</span>
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          className="experience__certs pixel-border"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <p className="section-label" style={{ marginBottom: '1rem' }}>// CERTIFICATIONS</p>
          <div className="experience__cert-list">
            {CERTS.map((cert) => (
              <div key={cert} className="experience__cert-item">
                <span className="experience__cert-icon" style={{ color: 'var(--topaz)' }}>◆</span>
                <span className="experience__cert-text">{cert}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
