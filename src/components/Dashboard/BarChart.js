import React, { useEffect, useRef } from 'react';
import Chart from "chart.js";

const BarChart = (props) => {

    const MedchartRef = useRef(); 

    useEffect(() => { 

        const medchartRef = MedchartRef.current.getContext("2d");

        new Chart(medchartRef, {
            type: 'bar',
            options: {
                maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      min: 0,
                      max: 100
                    }
                  }
                ]
              }
            },
            data: {
              labels: props.data.map(d => d.label),
              datasets: [{
                label: props.title,
                data: props.data.map(d => d.value),
                backgroundColor: props.color,
                borderColor:props.color
              }]
            }
          });
    })


    return (
            <canvas id="MedChart" ref={MedchartRef} />
    );
};

export default BarChart;