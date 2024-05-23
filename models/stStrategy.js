import excuteQuery from '/lib/db.js';

const STStrat = {
    async postSTStrat(apiResponse, department_id) {
        try {
          await excuteQuery({
            query: 'INSERT INTO `s-tstrat` (`s-tResponses`, department_id) VALUES (?, ?)',
            values: [apiResponse, department_id]
          });   
          // Return an object containing the response and ID
          return { response: apiResponse, id: department_id };

        } catch (error) {
          console.error("Error:", error);
          return false;
        }
      },

      async getSTStrat(department_id) {
        try {
            const result = await excuteQuery({
                query: 'SELECT * FROM `s-tstrat` WHERE department_id = ?',
                values: [department_id]
            });

           return result;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    },

  
    async deleteSTStrat(id, department_id) {
      try {
          const result = await excuteQuery({
              query: 'DELETE FROM `s-tstrat` WHERE id = ? AND department_id = ?',
              values: [id, department_id]
          });
          return result.affectedRows > 0;
      } catch (error) {
          console.error("Error:", error);
          return false;
      }
  }
    };

module.exports = STStrat;