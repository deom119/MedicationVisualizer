import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import FHIR from 'fhirclient'
import BarChart from './BarChart';
import PieChart from './PieChart';
import Doughnut from './Doughnut';


const client = FHIR.client("https://apps.hdap.gatech.edu/hapiR4/baseR4");
const NUMPAGES = 0;
var expiration = [];
var form = {};
var code = [];
var status = {};
// var list = [];

class RxSummary extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.getMeds = this.getMeds.bind(this);
    }

    // Calls FHIR api to get medication resources
    getMeds() {
        // console.log('click registered')
        this.setState({ loading: true });


        client.request("Medication", { pageLimit: NUMPAGES, flat: true })

        // Log resources and get number of resources
            .then((response) => {

                console.log(response);
                for (var i = 0; i < response.length; i++) {
                    if (response[i].batch === undefined) {
                        if (expiration['Unknown'] === undefined) {
                            expiration['Unknown'] = 1
                        } else {
                            expiration['Unknown'] += 1
                        }
                    } else {
                        var year = response[i].batch.expirationDate.split('-')[0];
                        if (expiration[year] === undefined) {
                            expiration[year] = 1;
                        } else {
                            expiration[year] += 1;
                        }
                    }
                    if (response[i].code === undefined || response[i].code.coding === undefined || response[i].code.coding[0].system === undefined) {
                        if (code['Unknown'] === undefined) {
                            code['Unknown'] = {count: 1, name: 'Unknown'}
                        } else {
                            code['Unknown'].count += 1
                        }
                    } else {
                        if (code[response[i].code.coding[0].system.split('/').pop().toLowerCase()] === undefined) {
                            code[response[i].code.coding[0].system.split('/').pop().toLowerCase()] = {count: 1, name: response[i].code.coding[0].system.split('/').pop().toLowerCase()}
                        } else {
                            code[response[i].code.coding[0].system.split('/').pop().toLowerCase()].count += 1
                        }
                    }

                    if (response[i].form === undefined) {
                        if (form['Unknown'] === undefined) {
                            form['Unknown'] = {count: 1, name: 'Unknown'}
                        } else {
                            form['Unknown'].count += 1
                        }
                    } else {
                        if (form[response[i].form.coding[0].code.toString()] === undefined) {
                            if (response[i].form.coding[0].display === undefined) {
                                form[response[i].form.coding[0].code.toString()] = {count: 1, name: response[i].form.coding[0].code}
                            } else {
                                form[response[i].form.coding[0].code.toString()] = {count: 1, name: response[i].form.coding[0].display}
                            }

                            console.log(response[i].form.coding[0].code.toString(), i);
                        } else {
                            form[response[i].form.coding[0].code.toString()].count += 1
                        }
                    }

                    if (response[i].status === undefined) {
                        if (status['Unknown'] === undefined) {
                            status['Unknown'] = 1;
                        } else {
                            status['Unknown'] += 1;
                        }
                    } else {
                        if (status[response[i].status] === undefined) {
                            status[response[i].status] = 1;
                        } else {
                            status[response[i].status] += 1;
                        }

                    }
                }
                // list = response;
                Array.sort([form]);
                console.log("processed all data");
                this.setState({ loading: false })
                // return response.length
            })
            // .then((numMeds) => (
            //     this.setState({ medications: numMeds, loading: false })

            // ))
            .catch((err) => {
                console.log(err);
                this.setState({ loading: false });
            });
    }

    componentDidMount() {
        this.getMeds();
    }

    render () {
        const { loading } = this.state;

        return (
            <div>
                <h3 className="title">Rx Summary</h3>
                    {
                    loading ?
                        (
                            <div className="text-center" >
                                <div className="row">
                                    <div className="spinner-grow text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    <div className="spinner-grow text-secondary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    <div className="spinner-grow text-success" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                <div className="row">
                                    Processing the data...
                                    </div>
                            </div>
                        ) : (
                            <div className="charDisplay">
                                <React.Fragment>
                                    <div className="eachgraphGrid">
                                        <BarChart data={expiration}
                                            title={'Medicine Expiration date'}
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
                                        <PieChart data={form} title={'Medicine Form'} color={['blue', 'purple', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan', 'Navy', 'brown', 'pink']} />
                                    </div>
                                    <div className="eachgraphGrid">
                                        <PieChart data={code} title={'Medicine Code System'} color={['blue', 'purple', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan']} />
                                    </div>
                                    <div className="eachgraphGrid">
                                        <Doughnut data={status} title={'Medicine Status'} color={['red', 'blue', 'yellow', 'green', 'teal', 'cyan']} />
                                    </div>

                                </React.Fragment>
                            </div>

                        )
                    }

            </div>
        );
    }
};

export default RxSummary;