// Shared primitives (placeholders, kamon, chips, product card).

const Placeholder = ({ label, center, circle, style }) => (
  <div className={"ph " + (circle ? "ph-circle " : "")} style={style}>
    {label && <div className="ph-label">{label}</div>}
    {center && <div className="ph-center">{center}</div>}
  </div>
);

const Kamon = ({ style }) => <span className="kamon" style={style} aria-hidden />;

const Chip = ({ children, on, accent }) => (
  <span className={"chip" + (on ? " on" : "") + (accent ? " accent" : "")}>{children}</span>
);

const Price = ({ v, tax = "税込" }) => (
  <span className="price-num">¥{v.toLocaleString()}<span className="tax">{tax}</span></span>
);

const ProductCard = ({ p, onOpen }) => (
  <div className="prod-card" onClick={() => onOpen && onOpen(p)}>
    <Placeholder
      label={`IMG / ${p.en.toLowerCase().replace(/\s+/g, "-")}`}
      center={p.ja}
      style={{ aspectRatio: "4/3" }}
    >
      {p.tag && <span className={"prod-tag" + (p.tag === "人気" ? " tag-accent" : p.tag === "熨斗可" ? " tag-line" : "")}>{p.tag}</span>}
    </Placeholder>
    <div>
      <div className="prod-meta">
        <div>
          <div className="prod-name">{p.ja}</div>
          <div className="prod-en">{p.en}</div>
        </div>
        <div className="prod-price"><Price v={p.price} /></div>
      </div>
      <div className="prod-foot">
        <span className="serves">{p.serves}</span>
        <span>納期　{p.lead}</span>
      </div>
    </div>
  </div>
);

// give placeholder tag its own render (since the react child above is misplaced)
// We'll handle it via a wrapper:
const CardImage = ({ p }) => (
  <div className="prod-img ph" style={{
    background: "repeating-linear-gradient(135deg, var(--rule-soft) 0 1px, transparent 1px 14px), var(--bg-alt)",
  }}>
    {p.tag && <span className={"prod-tag" + (p.tag === "人気" ? " tag-accent" : p.tag === "熨斗可" ? " tag-line" : "")}>{p.tag}</span>}
    <div className="ph-label">{`IMG / ${p.en.toLowerCase().replace(/\s+/g, "-")}`}</div>
    <div className="ph-center">{p.ja}</div>
  </div>
);

const ProductCardV2 = ({ p, onOpen }) => (
  <div className="prod-card" onClick={() => onOpen && onOpen(p)}>
    <CardImage p={p} />
    <div className="prod-meta">
      <div>
        <div className="prod-name">{p.ja}</div>
        <div className="prod-en">{p.en}</div>
      </div>
      <div className="prod-price"><Price v={p.price} /></div>
    </div>
    <div className="prod-foot">
      <span className="serves">{p.serves}</span>
      <span>納期　{p.lead}</span>
    </div>
  </div>
);

Object.assign(window, { Placeholder, Kamon, Chip, Price, ProductCard: ProductCardV2, CardImage });
