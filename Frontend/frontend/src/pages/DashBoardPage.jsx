import { useState } from "react";

import AttendanceLegend from "../components/AttendanceLegend";
/* ================= MONTH CONSTANT ================= */

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

/* ================= ATTENDANCE MOCK ================= */

function getAttendanceStatus(year, month, day) {
  const date = new Date(year, month, day);
  const dow = date.getDay();

  if (dow === 0) return null;
  if (dow === 6) return "saturday";

  if (year === 2026 && month === 1 && day >= 2 && day <= 6) return "absent";
  if (year === 2026 && month === 2 && day === 4) return "holiday";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date > today) return null;

  const seed = (year * 400 + month * 31 + day) % 10;
  if (seed === 0) return "absent";
  if (seed === 1) return "leave";
  return "present";
}

/* ================= CALENDAR GRID ================= */

function buildMonthGrid(year, month) {
  const totalDays = new Date(year, month + 1, 0).getDate();
  const prevDays  = new Date(year, month, 0).getDate();
  const firstDow  = new Date(year, month, 1).getDay();
  const offset    = firstDow === 0 ? 6 : firstDow - 1;

  const cells = [];
  for (let i = offset - 1; i >= 0; i--)
    cells.push({ day: prevDays - i, type: "prev" });
  for (let d = 1; d <= totalDays; d++)
    cells.push({ day: d, type: "current" });
  const rem = 42 - cells.length;
  for (let d = 1; d <= rem; d++)
    cells.push({ day: d, type: "next" });
  return cells;
}

/* ================= MONTH PANEL ================= */

const WEEK_HEADERS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

function MonthPanel({ year, month }) {
  const today = new Date();
  today.setHours(0,0,0,0);
  const grid = buildMonthGrid(year, month);

  return (
    <div style={{ flex: 1 }}>
      <p style={{
        textAlign: "center",
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 20,
      }}>
        {MONTHS[month]} {year}
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        rowGap: 10,
      }}>
        {WEEK_HEADERS.map(d => (
          <div key={d} style={{
            textAlign: "center",
            fontSize: 13,
            fontWeight: 600,
            color: "#6b7280",
          }}>{d}</div>
        ))}

        {grid.map((cell, idx) => {
          if (cell.type !== "current") {
            return (
              <div key={idx} style={{
                height: 40,
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                color:"#d1d5db",
                fontSize:13
              }}>
                {cell.day}
              </div>
            );
          }

          const date = new Date(year, month, cell.day);
          date.setHours(0,0,0,0);
          const isToday = date.getTime() === today.getTime();
          const status  = getAttendanceStatus(year, month, cell.day);

          let bg="transparent", color="#374151", border="none", fontW=500;

          if (isToday) {
            border="2px solid #e8501a";
            color="#e8501a";
            fontW=700;
          } else if (status==="absent") {
            bg="#ffe5e5";
            color="#e03030";
          } else if (status==="present" || status==="leave") {
            color="#22c55e";
            fontW=600;
          } else if (status==="holiday") {
            bg="#ede9fe";
            color="#7c3aed";
          } else if (status==="saturday") {
            color="#f97316";
            fontW=600;
          }

          return (
            <div key={idx} style={{
              height:38,
              width:38,
              margin:"0 auto",
              borderRadius:"50%",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              background:bg,
              border,
              fontSize:14,
              fontWeight:fontW,
              color
            }}>
              {cell.day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================= ATTENDANCE CALENDAR ================= */

function AttendanceCalendar() {
  const now = new Date();
  const [baseYear,setBaseYear] = useState(now.getFullYear());
  const [baseMonth,setBaseMonth] = useState(now.getMonth());

  const months = [0,1,2].map(offset=>{
    const totalOffset = baseMonth + offset;
    return {
      year: baseYear + Math.floor(totalOffset/12),
      month: totalOffset%12,
    };
  });

  const prev = () => {
    if(baseMonth===0){ setBaseYear(y=>y-1); setBaseMonth(11); }
    else setBaseMonth(m=>m-1);
  };

  const next = () => {
    if(baseMonth===11){ setBaseYear(y=>y+1); setBaseMonth(0); }
    else setBaseMonth(m=>m+1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:35
      }}>
        <h2 style={{ fontSize:20, fontWeight:700 }}>
          Attendance Calendar
        </h2>

        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{
            border:"1.5px solid #e8501a",
            borderRadius:10,
            padding:"6px 16px",
            color:"#e8501a",
            fontWeight:600
          }}>
            {MONTHS[baseMonth]} {baseYear}
          </div>

          <button onClick={prev} style={navBtn}>‹</button>
          <button onClick={next} style={navBtn}>›</button>
        </div>
      </div>

      <div style={{ display:"flex", gap:70 }}>
        {months.map((m,i)=>(
          <MonthPanel key={i} year={m.year} month={m.month}/>
        ))}
      </div>
    </div>
  );
}

const navBtn = {
  width:32,
  height:32,
  borderRadius:8,
  border:"1.5px solid #e5e7eb",
  background:"none",
  cursor:"pointer",
  fontSize:18
};

/* ================= OBJECTIVES CARD ================= */

function ObjectivesCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 style={{ fontSize:16, fontWeight:600, marginBottom:20 }}>
        Employee Objectives
      </h2>
      <p style={{ color:"#9ca3af", textAlign:"center" }}>
        No objectives found
      </p>
    </div>
  );
}

/* ================= NOTICES CARD ================= */

function NoticesCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 style={{ fontSize:16, fontWeight:600, marginBottom:20 }}>
        Notices
      </h2>
      <p style={{ color:"#9ca3af", textAlign:"center" }}>
        No notices
      </p>
    </div>
  );
}

/* ================= DASHBOARD ================= */

export default function Dashboard() {
  return (
    <div className="space-y-6">

      <div>
        <h1 style={{ fontSize:24, fontWeight:700 }}>
          Welcome back!
        </h1>
        <p style={{ color:"#6b7280" }}>
          Here's what's happening today
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ObjectivesCard/>
        <NoticesCard/>
      </div>

      <AttendanceCalendar/>
        
  <AttendanceLegend />

    </div>
  );
}