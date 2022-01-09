import React from "react";

export const RadarMap = (props) => {
  return (
    <div className="radar-map-container">
      <iframe
        width="736"
        height="480"
        src="https://embed.windy.com/embed2.html?lat=40.432&lon=-79.925&detailLat=40.432&detailLon=-79.925&width=700&height=480&zoom=6&level=surface&overlay=radar&product=radar&menu=&message=&marker=&calendar=24&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
        frameborder="0"
      ></iframe>
    </div>
  );
};
