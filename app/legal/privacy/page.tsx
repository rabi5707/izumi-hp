import type { Metadata } from "next";
import { LEGAL_INFO } from "@/lib/legal";

export const metadata: Metadata = {
  title:
    "プライバシーポリシー　｜　株式会社イズミ産業 オンライン御注文",
  description:
    "株式会社イズミ産業のプライバシーポリシー。お客様の個人情報の取得・利用・管理に関する方針を定めております。",
};

export default function PrivacyPage() {
  return (
    <>
      <div className="label-en" style={{ marginBottom: 16 }}>
        Legal · Privacy Policy
      </div>
      <h1
        className="kanji-display"
        style={{
          fontSize: 32,
          margin: "0 0 16px",
          letterSpacing: "0.1em",
        }}
      >
        プライバシーポリシー
      </h1>
      <p
        style={{
          fontSize: 13,
          lineHeight: 2,
          color: "var(--ink-mute)",
          margin: "0 0 40px",
        }}
      >
        {LEGAL_INFO.corpName}
        （以下「当社」）は、お客様の個人情報を適切に保護することを重要な社会的責務と認識し、以下の方針に基づき個人情報の取扱いに努めて参ります。
      </p>

      <Section n="01" title="個人情報の定義">
        <p>
          本ポリシーにおける「個人情報」とは、個人情報の保護に関する法律（個人情報保護法）に定める「個人情報」を指し、氏名・住所・電話番号・メールアドレス等、特定の個人を識別できる情報を意味します。
        </p>
      </Section>

      <Section n="02" title="個人情報の取得">
        <p>
          当社は、以下のサービスをご利用頂く際に、必要最低限の範囲で個人情報を取得致します。
        </p>
        <ul>
          <li>ご注文・お見積のご依頼を頂く際</li>
          <li>お問合せフォームをご利用頂く際</li>
          <li>ご会員登録を頂く際</li>
          <li>電話・メールでのお問合せを頂く際</li>
        </ul>
      </Section>

      <Section n="03" title="個人情報の利用目的">
        <p>当社は、お客様の個人情報を以下の目的のために利用致します。</p>
        <ul>
          <li>ご注文商品の調製・お届けのため</li>
          <li>お客様からのお問合せへのご回答のため</li>
          <li>お支払いのご案内・領収書のご発行のため</li>
          <li>サービス向上のためのご連絡のため</li>
          <li>当社からの新商品・キャンペーン等のご案内のため（ご希望の方のみ）</li>
          <li>法令に基づく開示請求への対応のため</li>
        </ul>
      </Section>

      <Section n="04" title="個人情報の第三者提供">
        <p>
          当社は、以下の場合を除き、お客様の個人情報を第三者に開示・提供致しません。
        </p>
        <ul>
          <li>お客様の同意がある場合</li>
          <li>配送業者等、業務遂行に必要な範囲で委託先に提供する場合</li>
          <li>決済代行会社（Stripe 等）に、決済処理に必要な範囲で提供する場合</li>
          <li>法令に基づき開示が必要な場合</li>
          <li>人の生命・身体・財産の保護のために必要な場合</li>
        </ul>
      </Section>

      <Section n="05" title="個人情報の管理・セキュリティ">
        <p>
          当社は、お客様の個人情報を正確かつ最新の状態に保ち、不正アクセス・紛失・破損・改竄・漏洩などから保護するため、適切なセキュリティ対策を実施致します。取得した個人情報は、利用目的を達成するために必要な期間のみ保管し、その後適切に破棄致します。
        </p>
      </Section>

      <Section n="06" title="Cookie（クッキー）の利用について">
        <p>
          当ウェブサイトでは、お客様の利便性向上および利用状況の把握のため、Cookie を使用致します。Cookie には個人を特定する情報は含まれておりません。お客様はブラウザの設定により Cookie の受信を拒否することができますが、その場合サービスの一部がご利用頂けない場合がございます。
        </p>
        <p>
          また、当サイトでは Google Analytics 等のアクセス解析ツールを利用する場合がございます。これらのツールが取得するデータは匿名化されており、個人を特定するものではございません。
        </p>
      </Section>

      <Section n="07" title="個人情報の開示・訂正・削除">
        <p>
          お客様ご自身の個人情報について、開示・訂正・追加・削除・利用停止をご希望の場合は、下記「お問合せ窓口」までご連絡ください。ご本人確認の上、法令に従い対応させて頂きます。
        </p>
      </Section>

      <Section n="08" title="本ポリシーの変更">
        <p>
          当社は、法令の改正・事業内容の変更等に伴い、本プライバシーポリシーを改定することがございます。重要な変更については、当ウェブサイト上にてお知らせ致します。
        </p>
      </Section>

      <Section n="09" title="お問合せ窓口">
        <p>
          個人情報の取扱いに関するお問合せは、下記窓口までお寄せください。
        </p>
        <p style={{ marginTop: 12, paddingLeft: 20 }}>
          {LEGAL_INFO.corpName}
          <br />
          〒{LEGAL_INFO.zip}　{LEGAL_INFO.address}
          <br />
          TEL：{LEGAL_INFO.tel}
          <br />
          FAX：{LEGAL_INFO.fax}
          <br />
          E-mail：{LEGAL_INFO.email}
          <br />
          受付時間：{LEGAL_INFO.hours}
        </p>
      </Section>

      <div
        style={{
          marginTop: 48,
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

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2
        className="kanji-h"
        style={{
          fontSize: 17,
          margin: "0 0 16px",
          letterSpacing: "0.14em",
          display: "flex",
          gap: 14,
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontFamily: "var(--f-mono)",
            fontSize: 11,
            color: "var(--ink-mute)",
            letterSpacing: "0.2em",
          }}
        >
          {n}
        </span>
        {title}
      </h2>
      <div
        style={{
          fontSize: 13,
          lineHeight: 2.1,
          color: "var(--ink-soft)",
        }}
      >
        {children}
      </div>
      <style>{`
        .legal-section p { margin: 0 0 12px; }
        .legal-section ul { margin: 8px 0 12px; padding-left: 20px; }
        .legal-section li { margin-bottom: 4px; }
      `}</style>
    </div>
  );
}
