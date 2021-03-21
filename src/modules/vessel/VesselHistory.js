import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

const data = {
    labels: ['4', '2', '3', '4', '5', '6'],
    datasets: [
        {
            label: 'Max Speed',
            data: [12, 19, 13, 6, 14, 9],
            fill: false,
            backgroundColor: 'rgb(95, 143, 218)',
            borderColor: 'rgba(95, 143, 218, 0.2)',
            lineTension: 0
        },
        {
            label: 'Average Speed',
            data: [4, 12, 8, 3, 4, 5],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            lineTension: 0
        },

    ],
}

const options = {
    scales: {
        yAxes: [
            {
                scaleLabel: {
                    display: true,
                    labelString: "Average Speed (km/h)"
                },
            },
        ],
        xAxes: [
            {
                scaleLabel: {
                    display: true,
                    labelString: "Date"
                },
            },
        ]
    },
    
}

const LineChart = () => (
    <Line data={data} options={options} />
)

export default LineChart