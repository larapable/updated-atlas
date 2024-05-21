import excuteQuery from '@/lib/db.js';
import bcrypt from 'bcryptjs';

const Swot = {
    async addStrength(value, departmentId) {
        try {
            // Execute the SQL query to insert a new strength entry
            const result = await excuteQuery({
                query: 'INSERT INTO strength (value, department_id) VALUES (?, ?)',
                values: [value, departmentId]
            });
    
            // Check if the query was successful
            if (result.affectedRows === 1) {
                // Fetch the newly added strength from the database
                const addedStrength = await excuteQuery({
                    query: 'SELECT id, value FROM strength WHERE id = LAST_INSERT_ID()',
                    values: []
                });
    
                // Return the added strength data
                return {
                    success: true,
                    data: addedStrength[0] // Assuming the query returns an array with the added strength object
                };
            } else {
                return { success: false, message: 'Failed to add strength' };
            }
        } catch (error) {
            console.error('Error adding strength:', error);
            return { success: false, message: 'An error occurred while adding strength' };
        }
    },

    async getStrengthsByDepartmentId(departmentId) {
        try {
            // Execute the SQL query to fetch strengths by department ID
            const result = await excuteQuery({
                query: 'SELECT id, value FROM strength WHERE department_id = ?',
                values: [departmentId]
            });
    
            // Return the fetched strengths
            return {
                success: true,
                strengths: result.map(strength => ({
                    id: strength.id,
                    value: strength.value
                }))
            };
        } catch (error) {
            console.error('Error fetching strengths:', error);
            return { success: false, message: 'An error occurred while fetching strengths' };
        }
    },

    async editStrength(id, value, departmentId) {
        try {
            // Execute the SQL query to update the strength
            const result = await excuteQuery({
                query: 'UPDATE strength SET value = ? WHERE id = ? AND department_id = ?',
                values: [value, id, departmentId]
            });
    
            // Check if the query was successful
            if (result.affectedRows === 1) {
                // Query the database to fetch the updated strength
                const updatedStrength = await excuteQuery({
                    query: 'SELECT * FROM strength WHERE id = ? AND department_id = ?',
                    values: [id, departmentId]
                });
    
                // Return the success message along with the updated strength value
                return {
                    success: true,
                    updatedStrength: updatedStrength[0] // Assuming only one row is updated
                };
            } else {
                return { success: false, message: 'Failed to update strength' };
            }
        } catch (error) {
            console.error('Error updating strength:', error);
            return { success: false, message: 'An error occurred while updating strength' };
        }
    },
    
    async deleteStrength(id, departmentId) {
        try {
            // Execute the SQL query to delete the strength
            const result = await excuteQuery({
                query: 'DELETE FROM strength WHERE id = ? AND department_id = ?',
                values: [id, departmentId]
            });

            // Check if the query was successful
            if (result.affectedRows === 1) {
                return { success: true, message: 'Strength deleted successfully' };
            } else {
                return { success: false, message: 'Failed to delete strength' };
            }
        } catch (error) {
            console.error('Error deleting strength:', error);
            return { success: false, message: 'An error occurred while deleting strength' };
        }
    },

    async addWeakness(value, departmentId) {
        try {
           
            const result = await excuteQuery({
                query: 'INSERT INTO weakness (value, department_id) VALUES (?, ?)',
                values: [value, departmentId]
            });
    
            if (result.affectedRows === 1) {
               
                const addedWeakness = await excuteQuery({
                    query: 'SELECT id, value FROM weakness WHERE id = LAST_INSERT_ID()',
                    values: []
                });
    
                return {
                    success: true,
                    data: addedWeakness[0] 
                };
            } else {
                return { success: false, message: 'Failed to add weakness' };
            }
        } catch (error) {
            console.error('Error adding weakness:', error);
            return { success: false, message: 'An error occurred while adding weakness' };
        }
    },

    async getWeaknessByDepartmentId(departmentId) {
        try {
            // Execute the SQL query to fetch strengths by department ID
            const result = await excuteQuery({
                query: 'SELECT id, value FROM weakness WHERE department_id = ?',
                values: [departmentId]
            });
    
            // Return the fetched strengths
            return {
                success: true,
                weaknesses: result.map(weakness => ({
                  id: weakness.id,
                  value: weakness.value
                }))
              };
        } catch (error) {
            console.error('Error fetching weakness:', error);
            return { success: false, message: 'An error occurred while fetching weakness' };
        }
    },

    async editWeakness(id, value, departmentId) {
        try {
            // Execute the SQL query to update the strength
            const result = await excuteQuery({
                query: 'UPDATE weakness SET value = ? WHERE id = ? AND department_id = ?',
                values: [value, id, departmentId]
            });
    
            // Check if the query was successful
            if (result.affectedRows === 1) {
                // Query the database to fetch the updated strength
                const updatedWeakness = await excuteQuery({
                    query: 'SELECT * FROM weakness WHERE id = ? AND department_id = ?',
                    values: [id, departmentId]
                });
    
                // Return the success message along with the updated strength value
                return {
                    success: true,
                    updatedWeakness: updatedWeakness[0] // Assuming only one row is updated
                };
            } else {
                return { success: false, message: 'Failed to update weakness' };
            }
        } catch (error) {
            console.error('Error updating weakness:', error);
            return { success: false, message: 'An error occurred while updating weakness' };
        }
    },

    async deleteWeakness(id, departmentId) {
        try {
            // Execute the SQL query to delete the strength
            const result = await excuteQuery({
                query: 'DELETE FROM weakness WHERE id = ? AND department_id = ?',
                values: [id, departmentId]
            });

            // Check if the query was successful
            if (result.affectedRows === 1) {
                return { success: true, message: 'Weakness deleted successfully' };
            } else {
                return { success: false, message: 'Failed to delete weakness' };
            }
        } catch (error) {
            console.error('Error deleting weakness:', error);
            return { success: false, message: 'An error occurred while deleting weakness' };
        }
    },

    async addOpportunities(value, departmentId) {
        try {
           
            const result = await excuteQuery({
                query: 'INSERT INTO opportunities (value, department_id) VALUES (?, ?)',
                values: [value, departmentId]
            });
    
            if (result.affectedRows === 1) {
               
                const addedOpportunities = await excuteQuery({
                    query: 'SELECT id, value FROM opportunities WHERE id = LAST_INSERT_ID()',
                    values: []
                });
    
                return {
                    success: true,
                    data: addedOpportunities[0] 
                };
            } else {
                return { success: false, message: 'Failed to add opportunities' };
            }
        } catch (error) {
            console.error('Error adding opportunities:', error);
            return { success: false, message: 'An error occurred while adding opportunities' };
        }
    },

    async getOpportunitiesByDepartmentId(departmentId) {
        try {
            // Execute the SQL query to fetch opportunities by department ID
            const result = await excuteQuery({
                query: 'SELECT id, value FROM opportunities WHERE department_id = ?',
                values: [departmentId]
            });
    
            // Return the fetched opportunities
            return {
                success: true,
                opportunities: result.map(opportunity => ({
                  id: opportunity.id,
                  value: opportunity.value
                }))
              };
        } catch (error) {
            console.error('Error fetching opportunities:', error);
            return { success: false, message: 'An error occurred while fetching opportunities' };
        }
    },

    async editOpportunities(id, value, departmentId) {
        try {
            // Execute the SQL query to update the strength
            const result = await excuteQuery({
                query: 'UPDATE opportunities SET value = ? WHERE id = ? AND department_id = ?',
                values: [value, id, departmentId]
            });
    
            // Check if the query was successful
            if (result.affectedRows === 1) {
                // Query the database to fetch the updated strength
                const updatedOpportunities = await excuteQuery({
                    query: 'SELECT * FROM opportunities WHERE id = ? AND department_id = ?',
                    values: [id, departmentId]
                });
    
                // Return the success message along with the updated strength value
                return {
                    success: true,
                    updatedOpportunities: updatedOpportunities[0] // Assuming only one row is updated
                };
            } else {
                return { success: false, message: 'Failed to update opportunities' };
            }
        } catch (error) {
            console.error('Error updating opportunities:', error);
            return { success: false, message: 'An error occurred while updating opportunities' };
        }
    },

    async deleteOpportunities(id, departmentId) {
        try {
            // Execute the SQL query to delete the strength
            const result = await excuteQuery({
                query: 'DELETE FROM opportunities WHERE id = ? AND department_id = ?',
                values: [id, departmentId]
            });

            // Check if the query was successful
            if (result.affectedRows === 1) {
                return { success: true, message: 'Opportunities deleted successfully' };
            } else {
                return { success: false, message: 'Failed to delete opportunities' };
            }
        } catch (error) {
            console.error('Error deleting opportunities:', error);
            return { success: false, message: 'An error occurred while deleting opportunities' };
        }
    },


    async addThreats(value, departmentId) {
        try {
           
            const result = await excuteQuery({
                query: 'INSERT INTO threats (value, department_id) VALUES (?, ?)',
                values: [value, departmentId]
            });
    
            if (result.affectedRows === 1) {
               
                const addedThreats = await excuteQuery({
                    query: 'SELECT id, value FROM threats WHERE id = LAST_INSERT_ID()',
                    values: []
                });
    
                return {
                    success: true,
                    data: addedThreats[0] 
                };
            } else {
                return { success: false, message: 'Failed to add threats' };
            }
        } catch (error) {
            console.error('Error adding threats:', error);
            return { success: false, message: 'An error occurred while adding threats' };
        }
    },


    async getThreatsByDepartmentId(departmentId) {
        try {
            // Execute the SQL query to fetch threats by department ID
            const result = await excuteQuery({
                query: 'SELECT id, value FROM threats WHERE department_id = ?',
                values: [departmentId]
            });
    
            // Return the fetched threats
            return {
                success: true,
                threats: result.map(threat => ({
                    id: threat.id,
                    value: threat.value
                }))
            };
        } catch (error) {
            console.error('Error fetching threats:', error);
            return { success: false, message: 'An error occurred while fetching threats' };
        }
    },
    

    async editThreats(id, value, departmentId) {
        try {
            // Execute the SQL query to update the strength
            const result = await excuteQuery({
                query: 'UPDATE threats SET value = ? WHERE id = ? AND department_id = ?',
                values: [value, id, departmentId]
            });
    
            // Check if the query was successful
            if (result.affectedRows === 1) {
                // Query the database to fetch the updated strength
                const updatedThreats = await excuteQuery({
                    query: 'SELECT * FROM threats WHERE id = ? AND department_id = ?',
                    values: [id, departmentId]
                });
    
                // Return the success message along with the updated strength value
                return {
                    success: true,
                    updatedThreats: updatedThreats[0] // Assuming only one row is updated
                };
            } else {
                return { success: false, message: 'Failed to update threats' };
            }
        } catch (error) {
            console.error('Error updating threats:', error);
            return { success: false, message: 'An error occurred while updating threats' };
        }
    },

    async deleteThreats(id, departmentId) {
        try {
            // Execute the SQL query to delete the strength
            const result = await excuteQuery({
                query: 'DELETE FROM threats WHERE id = ? AND department_id = ?',
                values: [id, departmentId]
            });

            // Check if the query was successful
            if (result.affectedRows === 1) {
                return { success: true, message: 'Threats deleted successfully' };
            } else {
                return { success: false, message: 'Failed to delete threats' };
            }
        } catch (error) {
            console.error('Error deleting threats:', error);
            return { success: false, message: 'An error occurred while deleting threats' };
        }
    },

    




};

module.exports = Swot;
