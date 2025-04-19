import { useState } from 'react';

export default function EmiHistory({ history }) {
  const [editRow, setEditRow] = useState(null);
  const [editPayment, setEditPayment] = useState(null);

  const handleTripleClick = (row) => {
    console.log("sahaeb aaya ye", row);
    const totalAmount = Number(row.principalAmount) + Number(row.interestAmount);
    setEditRow(prev => (prev?.date === row.date ? null : row));
    setEditPayment({ amount: totalAmount });
  };

  const handleChange = (e) => {
    setEditPayment({ ...editPayment, amount: Number(e.target.value) });
  };

  const handleSubmit = async () => {
    console.log("--------", editPayment)
    if (!editPayment?.amount || !editRow) return;

    const paymentUpdate = {
      date: editRow.date,
      amount: editPayment.amount
    };

    console.log("Mock commit to payments.json:", paymentUpdate);

    setEditRow(null);
    setEditPayment(null);
  };

  return (
    <div>
      <table style={{ borderCollapse: 'collapse', width: '50%' }}>
        <thead>
          <tr>
            <th style={cellStyle}>Date</th>
            <th style={cellStyle}>Principal</th>
            <th style={cellStyle}>Interest</th>
            <th style={cellStyle}>Total EMI</th>
            {editRow && <th style={cellStyle}>Edit</th>}
          </tr>
        </thead>
        <tbody>
          {history.map((row, idx) => (
            <tr
              key={idx}
              style={row.totalEMI == 0 ? { backgroundColor: '#fff8dc' } : {}}
            >
              <td
                style={cellStyle}
                onClick={(e) => {
                  if (e.detail === 3) handleTripleClick(row);
                }}
                title="Triple-click to edit"
              >
                {row.date}
              </td>
              <td style={cellStyle}>₹{Number(row.principalAmount)}</td>
              <td style={cellStyle}>₹{Number(row.interestAmount)}</td>
              <td style={cellStyle}>
                ₹
                {row.totalEMI == 0
                  ? Number(row.principalAmount) + Number(row.interestAmount)
                  : Number(row.totalEMI)+"✅"}
              </td>
              {editRow && (
                <td style={cellStyle}>
                  {editRow.date === row.date && (
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <input
                        type="number"
                        value={editPayment?.amount || ""}
                        onChange={handleChange}
                        placeholder="Enter amount"
                      />
                      <button onClick={handleSubmit}>💾</button>
                    </div>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'right'
};
