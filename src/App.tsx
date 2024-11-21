import React, { useState } from 'react';
import './App.css';
import InputForm from './InputForm';
import { InputData, ScheduleRow } from './types';
import AmortizationTable from './AmortizationTable';
import { Container, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

const App: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleRow[]>([]);

  const calculateSchedule = (data: InputData) => {
    const { loanAmount, annualRate, tenureYears, extraPayment = 0 } = data;
    const monthlyRate = annualRate / 12 / 100;
    const totalPayments = tenureYears * 12;
    const emi = parseFloat(
      (
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1)
      ).toFixed(2)
    );

    let outstandingPrincipal = loanAmount;
    const newSchedule: ScheduleRow[] = [];

    for (let month = 1; month <= totalPayments; month++) {
      const interestPayment = outstandingPrincipal * monthlyRate;
      const principalPayment = emi - interestPayment + extraPayment;
      outstandingPrincipal = Math.max(outstandingPrincipal - principalPayment, 0);

      newSchedule.push({
        month,
        emi: emi + extraPayment,
        principalPayment: parseFloat(principalPayment.toFixed(2)),
        interestPayment: parseFloat(interestPayment.toFixed(2)),
        outstandingPrincipal: parseFloat(outstandingPrincipal.toFixed(2)),
      });

      if (outstandingPrincipal <= 0) break;
    }

    setSchedule(newSchedule);
  };

  return (
    <Container>
      <Typography variant="h6" align="center" gutterBottom>
        <h2>Home Loan Amortization Schedule</h2>
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <InputForm onCalculate={calculateSchedule} />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={3} sx={{ padding: 2, maxHeight: '500px', overflow: 'auto' }}>
            <AmortizationTable schedule={schedule} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
