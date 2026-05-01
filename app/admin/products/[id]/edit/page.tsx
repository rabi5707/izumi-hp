import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { fetchProductByIdForAdmin } from "@/lib/products-server";
import { updateProduct } from "@/lib/products-admin";
import { ProductForm } from "../../ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  await requireAdmin();
  const product = await fetchProductByIdForAdmin(params.id);
  if (!product) notFound();

  const action = updateProduct.bind(null, params.id);

  return (
    <ProductForm
      mode={{ kind: "edit", original: product }}
      action={action}
      submitLabel="変更を保存"
      defaultSortOrder={product.sortOrder}
    />
  );
}
