import excuteQuery from '/lib/db.js';

const SWStrat = {
    async postSWStrat(apiResponse, department_id) {
        try {
            await excuteQuery({
                query: 'INSERT INTO `s-ostrat` (`s-oResponses`, department_id) VALUES (?,?)',
                values: [apiResponse, department_id]
            });
              // Return an object containing the response and ID
              return { response: apiResponse, id: department_id };
        }
        catch (error) {
            console.error("Error:", error);
            return false;
        }
    },

    async getSWStrat(department_id) {
        try {
            const result = await excuteQuery({
                query: 'SELECT * FROM `s-ostrat` WHERE department_id = ?',
                values: [department_id]
            });

           return result;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    },

    async deleteSWStrat(id, department_id) {
        try {
            const result = await excuteQuery({
                query: 'DELETE FROM `s-ostrat` WHERE id = ? AND department_id = ?',
                values: [id, department_id]
            });
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error:", error);
            return false;
        }
    }
};

module.exports = SWStrat;