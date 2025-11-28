import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router";

type BreadCrumbPorps = {
  currentPageName: string;
  links?: {
    name: string;
    path: string;
  }[];
};

const BreadCrumb: React.FC<BreadCrumbPorps> = ({
  currentPageName = "new page",
  links = [],
}) => {
  return (
    <nav
      className="flex border-b-2 border-b-gray-200 pb-5"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 gap-1"
          >
            <Home className="size-4" />
            Dashboard
          </Link>
        </li>
        {links.map((el, index) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRight className=" size-4" />
              <Link
                to={el.path}
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >
                {el.name}
              </Link>
            </div>
          </li>
        ))}
        <li aria-current="page">
          <div className="flex items-center">
            <ChevronRight className=" size-4" />
            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
              {currentPageName}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default BreadCrumb;
