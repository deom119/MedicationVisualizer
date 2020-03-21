import React, { useState } from 'react';

const RxList = () => {

    const [rxLists,setRxLists] = useState([])
    //const [resource,setResource] = useState({})    
    //const [rx,setRx] = useState({})
    //const [code,setCode] = useState("")
    //const [system,setSystem] = useState("")
    //const [name,setName] = useState("")
    //const [isRxLoading,setIsRxLoading] =useState(false)

    const [isLoaded,setIsLoaded] =useState(false)
    const [error,setError]=useState(null)
    const [searchWord, setsearchWord] = useState("")
    const [count, setCount] = useState(0);

    const handleSearch = (e)=>{
        setsearchWord(e.target.value)
    }

    const displayRx = ()=>{        
        const url =`https://apps.hdap.gatech.edu/hapiR4/baseR4/Medication?code:text=`+searchWord+`&_pretty=true`;
        //const url =`https://apps.hdap.gatech.edu/hapiR4/baseR4/Medication?code:text=tylenol&_pretty=true`\
        console.log(url);
        //console.log(searchWord)
        if(searchWord){
            //console.log(`setsearchWord`,setsearchWord)
            fetch(url)
            .then(response =>{
                if(response.ok){
                    return response.json();
                }else{
                    throw Error ("Error while fetching data")
                }
            })
            .then(rx=>{
                const count = rx.total
                if (count> 0){                
                    setCount(count)      
                    setRxLists(rx.entry);
                    setIsLoaded(true);
                }else{
                    console.log(`no records returned`);
                    setIsLoaded(true)
                }            
                return rx.entry;
            })
            .then(rxentry=>{
                console.log(`inside rxentry`, rxentry);
                console.log(`rxListState`,rxLists)
            })
            .catch(error=>{
                setError(error);
            })
        }else{
            console.log(`enter medication`);
        }
        

    }

    if(error){
        return <p style={{color:'Red'}}> Error while loading data</p>
    }

    // if(isLoaded){
    //     return <p>Rx Loading...</p>
    // }

    return (
        <React.Fragment>

            <div className="search-bar">
                <div>
                    <input type="search" placeholder="Search" aria-label="Search" onChange={handleSearch}></input>
                </div>
                <div>
                    <input type="submit" value="Search" onClick={displayRx}></input>
                </div>
            </div>

            { !isLoaded?(<p>No records to display</p>):(  
                <React.Fragment>

                    {
                        count===0?
                            (<div>no records returned</div>):
                            (                                
                                <div>                                    
                                    <div>Total record count:{count}</div> 
        
                                    {
                                        rxLists.map(rxlist=> ( 
                                            <div key={rxlist.fullUrl}>                               
                                                <div>batch No:{rxlist.resource.batch.lotNumber} Expiry Date: {rxlist.resource.batch.expirationDate}</div>
                                            </div>
                                        )) 
                                    }   
                                </div>                                                                                             
                            )
                    }
                </React.Fragment>
            )}

        </React.Fragment>
    );
};

export default RxList;
