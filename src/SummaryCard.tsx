import React from 'react';
import {Paper, Typography, Box} from '@mui/material';
import {formatToIndianCurrency} from "./utils";

interface SummaryCardProps {
  totalInterestPaid: number;
  totalAmountPaid: number;
  decimalPlaces: number; // To ensure consistent formatting
  isGrayedOut: boolean; // New prop to control graying out
}

const SummaryCard: React.FC<SummaryCardProps> = (
  {
    totalInterestPaid,
    totalAmountPaid,
    isGrayedOut,
  }) => {

  return (
    <Paper
      elevation={1}
      sx={{
        padding: 2,
        marginTop: 2,
        opacity: isGrayedOut ? 0.5 : 1, // Gray out based on state
    }}
    >
      <Typography variant="h6" gutterBottom>
        Summary
      </Typography>
      <Box display="flex" justifyContent="space-between" marginBottom={1}>
        <Typography variant="body1">Interest Amount</Typography>
        <Typography variant="body1">{formatToIndianCurrency(totalInterestPaid)}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1">Total Amount Payable</Typography>
        <Typography variant="body1">{formatToIndianCurrency(totalAmountPaid)}</Typography>
      </Box>
    </Paper>
  );
};

export default SummaryCard;