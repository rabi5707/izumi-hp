"use client";

import { useTransition } from "react";
import { setInquiryStatus, deleteInquiry } from "@/lib/inquiries-admin";
import {
  INQUIRY_STATUSES,
  INQUIRY_STATUS_LABEL,
  type InquiryStatus,
} from "@/lib/inquiries-schema";

export function StatusActions({
  inquiryNo,
  current,
}: {
  inquiryNo: string;
  current: InquiryStatus;
}) {
  const [pending, start] = useTransition();

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {INQUIRY_STATUSES.map((s) => {
        const active = s === current;
        return (
          <button
            key={s}
            type="button"
            disabled={pending || active}
            onClick={() => {
              start(async () => {
                try {
                  await setInquiryStatus(inquiryNo, s);
                } catch (err) {
                  alert(
                    err instanceof Error ? err.message : "状態変更に失敗しました。"
                  );
                }
              });
            }}
            style={{
              padding: "8px 14px",
              fontSize: 12,
              letterSpacing: "0.14em",
              background: active ? "#1a1613" : "#fafaf6",
              color: active ? "#fff" : "#1a1613",
              border: "1px solid #c9c1ac",
              cursor: pending || active ? "default" : "pointer",
              opacity: pending && !active ? 0.6 : 1,
            }}
          >
            {INQUIRY_STATUS_LABEL[s]}
          </button>
        );
      })}
    </div>
  );
}

export function DeleteInquiryButton({
  inquiryNo,
  label,
}: {
  inquiryNo: string;
  label: string;
}) {
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (
          !confirm(
            `「${label}」を削除します。\nこの操作は取り消せません。よろしいですか？`
          )
        )
          return;
        start(async () => {
          try {
            await deleteInquiry(inquiryNo);
            window.location.href = "/admin/inquiries";
          } catch (err) {
            alert(err instanceof Error ? err.message : "削除に失敗しました。");
          }
        });
      }}
      style={{
        padding: "8px 14px",
        background: "transparent",
        color: "#8a2e2e",
        border: "1px solid #d4b3b3",
        fontSize: 12,
        letterSpacing: "0.14em",
        cursor: pending ? "wait" : "pointer",
      }}
    >
      {pending ? "…" : "削除"}
    </button>
  );
}
