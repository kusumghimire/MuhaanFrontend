import React from "react";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Area,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mar 12",
    Views: 4000,
    Credits: 2400,
    Success: 2000,
    Requests: 6400,
  },
  {
    name: "Mar 13",
    Views: 3000,
    Credits: 1398,
    Success: 3000,
    Requests: 2210,
  },
  {
    name: "Mar 14",
    Views: 2000,
    Credits: 1800,
    Success: 3050,
    Requests: 4290,
  },
  {
    name: "Mar 15",
    Views: 2780,
    Credits: 3908,
    Success: 4050,
    Requests: 200,
  },
  {
    name: "Mar 16",
    Views: 1890,
    Credits: 4800,
    Success: 5050,
    Requests: 3181,
  },
  {
    name: "Mar 17",
    Views: 2390,
    Credits: 3800,
    Success: 5050,
    Requests: 5500,
  },
  {
    name: "Mar 18",
    Views: 3490,
    Credits: 4300,
    Success: 2050,
    Requests: 4000,
  },
];

export default function Analytics() {
  return (
    <div style={{ width:" 100%", height: 350 }}>
      <ResponsiveContainer>
        <ComposedChart
          width={600}
          height={300}

          data={data}
          margin={{
            top: 5,
            right: 40,
            left: 0,
            bottom: 10,
          }} 
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={{ stroke: "transparent" }}
            
          />
          <YAxis tickLine={false} axisLine={{ stroke: "transparent" }} />
          <Tooltip />

          <Legend
            align="left"
            iconType="circle"
            verticalAlign="top"
            height={46}
            style={{ color: "black" }}
          />
            <Line type="monotone" dataKey="Views" stroke="#5817E5"
            strokeWidth={2}
           dot={{ r: 5, fill: "#5817E5" }}
           activeDot={{ r: 5, strokeWidth: 2 }}
           />
          <Area
            type="monotone"
            dataKey="Credits"
            fill="rgba(255, 73, 30, 0.08)"
            stroke="#FF491E"
            strokeWidth={2}
            dot={{ r: 5, fill: "rgba(255, 73, 30, 1)" }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="Requests"
            stroke="#0A65DB"
            strokeWidth={2}
            dot={{r:5, fill: "#0A65DB ",strokeWidth: 2 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="Success"
            stroke="#01BE46"
            strokeWidth={2}
            dot={{ r: 5, fill: "#01BE46" ,strokeWidth: 2}}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />       
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
