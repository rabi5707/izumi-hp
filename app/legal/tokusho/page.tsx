import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_INFO } from "@/lib/legal";

export const metadata: Metadata = {
  title:
    "特定商取引法に基づく表記　｜　株式会社イズミ産業 オンライン御注文",
  description:
    "株式会社イズミ産業オンライン御注文窓口の特定商取引法に基づく表記。販売事業者情報・お支払い方法・お届け時期・返品特約・動作環境などを記載しております。",
};

export default function TokushoPage() {
  const rows: { th: string; td: React.ReactNode }[] = [
    {
      th: "販売事業者",
      td: LEGAL_INFO.corpName,
    },
    {
      th: "運営責任者",
      td: LEGAL_INFO.representative,
    },
    {
      th: "所在地",
      td: `〒${LEGAL_INFO.zip}　${LEGAL_INFO.address}`,
    },
    {
      th: "電話番号",
      td: (
        <>
          {LEGAL_INFO.tel}（{LEGAL_INFO.hours}）
          <br />
          <span
            style={{ fontSize: 12, color: "var(--ink-mute)" }}
          >
            ※ お電話でのお問合せは、当店営業時間内にお掛けください。
          </span>
        </>
      ),
    },
    {
      th: "FAX",
      td: LEGAL_INFO.fax,
    },
    {
      th: "メールアドレス",
      td: LEGAL_INFO.email,
    },
    {
      th: "ホームページURL",
      td: LEGAL_INFO.shopUrl,
    },
    {
      th: "販売価格",
      td: "各商品ページに記載の価格（すべて税込価格表示）",
    },
    {
      th: "商品代金以外の必要料金",
      td: (
        <>
          冷凍便：1配送先につき送料 1,500円（税込）　※10,000円以上のご注文で送料無料
          <br />
          ケータリング：配達料はご注文金額に含めてご提示致します
          <br />
          銀行振込：振込手数料はお客様にてご負担ください
          <br />
          代金引換：代引手数料が別途加算されます
        </>
      ),
    },
    {
      th: "お支払い方法",
      td: (
        <>
          クレジットカード決済（VISA／Mastercard／JCB／American Express／Diners）
          <br />
          銀行振込（前払い）
          <br />
          代金引換
          <br />
          請求書払い（法人様・月末締め翌月末払い）
        </>
      ),
    },
    {
      th: "お支払い時期",
      td: (
        <>
          クレジットカード：ご注文確定時
          <br />
          銀行振込：ご注文確定後、7日以内にお振込みください
          <br />
          代金引換：商品お届け時にお支払いください
          <br />
          請求書払い：翌月末までにお振込みください
        </>
      ),
    },
    {
      th: "お届け時期",
      td: (
        <>
          【当日便・ケータリング（神奈川・東京）】
          <br />
          前日17時までのご注文で、翌日のご指定時間にお届けします。
          <br />
          <br />
          【冷凍便・全国配送】
          <br />
          ご注文確定より中3日（72時間）以降のお日にちをご指定頂けます。ヤマト運輸クール便にて発送致します。
        </>
      ),
    },
    {
      th: "返品・交換について",
      td: (
        <>
          <b>お客様都合による返品・交換はお受け致しかねます。</b>
          <br />
          お料理の性質上、またお客様の衛生・安全を考慮し、返品・返金はご遠慮頂いております。
          <br />
          <br />
          ただし、以下の場合は商品到着後3日以内にお電話にてご連絡ください。
          <br />
          ・配送中の破損、品質不良（冷凍状態の不良を含む）
          <br />
          ・ご注文内容と異なる商品の発送
          <br />
          <br />
          当店にて確認後、代替品の発送もしくはご返金にて対応致します。
        </>
      ),
    },
    {
      th: "商品の引渡時期",
      td: "配送業者による商品出荷後、概ね1〜2日でお届け致します。",
    },
    {
      th: "個人情報の取扱い",
      td: (
        <>
          お客様の個人情報は、ご注文商品のお届け・ご連絡・当店からのお知らせの目的にのみ利用致します。詳しくは
          <Link
            href="/legal/privacy"
            style={{ textDecoration: "underline" }}
          >
            プライバシーポリシー
          </Link>
          をご覧ください。
        </>
      ),
    },
    {
      th: "動作環境",
      td: (
        <>
          【推奨ブラウザ】
          <br />
          Google Chrome・Microsoft Edge・Safari・Firefox の各最新版
          <br />
          【モバイル】
          <br />
          iOS Safari 15以降／Android Chrome 最新版
        </>
      ),
    },
  ];

  return (
    <>
      <div className="label-en" style={{ marginBottom: 16 }}>
        Legal · 特定商取引法に基づく表記
      </div>
      <h1
        className="kanji-display"
        style={{
          fontSize: 32,
          margin: "0 0 16px",
          letterSpacing: "0.1em",
        }}
      >
        特定商取引法に基づく表記
      </h1>
      <p
        style={{
          fontSize: 13,
          lineHeight: 2,
          color: "var(--ink-mute)",
          margin: "0 0 40px",
        }}
      >
        「特定商取引に関する法律」第11条（通信販売についての広告）に基づき、下記の通り表示致します。
      </p>

      <table
        className="spec-table"
        style={{ width: "100%", maxWidth: "100%" }}
      >
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <th style={{ width: 200, whiteSpace: "nowrap" }}>{r.th}</th>
              <td style={{ fontSize: 13, lineHeight: 2 }}>{r.td}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          marginTop: 32,
          fontSize: 11,
          color: "var(--ink-mute)",
          letterSpacing: "0.1em",
          textAlign: "right",
        }}
      >
        最終更新日：{LEGAL_INFO.lastUpdated}
      </div>
    </>
  );
}
