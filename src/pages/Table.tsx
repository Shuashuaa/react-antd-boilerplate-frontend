import BaseTable from "../components/BaseTable";
import type { TableColumn } from "../components/BaseTable/types";

interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  role: string;
}

const userData: User[] = [
  { id: "1", name: "Alice", age: 30, email: "alice@example.com", role: "admin" },
  { id: "2", name: "Bob", age: 24, email: "bob@example.com", role: "user" },
  { id: "3", name: "Charlie", age: 35, email: "charlie@example.com", role: "moderator" },
];

const columns: TableColumn<User>[] = [
  { title: "Name", dataIndex: "name", searchable: true, sortable: true },
  { title: "Age", dataIndex: "age", searchable: false, sortable: true },
  { title: "Email", dataIndex: "email", searchable: true },
  { title: "Role", dataIndex: "role", searchable: true, sortable: true },
];

const TablePage = () => {
  return (
    <div style={{ padding: 40 }}>
      <h2>📊 Dynamic Table Demo</h2>
      <BaseTable<User>
        data={userData}
        columns={columns}
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default TablePage;
