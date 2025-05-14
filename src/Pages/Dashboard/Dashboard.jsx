import React from "react";
import UserOverviewChart from "../../Components/Dashboard/UserOverviewChart";
import UsersTable from "../../Components/Dashboard/UsersTable";
import ProductOverview from "../../Components/Dashboard/ProductOverview";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <div className="container p-4 mx-auto ">
        <div className="mt-16">
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
