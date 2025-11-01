import "./ChartData.css";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface respond {
  time: String;
  data: Number;
}

const ChartData = ({ datas }: { datas: respond[] }) => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart
        width={500}
        height={400}
        data={datas}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <legend />
        <Line type="monotone" dataKey="data" stroke="#f27474ff" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartData;
