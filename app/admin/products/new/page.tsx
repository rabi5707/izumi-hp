import { requireAdmin } from "@/lib/admin-auth";
import { createProduct } from "@/lib/products-admin";
import { fetchAllProductsForAdmin } from "@/lib/products-server";
import { ProductForm } from "../ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  await requireAdmin();
  const all = await fetchAllProductsForAdmin();
  const maxOrder = all.reduce((m, p) => Math.max(m, p.sortOrder), 0);
  return (
    <ProductForm
      mode={{ kind: "new" }}
      action={createProduct}
      submitLabel="商品を登録"
      defaultSortOrder={maxOrder + 10}
    />
  );
}
