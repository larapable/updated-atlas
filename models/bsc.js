import excuteQuery from "@/lib/db.js";

const Bsc = {
  async getFinancialByDepartmentId(department_id) {
    try {
      const result = await excuteQuery({
        query: "SELECT * FROM financial_entity WHERE department_id = ?",
        values: [department_id],
      });

      if (result && result.length > 0) {
        return result; // Return all bsc records for the department if found
      } else {
        return []; // Return an empty array if no bsc records found for the department
      }
    } catch (error) {
      console.error("Error:", error);
      throw new Error("An error occurred while querying the database.");
    }
  },

  async getInternalProcessByDepartmentId(department_id) {
    try {
      const result = await excuteQuery({
        query: "SELECT * FROM internal_process_entity WHERE department_id = ?",
        values: [department_id],
      });

      if (result && result.length > 0) {
        return result; // Return all bsc records for the department if found
      } else {
        return []; // Return an empty array if no bsc records found for the department
      }
    } catch (error) {
      console.error("Error:", error);
      throw new Error("An error occurred while querying the database.");
    }
  },

  async getLearningGrowthDepartmentId(department_id) {
    try {
      const result = await excuteQuery({
        query: "SELECT * FROM learning_growth_entity WHERE department_id = ?",
        values: [department_id],
      });

      if (result && result.length > 0) {
        return result; // Return all bsc records for the department if found
      } else {
        return []; // Return an empty array if no bsc records found for the department
      }
    } catch (error) {
      console.error("Error:", error);
      throw new Error("An error occurred while querying the database.");
    }
  },

  async getStakeholderDepartmentId(department_id) {
    try {
      const result = await excuteQuery({
        query: "SELECT * FROM stakeholder_entity WHERE department_id = ?",
        values: [department_id],
      });

      if (result && result.length > 0) {
        return result; // Return all bsc records for the department if found
      } else {
        return []; // Return an empty array if no bsc records found for the department
      }
    } catch (error) {
      console.error("Error:", error);
      throw new Error("An error occurred while querying the database.");
    }
  },

  async insertFinancialBscData(
    department_id,
    target_code,
    office_target,
    start_date,
    completion_date,
    status,
    key_performance_indicator,
    target_performance,
    actual_performance
  ) {
    try {
      // Log the data for debugging
      console.log("Inserting data:", {
        department_id,
        target_code,
        office_target,
        start_date,
        completion_date,
        status,
        key_performance_indicator,
        target_performance,
        actual_performance,
      });

      // Convert ISO 8601 date strings to 'YYYY-MM-DD HH:MM:SS' format
      const formattedStartDate = start_date.replace("T", " ").replace("Z", "");
      const formattedCompletionDate = completion_date
        .replace("T", " ")
        .replace("Z", "");

      // Execute the query with the formatted or original date values
      const result = await excuteQuery({
        query:
          "INSERT INTO financial_bsc (department_id, target_code, office_target, start_date, completion_date, status, key_performance_indicator, target_performance, actual_performance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        values: [
          department_id,
          target_code,
          office_target,
          formattedStartDate,
          formattedCompletionDate,
          status,
          key_performance_indicator,
          target_performance,
          actual_performance,
        ],
      });

      // Handle the result
      if (result) {
        console.log("Data inserted successfully");
        return {
          department_id,
          target_code,
          office_target,
          start_date: formattedStartDate,
          completion_date: formattedCompletionDate,
          status,
          key_performance_indicator,
          target_performance,
          actual_performance,
        };
      } else {
        console.log("No rows affected, possible error in insertion");
        return null;
      }
    } catch (error) {
      console.error("Error during insertion:", error);
      throw error; // Rethrow the error to be caught by the API route
    }
  },
};

module.exports = Bsc;
