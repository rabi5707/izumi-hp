import Link from "next/link";
import type { Product } from "@/lib/products";
import { SmartImage } from "./SmartImage";

export function Price({ v, tax = "税込" }: { v: number; tax?: string }) {
  return (
    <span className="price-num">
      ¥{v.toLocaleString()}
      <span className="tax">{tax}</span>
    </span>
  );
}

export function CateringPrice({ v }: { v: number }) {
  return (
    <span className="price-num">
      ¥{v.toLocaleString()}
      <span className="tax">〜／お一人様</span>
    </span>
  );
}

export function ProductCard({ p }: { p: Product }) {
  const isCatering = p.type === "catering";
  const tagLabel = isCatering ? "要お見積" : p.tag;
  const tagClass =
    tagLabel === "人気"
      ? " tag-accent"
      : tagLabel === "熨斗可"
        ? " tag-line"
        : tagLabel === "要お見積"
          ? " tag-line"
          : "";

  return (
    <Link href={`/shop/products/${p.id}`} className="prod-card">
      <div style={{ position: "relative" }}>
        <SmartImage
          src={`/images/products/${p.id}.jpg`}
          alt={p.ja}
          labelEn={`IMG / ${p.en.toLowerCase().replace(/\s+/g, "-")}`}
          labelJa={p.ja}
          aspect="4/3"
          className="prod-img"
        />
        {tagLabel && (
          <span
            className={"prod-tag" + tagClass}
            style={{ position: "absolute", top: 12, left: 12 }}
          >
            {tagLabel}
          </span>
        )}
      </div>
      <div className="prod-meta">
        <div>
          <div className="prod-name">{p.ja}</div>
          <div className="prod-en">{p.en}</div>
        </div>
        <div className="prod-price">
          {isCatering ? <CateringPrice v={p.price} /> : <Price v={p.price} />}
        </div>
      </div>
      <div className="prod-foot">
        <span className="serves">{p.serves}</span>
        <span>
          {isCatering ? "ご相談にて承ります" : `納期　${p.lead}`}
        </span>
      </div>
    </Link>
  );
}
