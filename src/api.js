
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

const BASE =
  import.meta.env.VITE_SERVER_URL?.trim() ||
  "http://localhost:5001";

console.log("API BASE URL →", BASE);

async function apiJSON(path, body) {
  try {
    const res = await fetch(`${BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("API ERROR:", err);
    return { ok: false, data: { error: "Request failed" } };
  }
}

export async function registerUser(details) {
  return apiJSON("/auth/register", details);
}

export async function loginUser(details) {
  return apiJSON("/auth/login", details);
}

export async function fetchRooms() {
  try {
    const res = await fetch(`${BASE}/rooms`);
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch rooms", err);
    return [];
  }
}
