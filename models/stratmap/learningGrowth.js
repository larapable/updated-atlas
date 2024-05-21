import excuteQuery from '/lib/db.js';

const LearningGrowthEntity = {
    async postLGEntity(input, department_id) {
        try {
            await excuteQuery({
                query: 'INSERT INTO learning_growth_entity (input, department_id) VALUES (?, ?)',
                values: [input, department_id]
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
                query: 'SELECT * FROM learning_growth_entity WHERE department_id = ?',
                values: [department_id],
            });
        } catch (error) {
            console.error('Error fetching learning growth entities:', error);
            return [];
        }
    },
};

export default LearningGrowthEntity;