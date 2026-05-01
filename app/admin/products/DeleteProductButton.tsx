"use client";

import { useTransition } from "react";
import { deleteProduct } from "@/lib/products-admin";

export function DeleteProductButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (
          !confirm(
            `「${title}」を削除します。\nこの操作は取り消せません。よろしいですか？`
          )
        )
          return;
        start(async () => {
          try {
            await deleteProduct(id);
          } catch (err) {
            if (
              err &&
              typeof err === "object" &&
              "digest" in err &&
              typeof (err as { digest?: unknown }).digest === "string" &&
              (err as { digest: string }).digest.startsWith("NEXT_REDIRECT")
            ) {
              throw err;
            }
            alert(err instanceof Error ? err.message : "削除に失敗しました。");
          }
        });
      }}
      style={{
        padding: "6px 12px",
        background: "transparent",
        color: "#8a2e2e",
        border: "1px solid #d4b3b3",
        fontSize: 11,
        letterSpacing: "0.14em",
        cursor: pending ? "wait" : "pointer",
      }}
    >
      {pending ? "…" : "削除"}
    </button>
  );
}
