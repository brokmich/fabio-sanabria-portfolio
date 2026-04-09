import { useRef, forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import HTMLFlipBook from 'react-pageflip'
import './Projects.css'

const PROJECTS = [
  {
    title: 'EVEX PRO',
    status: 'COMPLETE',
    badgeCls: 'badge--emerald',
    description:
      "Enhanced a cloud-based electronic invoicing platform to comply with Costa Rica's Hacienda 4.4 standard. Updated the Angular frontend with new regulation attributes; backend runs on AWS Lambda and DynamoDB with Docker for deployment.",
    tech: ['Angular', 'TypeScript', 'AWS Lambda', 'DynamoDB', 'Docker'],
    demo: null, code: null,
    accent: '#4caf7d',
    highlight: 'var(--emerald)',
  },
  {
    title: 'SignumOne',
    status: 'COMPLETE',
    badgeCls: 'badge--emerald',
    description:
      'Contributed to the refactoring and modernization of an enterprise digital signature platform. Updated HSM integration to the latest AWS CloudHSM SDK, refactored modules for WAR/JAR packaging, and handled WebLogic deployment.',
    tech: ['Java', 'AWS CloudHSM', 'WebLogic', 'Maven'],
    demo: null, code: null,
    accent: '#9c6dd8',
    highlight: 'var(--amethyst)',
  },
  {
    title: 'ABC Señas',
    status: 'COMPLETE',
    badgeCls: 'badge--emerald',
    description:
      'Mobile application for Spanish literacy learning for deaf children. Features interactive learning games and a structured video library for alphabet-based lessons.',
    tech: ['React', 'TypeScript', 'HTML/CSS', 'SQL Server'],
    demo: null, code: null,
    accent: '#4a90d9',
    highlight: 'var(--sapphire)',
  },
  {
    title: 'VR Campus UCR',
    status: 'COMPLETE',
    badgeCls: 'badge--emerald',
    description:
      'Virtual reality campus using Unity as frontend and .NET Core as backend. Implemented a REST API consumed by a Blazor web app for CRUD operations on virtual assets, backed by a relational SQL database.',
    tech: ['Unity', 'C#', '.NET Core', 'Blazor', 'SQL'],
    demo: null, code: null,
    accent: '#e6a817',
    highlight: 'var(--topaz)',
  },
  {
    title: 'Concurrent Web Server',
    status: 'COMPLETE',
    badgeCls: 'badge--emerald',
    description:
      'Transformed a legacy serial web server into a multi-threaded architecture whose clients perform Goldbach operations via HTTP. Built with the producer–consumer pattern in a Linux environment.',
    tech: ['C++', 'Pthreads', 'HTTP', 'Linux', 'Make'],
    demo: null, code: null,
    accent: '#e05252',
    highlight: 'var(--ruby)',
  },
  {
    title: 'Goldbach-C Tool',
    status: 'COMPLETE',
    badgeCls: 'badge--emerald',
    description:
      'C-based program that processes arbitrary integers and computes all valid Goldbach decompositions. Evolved from a serial implementation through Pthreads and OpenMP to a fully distributed MPI version.',
    tech: ['C', 'Pthreads', 'OpenMP', 'MPI', 'Linux'],
    demo: null, code: null,
    accent: '#4caf7d',
    highlight: 'var(--emerald)',
  },
]

const BookPage = forwardRef(({ children, className = '' }, ref) => (
  <div ref={ref} className={`book-page ${className}`}>{children}</div>
))
BookPage.displayName = 'BookPage'

function CardGrid({ inView }) {
  return (
    <div className="projects__grid">
      {PROJECTS.map((p, i) => (
        <motion.div
          key={p.title}
          className="project-card pixel-border"
          style={{ '--card-highlight': p.highlight }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.05 * (i % 3) }}
        >
          <div className="project-card__top">
            <span className={`badge ${p.badgeCls}`}>{p.status}</span>
          </div>
          <h3 className="project-card__title">{p.title}</h3>
          <p className="project-card__desc">{p.description}</p>
          <div className="project-card__chips">
            {p.tech.map(t => <span key={t} className="chip">{t}</span>)}
          </div>
          {(p.demo || p.code) && (
            <div className="project-card__actions">
              {p.demo && <a href={p.demo} className="btn btn--primary" target="_blank" rel="noreferrer">▶ DEMO</a>}
              {p.code && <a href={p.code} className="btn btn--outline" target="_blank" rel="noreferrer">{'{ CODE }'}</a>}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default function Projects() {
  const [headerRef, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const book = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [view, setView] = useState('book')

  const totalPages = PROJECTS.length + 2

  const goNext     = () => book.current?.pageFlip().flipNext()
  const goPrev     = () => book.current?.pageFlip().flipPrev()
  const goTo       = (i) => book.current?.pageFlip().turnToPage(i + 1)
  const handleFlip = (e) => setCurrentPage(e.data)

  const spreadLeft = currentPage % 2 === 0 ? currentPage - 1 : currentPage
  const isActive   = (i) =>
    spreadLeft > 0 && spreadLeft < totalPages - 1 &&
    (i === spreadLeft - 1 || i === spreadLeft)

  return (
    <section className={`projects section${view === 'book' ? ' projects--dark' : ''}`} id="projects">
      <div className="container">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="projects__header"
        >
          <div className="projects__header-row">
            <div>
              <p className="section-label">// QUEST.LOG</p>
              <h2 className="section-heading">Projects</h2>
              <p className="section-sub">
                A selection of quests completed, in progress, and still on the horizon.
              </p>
            </div>
            <div className="projects__view-toggle">
              <button
                className={`projects__view-btn${view === 'book' ? ' projects__view-btn--active' : ''}`}
                onClick={() => setView('book')}
                title="Book view"
              >📖 BOOK</button>
              <button
                className={`projects__view-btn${view === 'cards' ? ' projects__view-btn--active' : ''}`}
                onClick={() => setView('cards')}
                title="Card view"
              >⊞ CARDS</button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {view === 'book' ? (
            <motion.div
              key="book"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Project name tabs */}
              <div className="projects__nav">
                {PROJECTS.map((p, i) => (
                  <button
                    key={p.title}
                    className={`projects__nav-btn${isActive(i) ? ' projects__nav-btn--active' : ''}`}
                    style={{ '--btn-accent': p.accent }}
                    onClick={() => goTo(i)}
                  >
                    {p.title}
                  </button>
                ))}
              </div>

              <div className="projects__book-row">
                <button className="projects__arrow" onClick={goPrev} disabled={currentPage === 0} aria-label="Previous page">◀</button>

                <div className="projects__book-wrap">
                  <HTMLFlipBook
                    ref={book}
                    width={420}
                    height={540}
                    size="stretch"
                    minWidth={260}
                    maxWidth={480}
                    minHeight={400}
                    maxHeight={600}
                    showCover={true}
                    mobileScrollSupport={true}
                    className="projects__flipbook"
                    flippingTime={700}
                    useMouseEvents={true}
                    onFlip={handleFlip}
                  >
                    <BookPage className="book-page--cover">
                      <div className="book-cover__frame">
                        <span className="book-cover__corner-piece">✦</span>
                        <span className="book-cover__corner-piece">✦</span>
                        <span className="book-cover__corner-piece">✦</span>
                        <span className="book-cover__corner-piece">✦</span>
                      </div>
                      <div className="book-cover__inner">
                        <p className="book-cover__label">⚜ QUEST LOG ⚜</p>
                        <div className="book-cover__divider">────────────</div>
                        <div className="book-cover__emblem">⚔</div>
                        <h2 className="book-cover__title">Project<br />Archive</h2>
                        <p className="book-cover__sub">— Vol. I —</p>
                        <div className="book-cover__divider">────────────</div>
                        <p className="book-cover__hint">▶ Open to begin</p>
                      </div>
                    </BookPage>

                    {PROJECTS.map((p, i) => (
                      <BookPage key={p.title} className="book-page--content">
                        <div className="book-page__accent" style={{ background: p.accent }} />
                        <div className="book-page__inner">
                          <div className="book-page__top">
                            <span className={`badge ${p.badgeCls}`}>{p.status}</span>
                            <span className="book-page__num">0{i + 1}</span>
                          </div>
                          <h3 className="book-page__title" style={{ color: p.accent }}>{p.title}</h3>
                          <p className="book-page__desc">{p.description}</p>
                          <div className="book-page__footer">
                            <p className="book-page__tech-label">TECH USED</p>
                            <div className="book-page__chips">
                              {p.tech.map(t => <span key={t} className="chip">{t}</span>)}
                            </div>
                            {(p.demo || p.code) && (
                              <div className="book-page__actions">
                                {p.demo && <a href={p.demo} className="btn btn--primary" target="_blank" rel="noreferrer">▶ DEMO</a>}
                                {p.code && <a href={p.code} className="btn btn--outline" target="_blank" rel="noreferrer">{'{ CODE }'}</a>}
                              </div>
                            )}
                          </div>
                        </div>
                      </BookPage>
                    ))}

                    <BookPage className="book-page--cover book-page--back-cover">
                      <div className="book-cover__frame">
                        <span className="book-cover__corner-piece">✦</span>
                        <span className="book-cover__corner-piece">✦</span>
                        <span className="book-cover__corner-piece">✦</span>
                        <span className="book-cover__corner-piece">✦</span>
                      </div>
                      <div className="book-cover__inner">
                        <div className="book-cover__emblem">✦</div>
                        <p className="book-cover__label">END OF LOG</p>
                        <div className="book-cover__divider">────────────</div>
                        <p className="book-cover__sub">More quests<br />incoming...</p>
                      </div>
                    </BookPage>
                  </HTMLFlipBook>
                </div>

                <button className="projects__arrow" onClick={goNext} disabled={currentPage === totalPages - 1} aria-label="Next page">▶</button>
              </div>

              <p className="projects__hint">Click the arrows or drag the page edges to flip</p>
            </motion.div>
          ) : (
            <motion.div
              key="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardGrid inView={inView} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
