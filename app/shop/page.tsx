import Link from "next/link";
import { CATEGORIES, PRODUCTS, isEc } from "@/lib/products";
import { SmartImage } from "@/components/SmartImage";
import { localBusinessLd, breadcrumbLd, jsonLdScript } from "@/lib/seo";

function Marker({ n, kanji, en }: { n: string; kanji: string; en: string }) {
  return (
    <div className="shop-marker">
      <span className="num">{n}</span>
      <span className="rule" aria-hidden />
      <span className="stamp" aria-hidden>
        {kanji}
      </span>
      <span className="rule" aria-hidden />
      <span className="en">{en}</span>
    </div>
  );
}

function SnowflakeIcon({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M24 6v36M6 24h36M11 11l26 26M37 11L11 37" />
      <path d="M20 10l4 4 4-4M20 38l4-4 4 4M10 20l4 4-4 4M38 20l-4 4 4 4" />
    </svg>
  );
}

function CalendarIcon({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="8" y="12" width="32" height="28" />
      <path d="M16 8v8M32 8v8M8 22h32" />
      <circle cx="24" cy="30" r="1.6" fill="currentColor" />
    </svg>
  );
}

function BowlIcon({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 22h36c0 9-8 16-18 16S6 31 6 22z" />
      <path d="M16 14c0-2 2-4 4-4M24 12c0-2 2-4 4-4" />
    </svg>
  );
}

const QUALITY = [
  {
    Icon: SnowflakeIcon,
    ja: "急速冷凍",
    desc: "仕込み後すぐに凍結し、風味を閉じ込めます。",
  },
  {
    Icon: CalendarIcon,
    ja: "計画できる食卓",
    desc: "必要な日に合わせて、無理なくご用意いただけます。",
  },
  {
    Icon: BowlIcon,
    ja: "板前の味そのまま",
    desc: "解凍するだけで、整えられた一膳に。",
  },
];

const OCCASIONS = [
  { slug: "okuizome", label: "お食い初め・七五三" },
  { slug: "houji", label: "法要・法事" },
  { slug: "kisei", label: "帰省・家族の集まり" },
  { slug: "zoutou", label: "ご贈答・季節のご挨拶" },
];

const TIMELINE = [
  { yr: "1974", ev: "創業" },
  { yr: "1990年代", ev: "仕出し・宴会事業拡充" },
  { yr: "現在", ev: "全国へ冷凍配送" },
];

const FAQS = [
  {
    q: "解凍方法・時間の目安は？",
    a: "冷蔵庫での自然解凍をおすすめしております。目安は約12〜24時間です。",
  },
  {
    q: "複数の配送先に分けて送れますか？",
    a: "承ります。1配送先につき送料¥1,500、各配送先のご注文額が¥10,000以上で送料無料となります。",
  },
  {
    q: "賞味期限はどのくらいですか？",
    a: "冷凍状態で製造日より90日を目安にしております。詳細は商品ごとに記載しています。",
  },
  {
    q: "のし・名入れは可能ですか？",
    a: "用途に応じたのし紙をご用意しております。ご注文時にご指定ください。",
  },
];

function HeroSection() {
  return (
    <section className="shell" style={{ paddingTop: 24 }}>
      <div className="hero">
        <div className="hero-copy">
          <div>
            <Marker n="01" kanji="贈" en="Frozen · Nationwide" />
            <h1
              className="hero-headline"
              style={{ fontSize: 52, marginTop: 0 }}
            >
              贈る心を、
              <br />
              冷凍便で。
            </h1>
            <p className="hero-sub" style={{ marginTop: 24 }}>
              仕込みたての味わいを閉じ込め、全国へ。
              <br />
              横浜の仕出し屋が整える、節目の食卓のためのお品。
            </p>
          </div>
          <div>
            <dl className="hero-meta">
              <div>
                <dt>配送</dt>
                <dd>全国（クール便）</dd>
              </div>
              <div>
                <dt>送料</dt>
                <dd>
                  ¥1,500／1か所
                  <br />
                  <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>
                    （1か所¥10,000以上で無料）
                  </span>
                </dd>
              </div>
              <div>
                <dt>納期</dt>
                <dd>中3日でお届け</dd>
              </div>
            </dl>
            <div style={{ marginTop: 28 }}>
              <Link href="#lineup" className="btn btn-accent">
                商品一覧へ →
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-visual" style={{ position: "relative" }}>
          <SmartImage
            src="/images/hero.png"
            alt="冷凍折詰のお品書き — 株式会社イズミ産業"
            labelEn="HERO / shop"
            labelJa="冷凍折詰のお品書き"
            aspect="fill"
            priority
            objectPosition="30% center"
          />
        </div>
      </div>
    </section>
  );
}

