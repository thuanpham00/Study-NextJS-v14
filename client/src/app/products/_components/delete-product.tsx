"use client";
import productApi from "@/apiRequest/product";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { handleErrorApi } from "@/lib/utils";
import { ProductResType } from "@/schemaValidations/product.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteProduct({ product }: { product: ProductResType["data"] }) {
  const router = useRouter();
  const deleteProduct = async () => {
    try {
      await productApi.delete(product.id);
      toast.success("Delete product successfully");
    } catch (error) {
      handleErrorApi({ errors: error });
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"}>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có muốn xóa sản phẩm không?</AlertDialogTitle>
            <AlertDialogDescription>
              Sản phẩm {product.name} sẽ bị xóa vĩnh viễn khỏi hệ thống
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteProduct}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
