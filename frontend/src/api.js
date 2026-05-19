const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://resume-analyzer-8to7.onrender.com";

export default API_BASE;