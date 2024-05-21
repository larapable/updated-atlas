import { NextResponse } from "next/server";
import FinancialEntity from '/models/stratmap/financial';
import StakeholderEntity from '/models/stratmap/stakeholder';
import InternalProcessEntity from '/models/stratmap/internalProcess';
import LearningGrowthEntity from '/models/stratmap/learningGrowth';

export async function GET(req, { params }) {
    const departmentId = parseInt(params.departmentId);

    try {
        // Fetch strategies using the models
        const financialStrategies = await FinancialEntity.getByDepartmentId(departmentId);
        const stakeholderStrategies = await StakeholderEntity.getByDepartmentId(departmentId);
        const internalProcessStrategies = await InternalProcessEntity.getByDepartmentId(departmentId);
        const learningGrowthStrategies = await LearningGrowthEntity.getByDepartmentId(departmentId);

        return NextResponse.json({
            financial: financialStrategies,
            stakeholder: stakeholderStrategies,
            internalProcess: internalProcessStrategies,
            learningGrowth: learningGrowthStrategies,
        });

    } catch (error) {
        console.error('Error fetching strategies:', error);
        return NextResponse.json({ error: 'Failed to fetch strategies' }, { status: 500 });
    }
}