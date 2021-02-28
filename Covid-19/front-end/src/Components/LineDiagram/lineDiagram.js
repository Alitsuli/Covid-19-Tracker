import React from 'react';
import { Line } from 'react-chartjs-2';

const LineDiagram = (props) => {
    return (
        <div style={{ width: '1000px', height: '400px', margin: '30px auto' }}>
            <Line data={{
                labels: [],
                datasets: [
                    {
                        label: 'Tartunnan',
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(208, 67, 67, 1)',
                        borderColor: 'rgba(13, 13, 13, 1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: []
                    }
                ]
            }} />
        </div>
    )
}

export default LineDiagram;