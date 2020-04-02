import React, { useEffect, useRef } from 'react';
import Chart from "chart.js";


const PieChart = (props) => {

    const PiechartRef = useRef(); 

    useEffect(()=>{

        const piechartRef = PiechartRef.current.getContext("2d");

        new Chart(piechartRef, {
            type: 'pie',
            data: {
              labels: props.data.map(d => d.label),
              datasets: [{
                label: props.title,
                data: props.data.map(d => d.value),
                backgroundColor: props.color,
                borderColor: props.color,
                borderWidth: 1
              }]
            }
          });        
    })

    return (
            <canvas id="PieChart" ref={PiechartRef} />
    );
};

export default PieChart;