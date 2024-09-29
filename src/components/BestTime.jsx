import React from "react";

export default function BestTime(){
      
      const bestTime = Number(JSON.parse(localStorage.getItem("time")))
      
      return(
            <div className="besttime">
            <span className="digits">
                {("0" + Math.floor((bestTime / 60000) % 60)).slice(-2)}:
            </span>
            <span className="digits">
                {("0" + Math.floor((bestTime / 1000) % 60)).slice(-2)}
            </span>
            {/* <span className="digits mili-sec">
                {("0" + ((time / 10) % 100)).slice(-2)}
            </span> */}
      </div>
      )
}