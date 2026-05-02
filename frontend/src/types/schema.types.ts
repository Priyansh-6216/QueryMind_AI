export interface ColumnSchemaDto {
  name: string;
  type: string;
  primaryKey: boolean;
  foreignKey: boolean;
}

export interface TableSchemaDto {
  name: string;
  columns: ColumnSchemaDto[];
}

export interface SchemaResponse {
  tables: TableSchemaDto[];
}