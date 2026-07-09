export interface QueryRequest {
  question: string;
  previousQuestion?: string;
  previousSql?: string;
}

export interface QueryResponse {
  question: string;
  sql: string;
  explanation: string;
  columns: string[];
  rows: unknown[][];
  rowCount: number;
  executionTimeMs: number;
  status: string;
  suggestedChartType?: string;
  executionPlan?: string;
}

export interface ErrorResponse {
  status: string;
  message: string;
}
