import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductActions } from "./ProductActions";

const FEATURED_DISHES = [
  "先付 — 胡麻豆腐　山葵餡",
  "向付 — 湯葉の刺身　菜種辛子",
  "椀物 — 清し仕立て　松茸　三つ葉",
  "焼物 — 焼き松茸　酢橘",
  "炊合 — 冬瓜　椎茸　蓮根　人参",
  "揚物 — 素揚げ　茄子　南瓜　獅子唐",
  "酢の物 — 占地の土佐酢",
  "食事 — 豆ご飯　香の物",
  "水菓子 — 季節の果実",
];

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const p = PRODUCTS.find((x) => x.id === params.id);
  if (!p) return {};
  return {
    title: `${p.ja}　｜　株式会社イズミ産業 オンライン御注文`,
    description: p.desc,
  };
}

export default function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const p = PRODUCTS.find((x) => x.id === params.id);
  if (!p) notFound();

  const isCatering = p.type === "catering";

  const productLd = isCatering
    ? null
    : {
        "@context": "https://schema.org",
        "@type": "Product",
        name: p.ja,
        sku: p.id,
        description: p.desc,
        brand: { "@type": "Brand", name: "株式会社イズミ産業" },
        category: CATEGORIES.find((c) => c.id === p.cat)?.ja,
        offers: {
          "@type": "Offer",
          price: p.price,
          priceCurrency: "JPY",
          availability: "https://schema.org/InStock",
          url: `https://shop.isg.co.jp/shop/products/${p.id}`,
          seller: {
            "@type": "Organization",
            name: "株式会社イズミ産業",
            url: "https://shop.isg.co.jp/",
          },
          areaServed: p.freeze ? "JP" : ["神奈川県", "東京都"],
        },
      };

  return (
    <section className="shell">
      {productLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
        />
      )}
      <div className="crumb">
        <Link href="/shop">ホーム</Link>
        <span className="sep">/</span>
        <Link href={`/shop#${p.cat}`}>
          {p.cat === "shokado"
            ? "松花堂"
            : p.cat === "oiwai"
              ? "お祝い膳"
              : "おせち・ふせち"}
        </Link>
        <span className="sep">/</span>
        <span>{p.ja}</span>
      </div>
      <div className="detail">
        <div className="detail-gallery">
          <div className="ph detail-main-img">
            <div className="ph-label">IMG / {p.en.toLowerCase()} — main</div>
            <div className="ph-center">{p.ja}</div>
          </div>
          <div className="detail-thumbs">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={"ph" + (i === 0 ? " on" : "")}>
                <div className="ph-label">#{i + 1}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="detail-info">
          <div className="detail-cat">
            {CATEGORIES.find((c) => c.id === p.cat)?.ja || ""}
          </div>
          <h1 className="detail-title">{p.ja}</h1>
          <div className="detail-en">{p.en}</div>
          <p
            style={{
              color: "var(--ink-soft)",
              fontSize: 14,
              lineHeight: 2,
              margin: 0,
            }}
          >
            {p.desc}
          </p>

          {isCatering ? (
            <CateringPriceBlock price={p.price} serves={p.serves} />
          ) : (
            <div className="detail-price">
              <span className="num">¥{p.price.toLocaleString()}</span>
              <span className="unit">／{p.serves}</span>
              <span className="tax">税込・送料別</span>
            </div>
          )}

          <table className="spec-table">
            <tbody>
              <tr>
                <th>内容</th>
                <td>
                  季節の食材を用いた本格仕立て。詳細はお品書きの項目にて。
                </td>
              </tr>
              <tr>
                <th>器</th>
                <td>
                  {isCatering
                    ? "プラスチック容器・陶器の両方に対応（会場による）"
                    : p.freeze
                      ? "使い捨て折箱（そのまま破棄可）"
                      : "黒内朱の松花堂（返却必要・引取無料）"}
                </td>
              </tr>
              <tr>
                <th>納期</th>
                <td>
                  {isCatering
                    ? "ご希望日の2週間前までにご相談ください"
                    : p.lead}
                </td>
              </tr>
              <tr>
                <th>配達</th>
                <td>
                  {p.area}
                  {isCatering
                    ? "　｜　配膳・器の引取承ります"
                    : p.freeze
                      ? "　｜　クール便にてお届け"
                      : "　｜　別途送料"}
                </td>
              </tr>
              <tr>
                <th>熨斗</th>
                <td>無料　｜　掛紙・表書きのご指定承ります</td>
              </tr>
            </tbody>
          </table>

          {isCatering ? (
            <CateringActions productJa={p.ja} productId={p.id} />
          ) : (
            <ProductActions product={p} />
          )}
        </div>
      </div>

      {!isCatering && <DetailTabs dishes={FEATURED_DISHES} />}

      <section
        style={{
          marginTop: 64,
          paddingTop: 48,
          borderTop: "1px solid var(--rule)",
        }}
      >
        <div className="section-head">
          <div className="lhs">
            <h2 style={{ fontSize: 22 }}>併せてご覧いただく方の多いお品</h2>
            <span className="label-en">Also Chosen</span>
          </div>
        </div>
        <div className="prod-grid">
          {PRODUCTS.filter((x) => x.id !== p.id && x.type === p.type)
            .slice(0, 3)
            .map((x) => (
              <ProductCard key={x.id} p={x} />
            ))}
        </div>
      </section>
    </section>
  );
}

