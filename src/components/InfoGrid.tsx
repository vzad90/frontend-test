import type { InfoItemData } from '../types/component.types'

export default function InfoGrid({ items }: { items: InfoItemData[] }) {
  return (
    <div className="info-grid">
      {items
        .filter(i => i.value)
        .map(({ label, value }, index) => (
          <div key={index} className="info-item">
            <div className="info-label">{label}</div>
            <div className="info-value">{value}</div>
          </div>
        ))}
    </div>
  )
}
