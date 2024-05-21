import excuteQuery from "@/lib/db.js";
import bcrypt from "bcryptjs";

const User = {
  async register(username, email, password, department_id) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await excuteQuery({
        query: "CALL register_user(?, ?, ?, ?)",
        values: [username, email, hashedPassword, department_id],
      });

      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  },

  async findOne(email) {
    try {
      // Execute a database query to find a user with the given email
      const result = await excuteQuery({
        query: "SELECT * FROM users WHERE email = ?",
        values: [email],
      });

      // If a user is found, return the user object
      if (result && result.length > 0) {
        return result[0];
      } else {
        // If no user is found, return null
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      throw new Error("An error occurred while querying the database.");
    }
  },

  async findUsername(username) {
    try {
      // Execute a database query to find a user with the given email
      const result = await excuteQuery({
        query: "SELECT * FROM users WHERE username = ?",
        values: [username],
      });

      // If a user is found, return the user object
      if (result && result.length > 0) {
        return result[0];
      } else {
        // If no user is found, return null
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      throw new Error("An error occurred while querying the database.");
    }
  },
};

module.exports = User;
