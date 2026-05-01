import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { fetchAllInquiries } from "@/lib/inquiries-server";
import {
  INQUIRY_STATUS_COLOR,
  INQUIRY_STATUS_LABEL,
} from "@/lib/inquiries-schema";

export const dynamic = "force-dynamic";

function fmtDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${y}/${m}/${day} ${hh}:${mm}`;
}

export default async function AdminInquiriesList() {
  await requireAdmin();
  const inquiries = await fetchAllInquiries();
  const counts = {
    total: inquiries.length,
    new: inquiries.filter((q) => q.status === "new").length,
    read: inquiries.filter((q) => q.status === "read").length,
    handled: inquiries.filter((q) => q.status === "handled").length,
    closed: inquiries.filter((q) => q.status === "closed").length,
  };

  return (
    <main
      style={{
        maxWidth: 1180,
        margin: "0 auto",
        padding: "32px 24px 80px",
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontFamily: "var(--f-mono)",
            fontSize: 11,
            letterSpacing: "0.28em",
            color: "#8a7e63",
            marginBottom: 6,
          }}
        >
          INQUIRIES · お問合せの一覧
        </div>
        <h1
          className="kanji-h"
          style={{ fontSize: 22, letterSpacing: "0.14em", margin: 0 }}
        >
          お問合せ・お見積依頼
        </h1>
        <div
          style={{
            fontSize: 12,
            color: "#5a5346",
            marginTop: 8,
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span>全{counts.total}件</span>
          <span style={{ color: "#8a2e2e", fontWeight: 600 }}>
            未読 {counts.new}
          </span>
          <span>既読 {counts.read}</span>
          <span>対応済 {counts.handled}</span>
          <span>完了 {counts.closed}</span>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div
          style={{
            background: "#fff",
            border: "1px solid #d8d2c5",
            padding: 48,
            textAlign: "center",
            color: "#8a7e63",
          }}
        >
          まだお問合せはございません。
        </div>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            border: "1px solid #d8d2c5",
          }}
        >
          <thead>
            <tr style={{ background: "#f0ebe0", textAlign: "left" }}>
              <th style={th}>状態</th>
              <th style={th}>受付番号</th>
              <th style={th}>受信日時</th>
              <th style={th}>お名前</th>
              <th style={th}>連絡先</th>
              <th style={th}>ご希望日</th>
              <th style={th}>人数</th>
              <th style={{ ...th, width: 100 }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((q) => {
              const unread = q.status === "new";
              return (
                <tr
                  key={q.inquiryNo}
                  style={{
                    borderTop: "1px solid #ece7d9",
                    background: unread ? "#fff8f0" : undefined,
                  }}
                >
                  <td style={td}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        fontSize: 10,
                        letterSpacing: "0.18em",
                        background: INQUIRY_STATUS_COLOR[q.status],
                        color: "#fff",
                      }}
                    >
                      {INQUIRY_STATUS_LABEL[q.status]}
                    </span>
                  </td>
                  <td
                    style={{
                      ...td,
                      fontFamily: "var(--f-mono)",
                      fontSize: 12,
                      fontWeight: unread ? 600 : 400,
                    }}
                  >
                    {q.inquiryNo}
                  </td>
                  <td
                    style={{
                      ...td,
                      fontFamily: "var(--f-mono)",
                      fontSize: 11,
                      color: "#5a5346",
                    }}
                  >
                    {fmtDate(q.createdAt)}
                  </td>
                  <td style={td}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>
                      {q.name || "—"}
                    </div>
                    {q.corp && (
                      <div style={{ fontSize: 11, color: "#8a7e63" }}>
                        {q.corp}
                      </div>
                    )}
                  </td>
                  <td style={{ ...td, fontSize: 12, color: "#5a5346" }}>
                    {q.phone && (
                      <div style={{ fontFamily: "var(--f-mono)" }}>
                        {q.phone}
                      </div>
                    )}
                    {q.email && (
                      <div style={{ fontSize: 11 }}>{q.email}</div>
                    )}
                  </td>
                  <td style={{ ...td, fontSize: 12, color: "#5a5346" }}>
                    {q.date || "—"}
                    {q.time && (
                      <span style={{ color: "#8a7e63", marginLeft: 6 }}>
                        {q.time}
                      </span>
                    )}
                  </td>
                  <td style={{ ...td, fontSize: 12 }}>{q.people || "—"}</td>
                  <td style={td}>
                    <Link
                      href={`/admin/inquiries/${q.inquiryNo}`}
                      style={btnLink}
                    >
                      詳細
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </main>
  );
}

const th: React.CSSProperties = {
  padding: "12px 16px",
  fontFamily: "var(--f-mono)",
  fontSize: 10,
  letterSpacing: "0.22em",
  color: "#5a5346",
  fontWeight: 500,
};

const td: React.CSSProperties = {
  padding: "14px 16px",
  verticalAlign: "top",
};

const btnLink: React.CSSProperties = {
  padding: "6px 12px",
  background: "#fafaf6",
  color: "#1a1613",
  textDecoration: "none",
  fontSize: 11,
  letterSpacing: "0.14em",
  border: "1px solid #c9c1ac",
};
