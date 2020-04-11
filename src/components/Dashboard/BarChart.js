import React, { useEffect, useRef } from 'react';
import Chart from "chart.js";

const BarChart = (props) => {

    const MedchartRef = useRef();
    let values = Object.values(props.data);

    useEffect(() => { 

        const medchartRef = MedchartRef.current.getContext("2d");

        new Chart(medchartRef, {
            type: 'bar',
            options: {
              maintainAspectRatio: false,
              legend: { display: false },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      min: 0,
                      max: values.reduce((a, b) => +a + +b.count, 0)
                    }
                  }
                ]
              },
              title: {
                  display: true,
                  text: props.title,
                  fontSize: 17
              },
                tooltips: {
                    callbacks: {
                        afterLabel: function(tooltipItem) {
                            return values[tooltipItem['index']].ids;
                        }
                    }

                }
            },
            data: {
              labels: Object.keys(props.data),
              datasets: [{
                data: values.map(d => d.count),
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