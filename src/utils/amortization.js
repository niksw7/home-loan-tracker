export const calculateAmortization = (
  principal,
  startDate,
  payments = [],
  defaultRate = 8.5,
  tenureMonths = 140
) => {
  const history = [];
  let remainingPrincipal = principal;
  let totalInterestPaid = 0;

  // Step 1: sort and prepare map from payments
  const sortedPayments = [...payments].sort((a, b) => new Date(a.date) - new Date(b.date));
  const paymentMap = Object.fromEntries(
    sortedPayments.map(p => [p.date, { principal: p.principalAmountPaid, interest: p.interestPaid, rate: p.rate || defaultRate }])
  );

  const currentDate = new Date(startDate);
  let i = 0;

  // Phase 1: record actual payments
  while (i < tenureMonths) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dateStr = `${year}-${month}-01`;

    const payment = paymentMap[dateStr];
    if (!payment) break;

    const { principal, interest, rate } = payment;

    remainingPrincipal -= principal;
    totalInterestPaid += interest;

    history.push({
      date: dateStr,
      principalAmount: Math.trunc(principal),
      interestAmount: Math.trunc(interest),
      totalEMI: Number(principal) + Number(interest)
    });

    currentDate.setMonth(currentDate.getMonth() + 1);
    i++;
  }

  const principalRemaining = remainingPrincipal;

  // Phase 2: calculate EMI based on remaining principal and remaining tenure
  const remainingMonths = tenureMonths - i;
  const monthlyRate = defaultRate / 12 / 100;
  const emi = monthlyRate === 0
    ? remainingPrincipal / remainingMonths
    : (remainingPrincipal * monthlyRate * Math.pow(1 + monthlyRate, remainingMonths)) /
      (Math.pow(1 + monthlyRate, remainingMonths) - 1);

  // Phase 2: projections
  let interestLeft = 0;
  while (remainingPrincipal > 0 && i < tenureMonths) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dateStr = `${year}-${month}-01`;

    const interest = remainingPrincipal * monthlyRate;
    const principalComponent = emi - interest;

    if (principalComponent <= 0) break;

    const adjustedPrincipal = Math.min(principalComponent, remainingPrincipal);
    remainingPrincipal -= adjustedPrincipal;
    interestLeft += interest;

    history.push({
      date: dateStr,
      principalAmount: Math.trunc(adjustedPrincipal),
      interestAmount: Math.trunc(interest),
      totalEMI: "" // Projection — not paid yet
    });

    currentDate.setMonth(currentDate.getMonth() + 1);
    i++;
  }

  // Phase 3: pad remaining tenure with empty projections if loan is over
  while (i < tenureMonths) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dateStr = `${year}-${month}-01`;

    history.push({
      date: dateStr,
      principalAmount: 0,
      interestAmount: 0,
      totalEMI: ""
    });

    currentDate.setMonth(currentDate.getMonth() + 1);
    i++;
  }

  return {
    principalLoan: (principal),
    principalRemaining: Math.max(principalRemaining, 0),
    interestPaidSoFar: totalInterestPaid,
    interestLeft: interestLeft.toFixed(2),
    expectedEMI: emi.toFixed(2),
    history
  };
};
