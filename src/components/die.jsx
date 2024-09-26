import React from "react";

export default function Die({value, id, isHeld, hold}){
      return(
      
      <div className={`die--body ${isHeld ? "die--held" : "die--notheld"}`}>
            <h2 className="die--num" onClick={hold}>{value}</h2>
      </div>
)}