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
                      max: Object.values(props.data).reduce((a, b) => a + b, 0)
                    }
                  }
                ]
              },
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