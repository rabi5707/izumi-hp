// Firestore document shape for /inquiry submissions.
//
// Collection: `inquiries`
// Document ID: inquiryNo (e.g. "IQ-123456")
//
// Read path: Admin SDK only (rules block all client access).
// Write path: /api/inquiry (creates) and /admin/inquiries (status updates).

export const INQUIRY_STATUSES = [
  "new", // 未読
  "read", // 既読
  "handled", // 対応済
  "closed", // クローズ（不採用・キャンセル等）
] as const;

export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export const INQUIRY_STATUS_LABEL: Record<InquiryStatus, string> = {
  new: "未読",
  read: "既読",
  handled: "対応済",
  closed: "完了",
};

export const INQUIRY_STATUS_COLOR: Record<InquiryStatus, string> = {
  new: "#8a2e2e", // 朱
  read: "#b8924c", // 金
  handled: "#2d5f4e", // 緑
  closed: "#8a7e63", // 茶
};

export type InquiryDoc = {
  inquiryNo: string;
  status: InquiryStatus;

  // Contact
  name?: string;
  phone?: string;
  email?: string;
  corp?: string;

  // Event
  date?: string;
  time?: string;
  people?: string;
  budget?: string;
  venue?: string;
  where?: string;
  addr?: string;

  // Content
  menu?: string;
  payment?: string;
  notes?: string;
  referenceProductId?: string;
  service?: string[];

  // Internal note added on the admin side.
  adminMemo?: string;

  // Metadata
  createdAt: string; // ISO string
  userAgent?: string | null;
  ip?: string;
};
