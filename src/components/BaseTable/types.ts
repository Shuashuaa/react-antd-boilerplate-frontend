import type { ColumnType } from "antd/es/table";

export interface TableColumn<T> extends ColumnType<T> {
  searchable?: boolean;
  sortable?: boolean;
}

export interface BaseTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  rowKey: (record: T) => string;
  loading?: boolean;
  pageSize?: number;
}
