import React, { useEffect, useRef } from 'react';
import Chart from "chart.js";

const Doughnut = (props) => {
        
    const DoughnutchartRef = useRef(); 

    useEffect(()=>{

        const doughnutchartRef = DoughnutchartRef.current.getContext("2d");

        new Chart(doughnutchartRef, {
            type: 'doughnut',
            data: {
              labels: props.data.map(d => d.label),
              datasets: [{
                label: props.title,
                data: props.data.map(d => d.value),
                backgroundColor: props.color,
                borderColor:props.color,
                borderWidth: 1
              }]
            }
          });        
    })    
    return (
        <canvas id="DoughnutChart" ref={DoughnutchartRef} />
    );
};

export default Doughnut;