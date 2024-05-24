import excuteQuery from "/lib/db.js";

const StakeholderEntity = {
  async postStakeholderEntity(input, department_id) {
    try {
      await excuteQuery({
        query: "INSERT INTO stakeholder_bsc (department_id, office_target) VALUES (?, ?)",
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
        query: "SELECT * FROM stakeholder_bsc WHERE department_id = ?",
        values: [department_id],
      });
    } catch (error) {
      console.error("Error fetching stakeholder entities:", error);
      return [];
    }
  },

  async editStakeholderEntity(id, input) {
    try {
      const result = await excuteQuery({
        query: "UPDATE stakeholder_bsc SET office_target = ? WHERE id = ?",
        values: [input, id],
      });

      if (result.affectedRows === 1) {
        return { success: true, message: "Stakeholder entity updated successfully" };
      } else {
        return { success: false, message: "Failed to update Stakeholder entity" };
      }
    } catch (error) {
      console.error("Error updating IP entity:", error);
      return { success: false, message: "An error occurred while updating Stakeholder entity" };
    }
  },

  async deleteStakeholderEntity(id) {
    try {
      const result = await excuteQuery({
        query: "DELETE FROM stakeholder_bsc WHERE id = ?",
        values: [id],
      });

      if (result.affectedRows === 1) {
        return { success: true };
      } else {
        return { success: false, message: "Failed to delete stakeholder" };
      }
    } catch (error) {
      console.error("Error deleting stakeholder:", error);
      return { success: false, message: "An error occurred while deleting stakeholder" };
    }
  },
};

export default StakeholderEntity;
