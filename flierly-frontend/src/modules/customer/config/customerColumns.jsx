import { Space, Tag } from "antd";

const columns = [
  {
    title: "Index",
    dataIndex: "index",
    valueType: "indexBorder",
    width: 15,
  },
  {
    title: "Name",
    dataIndex: "name",
    copyable: true,
    width: 50,
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    width: 30,
    fixed: true,
    align: "center",
    showSorterTooltip: {
      target: "full-header",
    },
    defaultSortOrder: "descend",
    sorter: true,
  },
  {
    title: "Address",
    dataIndex: "address",
    width: 100,
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    filterMode: "menu",
    filterSearch: true,
  },
  {
    width: 100,
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
  {
    width: 100,
    title: "Tags",
    dataIndex: "tags",
    render: (tags) => (
      <span>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
];

export default columns;
