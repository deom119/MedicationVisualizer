import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FHIR from 'fhirclient'
import BarChart from './BarChart';
import PieChart from './PieChart';
import Doughnut from './Doughnut';


const client = FHIR.client("http://hapi.fhir.org/baseR4");
const NUMPAGES = 2;
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
                //console.log(response)
                list = list.concat(response);
                console.log(list);
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


                                </React.Fragment>
                            ) :
                            (<div>Processing the records</div>)
                    }

                </div>
            </div>
        );
    }
};

export default RxSummary;