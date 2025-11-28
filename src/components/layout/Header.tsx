import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../common/LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();
  return (
    <div className=" flex items-center justify-between gap-5">
      <h1>{t("welcome")}</h1>
      <LanguageSwitcher />
    </div>
  );
};

export default Header;
