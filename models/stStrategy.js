import excuteQuery from '/lib/db.js';

const STStrat = {
    async postSTStrat(id, newStrategy) {
        try {
          await excuteQuery({
            query: 'INSERT INTO `s-tstrat` (`s-tResponses`, `stratId`) VALUES (?, ?)',
            values: [newStrategy, id]
          });   
          return true; // Assuming successful insertion
        } catch (error) {
          console.error("Error:", error);
          return false;
        }
      },

    async updateSTStratById(id, updatedStrategy) {
        try {
          await excuteQuery({
            query: 'UPDATE s-tstrat SET s-tResponses = ? WHERE stratId = ?',
            values: [updatedStrategy, id]
          });
          return true; // Assuming successful update
        } catch (error) {
          console.error("Error:", error);
          return false;
        }
      }
    };

module.exports = STStrat;