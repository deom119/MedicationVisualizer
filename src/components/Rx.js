import React, { useState, useEffect } from 'react';

const Rx = ({url}) => {

    const displayRx = (url) =>{
        console.log(url)
        setIsRxLoading(true);
        fetch(url)
        .then(response =>{
            if(response.ok){
                return response.json();
            }else{
                throw Error ("Error while fetching Rx")
            }
        })
        .then(rx =>{
            setRx(rx)
            console.log(rx)
            setIsLoading(false);
        })
        .catch(error=>{
            setRxError(error);
        })
    }


    return (
        <div>
            
        </div>
    );
};

export default Rx;