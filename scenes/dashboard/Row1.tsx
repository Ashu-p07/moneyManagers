import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboradBox"
import { useGetKpisQuery } from "@/states/api"
import { useTheme } from "@mui/material";
import {useMemo} from "react";
import { ResponsiveContainer,CartesianGrid,AreaChart,BarChart,Bar,LineChart,XAxis,YAxis,Legend,Line,Tooltip,Area } from "recharts";

type Props = {}

const Row1 = (props: Props) => {
  const {palette}=useTheme();
    const {data}= useGetKpisQuery();
    // console.log("data:",data)
    //revenue expenses
    const revenueExpenses =useMemo(()=>{
return(
  data &&
  data[0].monthlyData.map(({month, revenue, expenses})=>{
    return{
      name:month.substring(0,3),
      revenue:revenue,
      expenses:expenses,

    };
  })
);
    },[data]);


//revenue profit
const revenueProfit = useMemo(() => {
  return (
    data &&
    data[0].monthlyData.map(({ month, revenue, expenses }) => {
      return {
        name: month.substring(0, 3),
        revenue: revenue,
        profit: (revenue - expenses).toFixed(2),
      };
    })
  );
}, [data]);

//revenue
const revenue = useMemo(() => {
  return (
    data &&
    data[0].monthlyData.map(({ month, revenue }) => {
      return {
        name: month.substring(0, 3),
        revenue: revenue,
      };
    })
  );
}, [data]);


  return (
   <>
   
   <DashboardBox gridArea="a"  style={{ height: 392 }}>
  
   <BoxHeader
          title="Revenue and Expenses"
          subtitle="Top line represents Revenue and bottom line represents Expenses."
          sideText="+10%"
        /> 
   

   
   <ResponsiveContainer width="100%" height="100%">
   
        <AreaChart
          width={500}
          height={400}
          data={revenueExpenses}
          margin={{
            top: 15,
            right: 25,
            left: -10,
            bottom: 60,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" />  // background grids  */}
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop
              offset="5%"
              stopColor={palette.secondary[300]}
              stopOpacity={0.5}
              />
              <stop
              offset="95%"
              stopColor={palette.secondary[300]}
              stopOpacity={0}
              />

            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop
              offset="5%"
              stopColor={palette.secondary[300]}
              stopOpacity={0.5}
              />
              <stop
              offset="95%"
              stopColor={palette.secondary[300]}
              stopOpacity={0}
              />

            </linearGradient>
          </defs>
          <XAxis dataKey="name" tickLine={false} style={{fontSize:"12px"}}/>
          <YAxis axisLine={{strokeWidth:"0"}} domain={[7500,23000]} tickLine={false} style={{fontSize:"12px"}} />
          <Tooltip />
          <Area type="monotone" dataKey="revenue"  dot={true} stroke={palette.secondary.main} fillOpacity={1} fill="url(#colorRevenue)" />
          <Area type="monotone" dataKey="expenses" dot={true} stroke={palette.tertiary.main} fillOpacity={1} fill="url(#colorExpenses)" />
        </AreaChart>
      </ResponsiveContainer>
   </DashboardBox>


   {/* for b */}


   <DashboardBox gridArea="b"  style={{ height: 392 }}>
   <BoxHeader
          title="Profit and Revenue"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={revenueProfit}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={palette.secondary.main}
            />
          </LineChart>
        </ResponsiveContainer>

   </DashboardBox>












   <DashboardBox gridArea="c"   style={{ height: 288 }}>
   <BoxHeader
          title="Revenue Month by Month"
          subtitle="graph representing the revenue month by month"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.secondary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.secondary[300]}
                  stopOpacity={0}
                />
             </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>




   </DashboardBox>
   
   </>
  )
}

export default Row1;