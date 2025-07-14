import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './InvoicePDF';

const InvoiceList = ({ invoices }) => {
  return (
    <div className="p-6">
      {invoices.map((invoice, i) => (
        <div key={i} className="border rounded p-4 mb-4 shadow">
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
                <button className="btn btn-primary mt-2">Download Invoice</button>
              )
            }
          </PDFDownloadLink>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;
