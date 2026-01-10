import React, { useEffect, useState } from 'react';


export default function ShowPointPosition() {
 
    
    const [point, setPoint] = useState<[number, number] | null>(null);

    

    return (
        <div style={{ padding: '0px', background: 'rgb(240, 240, 240, 0.4)', fontWeight: 'bold', fontSize: '12px' }}>
            <p>经度: {point ? point[0].toFixed(6) : '--'}</p>
            <p>纬度: {point ? point[1].toFixed(6) : '--'}</p>
        </div>
    );
}