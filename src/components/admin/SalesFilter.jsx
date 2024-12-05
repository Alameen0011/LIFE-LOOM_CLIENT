import { useState } from "react";


const SalesFilter = ({ onFilterChange }) => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  // Trigger API call when year changes
  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
    onFilterChange({ year: selectedYear, month });
  };

  // Trigger API call when month changes
  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setMonth(selectedMonth);
    onFilterChange({ year, month: selectedMonth });
  };

  return (
    <div className="filter-form">
      <label htmlFor="year">Year:</label>
      <select id="year" value={year} onChange={handleYearChange}>
        <option value="">Select Year</option>
        {Array.from({ length: 10 }, (_, index) => {
          const currentYear = new Date().getFullYear();
          return (
            <option key={index} value={currentYear - index}>
              {currentYear - index}
            </option>
          );
        })}
      </select>

      <label htmlFor="month">Month:</label>
      <select id="month" value={month} onChange={handleMonthChange}>
        <option value="">Select Month</option>
        {[
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ].map((monthName, index) => (
          <option key={index} value={index + 1}>
            {monthName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SalesFilter;