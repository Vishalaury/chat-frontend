
// BACKEND ka base URL
const BASE =
  (import.meta.env.VITE_SERVER_URL || "").trim() ||
  "http://localhost:5001"; // ← FINAL FIXED PORT

async function apiJSON(path, body) {
  try {
    const response = await fetch(`${BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`);
    }

    return data;
  } catch (err) {
    if (err?.message === "Failed to fetch" || err?.name === "TypeError") {
      throw new Error("Unable to reach server. Please try again.");
    }
    throw err;
  }
}

// EXPORT FUNCTIONS
export const loginUser = (username, password) =>
  apiJSON("/auth/login", { username, password });

export const registerUser = (username, password, email) =>
  apiJSON("/auth/register", { username, password, email });
