import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "このサイトについて　｜　株式会社イズミ産業 オンライン御注文",
  description:
    "昭和四十九年創業、株式会社イズミ産業のオンライン御注文窓口のご案内。横浜本店・関連会社イズミ食品の拠点より、神奈川・東京は当日便、冷凍便は全国配送にてお届けします。",
  alternates: {
    canonical: "https://shop.isg.co.jp/about",
  },
};

const OFFICES = [
  {
    name: "横浜本店　／　日本料理 広美",
    addr: "〒240-0044　神奈川県横浜市保土ヶ谷区仏向町 946",
    tel: "045-333-0163",
    fax: "045-333-1133",
    area: "神奈川全域・東京23区西部・川崎方面の当日配達はこちらから手配",
    link: {
      ja: "横浜本社の詳細",
      url: "https://www.isg.co.jp/company/yokohama/",
    },
  },
  {
    name: "株式会社イズミ食品　（関連会社）",
    addr: "〒240-0044　神奈川県横浜市保土ヶ谷区仏向町 946",
    tel: "045-332-5100",
    fax: "045-333-5554",
    area: "冷凍折詰・全国配送の調製・発送を担当しています",
    link: {
      ja: "イズミ食品の詳細",
      url: "https://www.isg.co.jp/company/izumisyokuhin/",
    },
  },
];

const SCOPE = [
  {
    n: "01",
    ja: "本サイトで扱う御品",
    en: "WHAT WE SELL HERE",
    d: "日頃のお席・仕事の会合・ご家族のお祝い・ご法要で承る折詰と盛合せを、オンラインで御注文頂けます。松花堂／セット料理／お祝い／パーティー・ケータリング／冷凍便。",
  },
  {
    n: "02",
    ja: "ご相談が必要なお席",
    en: "OFFLINE INQUIRY",
    d: "大規模宴席・特別な献立・会場設営を伴うご要望は、本社コーポレートサイトのお問合せフォーム、もしくはお電話にて直接ご相談ください。",
  },
  {
    n: "03",
    ja: "宴会場でのご会食",
    en: "BANQUET HALL",
    d: "団体様向け宴会施設「日本料理 広美」でのご会食は、本社サイト「施設のご紹介」よりお申込みください。飛天の間・最上の間・古都の間・特別個室をご用意しております。",
  },
];

