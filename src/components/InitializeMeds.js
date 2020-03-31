import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FHIR from 'fhirclient'
// import './App.css';

const client = FHIR.client("http://apps.hdap.gatech.edu/syntheticmass/baseDstu3")

class InitializeMeds extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.getMeds = this.getMeds.bind(this);
    }
    
    getMeds() {
        console.log('click registered')
        this.setState({ loading: true })
        client.request("Medication", { pageLimit: 2, flat: true })
        .then((response) => (
            // console.log(response)
            JSON.stringify(response, null, 4)
        ))
        .then((medications) => (
            // console.log(medications)
            this.setState({ medications: medications, loading: false })
        ))
        .catch((err) => {
            console.log(err);
            this.setState({ loading: false });
        })
    }

    render () {
        const { medications, loading } = this.state
        console.log(medications)

        return (
            <div>
                <button onClick={this.getMeds} >Get Med Data</button>
                { loading ? (
                    <div className="spinner-border">
                        <span className="sr-only"> Loading...</span>
                    </div>
                ) : (
                    <p> {medications} </p>
                )}
            </div>
        )
    }
}

export default InitializeMeds