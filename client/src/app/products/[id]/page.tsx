import productApi from "@/apiRequest/product";
import ProductAddForm from "@/app/products/_components/product-add-form";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  let product = undefined;
  try {
    const { payload } = await productApi.getDetail(Number(params.id));
    product = payload.data;
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="p-2">
      {!product && <div>Không tìm thấy sản phẩm...</div>}
      <ProductAddForm product={product} />
    </div>
  );
}
