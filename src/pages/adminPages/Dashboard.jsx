import {
  useGetBestSellingQuery,
  useGetDashboardDataQuery,
  useGetSalesDataQuery,
} from "@/app/service/adminApiSlice";
import SalesFilter from "@/components/admin/SalesFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, ShoppingCart, Tags, Box } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = () => {
  const [filters, setFilters] = useState({
    year: new Date().getFullYear(),
    month: "",
  });

  const { data: topSellers } = useGetBestSellingQuery();
  const {data: metrics} = useGetDashboardDataQuery()

  const {
    data: chartData = [],
    isLoading,
    isError,
  } = useGetSalesDataQuery(filters);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    if(metrics){
      console.log(metrics)
    }
  },[metrics])

  return (
    <div className="flex  bg-gray-100">
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
              <ShoppingCart className="h-5 w-5 text-gray-400" />
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">₹{metrics?.totalSales}</p>
            {/* <p className="mt-2 text-sm text-green-600">+15% from last month</p> */}
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">
                Total Orders
              </h3>
              <Box className="h-5 w-5 text-gray-400" />
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{metrics?.totalOrders}</p>
            {/* <p className="mt-2 text-sm text-green-600">+5% from last week</p> */}
          </div>

          {/* Customers Card */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">
                New Customers
              </h3>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{metrics?.totalNewCustomers}</p>
            {/* <p className="mt-2 text-sm text-green-600">+2% from last month</p> */}
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">
                Low Stock Items
              </h3>
              <Tags className="h-5 w-5 text-gray-400" />
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{metrics?.lowStockItems}</p>
            {/* <p className="mt-2 text-sm text-red-600">Action needed</p> */}
          </div>
        </div>
        <div className="flex mb-5 bg-gray-100">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            <SalesFilter onFilterChange={handleFilterChange} />
            <div style={{ width: "100%", height: 400 }}>
            
              {isLoading ? (
                <p>Loading...</p> // Display loading spinner or message
              ) : isError ? (
                <p>Error fetching data. Please try again.</p> // Handle errors
              ) : (
                <ResponsiveContainer>
                  <LineChart
                    data={chartData}
                    margin={{ top: 40, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      label={{
                        value: "Month",
                        position: "insideBottomRight",
                        offset: -5,
                      }}
                    />
                    <YAxis
                      label={{
                        value: "Sales",
                        angle: -90,
                        offset: -10,
                        position: "insideLeft",
                      }}
                      tickCount={6}
                      domain={[0, "auto"]}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#82ca9d"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="orderCount"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </main>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topSellers?.topProducts?.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell className="text-right">
                        {product.totalSold}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topSellers?.topCategories?.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell className="text-right">
                        {category.totalSold}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Brands</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topSellers?.topBrands?.map((brand, index) => (
                    <TableRow key={index}>
                      <TableCell>{brand._id}</TableCell>
                      <TableCell className="text-right">
                        {brand.totalSold}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
