import React from 'react';
import { ScheduleRow } from './types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

interface AmortizationTableProps {
  schedule: ScheduleRow[];
}

const AmortizationTable: React.FC<AmortizationTableProps> = ({ schedule }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 0 }}>
      {schedule.length > 0 && (
        <>
          {/* <Typography variant="h6" align="center" gutterBottom>
            Monthly Amortization Schedule
          </Typography> */}
          <Table border={1}>
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell>EMI</TableCell>
                <TableCell>Principal Payment</TableCell>
                <TableCell>Interest Payment</TableCell>
                <TableCell>Outstanding Principal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map((row) => (
                <TableRow key={row.month}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell>{row.emi}</TableCell>
                  <TableCell>{row.principalPayment}</TableCell>
                  <TableCell>{row.interestPayment}</TableCell>
                  <TableCell>{row.outstandingPrincipal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </TableContainer>
  );
};

export default AmortizationTable;