import React, { useEffect, useRef } from 'react';
import Chart from "chart.js";

const Doughnut = (props) => {
        
    const DoughnutchartRef = useRef(); 

    useEffect(()=>{

        const doughnutchartRef = DoughnutchartRef.current.getContext("2d");

        new Chart(doughnutchartRef, {
            type: 'doughnut',
            options: {
                title: {
                    display: true,
                    text: props.title,
                    fontSize: 17
                }
            },
            data: {
                labels: Object.keys(props.data),
                datasets: [{
                    data: Object.values(props.data),
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