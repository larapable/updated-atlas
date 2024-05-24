import excuteQuery from "/lib/db.js";

const FinancialEntity = {
  async postFinancialEntity(input, department_id) {
    try {
      await excuteQuery({
        query: "INSERT INTO financial_bsc (department_id, office_target) VALUES (?, ?)",
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
        query: "SELECT * FROM financial_bsc WHERE department_id = ?",
        values: [department_id],
      });
    } catch (error) {
      console.error("Error fetching financial entities:", error);
      return [];
    }
  },

  async editFinancialEntity(id, input) {
    try {
      const result = await excuteQuery({
        query: "UPDATE financial_bsc SET office_target = ? WHERE id = ?",
        values: [input, id],
      });

      if (result.affectedRows === 1) {
        return { success: true, message: "Financial entity updated successfully" };
      } else {
        return { success: false, message: "Failed to update financial entity" };
      }
    } catch (error) {
      console.error("Error updating financial entity:", error);
      return { success: false, message: "An error occurred while updating financial entity" };
    }
  },

  async deleteFinancialEntity(id) {
    try {
      const result = await excuteQuery({
        query: "DELETE FROM financial_bsc WHERE id = ?",
        values: [id],
      });

      if (result.affectedRows === 1) {
        return { success: true, message: "Financial entity deleted successfully" };
      } else {
        return { success: false, message: "Failed to delete financial entity" };
      }
    } catch (error) {
      console.error("Error deleting financial entity:", error);
      return { success: false, message: "An error occurred while deleting financial entity" };
    }
  },
};

export default FinancialEntity;
