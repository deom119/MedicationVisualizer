import React, { useState, useEffect } from 'react';

const RxList = () => {

    const [rxLists,setRxLists] = useState([])
    //const [resource,setResource] = useState({})
    const [isLoading,setIsLoading] =useState(false)
    const [error,setError]=useState(null)
    
    const [rx,setRx] = useState({})
    const [code,setCode] = useState("")
    const [system,setSystem] = useState("")
    const [name,setName] = useState("")

    const [isRxLoading,setIsRxLoading] =useState(false)
    //const [rxerror,setRxError]=useState(null)

    //const displayDrug = null

    //const [msg,setMsg] =useState("Nothing to Display")

    //const [url,setURL] = useState(`http://hapi.fhir.org/baseR4/Medication`)
    //const BASE_URL =`http://hapi.fhir.org/baseR4/Medication`

    useEffect(()=>{
        setIsLoading(true);
        fetch(`https://apps.hdap.gatech.edu/hapiR4/baseR4/Medication`)
            .then(response =>{
                if(response.ok){
                    return response.json();
                }else{
                    throw Error ("Error while fetching data")
                }
            })
            .then(rxlists =>{
                setRxLists(rxlists.entry)
                //console.log(rxlists.entry)
                setIsLoading(false);
            })
            .catch(error=>{
                setError(error);
            })
    },[])


    const display = (url) =>{
        
        //console.log(url);
              
        fetch(url)
        .then(response =>{
            if(response.ok){
                return response.json();
            }else{
                throw Error ("Error while fetching data")
            }
        })
        .then(rx=>{
            setRx(rx);
            const code = rx.code;
            const coding = code.coding;

/*           
            console.log(rx);
            console.log("==== code =====");
            console.log(code);
    
            console.log("==== coding =====");
            console.log(coding);
*/           


            coding.map(code=>{
                //console.log("Code->", code.system, code.code, code.display)
                setCode(code.code);
                setSystem(code.system);
                setName(code.display);                
            })
            setIsRxLoading(true);

        })
        .catch(error=>{
            setError(error);
        })

    }

    if(error){
        return <p style={{color:'Red'}}> Error while loading data</p>
    }

    if(isLoading){
        return <p>Rx Loading...</p>
    }

    return (
        <React.Fragment>

            {
                isRxLoading === true? 
                    <div className="rx-show">
                        <div className="name">{name}</div>
                        <div>Source:{system}</div>
                        <div>Rx Id:{code}</div>
                    </div> : 
                    <div className="rx-nodisplay">Click each item to display</div>
            }

            <h2>Rx List</h2>
            <div className="rx-list-container">
                {rxLists.map(rx=>(                
                    <div className="rx-list" key={rx.fullUrl} onClick={()=>display(rx.fullUrl)}>
                        <div>{rx.resource.resourceType} id: {rx.resource.id}</div>               
                    </div>
                ))} 
            </div>

        </React.Fragment>
    );
};

export default RxList;
