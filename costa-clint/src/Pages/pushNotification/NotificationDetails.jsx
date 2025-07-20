import React from 'react';

function useQuery() {
  return new URLSearchParams(window.location.search);
}

const NotificationDetails = () => {
  const query = useQuery();

  const title = query.get('title');
  const body = query.get('body');
  const timestamp = query.get('timestamp');

  const formattedDate = timestamp ? new Date(timestamp).toLocaleString() : null;

  if (!title || !body) {
    return (
      <div style={styles.container}>
        <h2>No notification data found.</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{decodeURIComponent(title)}</h1>
      <p style={styles.body}>{decodeURIComponent(body)}</p>
      {formattedDate && <small style={styles.timestamp}>Received at: {formattedDate}</small>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: '2rem auto',
    padding: '1rem',
    background: '#f9f9f9',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  title: {
    color: '#007bff',
    fontSize: '1.8rem',
    marginBottom: '0.5rem',
  },
  body: {
    fontSize: '1.2rem',
    lineHeight: 1.5,
    whiteSpace: 'pre-wrap',
  },
  timestamp: {
    color: '#666',
    marginTop: '1rem',
    display: 'block',
  },
};

export default NotificationDetails;
