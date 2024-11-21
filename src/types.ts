export interface ScheduleRow {
  month: number;
  emi: number;
  principalPayment: number;
  interestPayment: number;
  outstandingPrincipal: number;
}

export interface InputData {
  loanAmount: number;
  annualRate: number;
  tenureYears: number;
  extraPayment?: number;
}