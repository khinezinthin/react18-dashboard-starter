import { Button } from "@/components/ui/button";
import {
  useCreateProducts,
  useGetProducts,
  useUpdateProduct,
} from "../hooks/useProduct";

const ProductSection = () => {
  const { data: products } = useGetProducts({ limit: 5 });
  console.log(products);

  const { mutate: craeteProduct, mutateAsync: createProductAsync } =
    useCreateProducts();

  const { mutate: updateProduct, mutateAsync: updateProductAsync } =
    useUpdateProduct();

  // mutate way (Create | Update)
  const handleCreateMutate = () => {
    craeteProduct({ name: "New Product" });
  };

  const handleUpdateMutate = () => {
    updateProduct({ id: 1, data: { name: "Updated Product" } });
  };

  // Mutate Async way (Create | Update)
  const handleCreateMutaetAsync = async () => {
    try {
      const res = await createProductAsync({ name: "New Product" });
      console.log(res);
      // toast => config
      // async can other logic eg. modal box close...
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateMutateAsync = async () => {
    try {
      const res = await updateProductAsync({
        id: 1,
        data: { name: "Updated Product" },
      });
      console.log(res);
      // .... logic
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      product
      <Button onClick={handleCreateMutate}>Create Product</Button>
      <Button onClick={handleCreateMutaetAsync}>Create Product</Button>
      <Button onClick={handleUpdateMutate}>Create Product</Button>
      <Button onClick={handleUpdateMutateAsync}>Create Product</Button>
    </section>
  );
};

export default ProductSection;
