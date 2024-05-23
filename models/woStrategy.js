import excuteQuery from '/lib/db.js';

const WOStrat = {
    async postWOStrat(apiResponse, department_id) {
        try {
            await excuteQuery({
                query: 'INSERT INTO `w-ostrat` (`w-oResponses`, department_id) VALUES (?,?)',
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

    async getWOStrat(department_id) {
        try {
            const result = await excuteQuery({
                query: 'SELECT * FROM `w-ostrat` WHERE department_id = ?',
                values: [department_id]
            });

           return result;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    },

    async deleteWOStrat(id, department_id) {
        try {
            const result = await excuteQuery({
                query: 'DELETE FROM `w-ostrat` WHERE id = ? AND department_id = ?',
                values: [id, department_id]
            });
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error:", error);
            return false;
        }
    }


};

module.exports = WOStrat;