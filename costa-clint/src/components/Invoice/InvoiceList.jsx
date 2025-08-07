import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './InvoicePDF';
const invoices = [
  {
    invoiceNumber: "INV-001",
    invoiceDate: "2025-07-13",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456",
    },
    booking: {
      pickup: "Airport",
      dropoff: "Hotel XYZ",
      date: "2025-07-12",
      time: "10:00 AM",
      flight: "QR 123",
    },
    pricing: {
      baseFare: 30,
      distanceKm: 15,
      distanceRate: 2,
      extraPassengers: 4,
      extraPassengerFee: 5,
      nightSurchargePercent: 10,
      taxPercent: 8,
    },
  },
];
const InvoiceList = () => {
  
  return (
    <div className="p-6">
      {invoices.map((invoice, i) => (
        <div key={i} className="p-4 mb-4 border rounded shadow">
          <p><strong>Invoice:</strong> {invoice.invoiceNumber}</p>
          <p><strong>Customer:</strong> {invoice.customer.name}</p>
          <p><strong>Customer:</strong> {invoice.customer.name}</p>

          <PDFDownloadLink
            document={<InvoicePDF data={invoice} />}
            fileName={`invoice-${invoice.invoiceNumber}.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <button className="btn btn-disabled">Generating...</button>
              ) : (
                <button className="mt-2 btn btn-primary">Download Invoice</button>
              )
            }
          </PDFDownloadLink>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;
