import React, {useState} from 'react';
import './App.css';
import InputForm from './InputForm';
import {InputData, ScheduleRow} from './types';
import AmortizationTable from './AmortizationTable';
import {AppBar, Container, Toolbar, Typography} from '@mui/material';
import Grid from '@mui/material/Grid2';
import SummaryCard from "./SummaryCard";

const App: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleRow[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Button state

  const calculateSchedule = (data: InputData) => {
    const {loanAmount, annualRate, tenureYears, extraPayment = 0} = data;
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
    setIsButtonDisabled(true); // Disable button after calculation
  };

  // Calculate total interest and total amount
  const totalInterestPaid = schedule.reduce((sum, row) => sum + row.interestPayment, 0);
  const totalAmountPaid = schedule.reduce((sum, row) => sum + row.emi, 0);

  // Reset button state on form input change
  const handleFormChange = () => {
    setIsButtonDisabled(false); // Enable button on any input change
  };

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Home Loan Amortization Schedule
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Responsive Grid Layout */}
      <Container
        maxWidth="xl"
        sx={{
          height: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',
          padding: '2rem',
        }}>

        <Grid container spacing={4} sx={{display: 'flex', height: '100%'}}>
          <Grid size={{xs: 12, md: 4}}>
            <InputForm onCalculate={calculateSchedule} onFormChange={handleFormChange}
                       isButtonDisabled={isButtonDisabled}/>
            {/* Summary Component */}
            {schedule.length > 0 && (
              <SummaryCard
                totalInterestPaid={totalInterestPaid}
                totalAmountPaid={totalAmountPaid}
                decimalPlaces={2}
                isGrayedOut={!isButtonDisabled} // Gray out when button is enabled
              />
            )}
          </Grid>
          {schedule.length > 0 && (
            <Grid size={{xs: 12, md: 8}} style={{height: '100%'}}>
              <AmortizationTable
                schedule={schedule}
                isGrayedOut={!isButtonDisabled}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default App;