function QualitySection() {
  return (
    <section className="shell" style={{ padding: "80px 40px 0" }}>
      <Marker n="02" kanji="凍" en="Frozen Quality" />
      <h2 className="shop-section-h">冷凍だからこそ、できること。</h2>
      <p className="shop-section-lead">
        仕込みたてを急速冷凍。解凍しても美味しさと彩りを保ちます。
      </p>
      <div className="shop-quality-grid" style={{ marginTop: 48 }}>
        {QUALITY.map(({ Icon, ja, desc }, i) => (
          <div key={ja} className="shop-quality-cell">
            <span className="feat-num">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="icon">
              <Icon />
            </div>
            <h3 className="ja">{ja}</h3>
            <p className="desc">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function OccasionSection() {
  return (
    <section className="shell" style={{ padding: "80px 40px 0" }}>
      <Marker n="03" kanji="節" en="For Every Occasion" />
      <h2 className="shop-section-h">大切な場面に、そっと寄り添う。</h2>
      <div className="shop-occasion-grid" style={{ marginTop: 40 }}>
        {OCCASIONS.map((o) => (
          <div key={o.slug} className="shop-occasion-card">
            <SmartImage
              src={`/images/occasion/${o.slug}.png`}
              alt={o.label}
              labelEn={`OCCASION / ${o.slug}`}
              labelJa={o.label}
              aspect="4/3"
            />
            <div className="label">{o.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CraftSection() {
  return (
    <section className="shell" style={{ padding: "80px 40px 0" }}>
      <Marker n="04" kanji="匠" en="Our Craft, Since 1974" />
      <div className="shop-craft">
        <div style={{ position: "relative" }}>
          <SmartImage
            src="/images/about/kitchen.png"
            alt="厨房で仕立てる板前"
            labelEn="IMG / kitchen"
            labelJa="板前の手仕事"
            aspect="4/3"
          />
        </div>
        <div>
          <h2 className="shop-section-h">板前の手仕事、半世紀。</h2>
          <p className="shop-section-lead">
            昭和四十九年、横浜・保土ヶ谷にて仕出し屋として創業。
            半世紀にわたり、厨房の一皿一皿に真心を注いでまいりました。
            HACCPに沿った衛生管理のもと、安心してお召し上がりいただけるかたちでお届けいたします。
          </p>
          <div className="shop-craft-timeline">
            {TIMELINE.map((t) => (
              <div key={t.yr} className="row">
                <span className="yr">{t.yr}</span>
                <span className="ev">{t.ev}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="shell" style={{ padding: "80px 40px 0" }}>
      <Marker n="05" kanji="問" en="FAQ" />
      <h2 className="shop-section-h">よくあるご質問</h2>
      <div className="shop-faq-grid" style={{ marginTop: 40 }}>
        {FAQS.map((f) => (
          <div key={f.q} className="shop-faq-cell">
            <p className="q">{f.q}</p>
            <p className="a">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LineupSection() {
  const grouped = CATEGORIES.map((cat) => ({
    cat,
    items: PRODUCTS.filter((p) => p.cat === cat.id && isEc(p)),
  }));

  return (
    <section
      id="lineup"
      className="shell"
      style={{ padding: "80px 40px 0", scrollMarginTop: 120 }}
    >
      <Marker n="06" kanji="品" en="Our Lineup" />
      <h2 className="shop-section-h">商品ラインナップ</h2>
      <div className="shop-lineup" style={{ marginTop: 40 }}>
        {grouped.map(({ cat, items }) => (
          <div
            key={cat.id}
            id={cat.id}
            className="shop-lineup-col"
            style={{ scrollMarginTop: 180 }}
          >
            <div className="shop-lineup-col-head">
              <span className="ja">{cat.ja}</span>
              <span className="en">{cat.en}</span>
            </div>
            <div
              className="shop-lineup-row"
              style={
                {
                  "--cols": items.length,
                } as React.CSSProperties
              }
            >
              {items.map((p) => (
                <Link
                  key={p.id}
                  href={`/shop/products/${p.id}`}
                  className="shop-lineup-card"
                >
                  <SmartImage
                    src={`/images/products/${p.id}.jpg`}
                    alt={p.ja}
                    labelEn={`IMG / ${p.en.toLowerCase().replace(/\s+/g, "-")}`}
                    labelJa={p.ja}
                    aspect="1/1"
                  />
                  <div className="name">{p.ja}</div>
                  <div className="price">¥{p.price.toLocaleString()}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <Link
          href="#lineup"
          className="more"
          style={{ fontSize: 12, letterSpacing: "0.18em" }}
        >
          すべての商品を見る →
        </Link>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="shell" style={{ padding: "80px 40px 64px" }}>
      <Marker n="07" kanji="結" en="Order & Contact" />
      <div className="shop-final-cta">
        <div className="phone">
          <div>
            <a
              href="tel:045-333-0163"
              className="num"
              style={{ textDecoration: "none" }}
            >
              ☎ 045-333-0163
            </a>
            <div className="hr">受付時間 9:00 - 21:00 年中無休</div>
          </div>
        </div>
        <Link href="/shop/cart" className="btn btn-accent">
          🛒 カートを見る
        </Link>
        <Link href="#lineup" className="btn btn-line">
          松花堂を見る
        </Link>
        <Link href="#lineup" className="btn btn-line">
          お祝い膳を見る
        </Link>
        <Link href="#lineup" className="btn btn-line">
          おせちを見る
        </Link>
      </div>
    </section>
  );
}

export default function ShopHome() {
  return (
    <>
      <script {...jsonLdScript(localBusinessLd)} />
      <script
        {...jsonLdScript(
          breadcrumbLd([
            { name: "ホーム", path: "/" },
            { name: "冷凍折詰 通販", path: "/shop" },
          ])
        )}
      />
      <HeroSection />
      <QualitySection />
      <OccasionSection />
      <CraftSection />
      <FaqSection />
      <LineupSection />
      <FinalCtaSection />
    </>
  );
}
