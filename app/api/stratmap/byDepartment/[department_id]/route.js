import FinancialEntity from "/models/stratmap/financial";
import InternalProcessEntity from "/models/stratmap/internalProcess";
import LearningGrowthEntity from "/models/stratmap/learningGrowth";
import StakeholderEntity from "/models/stratmap/stakeholder";

export async function GET(request, { params }) {
  const department_id = params.department_id;

  // Check if departmentIdStr is a valid number
  // const isValidNumber = /^[0-9]+$/.test(departmentIdStr);

  // if (isValidNumber) {
  //   department_id = Number(departmentIdStr);

  //   if (isNaN(department_id)) {
  //     return new Response(JSON.stringify({ error: `Invalid department ID,${department_id}` }), {
  //       status: 400,
  //     });
  //   }
  // } else {
  //   return new Response(JSON.stringify({ error: `Invalid department ID,${department_id}` }), {
  //     status: 400,
  //   });
  // }

  console.log("dept id: ", department_id);

  try {
    // 2. Fetch strategies using the models
    const financialStrategies = await FinancialEntity.getByDepartmentId(department_id);
    const stakeholderStrategies = await StakeholderEntity.getByDepartmentId(department_id);
    const internalProcessStrategies = await InternalProcessEntity.getByDepartmentId(department_id);
    const learningGrowthStrategies = await LearningGrowthEntity.getByDepartmentId(department_id);

    return new Response(
      JSON.stringify({
        financial: financialStrategies,
        stakeholder: stakeholderStrategies,
        internalProcess: internalProcessStrategies,
        learningGrowth: learningGrowthStrategies,
      })
    );
  } catch (error) {
    console.error("Error fetching strategies:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch strategies" }), { status: 500 });
  }
}
