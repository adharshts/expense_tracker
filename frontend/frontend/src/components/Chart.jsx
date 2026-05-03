import { 
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from "recharts";

function Chart({ transactions }) {
  // Group data by category
  const dataMap = {};

  transactions.forEach(tx => {
    if (tx.type === "expense") {
      if (!dataMap[tx.category]) {
        dataMap[tx.category] = 0;
      }
      dataMap[tx.category] += Number(tx.amount);
    }
  });

  const data = Object.keys(dataMap).map(key => ({
    name: key,
    value: dataMap[key]
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const monthlyDataMap = {};

transactions.forEach(tx => {
  if (tx.type && tx.type.toLowerCase() === "expense") {
    const month = new Date(tx.date).toLocaleString("default", { month: "short" });

    if (!monthlyDataMap[month]) {
      monthlyDataMap[month] = 0;
    }

    monthlyDataMap[month] += Number(tx.amount);
  }
});

const monthlyData = Object.keys(monthlyDataMap).map(month => ({
  month,
  amount: monthlyDataMap[month]
}));


  return (
    <div>
      <h3>Expense Breakdown</h3>

      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
      <h3>Monthly Spending</h3>

      <BarChart width={400} height={300} data={monthlyData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
      </div>
  );
}

export default Chart;