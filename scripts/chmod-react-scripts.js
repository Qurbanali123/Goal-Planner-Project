const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, '../node_modules/.bin/react-scripts');

fs.chmod(target, 0o755, (err) => {
  if (err) {
    // Ignore errors; script may not exist on Windows or yet
    // Log at debug level for visibility
    console.debug('chmod helper: could not chmod', target, err && err.message);
    process.exit(0);
  }
  console.debug('chmod helper: success', target);
  process.exit(0);
});
