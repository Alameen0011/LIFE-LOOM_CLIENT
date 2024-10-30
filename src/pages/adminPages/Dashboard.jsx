import { Users, ShoppingCart, Tags, Box } from "lucide-react";


const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Page Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Sales Card */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
              <ShoppingCart className="h-5 w-5 text-gray-400" />
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">$24,780</p>
            <p className="mt-2 text-sm text-green-600">+15% from last month</p>
          </div>

          {/* Orders Card */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">
                Total Orders
              </h3>
              <Box className="h-5 w-5 text-gray-400" />
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">1,245</p>
            <p className="mt-2 text-sm text-green-600">+5% from last week</p>
          </div>

          {/* Customers Card */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">
                New Customers
              </h3>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">328</p>
            <p className="mt-2 text-sm text-green-600">+2% from last month</p>
          </div>

          {/* Inventory Card */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">
                Low Stock Items
              </h3>
              <Tags className="h-5 w-5 text-gray-400" />
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">12</p>
            <p className="mt-2 text-sm text-red-600">Action needed</p>
          </div>
        </div>

 
      </main>
    </div>
  );
};

export default Dashboard;
