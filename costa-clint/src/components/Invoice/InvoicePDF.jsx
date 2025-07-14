import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    color: '#000000',
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1d4ed8',
  },
  subheading: {
    fontSize: 14,
    marginTop: 4,
  },
  label: {
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1px solid #d1d5db',
    paddingVertical: 4,
  },
  totalRow: {
    marginTop: 8,
    borderTop: '2px solid #6b7280',
    fontWeight: 'bold',
    fontSize: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  statusPaid: {
    backgroundColor: '#dcfce7',
    color: '#15803d',
    fontWeight: 600,
    padding: 4,
    borderRadius: 4,
  },
  statusDue: {
    backgroundColor: '#fef3c7',
    color: '#b45309',
    fontWeight: 600,
    padding: 4,
    borderRadius: 4,
  },
  footer: {
    fontSize: 10,
    color: '#4b5563',
    marginTop: 40,
    lineHeight: 1.4,
  },
});

const InvoicePDF = ({ data }) => {
  const {
    invoiceNumber,
    invoiceDate,
    dueDate,
    customer,
    booking,
    pricing,
  } = data;

  const {
    baseFare,
    distanceKm,
    distanceRate,
    extraPassengers,
    extraPassengerFee,
    nightSurchargePercent,
    taxPercent,
    paymentMethod,
    paymentStatus,
  } = pricing;

  const distanceCharge = Math.max(0, distanceKm - 10) * distanceRate;
  const extraFee = Math.max(0, extraPassengers - 3) * extraPassengerFee;
  const subtotal = baseFare + distanceCharge + extraFee;
  const nightSurcharge = (subtotal * nightSurchargePercent) / 100;
  const taxAmount = ((subtotal + nightSurcharge) * taxPercent) / 100;
  const total = subtotal + nightSurcharge + taxAmount;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.heading}>RideApp</Text>
            <Text style={styles.subheading}>Airport & Hotel Transfer Services</Text>
          </View>
          <View>
            <Text>Invoice #: {invoiceNumber}</Text>
            <Text>Date: {invoiceDate}</Text>
            <Text>Due Date: {dueDate}</Text>
          </View>
        </View>

        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={styles.label}>Bill To:</Text>
          <Text>{customer.name}</Text>
          <Text>{customer.email}</Text>
          <Text>{customer.phone}</Text>
        </View>

        {/* Booking Info */}
        <View style={styles.section}>
          <Text style={styles.label}>Booking Details:</Text>
          <Text>Pickup: {booking.pickup}</Text>
          <Text>Dropoff: {booking.dropoff}</Text>
          <Text>Date & Time: {booking.date} @ {booking.time}</Text>
          <Text>Flight Number: {booking.flight}</Text>
        </View>

        {/* Pricing Table */}
        <View style={styles.section}>
          <Text style={styles.label}>Pricing Breakdown:</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text>Base Fare</Text>
              <Text>${baseFare.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text>Distance Charge</Text>
              <Text>${distanceCharge.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text>Extra Passenger Fee</Text>
              <Text>${extraFee.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text>Night Surcharge ({nightSurchargePercent}%)</Text>
              <Text>${nightSurcharge.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
              <Text>Tax ({taxPercent}%)</Text>
              <Text>${taxAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text>Total</Text>
              <Text>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Payment Info */}
        <View style={styles.section}>
          <Text style={styles.label}>Payment Information:</Text>
          <Text>Method: {paymentMethod}</Text>
          <Text>
            Status:{' '}
            <Text style={
              paymentStatus === 'Paid' ? styles.statusPaid : styles.statusDue
            }>
              {paymentStatus}
            </Text>
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            Thank you for choosing RideApp. Please contact support@example.com for any questions regarding this invoice.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;