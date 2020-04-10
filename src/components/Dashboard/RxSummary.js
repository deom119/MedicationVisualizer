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
var list = [];

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
                        if (code['0'] === undefined) {
                            code['0'] = {count: 1, name: 'Unknown'}
                        } else {
                            code['0'].count += 1
                        }
                    } else {
                        if (code[response[i].code.coding[0].system.toString()] === undefined) {
                            code[response[i].code.coding[0].system.toString()] = {count: 1, name: response[i].code.coding[0].system.split('/').pop()}
                        } else {
                            code[response[i].code.coding[0].system.toString()].count += 1
                        }
                    }
                    if (response[i].form === undefined) {
                        if (form['0'] === undefined) {
                            form['0'] = {count: 1, name: 'Unknown'}
                        } else {
                            form['0'].count += 1
                        }
                    } else {
                        if (form[response[i].form.coding[0].code.toString()] === undefined) {
                            form[response[i].form.coding[0].code.toString()] = {count: 1, name: response[i].form.coding[0].display}
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
                list = response;
                return response.length
            })
            .then((numMeds) => (
                this.setState({ medications: numMeds, loading: false })

            ))
            .catch((err) => {
                console.log(err);
                this.setState({ loading: false });
            });
    }

    componentDidMount() {
        window.addEventListener('load', this.getMeds);
    }

    render () {

        return (
            <div>
                <h3 className="title">Rx Summary</h3>
                <div className="charDisplay">
                    {
                        list.length >= 2 ?
                            (
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
                                        <PieChart data={form} title={'Medicine Form'} color={['blue','purple','red','orange','yellow','green','teal','cyan', 'Navy', 'brown', 'pink']} />
                                    </div>
                                    <div className="eachgraphGrid">
                                        <PieChart data={code} title={'Medicine Code System'} color={['blue','purple','red','orange','yellow','green','teal','cyan']} />
                                    </div>
                                    <div className="eachgraphGrid">
                                        <Doughnut data={status} title={'Medicine Status'} color={['red','blue','yellow','green','teal','cyan']} />
                                    </div>

                                </React.Fragment>
                            ) :
                            (<div className="text-center" >
                                <div className="spinner-grow text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-grow text-secondary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-grow text-success" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>)
                    }

                </div>
            </div>
        );
    }
};

export default RxSummary;