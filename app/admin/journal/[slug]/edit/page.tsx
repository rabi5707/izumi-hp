import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { fetchPostBySlugForAdmin } from "@/lib/journal-server";
import { updatePost } from "@/lib/journal-admin";
import { PostForm } from "../../PostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: { slug: string };
}) {
  await requireAdmin();
  const post = await fetchPostBySlugForAdmin(params.slug);
  if (!post) notFound();

  // Bind the original slug so the server action knows what to overwrite
  // (slug can be renamed in the form).
  const action = updatePost.bind(null, post.slug);

  return (
    <PostForm
      mode={{ kind: "edit", original: post }}
      action={action}
      submitLabel="変更を保存"
    />
  );
}
