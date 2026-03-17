import  db  from "./src/config/db.js";

const testConnection = async () => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    console.log("✅ Database connected successfully:", rows[0].result);
    process.exit(0); // exit after test
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
};

testConnection();