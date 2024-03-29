import React from 'react';
import { Line } from 'react-chartjs-2';

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

function LineChart(sh) {
    let avg_speed_data = [];
    let max_speed_data = [];
    let date_data = [];

    avg_speed_data.push(null);
    max_speed_data.push(null);
    date_data.push("");

    sh.data.forEach(async function(record){
        avg_speed_data.push(record.avg_speed);
        max_speed_data.push(record.max_speed);
        date_data.push(record.create_at);
    })

    avg_speed_data.push(null);
    max_speed_data.push(null);
    date_data.push("");

    let data = {
        labels: date_data,
        datasets: [
            {
                label: 'Max Speed',
                data: max_speed_data,
                fill: false,
                backgroundColor: 'rgb(95, 143, 218)',
                borderColor: 'rgba(95, 143, 218, 0.2)',
                lineTension: 0
            },
            {
                label: 'Average Speed',
                data: avg_speed_data,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
                lineTension: 0
            },
    
        ],
    }

    return (
        <Line data={data} options={options} />
    )
}

export default LineChart