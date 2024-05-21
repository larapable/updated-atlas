import excuteQuery from '/lib/db.js';

const getRows = {
    async getRows() {
        try {
            const query = `
        SELECT \`w-oResponses\` FROM \`w-ostrat\`
        WHERE \`w-oResponses\` IS NOT NULL;
      `;

            const results = await excuteQuery({ query });

            // Flattening is still necessary if your executeQuery function returns a nested structure
            return results.flat();
        } catch (error) {
            console.error("Error fetching rows:", error);
            return [];
        }
    }
};

module.exports = getRows;