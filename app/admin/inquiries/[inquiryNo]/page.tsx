import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { fetchInquiryById } from "@/lib/inquiries-server";
import { setInquiryStatus, updateInquiryMemo } from "@/lib/inquiries-admin";
import {
  INQUIRY_STATUS_COLOR,
  INQUIRY_STATUS_LABEL,
} from "@/lib/inquiries-schema";
import { StatusActions, DeleteInquiryButton } from "../StatusActions";

export const dynamic = "force-dynamic";

function fmtDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString("ja-JP");
}

export default async function InquiryDetail({
  params,
}: {
  params: { inquiryNo: string };
}) {
  await requireAdmin();
  const q = await fetchInquiryById(params.inquiryNo);
  if (!q) notFound();

  // 詳細を開いたら自動で「未読 → 既読」に遷移させる（ユーザビリティ向上）。
  // ※ Server Component の副作用としては変則だが、admin 用なので許容。
  if (q.status === "new") {
    await setInquiryStatus(q.inquiryNo, "read");
    q.status = "read";
  }

  return (
    <main
      style={{
        maxWidth: 880,
        margin: "0 auto",
        padding: "32px 24px 96px",
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <Link
          href="/admin/inquiries"
          style={{
            fontSize: 12,
            color: "#5a5346",
            textDecoration: "none",
            letterSpacing: "0.14em",
          }}
        >
          ← 一覧に戻る
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "4px 10px",
            fontSize: 11,
            letterSpacing: "0.18em",
            background: INQUIRY_STATUS_COLOR[q.status],
            color: "#fff",
          }}
        >
          {INQUIRY_STATUS_LABEL[q.status]}
        </span>
        <div
          style={{
            fontFamily: "var(--f-mono)",
            fontSize: 12,
            color: "#5a5346",
          }}
        >
          {q.inquiryNo}
        </div>
        <div
          style={{
            fontFamily: "var(--f-mono)",
            fontSize: 11,
            color: "#8a7e63",
          }}
        >
          受信: {fmtDate(q.createdAt)}
        </div>
      </div>

      <h1
        className="kanji-h"
        style={{
          fontSize: 24,
          letterSpacing: "0.14em",
          margin: "0 0 28px",
        }}
      >
        {q.name || "—"} 様 のお見積依頼
      </h1>

      {/* ステータス操作 */}
      <section
        style={{
          background: "#fff",
          border: "1px solid #d8d2c5",
          padding: 20,
          marginBottom: 24,
        }}
      >
        <Heading>状態の変更</Heading>
        <StatusActions inquiryNo={q.inquiryNo} current={q.status} />
        <div
          style={{
            fontSize: 11,
            color: "#8a7e63",
            marginTop: 10,
            lineHeight: 1.7,
          }}
        >
          「対応済」= ご連絡を差し上げた。「完了」= ご注文確定または辞退・キャンセル。
        </div>
      </section>

      {/* 連絡先 */}
      <section
        style={{
          background: "#fff",
          border: "1px solid #d8d2c5",
          padding: 20,
          marginBottom: 24,
        }}
      >
        <Heading>ご連絡先</Heading>
        <Field label="お名前" value={q.name} />
        <Field label="ご法人名" value={q.corp} />
        <Field
          label="お電話"
          value={q.phone}
          link={q.phone ? `tel:${q.phone}` : undefined}
          mono
        />
        <Field
          label="メール"
          value={q.email}
          link={q.email ? `mailto:${q.email}` : undefined}
        />
      </section>

      {/* ご利用 */}
      <section
        style={{
          background: "#fff",
          border: "1px solid #d8d2c5",
          padding: 20,
          marginBottom: 24,
        }}
      >
        <Heading>ご利用予定</Heading>
        <Field label="ご希望日" value={q.date} />
        <Field label="ご希望時間" value={q.time} />
        <Field label="ご人数" value={q.people} />
        <Field label="ご予算" value={q.budget} />
        <Field label="お届け先種別" value={q.where} />
        <Field label="会場・施設名" value={q.venue} />
        <Field label="ご住所" value={q.addr} />
        <Field
          label="ご希望サービス"
          value={q.service?.length ? q.service.join("・") : undefined}
        />
        <Field label="ご希望支払方法" value={q.payment} />
        <Field label="参考商品ID" value={q.referenceProductId} mono />
      </section>

      {/* お問合せ内容 */}
      <section
        style={{
          background: "#fff",
          border: "1px solid #d8d2c5",
          padding: 20,
          marginBottom: 24,
        }}
      >
        <Heading>お問合せ内容</Heading>
        {q.menu && (
          <div style={{ marginBottom: 14 }}>
            <Label>ご希望のお料理</Label>
            <Body>{q.menu}</Body>
          </div>
        )}
        {q.notes && (
          <div>
            <Label>その他のご要望</Label>
            <Body>{q.notes}</Body>
          </div>
        )}
        {!q.menu && !q.notes && (
          <div style={{ fontSize: 12, color: "#8a7e63" }}>
            お問合せ本文の記入はございません。
          </div>
        )}
      </section>

      {/* 社内メモ */}
      <section
        style={{
          background: "#fff",
          border: "1px solid #d8d2c5",
          padding: 20,
          marginBottom: 24,
        }}
      >
        <Heading>社内メモ</Heading>
        <form action={updateInquiryMemo}>
          <input type="hidden" name="inquiryNo" value={q.inquiryNo} />
          <textarea
            name="adminMemo"
            defaultValue={q.adminMemo ?? ""}
            rows={5}
            placeholder="対応の経緯・確認事項などを記録できます。"
            style={{
              width: "100%",
              padding: "9px 12px",
              border: "1px solid #c9c1ac",
              background: "#fafaf6",
              fontSize: 13,
              fontFamily: "inherit",
              resize: "vertical",
              marginBottom: 12,
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 18px",
              background: "#1a1613",
              color: "#fff",
              border: "none",
              fontFamily: "var(--f-heading)",
              fontSize: 12,
              letterSpacing: "0.16em",
              cursor: "pointer",
            }}
          >
            メモを保存
          </button>
        </form>
      </section>

      {/* メタ */}
      <details
        style={{
          fontSize: 11,
          color: "#8a7e63",
          marginBottom: 32,
        }}
      >
        <summary style={{ cursor: "pointer" }}>技術メタ情報</summary>
        <div
          style={{
            marginTop: 8,
            padding: 12,
            background: "#f0ebe0",
            fontFamily: "var(--f-mono)",
            lineHeight: 1.8,
            wordBreak: "break-all",
          }}
        >
          IP: {q.ip ?? "—"}
          <br />
          UA: {q.userAgent ?? "—"}
        </div>
      </details>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: 16,
          borderTop: "1px solid #ece7d9",
        }}
      >
        <DeleteInquiryButton
          inquiryNo={q.inquiryNo}
          label={`${q.name ?? "—"} 様 の問合せ`}
        />
      </div>
    </main>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--f-mono)",
        fontSize: 10,
        letterSpacing: "0.28em",
        color: "#8a7e63",
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        letterSpacing: "0.2em",
        color: "#8a7e63",
        marginBottom: 4,
      }}
    >
      {children}
    </div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 14,
        color: "#1a1613",
        lineHeight: 1.85,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  link,
  mono,
}: {
  label: string;
  value?: string;
  link?: string;
  mono?: boolean;
}) {
  if (!value) return null;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: 12,
        padding: "8px 0",
        borderBottom: "1px solid #ece7d9",
        alignItems: "baseline",
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.18em",
          color: "#8a7e63",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 13,
          color: "#1a1613",
          fontFamily: mono ? "var(--f-mono)" : undefined,
          wordBreak: "break-word",
        }}
      >
        {link ? (
          <a href={link} style={{ color: "#1a1613" }}>
            {value}
          </a>
        ) : (
          value
        )}
      </div>
    </div>
  );
}
