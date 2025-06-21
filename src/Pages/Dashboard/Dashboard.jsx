import UserOverviewChart from "../../Components/Dashboard/UserOverviewChart";
import UsersTable from "../../Components/Dashboard/UsersTable";
import ProductOverview from "../../Components/Dashboard/ProductOverview";
import { FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <div className="container p-4 mx-auto ">
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div className="flex items-center gap-x-5">
              <div className="w-[72px] h-[72px] bg-[#FDD7CF] rounded-full flex items-center justify-center">
                <FaUsers size={30}/>
              </div>
              <div className="text-[#101749] font-bold">
                <p>Total User</p>
                <p>800</p>
              </div>
            </div>
               <div className="flex items-center gap-x-5">
              <div className="w-[72px] h-[72px] bg-[#FDD7CF] rounded-full flex items-center justify-center">
                <FaCartShopping size={30} />

              </div>
              <div className="text-[#101749] font-bold">
                <p>Total product</p>
                <p>200</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div className="p-4 rounded-md ">
              <UserOverviewChart />
            </div>
            <div className="p-4 rounded-md ">
             <ProductOverview/>
            </div>
          </div>
          <div className="rounded-md shadow">
            <UsersTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
