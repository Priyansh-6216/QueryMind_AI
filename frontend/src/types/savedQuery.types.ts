export interface SavedQuery {
  id: number;
  name: string;
  question: string;
  generatedSql: string;
  explanation: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}