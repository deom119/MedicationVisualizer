import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FHIR from 'fhirclient'
// import './App.css';

const client = FHIR.client("http://apps.hdap.gatech.edu/syntheticmass/baseDstu3")
const NUMPAGES = 50

class InitializeMeds extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.getMeds = this.getMeds.bind(this);
    }
    
    getMeds() {
        console.log('click registered')
        this.setState({ loading: true })
        client.request("Medication", { pageLimit: NUMPAGES, flat: true })
        .then((response) => {
            console.log(response)
            return response.length
        })
        .then((numMeds) => (
            this.setState({ medications: numMeds, loading: false })
        ))
        .catch((err) => {
            console.log(err);
            this.setState({ loading: false });
        })
    }

    render () {
        const { medications, loading } = this.state
        // console.log(typeof medications)

        return (
            <div>
                <button onClick={this.getMeds} >Get Med Data</button>
                { loading ? (
                    <div className="spinner-border">
                        <span className="sr-only"> Loading...</span>
                    </div>
                ) : (
                    // <p>Number of medications: {numMeds} </p>
                    <p> Number of medications: {medications} </p>
                )}
            </div>
        )
    }
}

export default InitializeMeds