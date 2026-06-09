import { projects } from '@/lib/pipeline/projects'

/**
 * Screen-reader text fallback.
 *
 * Visually hidden but fully accessible. Renders all portfolio content as
 * semantic HTML so screen reader users get the full experience without
 * navigating the canvas.
 *
 * Placed as a sibling to the canvas in pipeline-canvas.tsx.
 */
export function SrFallback() {
  return (
    <section
      aria-label="Portfolio as a list -- skip the graph"
      className="sr-only"
    >
      <h1>Ahsan Riaz -- AI Systems Engineer</h1>
      <p>
        I build the systems that make your backend, your AI layer, and your
        automation actually work together.
      </p>
      <p>
        95% Job Success on Upwork. $7K+ earned. 30+ projects shipped. 100K+
        records handled.
      </p>

      <h2>Projects</h2>
      <ul>
        {Object.entries(projects).map(([key, p]) => (
          <li key={key}>
            <h3>{p.title}</h3>
            <p>{p.subtitle}</p>
            <p>
              <strong>Problem:</strong> {p.problem}
            </p>
            <p>
              <strong>Built:</strong> {p.built}
            </p>
            {p.outcome && (
              <p>
                <strong>Outcome:</strong> {p.outcome}
              </p>
            )}
            {p.stack.length > 0 && (
              <p>
                <strong>Stack:</strong> {p.stack.join(', ')}
              </p>
            )}
            {p.links.length > 0 && (
              <ul>
                {p.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <h2>Contact</h2>
      <ul>
        <li>
          <a href="mailto:ahsanriaz8000@gmail.com">ahsanriaz8000@gmail.com</a>
        </li>
        <li>
          <a href="https://github.com/AhsanRiaz786">GitHub: AhsanRiaz786</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/ahsan-riaz-1254992a3">
            LinkedIn: ahsan-riaz
          </a>
        </li>
        <li>
          <a href="https://www.upwork.com/freelancers/~01d4988598a9368ee5">
            Upwork: Top Rated Profile
          </a>
        </li>
      </ul>
    </section>
  )
}
