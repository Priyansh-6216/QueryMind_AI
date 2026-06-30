export interface QueryHistoryDto {
  id: number;
  question: string;
  generatedSql: string;
  status: string;
  executionTimeMs: number;
  createdAt: string;
}