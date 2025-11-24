import React from "react";
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
  temp: String;
  air: String;
  soil: String;
  timestamp: String;
}

const ChartData = ({
  datas,
  type,
}: {
  datas: respond[];
  type: any | undefined;
}) => {
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
        <XAxis
          dataKey="timestamp"
          // Hiển thị Ngày/Tháng và Giờ:Phút
          tickFormatter={
            (v) =>
              new Date(v)
                .toLocaleString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false, // Dùng định dạng 24 giờ
                })
                .replace(",", " ") // Bỏ dấu phẩy ngăn cách ngày và giờ
          }
        />
        <YAxis />
        <Tooltip />
        <legend />
        <Line type="monotone" dataKey={type} stroke={type=="temp"?"#ff0000ff":(type=="air"?"#7481f2f1":"#fd7a00ad")} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default React.memo(ChartData);
