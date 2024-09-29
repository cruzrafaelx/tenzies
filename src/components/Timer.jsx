import React from "react";
import { useState, useEffect } from "react";

export default function Timer({isActive, time, setTime}){

    

      useEffect(()=>{
            let interval = null

            if(isActive){
                  interval = setInterval(()=>{
                        setTime(prevTime => prevTime +1000)
                  }, 1000)
            }else{
                  clearInterval(interval)
            }

            return () => {
                  clearInterval(interval)
            }
      }, [isActive])



      return(
      <div className="timer">
            <span className="digits">
                {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
            </span>
            <span className="digits">
                {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
            </span>
            {/* <span className="digits mili-sec">
                {("0" + ((time / 10) % 100)).slice(-2)}
            </span> */}
      </div>
      )

}
