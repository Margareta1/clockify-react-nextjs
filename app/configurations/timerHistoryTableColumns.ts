const timerHistoryTableColumns = [
  { field: "date", header: "Date", width: "20%", filter: true },
  { field: "description", header: "Description", width: "40%", filter: true },
  {
    field: "timeTracked",
    header: "Time tracked",
    width: "20%",
    filter: true,
  },
  { field: "actions", header: "Actions", width: "20%", filter: false },
];

export { timerHistoryTableColumns };
