export interface AssessmentInfo {
	data: Data;
	isAgree: boolean;
	status: number;
	success: boolean;
}

interface Data {
	canAdminView: boolean;
	clientId: number;
	createdAt: string;
	gla360ReportGenerated: boolean;
	id: number;
	isActive: boolean;
	isDesignComplete: boolean;
	isDesignEdit: boolean;
	reportGenerated: boolean;
	strategyLinkGenerated: boolean;
	strategySurveyCompleted: boolean;
	styleLinkGenerated: boolean;
	styleSurveyCompleted: boolean;
	updatedAt: string;
	userId: number;
}
