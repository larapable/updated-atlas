import excuteQuery from '/lib/db.js';

const Goals = {
    async postGoals(officeVision, valueProposition, strategicGoals, strategicGoals2, strategicGoals3, selectedDate, selectedEndDate) {
        try{
            await excuteQuery({
                query: 'INSERT INTO inputgoals (vision, proposition, goals, goals2, goals3, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?, ?)',
                values: [officeVision, valueProposition, strategicGoals, strategicGoals2, strategicGoals3, selectedDate, selectedEndDate]
            });
            return true;
        }
        catch (error) {
            console.error("Error:",error);
            return false;
        }
    },
};

module.exports = Goals;
