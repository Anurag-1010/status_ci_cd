import React from "react";
import './AttendanceLegend.css'

const AttendanceLegend = () => {
  return (
    <div className="legend-container">
      <div className="legend-item">
        <span className="dot holiday"></span>
        <p>Holidays</p>
      </div>

      <div className="legend-item">
        <span className="dot leave"></span>
        <p>Leaves</p>
      </div>

      <div className="legend-item">
        <span className="dot present"></span>
        <p>Present</p>
      </div>

      <div className="legend-item">
        <span className="dot absent"></span>
        <p>Absent</p>
      </div>

      <div className="legend-item">
        <span className="dot halfday"></span>
        <p>Half D.</p>
      </div>
    </div>
  );
};

export default AttendanceLegend;