const fs = require('fs');

// Read the service account JSON file
const base64 = fs.readFileSync('../Config/chminhazDashboard.json');

// Convert to base64
const base64String = Buffer.from(base64).toString('base64');
