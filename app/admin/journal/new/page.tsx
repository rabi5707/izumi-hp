import { requireAdmin } from "@/lib/admin-auth";
import { createPost } from "@/lib/journal-admin";
import { PostForm } from "../PostForm";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  await requireAdmin();
  return (
    <PostForm
      mode={{ kind: "new" }}
      action={createPost}
      submitLabel="記事を作成"
    />
  );
}
