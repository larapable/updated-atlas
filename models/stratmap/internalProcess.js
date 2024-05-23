import excuteQuery from "/lib/db.js";

const InternalProcess = {
  async postIPEntity(input, department_id) {
    try {
      await excuteQuery({
        query: "INSERT INTO internal_bsc (department_id, office_target) VALUES (?, ?)",
        values: [department_id, input],
      });
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  },

  async getByDepartmentId(department_id) {
    try {
      return await excuteQuery({
        query: "SELECT * FROM internal_process_entity WHERE department_id = ?",
        values: [department_id],
      });
    } catch (error) {
      console.error("Error fetching internal process entities:", error);
      return [];
    }
  },

  async editIPEntity(id, input) {
    try {
      const result = await excuteQuery({
        query: "UPDATE internal_process_entity SET input = ? WHERE id = ?",
        values: [input, id],
      });

      if (result.affectedRows === 1) {
        return { success: true, message: "IP entity updated successfully" };
      } else {
        return { success: false, message: "Failed to update IP entity" };
      }
    } catch (error) {
      console.error("Error updating IP entity:", error);
      return { success: false, message: "An error occurred while updating IP entity" };
    }
  },

  async deleteIPEntity(id) {
    try {
      const result = await excuteQuery({
        query: "DELETE FROM internal_process_entity WHERE id = ?",
        values: [id],
      });

      if (result.affectedRows === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error deleting internal process entity:", error);
      return false;
    }
  },
};

export default InternalProcess;