function CateringPriceBlock({
  price,
  serves,
}: {
  price: number;
  serves: string;
}) {
  return (
    <div
      style={{
        padding: "20px 0",
        borderBottom: "1px solid var(--rule)",
        marginTop: 16,
      }}
    >
      <div className="detail-price" style={{ marginBottom: 12 }}>
        <span className="num">¥{price.toLocaleString()}</span>
        <span className="unit">〜／お一人様</span>
        <span className="tax">参考価格・税込</span>
      </div>
      <div
        style={{
          fontSize: 12,
          lineHeight: 1.9,
          color: "var(--ink-mute)",
          letterSpacing: "0.06em",
        }}
      >
        ※ 内容・人数・会場により承り価格は変動致します。
        <br />
        ※ お飲み物・器の引取・配膳スタッフ等の諸経費は別途となります。
        <br />
        推奨人数の目安：<b>{serves}</b>
      </div>
    </div>
  );
}

function CateringActions({
  productJa,
  productId,
}: {
  productJa: string;
  productId: string;
}) {
  const qs = `?product=${encodeURIComponent(productId)}`;
  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          padding: "20px 24px",
          background: "var(--paper)",
          border: "1px solid var(--rule)",
          marginBottom: 20,
        }}
      >
        <div
          className="kanji-h"
          style={{
            fontSize: 14,
            letterSpacing: "0.18em",
            marginBottom: 10,
          }}
        >
          ご注文・お見積はアドバイザーが承ります
        </div>
        <div
          style={{
            fontSize: 13,
            lineHeight: 1.9,
            color: "var(--ink-soft)",
            letterSpacing: "0.04em",
          }}
        >
          ケータリングは、お席の規模・会場・ご予算に合わせて一件ずつお仕立て致します。
          まずはお見積のご依頼、もしくはお電話でお気軽にご相談ください。
        </div>
      </div>
      <div className="buy-row">
        <Link href={`/catering/inquiry${qs}`} className="btn btn-accent">
          アドバイザーに相談する　→
        </Link>
      </div>
      <div
        style={{
          marginTop: 18,
          padding: "16px 20px",
          border: "1px solid var(--rule)",
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          alignItems: "baseline",
        }}
      >
        <div>
          <div
            className="label-en"
            style={{ fontSize: 10, marginBottom: 6 }}
          >
            Tel · 横浜本店
          </div>
          <div
            className="price-num"
            style={{ fontSize: 22, letterSpacing: "0.04em" }}
          >
            045-333-0163
          </div>
        </div>
        <div
          style={{
            fontSize: 11,
            color: "var(--ink-mute)",
            letterSpacing: "0.1em",
            lineHeight: 1.8,
          }}
        >
          9:00 – 21:00　年中無休
          <br />
          お急ぎのご用命はお電話が確実です
        </div>
      </div>
    </div>
  );
}

function DetailTabs({ dishes }: { dishes: string[] }) {
  return (
    <div className="detail-tabs">
      <div className="tab-bar">
        <button className="on">お品書き</button>
        <button>アレルギー表示</button>
        <button>配達・納期</button>
        <button>解凍・召上り方</button>
      </div>
      <div className="dish-list">
        {dishes.map((d, i) => {
          const [name, ...rest] = d.split("—");
          return (
            <div className="dish-row" key={i}>
              <span className="i">{String(i + 1).padStart(2, "0")}</span>
              <span className="n">{name.trim()}</span>
              <span></span>
              <span className="d">{rest.join("—")}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
