import { PiBellRingingLight } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../components/ui/Breadcrumb";

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <nav className="w-full p-2 mb-2 flex justify-between items-center shadow-lg bg-white">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex border-2 items-center rounded-lg bg-slate-200">
          <CiSearch className="text-lg" />
          <input
            className="bg-slate-200 outline-none text-sm p-[2px]"
            type="text"
            placeholder="Search anything..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Handle input change
          />
        </div>
        <div>
          <PiBellRingingLight className="text-blue-400 text-lg" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
