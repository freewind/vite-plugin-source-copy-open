import { useState } from 'react';

function StatusBadge({ label }: { label: string }) {
  return <span className="badge">{label}</span>;
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="card">
      <StatusBadge label="inspect me" />
      <h2>{title}</h2>
      <p>{description}</p>
    </article>
  );
}

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">open-editor local demo</p>
        <h1>Vite + React source locator</h1>
        <p className="lead">
          Long press or use the floating toggle to inspect a component, then jump to its source.
        </p>
        <button className="primary" onClick={() => setCount((value) => value + 1)}>
          Click count: {count}
        </button>
      </header>

      <section className="grid">
        <FeatureCard
          title="React source injection"
          description="JSX elements are annotated before React transforms them."
        />
        <FeatureCard
          title="Vite dev middleware"
          description="The dev server exposes the open-editor endpoint for local source lookup."
        />
        <FeatureCard
          title="Minimal local wiring"
          description="This demo consumes the copied upstream packages from the current workspace."
        />
      </section>
    </main>
  );
}
