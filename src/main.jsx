// Synchronously normalize persisted `tableData` before React mounts.
// This prevents a first-render crash when some other code attempts to spread
// a non-iterable value from localStorage.
try {
  const raw = localStorage.getItem("tableData");
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        localStorage.setItem("tableData", JSON.stringify([]));
      }
    } catch (err) {
      // corrupted JSON -> reset synchronously
      localStorage.setItem("tableData", JSON.stringify([]));
    }
  }
} catch (e) {
  // If localStorage is unavailable (eg. some privacy modes), ignore.
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
