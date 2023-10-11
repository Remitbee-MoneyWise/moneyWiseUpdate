import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableFooter, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TablePagination from "@mui/material/TablePagination";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  updateCurrencyDetails,
  UpdateCurrencyDetailsRequest,
} from "../apiLayers/currency";
import { toast } from "react-toastify";

const label = { inputProps: { "aria-label": "Switch demo" } };
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const SearchBarContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end", // Align to the right
  marginBottom: "10px",
  paddingRight: "10px", // Add some right padding
});

const SearchInput = styled("input")({
  width: "300px", // Set a fixed width for the input
  padding: "10px",
  borderRadius: "5px",
  border: "2px solid #6d2828",
});

const LoadingSpinner = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function Dashboard() {
  const handleUpdate = async () => {
    toast.success("You have Successfully Updated");
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const data = [
    { currency: "USD", rate: 330, ratioSwitch: 1, ratio: 98 },
    { currency: "INR", rate: 3.3, ratioSwitch: 0, ratio: 97.5 },
    { currency: "EUR", rate: 170, ratioSwitch: 1, ratio: 95 },
    { currency: "GBP", rate: 256.45, ratioSwitch: 1, ratio: 99 },
    { currency: "USD", rate: 330, ratioSwitch: 1, ratio: 98 },
    { currency: "INR", rate: 3.3, ratioSwitch: 0, ratio: 97.5 },
    { currency: "EUR", rate: 170, ratioSwitch: 1, ratio: 95 },
    { currency: "GBP", rate: 256.45, ratioSwitch: 1, ratio: 99 },
    { currency: "USD", rate: 330, ratioSwitch: 1, ratio: 98 },
    { currency: "INR", rate: 3.3, ratioSwitch: 0, ratio: 97.5 },
    { currency: "EUR", rate: 170, ratioSwitch: 1, ratio: 95 },
    { currency: "GBP", rate: 256.45, ratioSwitch: 1, ratio: 99 },
    { currency: "USD", rate: 330, ratioSwitch: 1, ratio: 98 },
    { currency: "INR", rate: 3.3, ratioSwitch: 0, ratio: 97.5 },
    { currency: "EUR", rate: 170, ratioSwitch: 1, ratio: 95 },
    { currency: "GBP", rate: 256.45, ratioSwitch: 1, ratio: 99 },
    { currency: "USD", rate: 330, ratioSwitch: 1, ratio: 98 },
    { currency: "INR", rate: 3.3, ratioSwitch: 0, ratio: 97.5 },
    { currency: "EUR", rate: 170, ratioSwitch: 1, ratio: 95 },
    { currency: "GBP", rate: 256.45, ratioSwitch: 1, ratio: 99 },
    { currency: "USD", rate: 330, ratioSwitch: 1, ratio: 98 },
    { currency: "INR", rate: 3.3, ratioSwitch: 0, ratio: 97.5 },
    { currency: "EUR", rate: 170, ratioSwitch: 1, ratio: 95 },
    { currency: "GBP", rate: 256.45, ratioSwitch: 1, ratio: 99 },
    { currency: "USD", rate: 330, ratioSwitch: 1, ratio: 98 },
    { currency: "INR", rate: 3.3, ratioSwitch: 0, ratio: 97.5 },
    { currency: "EUR", rate: 170, ratioSwitch: 1, ratio: 95 },
    { currency: "GBP", rate: 256.45, ratioSwitch: 1, ratio: 99 },
    { currency: "USD", rate: 330, ratioSwitch: 1, ratio: 98 },
    { currency: "INR", rate: 3.3, ratioSwitch: 0, ratio: 97.5 },
    { currency: "EUR", rate: 170, ratioSwitch: 1, ratio: 95 },
    { currency: "GBP", rate: 256.45, ratioSwitch: 1, ratio: 99 },
    { currency: "AUD", rate: 300, ratioSwitch: 0, ratio: 98 },
  ];

  // Create an anonymous array of boolean values based on the ratioSwitch values
  const [switchStates, setSwitchStates] = useState(
    data.map((row) => Boolean(row.ratioSwitch))
  );

  const handleSwitchChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newSwitchStates = [...switchStates];
      newSwitchStates[index] = event.target.checked;
      setSwitchStates(newSwitchStates);
    };

  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    const fetchRates = async (currency: string) => {
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${currency}`
        );
        const data = await response.json();
        if (data && data.rates && data.rates["LKR"]) {
          setExchangeRates((prevRates) => ({
            ...prevRates,
            [currency]: data.rates["LKR"],
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch the exchange rates for each currency when the component mounts
    data.forEach(({ currency }) => fetchRates(currency));
  }, []);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (...args: any[]) => {
    const [event, reason] = args;

    if (args.length === 1) {
      // Handle the Alert case
      return;
    }

    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Currencies Dashboard</h1>
      <div
        style={{
          margin: "2px",
          padding: "10px",
          height: "500px",
          overflow: "auto",
          position: "relative", // Add relative positioning
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead style={{ position: "sticky" }}>
              <StyledTableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>Currencies </StyledTableCell>
                <StyledTableCell>XE Rate (LKR)</StyledTableCell>
                <StyledTableCell>Our Rate (LKR)</StyledTableCell>
                <StyledTableCell>Turn on Ratio</StyledTableCell>
                <StyledTableCell>Our Ratio (%)</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <StyledTableRow>
                    <StyledTableCell>
                      {page * rowsPerPage + index + 1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.currency}
                    </StyledTableCell>
                    <StyledTableCell>
                      {exchangeRates[row.currency] || "Loading..."}
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        disabled={switchStates[index]}
                        value={row.rate}
                        size="small"
                        variant="outlined"
                        sx={{ width: "80px" }}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Switch
                        {...label}
                        onChange={handleSwitchChange(index)}
                        // checked={Boolean(row.ratioSwitch)}
                        defaultChecked={Boolean(row.ratioSwitch)}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        disabled={!switchStates[index]}
                        value={row.ratio}
                        size="small"
                        variant="outlined"
                        sx={{ width: "80px" }}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>

            <TableFooter>
              <TableRow></TableRow>
            </TableFooter>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
        <div style={{ position: "absolute", right: "10px", marginTop: "10px" }}>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Updated Successfully!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
