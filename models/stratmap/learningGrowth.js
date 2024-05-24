import excuteQuery from "/lib/db.js";

const LearningGrowthEntity = {
  async postLGEntity(input, department_id) {
    try {
      await excuteQuery({
        query: "INSERT INTO learning_bsc (department_id, office_target) VALUES (?, ?)",
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
        query: "SELECT * FROM learning_bsc WHERE department_id = ?",
        values: [department_id],
      });
    } catch (error) {
      console.error("Error fetching learning growth entities:", error);
      return [];
    }
  },

  async editLGEntity(id, input) {
    try {
      const result = await excuteQuery({
        query: "UPDATE learning_bsc SET input = ? WHERE id = ?",
        values: [input, id],
      });

      if (result.affectedRows === 1) {
        return { success: true, message: "LG entity updated successfully" };
      } else {
        return { success: false, message: "Failed to update LG entity" };
      }
    } catch (error) {
      console.error("Error updating LG entity:", error);
      return { success: false, message: "An error occurred while updating LG entity" };
    }
  },

  async deleteLGEntity(id) {
    try {
      const result = await excuteQuery({
        query: "DELETE FROM learning_bsc WHERE id = ?",
        values: [id],
      });

      if (result.affectedRows === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error deleting strength:", error);
      return false;
    }
  },
};

export default LearningGrowthEntity;
