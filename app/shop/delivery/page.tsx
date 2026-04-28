"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, defaultDelivery, type DeliveryData } from "@/lib/cart-store";

const TIMES = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

function buildDates() {
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  const dow = ["日", "月", "火", "水", "木", "金", "土"];
  return Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    return {
      i,
      date: d.getDate(),
      dow: dow[d.getDay()],
      dis: i < 1,
    };
  });
}

export default function DeliveryPage() {
  const router = useRouter();
  const saved = useCart((s) => s.delivery);
  const setDelivery = useCart((s) => s.setDelivery);
  const [data, setData] = useState<DeliveryData>(saved || defaultDelivery);
  const upd = <K extends keyof DeliveryData>(k: K, v: DeliveryData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const dates = buildDates();

  const submit = () => {
    setDelivery(data);
    router.push("/shop/confirm");
  };

  return (
    <section className="form-shell shell">
      <div className="step-bar">
        <div className="step done">
          <span className="n">✓</span>買物籠
        </div>
        <span className="step-sep" />
        <div className="step on">
          <span className="n">2</span>配達指定
        </div>
        <span className="step-sep" />
        <div className="step">
          <span className="n">3</span>確認
        </div>
        <span className="step-sep" />
        <div className="step">
          <span className="n">4</span>完了
        </div>
      </div>

      <div className="form-section">
        <h2>
          <span className="idx">01</span>配達日の指定
        </h2>
        <div className="date-pick">
          {dates.map((d) => (
            <div
              key={d.i}
              className={
                "dc" +
                (data.date === d.i ? " on" : "") +
                (d.dis ? " dis" : "")
              }
              onClick={() => !d.dis && upd("date", d.i)}
            >
              <span className="dow">{d.dow}</span>
              {String(d.date).padStart(2, "0")}
            </div>
          ))}
        </div>
        <div
          style={{
            fontSize: 11,
            color: "var(--ink-mute)",
            marginTop: 12,
            letterSpacing: "0.1em",
          }}
        >
          ※ 当日のご注文は、お電話にてご連絡ください。
        </div>
      </div>

      <div className="form-section">
        <h2>
          <span className="idx">02</span>お届け時間
        </h2>
        <div className="time-pick">
          {TIMES.map((t) => (
            <div
              key={t}
              className={"tc" + (data.time === t ? " on" : "")}
              onClick={() => upd("time", t)}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      <div className="form-section">
        <h2>
          <span className="idx">03</span>お届け先
        </h2>
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {(
            [
              { k: "venue", ja: "会場・施設" },
              { k: "jitaku", ja: "ご自宅" },
              { k: "office", ja: "事業所・撮影現場" },
              { k: "tera", ja: "寺院・会館" },
              { k: "other", ja: "その他" },
            ] as const
          ).map((o) => (
            <button
              key={o.k}
              className={"chip" + (data.where === o.k ? " on" : "")}
              onClick={() => upd("where", o.k)}
              style={{
                padding: "8px 14px",
                fontFamily: "var(--f-heading)",
                fontSize: 12,
                letterSpacing: "0.12em",
              }}
            >
              {o.ja}
            </button>
          ))}
        </div>
        <div className="form-grid">
          <div className="form-field full">
            <label>
              会場・施設名<span className="req">必須</span>
            </label>
            <input
              placeholder="例）◯◯ホール 第二会議室"
              value={data.saijyou}
              onChange={(e) => upd("saijyou", e.target.value)}
            />
            <span className="hint">ご自宅の場合は空欄で結構です</span>
          </div>
          <div className="form-field">
            <label>
              郵便番号<span className="req">必須</span>
            </label>
            <input
              placeholder="221-0000"
              value={data.zip}
              onChange={(e) => upd("zip", e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>
              お人数<span className="req">必須</span>
            </label>
            <div className="qty" style={{ alignSelf: "flex-start" }}>
              <button
                onClick={() => upd("people", Math.max(1, data.people - 1))}
              >
                −
              </button>
              <input
                value={data.people}
                onChange={(e) =>
                  upd("people", parseInt(e.target.value) || 1)
                }
              />
              <button onClick={() => upd("people", data.people + 1)}>
                +
              </button>
            </div>
          </div>
          <div className="form-field full">
            <label>
              ご住所<span className="req">必須</span>
            </label>
            <input
              placeholder="神奈川県横浜市◯◯区◯◯町 1-2-3"
              value={data.addr}
              onChange={(e) => upd("addr", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>
          <span className="idx">04</span>ご連絡先
        </h2>
        <div className="form-grid">
          <div className="form-field">
            <label>
              お名前<span className="req">必須</span>
            </label>
            <input
              placeholder="山田 太郎"
              value={data.contactName}
              onChange={(e) => upd("contactName", e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>
              お電話番号<span className="req">必須</span>
            </label>
            <input
              placeholder="090-0000-0000"
              value={data.contactPhone}
              onChange={(e) => upd("contactPhone", e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>ご関係</label>
            <select
              value={data.contactRel}
              onChange={(e) => upd("contactRel", e.target.value)}
            >
              <option value="">選択してください</option>
              <option>ご本人</option>
              <option>ご家族</option>
              <option>法人ご担当</option>
              <option>その他</option>
            </select>
          </div>
          <div className="form-field">
            <label>
              お支払い方法<span className="req">必須</span>
            </label>
            <select
              value={data.payment}
              onChange={(e) =>
                upd("payment", e.target.value as DeliveryData["payment"])
              }
            >
              <option value="card">クレジットカード</option>
              <option value="invoice">請求書払い（法人・月末締め）</option>
              <option value="cod">代金引換</option>
              <option value="bank">銀行振込（前払い）</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>
          <span className="idx">05</span>熨斗・表書き
        </h2>
        <div className="form-grid">
          <div className="form-field">
            <label>表書き</label>
            <select
              value={data.noshi}
              onChange={(e) => upd("noshi", e.target.value)}
            >
              <option>御祝</option>
              <option>寿</option>
              <option>内祝</option>
              <option>御供</option>
              <option>志</option>
              <option>無し</option>
            </select>
          </div>
          <div className="form-field">
            <label>名入れ</label>
            <input
              placeholder="例）山田家"
              value={data.noshiName}
              onChange={(e) => upd("noshiName", e.target.value)}
            />
          </div>
          <div className="form-field full">
            <label>ご連絡事項</label>
            <textarea
              rows={4}
              placeholder="配膳のご希望、アレルギー、お召し上がりの時間帯など何なりとお書きください。"
              value={data.note}
              onChange={(e) => upd("note", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 40,
        }}
      >
        <button
          className="btn btn-line"
          onClick={() => router.push("/shop/cart")}
        >
          ← 買物籠に戻る
        </button>
        <button className="btn btn-accent" onClick={submit}>
          注文内容の確認へ　→
        </button>
      </div>

      <div className="delivery-contacts">
        <div className="dc-label">お電話でのご注文・お問合せ</div>
        <div className="dc-grid">
          <div className="dc-office">
            <div className="dc-o-name">横浜本店</div>
            <div className="dc-o-tel">045-333-0163</div>
            <div className="dc-o-hours">9:00 – 21:00　年中無休</div>
            <div className="dc-o-area">
              神奈川・東京・川崎　ケータリング承り窓口
            </div>
          </div>
          <div className="dc-office">
            <div className="dc-o-name">イズミ食品　（冷凍便）</div>
            <div className="dc-o-tel">045-332-5100</div>
            <div className="dc-o-hours">9:00 – 18:00　土日祝休</div>
            <div className="dc-o-area">
              全国配送（冷凍折詰）のお問合せ窓口
            </div>
          </div>
        </div>
        <div className="dc-foot">
          ※ 当日のご注文・急なご変更は、お電話を頂戴できますと確実です。
          <br />
          ※ 冷凍便の全国配送は、中3日のお日にちを頂戴いたします。
        </div>
      </div>
    </section>
  );
}
