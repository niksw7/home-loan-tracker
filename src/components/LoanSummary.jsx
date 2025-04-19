import React from 'react';

export default function LoanSummary({ principalLoan, principalRemaining,interestLeft, currentInterestRate}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2>Loan Summary</h2>
      <p><strong>Loan Disbursed:</strong> ₹{principalLoan}</p>
      <p><strong>Principal Left:</strong> ₹{principalRemaining}</p>
      <p><strong>Interest Left:</strong> ₹{interestLeft}</p>
      <p><strong>Current Interest Rate </strong> {currentInterestRate}%</p>
    </div>
  );
}
