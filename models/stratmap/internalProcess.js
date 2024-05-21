import excuteQuery from '/lib/db.js';

const InternalProcess = {
    async postIPEntity(input, department_id) {
        try {
            await excuteQuery({
                query: 'INSERT INTO internal_process_entity (input, department_id) VALUES (?, ?)',
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
                query: 'SELECT * FROM internal_process_entity WHERE department_id = ?',
                values: [department_id],
            });
        } catch (error) {
            console.error('Error fetching internal process entities:', error);
            return [];
        }
    },
};

export default InternalProcess;