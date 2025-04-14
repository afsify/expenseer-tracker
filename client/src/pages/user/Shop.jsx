import { useState } from "react";
import UserLayout from "../../layout/UserLayout";
import Pagination from "../../components/user/shop/Pagination";
import ShopSideNav from "../../components/user/shop/ShopSideNav";
import Breadcrumbs from "../../components/user/shop/Breadcrumbs";
import ProductBanner from "../../components/user/product/ProductBanner";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  return (
    <UserLayout>
      <div className="max-w-container mx-auto px-4">
        <Breadcrumbs title="Products" />
        <div className="w-full h-full flex pb-20 gap-10">
          <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
            <ShopSideNav />
          </div>
          <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
            <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
            <Pagination itemsPerPage={itemsPerPage} />
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Shop;
