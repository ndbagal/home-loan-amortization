import React, { useState } from 'react';
import { InputData } from './types';
import {TextField, Button, Box, Paper} from '@mui/material';

interface InputFormProps {
  onCalculate: (data: InputData) => void;
  onFormChange: () => void;
  isButtonDisabled: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onCalculate, onFormChange, isButtonDisabled }) => {
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

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string,
  ) => {
    setter(value);
    onFormChange(); // Notify parent on any change
  };

  return (
    <Paper elevation={1} sx={{padding: 2}}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, margin: '0 auto' }}>
        <TextField
          label="Loan Amount"
          variant="outlined"
          required
          type="number"
          value={loanAmount}
          onChange={(e) => handleChange(setLoanAmount, e.target.value)}
        />
        <TextField
          label="Annual Interest Rate (%)"
          variant="outlined"
          required
          type="number"
          value={annualRate}
          onChange={(e) => handleChange(setAnnualRate, e.target.value)}/>
        <TextField
          label="Loan Tenure (Years)"
          variant="outlined"
          required
          type="number"
          value={tenureYears}
          onChange={(e) => handleChange(setTenureYears, e.target.value)}/>
        <TextField
          label="Extra Monthly Payment (Optional)"
          variant="outlined"
          required
          type="number"
          value={extraPayment}
          onChange={(e) => handleChange(setExtraPayment, e.target.value)}/>
        <Button
          variant="contained"
          size="large"
          type="submit"
          disabled={isButtonDisabled} // Disable button when needed
        >Calculate</Button>
      </Box>
    </Paper>
  );
};

export default InputForm