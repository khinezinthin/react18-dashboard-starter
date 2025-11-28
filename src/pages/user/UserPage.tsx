import BreadCrumb from "@/components/common/BreadCrumb";
import UserSection from "@/features/user/components/UserSection";

const UserPage = () => {
  return (
    <>
      <BreadCrumb currentPageName="User" />
      <UserSection />
    </>
  );
};

export default UserPage;
