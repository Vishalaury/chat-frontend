
// // // BACKEND ka base URL
// // const BASE =
// //   (import.meta.env.VITE_SERVER_URL || "").trim() ||
// //   "http://localhost:5001"; // ← FINAL FIXED PORT

// // async function apiJSON(path, body) {
// //   try {
// //     const response = await fetch(`${BASE}${path}`, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(body),
// //     });

// //     const data = await response.json().catch(() => ({}));

// //     if (!response.ok) {
// //       throw new Error(data.error || `HTTP ${response.status}`);
// //     }

// //     return data;
// //   } catch (err) {
// //     if (err?.message === "Failed to fetch" || err?.name === "TypeError") {
// //       throw new Error("Unable to reach server. Please try again.");
// //     }
// //     throw err;
// //   }
// // }

// // // EXPORT FUNCTIONS
// // export const loginUser = (username, password) =>
// //   apiJSON("/auth/login", { username, password });

// // export const registerUser = (username, password, email) =>
// //   apiJSON("/auth/register", { username, password, email });



// // ===============================
// //  BACKEND BASE URL SETUP
// // ===============================

// // Render backend ka final URL (WITHOUT trailing slash)
// const RENDER_URL = "https://real-time-chat-backend-2-dw7c.onrender.com";

// // Vite env variable support + fallback
// function cleanURL(url) {
//   return url ? url.replace(/\/+$/, "") : ""; // end me slash hata de
// }

// // export const BASE =
// //   cleanURL(import.meta.env.VITE_SERVER_URL?.trim()) || cleanURL(RENDER_URL);

// const BASE = import.meta.env.VITE_SERVER_URL;

// console.log("SERVER = ", BASE);

// async function apiJSON(path, body) {
//   const response = await fetch(`${BASE}${path}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });

//   return await response.json();
// }


// // ===============================
// //  COMMON API FUNCTION
// // ===============================
// async function apiJSON(path, body) {
//   try {
//     const url = `${BASE}${path}`; // final correct URL

//     console.log("Calling:", url);

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await response.json().catch(() => ({}));

//     if (!response.ok) {
//       throw new Error(data.error || `HTTP ${response.status}`);
//     }

//     return data;
//   } catch (err) {
//     if (err.message.includes("Failed to fetch")) {
//       throw new Error("Unable to reach server. Please try again.");
//     }
//     throw err;
//   }
// }

// // ===============================
// //  EXPORT API FUNCTIONS
// // ===============================

// export const registerUser = (username, password, email) =>
//   apiJSON("/auth/register", { username, password, email });

// export const loginUser = (username, password) =>
//   apiJSON("/auth/login", { username, password });





// FINAL CLEAN VERSION

const BASE = import.meta.env.VITE_SERVER_URL?.trim() || "http://localhost:5001";
console.log("API BASE URL →", BASE);

async function safeFetch(url, opts) {
  try {
    const res = await fetch(url, opts);
    // try json first, else try text
    const text = await res.text().catch(() => "");
    let data = null;
    if (text) {
      try { data = JSON.parse(text); }
      catch { data = text; }
    }
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    console.error("safeFetch error:", err);
    return { ok: false, status: 0, data: { error: "Network error" } };
  }
}

export async function apiJSON(path, body = {}) {
  const url = `${BASE}${path}`;
  const resp = await safeFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return resp; // { ok, status, data }
}

export async function fetchRooms() {
  const resp = await safeFetch(`${BASE}/rooms`, { method: "GET" });
  return resp.ok && Array.isArray(resp.data) ? resp.data : [];
}
