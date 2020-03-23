import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

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
                for (var i = 0; i < rx.entry.length; i++) {
                    rx.entry[i].resource.ingredients = '';
                    if (rx.entry[i].resource.batch === undefined) {
                        rx.entry[i].resource.batch.expirationDate = "-";
                        rx.entry[i].resource.batch.lotNumber = "-";
                    }
                    if (rx.entry[i].resource.code.coding[0] === undefined) {
                        rx.entry[i].resource.code.coding[0].code = "-";
                        rx.entry[i].resource.code.coding[0].display = "-";
                    }
                    if (rx.entry[i].resource.form.coding[0] === undefined) {
                        rx.entry[i].resource.form.coding[0].display = "-";
                    }
                    if (rx.entry[i].resource.ingredient === undefined) {
                        rx.entry[i].resource.ingredient[0].itemCodeableConcept.coding[0].code = "-";
                        rx.entry[i].resource.ingredient[0].itemCodeableConcept.coding[0].display = "-";
                    }

                    for (var j = 0; j < rx.entry[i].resource.ingredient.length; j++) {
                        rx.entry[i].resource.ingredients += rx.entry[i].resource.ingredient[j].itemCodeableConcept.coding[0].display + " ";
                    }


                }
                if (count> 0){                
                    setCount(count);
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
                    <input type="search" placeholder="Search Medication" aria-label="Search" onChange={handleSearch}></input>
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


                                    <table className ="table table-hover-md table-striped">
                                        <thead>
                                            <tr className = "table-primary">
                                                <th scope="col">ID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Code</th>
                                                <th scope="col">Form</th>
                                                <th scope="col">Ingredient</th>
                                                <th scope="col">Batch No</th>
                                                <th scope="col">Expiration Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {rxLists.map(rxlist=> (
                                                    <tr key = {rxlist.fullUrl}>
                                                        <td>{rxlist.resource.id}</td>
                                                        <td>{rxlist.resource.code.coding[0].display}</td>
                                                        <td>{rxlist.resource.code.coding[0].code}</td>
                                                        <td>{rxlist.resource.form.coding[0].display}</td>
                                                        <td>{rxlist.resource.ingredients}</td>
                                                        <td>{rxlist.resource.batch.lotNumber}</td>
                                                        <td>{rxlist.resource.batch.expirationDate}</td>
                                                    </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>

                                </div>
                            )
                    }
                </React.Fragment>
            )}

        </React.Fragment>
    );
};

export default RxList;
