import React, {useState} from 'react';
import {ScheduleRow} from './types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination, Box, TextField, ToggleButtonGroup, ToggleButton
} from '@mui/material';
import {formatToIndianCurrency} from "./utils";

interface AmortizationTableProps {
  schedule: ScheduleRow[];
  isGrayedOut?: boolean;
}

const AmortizationTable: React.FC<AmortizationTableProps> = ({schedule, isGrayedOut}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [decimalPlaces, setDecimalPlaces] = useState<number>(0); // State to manage decimals
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly'); // Toggle state for monthly/yearly view

  // Handle decimal places change
  const handleDecimalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setDecimalPlaces(value);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Handle view mode change
  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newViewMode: 'monthly' | 'yearly'
  ) => {
    if (newViewMode) {
      setViewMode(newViewMode);
      setPage(0);
    }
  };

  // Process schedule based on view mode
  const processedSchedule =
    viewMode === 'yearly'
      ? schedule.reduce<ScheduleRow[]>((acc, row) => {
        const year = Math.ceil(row.month / 12);
        const lastEntry = acc[acc.length - 1];

        if (!lastEntry || lastEntry.month !== year * 12) {
          acc.push({
            month: year * 12,
            emi: row.emi * 12,
            principalPayment: row.principalPayment,
            interestPayment: row.interestPayment,
            outstandingPrincipal: row.outstandingPrincipal,
          });
        } else {
          lastEntry.principalPayment += row.principalPayment;
          lastEntry.interestPayment += row.interestPayment;
          lastEntry.outstandingPrincipal = row.outstandingPrincipal;
        }

        return acc;
      }, [])
      : schedule;

  return (
    <>
      <Paper elevation={1} sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        opacity: isGrayedOut ? 0.5 : 1, // Gray out based on state
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" margin={2} gap={2}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            size="small"
            onChange={handleViewModeChange}
            aria-label="view mode toggle"
          >
            <ToggleButton value="monthly" aria-label="monthly view">
              Monthly
            </ToggleButton>
            <ToggleButton value="yearly" aria-label="yearly view">
              Yearly
            </ToggleButton>
          </ToggleButtonGroup>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" marginRight={1}>
              Decimal Places:
            </Typography>
            <TextField
              type="number"
              value={decimalPlaces}
              onChange={handleDecimalChange}
              size="small"
              sx={{width: '80px'}}
            />
          </Box>
        </Box>
        <TableContainer sx={{
          height: '100%',
        }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow sx={{
                "& th": {
                  color: "white",
                  backgroundColor: "primary.main"
                }
              }}>
                <TableCell align="right">{viewMode === 'monthly' ? 'Month' : 'Year'}</TableCell>
                <TableCell align="right">{viewMode === 'monthly' ? 'EMI' : 'Annual Payment'}</TableCell>
                <TableCell align="right">Principal Payment</TableCell>
                <TableCell align="right">Interest Payment</TableCell>
                <TableCell align="right">Outstanding Principal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {processedSchedule
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover key={index} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                  <TableCell align="right">{viewMode === 'monthly' ? row.month : Math.ceil(row.month / 12)}</TableCell>
                  <TableCell align="right">{formatToIndianCurrency(row.emi, decimalPlaces)}</TableCell>
                  <TableCell align="right">{formatToIndianCurrency(row.principalPayment, decimalPlaces)}</TableCell>
                  <TableCell align="right">{formatToIndianCurrency(row.interestPayment, decimalPlaces)}</TableCell>
                  <TableCell align="right">{formatToIndianCurrency(row.outstandingPrincipal, decimalPlaces)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{flexShrink: 0}}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={processedSchedule.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          showFirstButton={true}
          showLastButton={true}
        />
      </Paper>
    </>
  );
};

export default AmortizationTable;