import React, { useEffect, useState } from 'react';
import { calculateAmortization } from './utils/amortization';
import LoanSummary from './components/LoanSummary';
import EmiHistory from './components/EmiHistory';
import payments from './data/payments.json';

const loanInfo = {
  amount: 6000000,
  interestRate: 8.5,
  emi: 100000,
  startDate: '2025-05-01',
  tenureMonths: 120
};

export default function App() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const result = calculateAmortization(
      loanInfo.amount,
      loanInfo.startDate,
      payments,
      loanInfo.interestRate,
      loanInfo.tenureMonths,
    );
    result.currentInterestRate=loanInfo.interestRate;
    setSummary(result);
  }, []);

  if (!summary) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>🏠 Home Loan Tracker</h1>
      <LoanSummary {...summary} />
      <EmiHistory history={summary.history} />
    </div>
  );
}
