import BreadCrumb from "@/components/common/BreadCrumb";
import ProductSection from "@/features/product/components/ProductSection";

const ProductPage = () => {
  return (
    <>
      <BreadCrumb currentPageName="Product" />
      <ProductSection />
    </>
  );
};

export default ProductPage;
