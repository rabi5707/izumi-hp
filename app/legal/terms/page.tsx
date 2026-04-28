import type { Metadata } from "next";
import { LEGAL_INFO } from "@/lib/legal";

export const metadata: Metadata = {
  title: "ご利用規約　｜　株式会社イズミ産業 オンライン御注文",
  description:
    "株式会社イズミ産業オンライン御注文窓口のご利用規約。本サービスをご利用いただく際の規約・注意事項を定めております。",
};

export default function TermsPage() {
  return (
    <>
      <div className="label-en" style={{ marginBottom: 16 }}>
        Legal · Terms of Service
      </div>
      <h1
        className="kanji-display"
        style={{
          fontSize: 32,
          margin: "0 0 16px",
          letterSpacing: "0.1em",
        }}
      >
        ご利用規約
      </h1>
      <p
        style={{
          fontSize: 13,
          lineHeight: 2,
          color: "var(--ink-mute)",
          margin: "0 0 40px",
        }}
      >
        本規約は、{LEGAL_INFO.corpName}
        （以下「当社」）が提供するオンライン御注文サービス（以下「本サービス」）のご利用条件を定めるものです。ご利用に際しては、本規約にご同意頂いたものとみなします。
      </p>

      <Section n="01" title="適用範囲">
        <p>
          本規約は、本サービスをご利用頂く全てのお客様と当社との間に適用されます。本規約の他、本サービス上で当社が個別に定める規定・お知らせも本規約の一部を構成するものとします。
        </p>
      </Section>

      <Section n="02" title="ご利用の制限">
        <p>
          次の各号に該当する場合、当社はお客様のご注文をお断り、または本サービスのご利用をお断りすることがございます。
        </p>
        <ul>
          <li>お申し込み内容に虚偽の記載があった場合</li>
          <li>
            未成年者・成年被後見人・被保佐人・被補助人のいずれかであり、法定代理人等の同意を得ていない場合
          </li>
          <li>
            過去に当社との取引において規約違反・お支払い不履行があった場合
          </li>
          <li>
            その他、当社が本サービスの提供を適当でないと判断した場合
          </li>
        </ul>
      </Section>

      <Section n="03" title="ご注文の成立">
        <p>
          お客様のご注文は、当社が受付・確認の上、受注確認メールまたはお電話による確認連絡を差し上げた時点で正式に成立致します。在庫状況・配達可能範囲・納期の都合により、ご注文をお受けできない場合がございます。
        </p>
      </Section>

      <Section n="04" title="商品のお届け">
        <p>
          お届け日時はご注文時にご指定頂いたお日にち・時間帯にて手配致します。交通事情・天候・災害等、当社の責めによらない事由により配達が遅延する場合がございますが、予めご了承ください。
        </p>
        <p>
          お届け先に誰もお受け取りの方がいらっしゃらない場合、冷凍便はクール便の不在票にて再配達となります。当日便のお料理は、品質保持のため一定時間を過ぎますとお受取り頂けない場合がございますので、お受取りの体制をお整えくださいますようお願い申し上げます。
        </p>
      </Section>

      <Section n="05" title="キャンセル・ご変更">
        <p>
          お料理の調製は、お客様のご注文に基づいて準備を開始致します。以下のご変更・キャンセルは、所定の期限までにお電話にてご連絡ください。
        </p>
        <ul>
          <li>
            【当日便】前々日17時まで無料。前日の変更・キャンセルはご注文金額の50%、当日は全額を申し受けます
          </li>
          <li>
            【冷凍便】出荷準備前（ご注文日より中2日以前）のキャンセルは無料。それ以降は全額を申し受けます
          </li>
          <li>
            お人数のご変更・追加は、お電話にてご相談ください。材料の仕入れ状況により承れない場合がございます
          </li>
        </ul>
      </Section>

      <Section n="06" title="お支払い">
        <p>
          お支払い方法・お支払い時期・手数料等の詳細は、
          <a
            href="/legal/tokusho"
            style={{ textDecoration: "underline" }}
          >
            特定商取引法に基づく表記
          </a>
          をご参照ください。
        </p>
        <p>
          ご注文金額のお支払いが確認できない場合、ご注文を取り消す場合がございます。
        </p>
      </Section>

      <Section n="07" title="禁止事項">
        <p>お客様は、本サービスのご利用にあたり、以下の行為をしてはなりません。</p>
        <ul>
          <li>法令または公序良俗に違反する行為</li>
          <li>
            当社もしくは第三者の著作権・商標権・肖像権その他の権利を侵害する行為
          </li>
          <li>当社の営業を妨害する行為</li>
          <li>他のお客様に不利益を与える行為</li>
          <li>本サービスの運営に支障をきたす恐れのある行為</li>
          <li>虚偽の情報を登録する行為</li>
          <li>本サービスを転売・再販する行為</li>
        </ul>
      </Section>

      <Section n="08" title="免責事項">
        <p>
          当社は、本サービスの内容・情報の正確性について万全を期しておりますが、以下の事項については責任を負いかねます。
        </p>
        <ul>
          <li>
            天災・交通機関の遅延・通信回線の障害等、不可抗力によるお届けの遅延・不能
          </li>
          <li>
            お客様の端末・通信環境に起因するサービスのご利用不能・情報の欠落
          </li>
          <li>
            お客様と第三者との間で生じたトラブル（お届け先でのトラブル等）
          </li>
        </ul>
        <p>
          ただし、当社の故意または重大な過失による場合はこの限りではございません。
        </p>
      </Section>

      <Section n="09" title="本規約の変更">
        <p>
          当社は、必要に応じて本規約を変更することがございます。変更後の規約は本サービス上に掲示した時点から効力を生じるものと致します。重要な変更につきましては、事前にお客様へお知らせ致します。
        </p>
      </Section>

      <Section n="10" title="準拠法・管轄">
        <p>
          本規約の解釈および適用については、日本法を準拠法と致します。本サービスに関連して当社とお客様との間で紛争が生じた場合は、横浜地方裁判所を第一審の専属的合意管轄裁判所と致します。
        </p>
      </Section>

      <Section n="11" title="お問合せ">
        <p>
          本規約に関するお問合せは、下記窓口までお寄せください。
        </p>
        <p style={{ marginTop: 12, paddingLeft: 20 }}>
          {LEGAL_INFO.corpName}
          <br />
          〒{LEGAL_INFO.zip}　{LEGAL_INFO.address}
          <br />
          TEL：{LEGAL_INFO.tel}
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
    </div>
  );
}
