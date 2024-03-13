import React, { useState, useEffect } from "react";
import CustomNavbar from "./Navbar";
import axios from "axios";
import DisplayFormData from "./DisplayFormData";
import '../styles/Dashboard.css';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import BasicPopover from './BasicPopover';



const Dashboard = ({ handleLogout }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [journalData, setJournalData] = useState(null);
  const [checkerDate, setCheckerDate] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("Pending");
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [journalNumber, setJournalNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);


  const custDate = selectedDate ? dayjs(selectedDate).format('DDMMYYYY') : '';

  console.log(custDate);

  // Define state variables for pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // Set the number of rows per page

  // Calculate the index of the first and last item of the current page
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Handler for page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handler for rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };



  const fetchTodayStatus = async () => {
    try {
      setLoading(true);

      const storedEmployeeInfo = localStorage.getItem("employeeInfo");
      const employeeInfo = storedEmployeeInfo ? JSON.parse(storedEmployeeInfo) : null;
      const branchcode = employeeInfo.branch_code;

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '');

      const apiUrl = "http://172.23.190.52:3084/getStatusJobResponse";
      const requestBody = {
        checkerDate: formattedDate,
        branchcode: branchcode,
      };

      const response = await axios.post(apiUrl, requestBody);

      if (response.data) {
        setResults(response.data);
        setErrorMessage("");

      } else {
        setErrorMessage("No data found for this day.");
        console.log("no data found");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setResults([]);
      setErrorMessage("No data found for this day.");
      console.error("Error fetching status:", error);
    }
  };

  useEffect(() => {
    fetchTodayStatus();
  }, []);

  const handleView = async (journalNumber) => {
    console.log("View button clicked for journalNumber:", journalNumber);
    navigate(`/authorization/${journalNumber}`);
  };
  const handleView2 = async (journalNumber) => {
    console.log("View button clicked for journalNumber:", journalNumber);
    navigate(`/updateCustomer/${journalNumber}`);
  };


  const Footer = () => {
    return (
      <footer
        style={{
          background: "#a7d5ff",
          padding: "2px",
          margin: "-30px",
          textAlign: "center",
          marginTop: "auto",
        }}
      >
        <p>&copy; ICT Division EAI Team All rights reserved.</p>
      </footer>
    );
  };

  const handleSearch = async () => {
    try {
      setLoading(true);

      const storedEmployeeInfo = localStorage.getItem("employeeInfo");
      const employeeInfo = storedEmployeeInfo ? JSON.parse(storedEmployeeInfo) : null;
      const branchcode = employeeInfo.branch_code;

      const apiUrl = "http://172.23.190.52:3084/getStatusJobResponse";
      const requestBody = {
        checkerDate: custDate,
        branchcode: branchcode,
      };

      const response = await axios.post(apiUrl, requestBody);
      setResults(response.data);
      setErrorMessage('');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setResults([]);
      setErrorMessage("No data found for this day.");
      console.error("Error fetching status:", error);
    }
  };

  const filterResults = () => {
    let filteredResults = results;
    console.log(results);

    if (filter !== "All") {
      filteredResults = filteredResults.filter((result) => result.status === filter);
    }

    filteredResults.sort((a, b) => {
      return parseInt(b.journalNumber) - parseInt(a.journalNumber);
    });

    return filteredResults;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success':
        return 'green';
      case 'Failed':
        return 'red';
      case 'Rejected':
        return 'orange'; // Choose your color for the 'Rejected' status
      default:
        return 'black'; // Default color
    }
  };


  return (
    <div className="dashboard">
      <CustomNavbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />

      <h2 className="heading">Status Panel</h2>

      <form className="formStyle">
        <span>Date:</span>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MM/dd/yyyy"
          maxDate={new Date()}
          className="inputStyle"
        />
        <button type="button" onClick={handleSearch} className="enquireBtn">
          Search
        </button>
      </form>
      {errorMessage && (
        <p style={{ color: "red", textAlign: "center", paddingTop: "20px" }}>{errorMessage}</p>
      )}
      {loading && <p className="loadingStyle">Loading...</p>}

      {!loading && results.length > 0 && (
        <div className="tableContainer">
          <div className="filterContainer">
            <label>
              Filter:
              <select id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </label>
          </div>
          <h3 className="sectionHeading">Search Results</h3>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: '10%', fontWeight: 'bold', textAlign: 'center' }}>SERIAL NUMBER</TableCell>
                  <TableCell sx={{ width: '15%', fontWeight: 'bold', textAlign: 'center' }}>JOURNAL NUMBER</TableCell>
                  <TableCell sx={{ width: '15%', fontWeight: 'bold', textAlign: 'center' }}>STATUS</TableCell>
                  <TableCell sx={{ width: '15%', fontWeight: 'bold', textAlign: 'center' }}>DETAILS</TableCell>
                  <TableCell sx={{ width: '15%', fontWeight: 'bold', textAlign: 'center' }}>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Render rows for the current page only */}
                {filterResults().slice(startIndex, endIndex).map((result, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ width: '10%', textAlign: 'center' }}>{startIndex + index + 1}</TableCell>
                    <TableCell sx={{ width: '15%', textAlign: 'center' }}>{result.journalNumber}</TableCell>
                    <TableCell sx={{ width: '15%', textAlign: 'center' }} style={{ color: getStatusColor(result.status) }}>{result.status}</TableCell>
                    <TableCell sx={{ width: '15%', textAlign: 'center' }}>
                      <BasicPopover
                        buttonStyle={{ backgroundColor: "#739072", color: "white", width: "100px" }}
                        content={(
                          <Typography sx={{ p: 1 }}>
                            {result.reasonNote}
                            <span>
                              {result.job_response?.Data?.Stat?.OkMessage?.RcptData === "O.K." ? (
                                <span>O.K.</span>
                              ) : (
                                <span>{result.job_response?.details?.Message}</span>
                              )}
                            </span>
                            {result.status === 'Pending' ? (
                              <span>Pending</span>
                            ) : result.status === 'Processing' ? (
                              <span>Processing</span>
                            ) : null}
                          </Typography>
                        )}
                        buttonText="Reason"
                        buttonSize="small"
                      />
                    </TableCell>
                    <TableCell sx={{ width: '15%', textAlign: 'center' }}>
                      {result.status === 'Pending' ? (
                        <Button onClick={() => handleView(result.journalNumber)} id  = "authorizeBtn">Authorize</Button>
                      ) : result.status === 'Success' ? (
                        <Button variant="outlined" disabled style={{ backgroundColor: "#40A2E3", color: "white", width: "100px" }}>
                          Success
                        </Button>
                      ) : result.status === 'Processing' ? (
                        <Button variant="outlined" disabled style={{ backgroundColor: "#40A2E3", color: "white", width: "100px" }}>
                          Processing
                        </Button>
                      ) : result.status === 'Rejected' ? (
                        <Button onClick={() => handleView2(result.journalNumber)} id="updateBtn">
                          Update
                        </Button>
                      ) : result.status === 'Failed' ? (
                        <Button onClick={() => handleView(result.journalNumber)} id  = "authorizeBtn">
                          Retry
                        </Button>
                      )
                        : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Pagination component */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]} // Define options for rows per page
            component="div"
            count={filterResults().length} // Total number of items
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Dashboard;

