export default function DetailsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="details-section">
      <h3 className="section-title">{title}</h3>
      {children}
    </div>
  )
}
