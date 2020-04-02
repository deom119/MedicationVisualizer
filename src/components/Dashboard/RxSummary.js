import React , { useState, useEffect } from 'react';
import Util from './Util';
import BarChart from './BarChart';
import PieChart from './PieChart';
import Doughnut from './Doughnut';

const RxSummary = () => {

    const [data,setData] = useState([]);
    const [URL] = useState("https://apps.hdap.gatech.edu/hapiR4/baseR4/Medication");

    useEffect(() => {    

        const datafeed = Util.getData();
        setData(datafeed);

    },[URL]);

    return (
        <div>
            <h3 className="title">Rx Summary</h3>
                <div className="charDisplay">                                                                              
                {
                            data.length>=2?                            
                            (                                                               
                                    <React.Fragment>
                                        <div className="eachgraphGrid">
                                            <BarChart data={data[1].data} 
                                                title={'Medicine Expiry char'} 
                                                color={['rgba(255, 99, 132, 0.2)',
                                                        'rgba(54, 162, 235, 0.2)',
                                                        'rgba(255, 206, 86, 0.2)',
                                                        'rgba(75, 192, 192, 0.2)',
                                                        'rgba(153, 102, 255, 0.2)',
                                                        'rgba(255, 159, 64, 0.2)'
                                                        ]}                                                        
                                            />  
                                        </div>  
                                        <div className="eachgraphGrid">
                                            <PieChart data={data[0].data} title={'Medicine Form Chart'} color={['blue','indigo','purple','red','orange','yellow','green','teal','cyan']} />  
                                        </div>                                     
                                        <div className="eachgraphGrid">
                                            <BarChart data={data[1].data} title={data[1].title} color={['blue','indigo','purple','red','orange','yellow','green','teal','cyan']} />  
                                        </div>  
                                        <div className="eachgraphGrid">
                                            <Doughnut data={data[1].data} title={data[1].title} color={['blue','indigo','purple','red','orange','yellow','green','teal','cyan']} />
                                        </div>  
                                    </React.Fragment>                                                                                                                                                                                     
                            ):
                            (<div>Processing the records</div>)
                }    

                </div>         
        </div>
    );
};

export default RxSummary;