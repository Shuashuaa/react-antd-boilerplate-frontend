import React, { useState, useMemo } from "react";
import { Table, Input, Space, Select } from "antd";
import type { BaseTableProps } from "./types";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const BaseTable = <T extends object>({
  data,
  columns,
  rowKey,
  loading = false,
  pageSize = 10,
}: BaseTableProps<T>) => {
  const [searchText, setSearchText] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleSortChange = (value: string) => {
    const [key, order] = value.split("-");
    setSortKey(key);
    setSortOrder(order as "ascend" | "descend");
  };

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      columns.some((col) => {
        if (!col.searchable) return false;
        const val = (item as any)[col.dataIndex as string];
        return val?.toString().toLowerCase().includes(searchText);
      })
    );
  }, [searchText, data, columns]);

  const sortedData = useMemo(() => {
    if (!sortKey || !sortOrder) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = (a as any)[sortKey];
      const bVal = (b as any)[sortKey];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "ascend" ? aVal - bVal : bVal - aVal;
      }

      return sortOrder === "ascend"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredData, sortKey, sortOrder]);

  const sortableOptions = columns
    .filter((col) => col.sortable)
    .flatMap((col) => [
      { key: `${col.dataIndex}-ascend`, label: `${col.title} ↑` },
      { key: `${col.dataIndex}-descend`, label: `${col.title} ↓` },
    ]);

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          onChange={handleSearch}
          allowClear
        />
        <Select
          placeholder="Sort by"
          style={{ width: 180 }}
          onChange={handleSortChange}
          allowClear
        >
          {sortableOptions.map((opt) => (
            <Option key={opt.key} value={opt.key}>
              {opt.label}
            </Option>
          ))}
        </Select>
      </Space>

      <Table
        rowKey={rowKey}
        columns={columns}
        dataSource={sortedData}
        loading={loading}
        pagination={{ pageSize }}
      />
    </>
  );
};

export default BaseTable;
