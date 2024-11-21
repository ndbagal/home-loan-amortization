import React, { useState } from 'react';
import { InputData } from './types';
import { TextField, Button, Box } from '@mui/material';

interface InputFormProps {
  onCalculate: (data: InputData) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onCalculate }) => {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [annualRate, setAnnualRate] = useState<string>('');
  const [tenureYears, setTenureYears] = useState<string>('');
  const [extraPayment, setExtraPayment] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      loanAmount: parseFloat(loanAmount),
      annualRate: parseFloat(annualRate),
      tenureYears: parseInt(tenureYears, 10),
      extraPayment: extraPayment ? parseFloat(extraPayment) : 0,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: '0 auto' }}>
      <TextField
        label="Loan Amount"
        variant="outlined"
        required
        type="number"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}/>
      <TextField
        label="Annual Interest Rate (%):"
        variant="outlined"
        required
        type="number"
        value={annualRate}
        onChange={(e) => setAnnualRate(e.target.value)}/>
      <TextField
        label="Loan Tenure (Years):"
        variant="outlined"
        required
        type="number"
        value={tenureYears}
        onChange={(e) => setTenureYears(e.target.value)}/>
      <TextField
        label="Extra Monthly Payment (Optional):"
        variant="outlined"
        required
        type="number"
        value={extraPayment}
        onChange={(e) => setExtraPayment(e.target.value)}/>
      <Button variant="contained" type="submit">Calculate</Button>
    </Box>
  );
};

export default InputForm