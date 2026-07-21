import { useEffect, useState } from 'react'

const disciplines = [
  { title: 'marca', label: 'Brand strategy & identity', description: 'Una marca con un punto de vista claro, lista para hacerse notar y crecer.', palette: 'coral' },
  { title: 'web', label: 'Digital experience & commerce', description: 'Experiencias digitales que convierten la atención en una decisión.', palette: 'blue' },
  { title: 'campaña', label: 'Campaigns & art direction', description: 'Campañas que hacen que una buena idea llegue más lejos y deje huella.', palette: 'acid' },
  { title: 'experiencia', label: 'User experience & product', description: 'Productos digitales claros, útiles y pensados alrededor de las personas.', palette: 'violet' },
]

const projects = [
  { name: 'Marea', type: 'Hospitality / Identity', year: '2025', className: 'marea', tag: 'Repositioning' },
  { name: 'Nura', type: 'Wellness / Digital', year: '2025', className: 'nura', tag: 'E-commerce' },
  { name: 'Aster', type: 'Architecture / Motion', year: '2024', className: 'aster', tag: 'Brand world' },
  { name: 'Forma', type: 'Culture / Campaign', year: '2024', className: 'forma', tag: 'Campaign' },
  { name: 'Onda', type: 'Fintech / Product', year: '2024', className: 'onda', tag: 'UX system' },
  { name: 'Río', type: 'Fashion / Identity', year: '2023', className: 'rio', tag: 'Visual identity' },
]

function Arrow({ direction = 'right' }) { return <span aria-hidden="true" className={`arrow arrow--${direction}`}>→</span> }

function App() {
  const [active, setActive] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formStep, setFormStep] = useState(1)
  const discipline = disciplines[active]
  const move = (step) => setActive((current) => (current + step + disciplines.length) % disciplines.length)

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft') move(-1)
      if (event.key === 'ArrowRight') move(1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return <main className={`page palette--${discipline.palette}`}>
    <section className="hero" aria-labelledby="hero-title">
      <header className="nav"><a className="brand" href="#top" aria-label="Inicio">DJ<span>—</span></a><a className="nav-contact" href="#contact">Hablemos <Arrow /></a></header>
      <button className="slide-control slide-control--previous" onClick={() => move(-1)} aria-label="Disciplina anterior"><span className="control-label">Anterior</span><Arrow direction="left" /></button>
      <button className="slide-control slide-control--next" onClick={() => move(1)} aria-label="Siguiente disciplina"><Arrow /><span className="control-label">Siguiente</span></button>
      <div className="hero-content" id="top">
        <p className="section-label">0{active + 1} / 0{disciplines.length} — {discipline.label}</p>
        <h1 id="hero-title">Impulsa tu <span key={discipline.title} className="hero-word">{discipline.title}</span>.</h1>
        <div className="hero-bottom"><p className="hero-description" key={discipline.description}>{discipline.description}</p><div className="hero-actions"><a className="button button--dark" href="#contact">Empezar un proyecto <Arrow /></a><a className="text-link" href="#work">Ver proyectos <Arrow /></a></div></div>
      </div>
      <div className="hero-index" aria-label="Seleccionar disciplina">{disciplines.map((item, index) => <button key={item.title} className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={`Ver ${item.title}`} />)}</div>
    </section>
    <section className="work section" id="work" aria-labelledby="work-title">
      <div className="section-heading"><h2 id="work-title">Diseño a la altura de tu ambición.</h2><p>Identidades, plataformas digitales y campañas convertidas en señales claras para destacar, conectar y seguir creciendo.</p></div>
      <div className="projects">{projects.map((project, index) => <article className={`project project--${project.className}`} key={project.name} tabIndex="0"><div className="project-art" aria-hidden="true"><span className="project-number">0{index + 1}</span><span className="project-symbol">{project.name.slice(0, 1)}</span><span className="project-orbit" /></div><div className="project-meta"><div><p>{project.name}</p><span>{project.type}</span></div><div className="project-reveal"><span>{project.tag} / {project.year}</span><Arrow /></div></div></article>)}</div>
    </section>
    <section className="contact section" id="contact" aria-labelledby="contact-title">
      <div className="contact-intro"><p className="section-label">Start something / 2026</p><h2 id="contact-title">Tu siguiente etapa empieza con una buena conversación.</h2><p>Cuéntame qué necesitas y recibirás una primera respuesta por email en un máximo de dos días laborables. Sin compromiso ni llamadas inesperadas.</p></div>
      {isSubmitted ? <div className="form-success" role="status"><span>✓</span><h3>Recibido. Hablemos pronto.</h3><p>Tu proyecto ya está en el radar.</p></div> :
        <form className="contact-form" onSubmit={(event) => { event.preventDefault(); formStep === 1 ? setFormStep(2) : setIsSubmitted(true) }}>
          <div className="form-progress"><span>Paso 0{formStep} / 02</span><i style={{ '--progress': `${formStep * 50}%` }} /></div>
          {formStep === 1 ? <><label>¿En qué podemos trabajar juntos?<select name="service" defaultValue="" required><option value="" disabled>Selecciona una disciplina</option><option>Marca e identidad</option><option>Diseño web</option><option>Campaña publicitaria</option><option>Experiencia de usuario</option><option>Un proyecto completo</option></select></label><label>Tu email<input type="email" name="email" placeholder="hola@tuempresa.com" required /></label><button className="button button--light" type="submit">Continuar <Arrow /></button></> : <><label>Inversión orientativa <span>(opcional)</span><select name="budget" defaultValue=""><option value="" disabled>Selecciona un rango</option><option>Menos de 3.000 €</option><option>3.000 € — 8.000 €</option><option>8.000 € — 15.000 €</option><option>Más de 15.000 €</option><option>Prefiero hablarlo</option></select></label><label>¿Cuándo te gustaría empezar?<select name="timeline" defaultValue=""><option value="" disabled>Selecciona un plazo</option><option>Lo antes posible</option><option>Durante el próximo mes</option><option>En los próximos 2–3 meses</option><option>Solo estoy explorando</option></select></label><label className="field-message">Cuéntame un poco más <span>(opcional)</span><textarea name="message" rows="3" placeholder="Objetivo, empresa, contexto…" /></label><div className="form-actions"><button className="text-button" type="button" onClick={() => setFormStep(1)}>← Volver</button><button className="button button--light" type="submit">Enviar proyecto <Arrow /></button></div></>}
          <p className="form-note">Sin compromiso. Solo una primera respuesta clara por email para valorar el encaje y los siguientes pasos.</p>
        </form>}
    </section>
    <footer><span>© 2026 DJ</span><a href="#top">Volver arriba ↑</a><span>Made with intent.</span></footer>
  </main>
}

export default App
