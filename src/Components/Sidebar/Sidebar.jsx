import { useState } from "react";
import { FiUser, FiLogOut } from "react-icons/fi";
import { BiChevronDown, BiSolidPurchaseTagAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import {
  MdAddShoppingCart,
  MdDashboard,
  MdOutlineBrandingWatermark,
  MdOutlineCategory,
  MdOutlineShoppingCart,
  MdPrivacyTip,
} from "react-icons/md";
import { FaEdit, FaRegUser } from "react-icons/fa";
import { RiTerminalWindowLine } from "react-icons/ri";
import { CiSettings, CiUser } from "react-icons/ci";
import { BsArrowLeftRight } from "react-icons/bs";
import { logout } from "../../features/slices/authSlice";
import { useDispatch } from "react-redux";

const Sidebar = ({ closeDrawer }) => {
  const [active, setActive] = useState("Dashboard");
  const [openDropdown, setOpenDropdown] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <MdDashboard className="w-5 h-5" />,
      label: "Dashboard",
      Link: "/",
    },
    {
      icon: <FaRegUser className="w-5 h-5" />,

      label: "User Details",
      Link: "/user-management",
    },
    {
      icon: <BsArrowLeftRight className="w-5 h-5" />,
      label: "Transection History",
      Link: "/transection-history",
    },
    {
      icon: <MdOutlineShoppingCart className="w-5 h-5" />,
      label: "All Products",
      Link: "/all-products",
    },
      {
      icon: <BiSolidPurchaseTagAlt className="w-5 h-5" />,
      label: "Product For Purchase",
      Link: "/product-purchase",
    },
         {
      icon: <MdAddShoppingCart className="w-5 h-5" />,
      label: "Hoofprint Product ",
      Link: "/add-admin-product",
    },
    {
      icon: <MdOutlineBrandingWatermark className="w-5 h-5" />,
      label: "Brand",
      Link: "/brand",
    },
    {
      icon: <MdOutlineCategory className="w-5 h-5" />,
      label: "Category",
      Link: "/category",
    },
    {
      icon: <CiSettings className="w-5 h-5" />,
      label: "Settings",
      Link: "/settings/profile",
      isDropdown: true,
      subItems: [
        {
          icon: <FaEdit className="w-5 h-5" />,
          label: "About Us",
          Link: "/settings/about-us",
        },
        {
          icon: <MdPrivacyTip className="w-5 h-5" />,
          label: "Privacy Policy",
          Link: "/settings/privacy-policy",
        },

        {
          icon: <RiTerminalWindowLine className="w-5 h-5" />,
          label: "Terms & Conditions",
          Link: "/settings/terms-condition",
        },
      ],
    },
  ];
  const filterMenuItems = (items) => {
    return items.filter((item) => {
      if (item.isDropdown && item.subItems) {
        const filteredSubItems = item.subItems.filter((subItem) =>
          subItem.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredSubItems.length > 0) {
          item.subItems = filteredSubItems;
          return true;
        }
      }
      return item.label.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const filteredItems = filterMenuItems(menuItems);
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/sign-in");
  };
  return (
    <div className="flex flex-col h-full p-3 bg-white w-72">
      <div className="flex-1 mt-16 overflow-y-auto max-h-[calc(100vh-150px)]">
        {filteredItems.map((item) => (
          <div key={item.label}>
            <div
              className={`flex justify-between  items-center px-5 py-2 my-5 cursor-pointer transition-all rounded-l-full ${
                active === item.label
                  ? "bg-[#101749] text-white font-semibold"
                  : "text-[#101749]"
              }`}
              onClick={() =>
                item.isDropdown
                  ? setOpenDropdown(
                      openDropdown === item.label ? "" : item.label
                    )
                  : setActive(item.label)
              }
            >
              <Link to={item.Link} className="flex items-center w-full gap-3">
                {item.icon}
                {item.label}
                {item.isDropdown && (
                  <BiChevronDown
                    className={`${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>
            </div>
            {item.isDropdown && openDropdown === item.label && (
              <div className="flex flex-col pl-8">
                {item.subItems.map((subItem) => (
                  <Link to={subItem.Link} key={subItem.label}>
                    <div
                      className={` px-5 cursor-pointer transition-all rounded-l-full ${
                        active === subItem.label
                          ? "bg-[#101749] text-white font-semibold"
                          : "text-[#101749]"
                      }`}
                      onClick={() => setActive(subItem.label)}
                    >
                      <p className="flex items-center py-2 gap-x-3">
                        {subItem.icon} {subItem.label}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center justify-center w-full rounded-lg cursor-pointer gap-x-2 "
      >
        <FiLogOut />
        <span>Log out</span>
      </button>
    </div>
  );
};

export default Sidebar;