export default function AboutPage() {
  return (
    <section className="shell">
      <div className="crumb">
        <Link href="/">ホーム</Link>
        <span className="sep">/</span>
        <span>このサイトについて</span>
      </div>

      <div className="about-hero">
        <div>
          <div className="label-en" style={{ marginBottom: 24 }}>
            About this site · このサイトについて
          </div>
          <h1
            className="kanji-display"
            style={{ fontSize: 42, margin: "0 0 28px", lineHeight: 1.4 }}
          >
            株式会社イズミ産業の
            <br />
            オンライン御注文窓口です。
          </h1>
          <p
            style={{
              fontSize: 15,
              lineHeight: 2.2,
              color: "var(--ink-soft)",
              margin: 0,
              maxWidth: 540,
            }}
          >
            昭和四十九年創業、横浜・保土ヶ谷の地にて半世紀、冠婚葬祭料理のケータリングと仕出しを生業として参りました。
            <br />
            こちらのページでは、日頃承っている折詰・盛合せをオンラインにてご注文頂けます。
            <br />
            <br />
            <span
              style={{
                fontSize: 13,
                color: "var(--ink-mute)",
                letterSpacing: "0.04em",
              }}
            >
              ※
              会社案内・宴会場「日本料理 広美」のご案内・採用情報等は、本社コーポレートサイトをご覧ください。
            </span>
          </p>
          <div
            style={{
              marginTop: 32,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <a
              className="btn btn-ghost"
              href="https://www.isg.co.jp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              本社サイトへ　↗
            </a>
            <Link href="/shop" className="btn btn-line">
              お品書きを見る
            </Link>
          </div>
        </div>
        <div className="ph" style={{ aspectRatio: "4/5", minHeight: 480 }}>
          <div className="ph-label">IMG / honsha-gaikan</div>
          <div className="ph-center">横浜本社・日本料理 広美</div>
        </div>
      </div>

      <div className="about-scope">
        <div className="section-head">
          <div className="lhs">
            <h2 style={{ fontSize: 24 }}>本サイトの役割</h2>
            <span className="label-en">Scope</span>
          </div>
          <div className="meta">
            御注文の内容により、お問合せ先が異なります。
            <br />
            お席に応じた窓口をご案内致します。
          </div>
        </div>
        <div className="scope-grid">
          {SCOPE.map((s) => (
            <div key={s.n} className="scope-cell">
              <div className="s-num">
                {s.n}　{s.en}
              </div>
              <div className="s-ja">{s.ja}</div>
              <p className="s-d">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="about-offices">
        <div className="section-head">
          <div className="lhs">
            <h2 style={{ fontSize: 24 }}>調製・配達拠点</h2>
            <span className="label-en">Locations</span>
          </div>
          <div className="meta">
            お届け先のご住所に応じ、最寄りの店舗より手配致します。
            <br />
            お電話でのご注文・お急ぎのご用命も承ります。
          </div>
        </div>
        <div className="office-list">
          {OFFICES.map((o) => (
            <div key={o.name} className="office-card">
              <div className="oc-name">{o.name}</div>
              <div className="oc-addr">{o.addr}</div>
              <div className="oc-tel">{o.tel}</div>
              <div className="oc-fax">FAX {o.fax}</div>
              <div className="oc-area">{o.area}</div>
              <a
                className="oc-link"
                href={o.link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {o.link.ja}　<span>↗ ISG.CO.JP</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="corp-cta">
        <div className="cc-inner">
          <div>
            <div
              className="label-en"
              style={{ marginBottom: 16, opacity: 0.7 }}
            >
              Corporate Site
            </div>
            <h3
              className="kanji-h"
              style={{
                fontSize: 26,
                margin: "0 0 16px",
                letterSpacing: "0.16em",
              }}
            >
              会社の詳細・宴会場・採用は、
              <br />
              コーポレートサイトをご覧ください。
            </h3>
            <p
              style={{
                fontSize: 13,
                lineHeight: 2,
                opacity: 0.75,
                margin: 0,
                maxWidth: 520,
              }}
            >
              会社概要、横浜本社のご案内、日本料理「広美」施設のご紹介、採用情報、各種お問合せは、本社コーポレートサイトに掲載しております。
            </p>
          </div>
          <div className="cc-links">
            {[
              { url: "https://www.isg.co.jp/company/", en: "COMPANY", ja: "会社案内" },
              {
                url: "https://www.isg.co.jp/institution/",
                en: "INSTITUTION",
                ja: "施設のご紹介",
              },
              { url: "https://www.isg.co.jp/recruit/", en: "RECRUIT", ja: "採用情報" },
              { url: "https://www.isg.co.jp/inquiry/", en: "INQUIRY", ja: "お問合せ" },
            ].map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cc-link"
              >
                <span className="cc-en">{l.en}</span>
                <span className="cc-ja">{l.ja}</span>
                <span className="cc-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="about-profile">
        <div className="section-head">
          <div className="lhs">
            <h2 style={{ fontSize: 24 }}>会社概要</h2>
            <span className="label-en">Corporate Profile</span>
          </div>
          <div className="meta">
            詳細は
            <a
              style={{ textDecoration: "underline" }}
              href="https://www.isg.co.jp/company/"
              target="_blank"
              rel="noopener noreferrer"
            >
              本社コーポレートサイト
            </a>
            をご参照ください。
          </div>
        </div>
        <table className="spec-table" style={{ maxWidth: 960 }}>
          <tbody>
            <tr>
              <th>会社名</th>
              <td>株式会社イズミ産業</td>
            </tr>
            <tr>
              <th>設立</th>
              <td>昭和49年12月25日　（1974年）</td>
            </tr>
            <tr>
              <th>事業内容</th>
              <td>
                冠婚葬祭料理ケータリングサービス（寿司・和食・洋食）／ 仕出し及び各種出張パーティ ／ 日本料理「広美」（団体様向け宴会施設）
              </td>
            </tr>
            <tr>
              <th>本社所在地</th>
              <td>〒240-0044　神奈川県横浜市保土ヶ谷区仏向町 946番地</td>
            </tr>
            <tr>
              <th>関連会社</th>
              <td>株式会社イズミ食品</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: "center", padding: "64px 0 96px" }}>
        <Link href="/shop" className="btn btn-ghost">
          お品書きを見る　→
        </Link>
      </div>
    </section>
  );
}
