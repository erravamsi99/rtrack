export interface PerformanceTrendData {
	title: string;
	performanceData: Record<string, number>;
  }

export interface SkillAnalysisData {
	title: string;
	theoryUnderstanding: number;
	problemAnalysis: number;
	diagramInterpretation: number;
	conceptApplication: number;
	calculationSpeed: number;
}

export interface Insights {
	id: string;
	performanceData: PerformanceTrendData;
	skillAnalysisData: SkillAnalysisData;
}

