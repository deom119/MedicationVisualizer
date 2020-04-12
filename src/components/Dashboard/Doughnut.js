import React, { useEffect, useRef } from 'react';
import Chart from "chart.js";
import 'chartjs-plugin-colorschemes';

const Doughnut = (props) => {
        
    const DoughnutchartRef = useRef();
    if (props.title === 'Amount of Each Medication Dispensed') {
        var values = props.data
    } else {
        var values = Object.values(props.data);
    }

    useEffect(()=>{

        const doughnutchartRef = DoughnutchartRef.current.getContext("2d");

        if (props.title === 'Amount of Each Medication Dispensed') {
            new Chart(doughnutchartRef, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(values),
                    datasets: [{
                        data: Object.values(values),
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: props.title,
                        fontSize: 17
                    },
                    // legend: {
                    //     labels: {
                    //         boxWidth: 20
                    //     }
                    // },
                    plugins: {
                        colorschemes: {
                            scheme: 'tableau.Classic20'
                        }
                    }
                }
            })
        } else {
            new Chart(doughnutchartRef, {
                type: 'doughnut',
                options: {
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

                    },
                    plugins: {
                        colorschemes: {
                            scheme: 'tableau.Classic20'
                        }
                    }

                },
                data: {
                    labels: Object.keys(props.data),
                    datasets: [{
                        data: values.map(d => d.count),
                        //backgroundColor: props.color,
                        //borderColor:props.color,
                        borderWidth: 1
                }]
                }
            });
        }
    })    
    return (
        <canvas id="DoughnutChart" ref={DoughnutchartRef} />
    );
};

export default Doughnut;