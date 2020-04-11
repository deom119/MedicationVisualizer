import React, { useEffect, useRef } from 'react';
import Chart from "chart.js";
import 'chartjs-plugin-colorschemes';


const PieChart = (props) => {
    const PiechartRef = useRef();
    let values = Object.values(props.data);

    useEffect(()=>{

        const piechartRef = PiechartRef.current.getContext("2d");

        new Chart(piechartRef, {
            type: 'pie',
            data: {
                labels: values.map(d => d.name),
                datasets: [{
                    data: values.map(d => d.count),
                //backgroundColor: props.color,
                //borderColor: props.color,

              }]
            },
            options: {
                title: {
                    display: true,
                    text: props.title,
                    fontSize: 17
                },
                legend: {
                    position: 'left'
                },
                tooltips: {
                    callbacks: {
                        afterLabel: function(tooltipItem) {
                            return values[tooltipItem['index']].ids;
                        }
                    }

                },
                options: {
                    plugins: {
                        colorschemes: {
                            scheme: 'tableau.ClassicBlue7'
                        }
                    }

                }
            }
          });        
    })

    return (
            <canvas id="PieChart" ref={PiechartRef} />
    );
};

export default PieChart;