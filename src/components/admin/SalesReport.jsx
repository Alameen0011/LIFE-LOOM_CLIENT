import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  useGetSalesReportQuery,
  useLazyGetSalesPdfQuery,
  useLazyGetSalesXlQuery,
} from "@/app/service/adminApiSlice";
import Pagination from "../users/Pagination";
import { DownloadCloud, FileSpreadsheetIcon } from "lucide-react";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

const SalesReport = () => {
  const [activeTab, setActiveTab] = useState("");

  const [startDate, setStartDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [totalDiscount, setTotalDiscount] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const itemsPerPage = 5;

  const [salesData, setSalesData] = useState([]);

  const tabContent = ["daily", "weekly", "monthly", "yearly", "custom"];

  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if necessary
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if necessary
    return `${year}-${month}-${day}`;
  };

  const queryParams = useMemo(() => {
    const startDateObj = startDate ? formatDate(new Date(startDate)) : "";
    const endDateObj = endDate ? formatDate(new Date(endDate)) : "";

    const params = new URLSearchParams({
      page: currentPage,
      limit: itemsPerPage,
      period: activeTab,
      startDate: startDateObj,
      endDate: endDateObj,
    });
    return params.toString();
  }, [currentPage, itemsPerPage, activeTab, startDate, endDate]);

  console.log(queryParams, "query params");
  const [triggerDownload] = useLazyGetSalesPdfQuery();
  const [triggerDownloadXl] = useLazyGetSalesXlQuery()

  const { data: salesReportData } = useGetSalesReportQuery(queryParams);

  useEffect(() => {
    if (salesReportData) {
      console.log(salesReportData);
      setSalesData(salesReportData.salesReport);
      setCurrentPage(salesReportData.page);
      setTotalPages(salesReportData.totalPages);
      setTotalAmount(salesReportData.totalOrderAmount);
      setTotalDiscount(salesReportData.totalDiscount);
    }
  }, [salesReportData]);

  useEffect(() => {
    console.log(salesData, "====sales DAta");
    console.log(totalAmount, "total amount");
  }, [salesData, totalAmount]);

  /*
    const handlePdfDownload = async () => {
    try {
      const response = await axiosInstance.get(
        `/admin/download/report/pdf?period=${activeTab}&startDate=${startDate}&endDate=${endDate}`,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      saveAs(blob, "SALES REPORT.pdf");

    } catch (error) {
      console.error(error);
    }
  };

  const handleXldownload = async () => {
    try {
      const response = await axiosInstance.get(
        `/admin/download/report/xl?period=${activeTab}&startDate=${startDate}&endDate=${endDate}`,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "SalesReport.xlsx");

    } catch (error) {
      console.error(error);
    }
  };




  */

  const handleDownloadPdf = async () => {
    try {
      console.log("inside pdf download");
      // Trigger the query and unwrap the result
      const blob = await triggerDownload({
        period: activeTab,
        startDate,
        endDate,
      }).unwrap();

      console.log(blob, "blob generated going to save in file savver");

  

      const officialBlob = new Blob([blob], { type: "application/pdf" });
      console.log(officialBlob.size,"blbobb sizs"); // Should not be 0
      console.log(officialBlob.type,"blob type"); // Should be 'application/pdf'
      saveAs(officialBlob, "sales_Report.pdf");

      // toast.success("PDF downloaded successfully!");

      toast.success("downloaded pdf successfully");
    } catch (err) {
      console.error("Error downloading the PDF:", err);
    }
  };

  const handleDownloadExcel = async() => {
    console.log("handle download excel");


    const blob = await triggerDownloadXl({  period: activeTab, startDate, endDate }).unwrap()

    console.log(blob,"blob xllll")

    const officialBlob = new Blob([blob], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
    saveAs(officialBlob, "SalesReport.xlsx");
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 font-primary">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Sales Report</h1>

        {/* Tabs and Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap  gap-2 mb-4 ">
            {tabContent.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                className="font-bold"
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                  if (tab !== "custom") {
                    setStartDate("");
                    setEndDate("");
                  }
                }}
              >
                {tab}
              </Button>
            ))}
          </div>

          {activeTab === "custom" && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <input
                type="date"
                className="border rounded p-2 w-full md:w-auto text-sm"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span>to</span>
              <input
                type="date"
                className="border rounded p-2 w-full md:w-auto text-sm"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Download Buttons */}
        <div className="flex flex-wrap justify-end items-center gap-4 mb-6">
          {/* Total Amount Card */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full md:w-auto text-center">
            <h2 className="text-lg font-semibold text-gray-600">
              Total Order Amount
            </h2>
            <p className="text-2xl font-bold text-gray-800">
              ₹{totalAmount && totalAmount.toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full md:w-auto text-center">
            <h2 className="text-lg font-semibold text-gray-600">
              Total Discount Amount
            </h2>
            <p className="text-2xl font-bold text-gray-800">
              ₹{totalDiscount && totalDiscount.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Sales Table */}
        <div className="bg-white rounded-lg border mb-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="font-semibold">
                <TableHead>User</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData?.map((sale) => (
                <TableRow key={sale._id}>
                  <TableCell>
                    {sale.user.firstName + " " + sale.user.lastName}
                  </TableCell>
                  <TableCell>
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    ₹{sale.discount ? sale.discount.toFixed(2) : "N/A"}
                  </TableCell>
                  <TableCell>{sale.paymentDetails.method}</TableCell>
                  <TableCell>{sale.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex mt-6 gap-4">
          <Button
            onClick={handleDownloadPdf}
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            <DownloadCloud className="mr-2 h-4 w-4" />
            Download as PDF
          </Button>
          <Button
            onClick={handleDownloadExcel}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <FileSpreadsheetIcon className="mr-2 h-4 w-4" />
            Download as Excel
          </Button>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages || 0}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default SalesReport;
