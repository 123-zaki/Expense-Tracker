// Safe helpers for reading/writing the `tableData` key in localStorage.
// Always return an array from reads and swallow parse errors.
export function readTableData() {
  try {
    const raw = localStorage.getItem("tableData");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    // corrupted value - reset to empty array
    console.warn("readTableData: invalid tableData in localStorage, returning []", err);
    return [];
  }
}

export function writeTableData(arr) {
  try {
    const safe = Array.isArray(arr) ? arr : [];
    localStorage.setItem("tableData", JSON.stringify(safe));
  } catch (err) {
    console.error("writeTableData: failed to write tableData", err);
  }
}
