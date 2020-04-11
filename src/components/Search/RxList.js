import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FHIR from 'fhirclient'
const client = FHIR.client("https://apps.hdap.gatech.edu/hapiR4/baseR4");
const NUMPAGES = 0;
var list = [];
var rxLists = [];

class RxList extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.searchWord = "";
        this.select = 0;

        this.updateDropdown = this.updateDropdown.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.getMed = this.getMed.bind(this);
        this.displayRx = this.displayRx.bind(this);
        //this.searchWord = this.set\\\searchWord.bind(this);
        //this.setselect = this.setselect.bind(this);
    }


    setselect (v) {
        this.select = v;
    }

    updateDropdown (e) {
        this.select = e.target.value;
    };

    handleSearch (e) {
        this.searchWord = e.target.value.toLowerCase();
    };

    getMed () {
            // console.log('click registered')


            client.request("Medication", { pageLimit: NUMPAGES, flat: true })

            // Log resources and get number of resources
                .then((response) => {

                    for (var i = 0; i < response.length; i++) {
                        if (response[i].code !== undefined && response[i].code.coding !== undefined) {
                            //var temp = response[i].code.coding[0].system;
                            if (response[i].code.coding[0].system !== undefined) {
                                response[i].codeSystem = response[i].code.coding[0].system.split('/').pop().toLowerCase();
                            } else {
                                response[i].codeSystem = 'Unknown'
                            }
                            if (response[i].code.coding[0].code !== undefined) {
                                response[i].codeID = response[i].code.coding[0].code;
                            }
                            if (response[i].code.coding[0].display !== undefined) {
                                response[i].medName = response[i].code.coding[0].display;
                            } else {
                                response[i].medName = 'Unknown';
                            }
                        } else {
                            response[i].codeSystem = 'Unknown';
                            response[i].codeID = 'Unknown';
                            response[i].medName = 'Unknown';
                        }
                        if (response[i].form !== undefined && response[i].form.coding[0] !== undefined && response[i].form.coding[0].display !== undefined) {
                            response[i].formName = response[i].form.coding[0].display;
                        } else {
                            response[i].formName = 'Unknown';
                        }
                        if (response[i].ingredient === undefined) {
                            //response[i].ingredient[0].itemCodeableConcept.coding[0].code = '';
                            response[i].ingredients = 'Unknown';
                        } else {
                            //console.log(i);
                            response[i].ingredients = '';
                            for (var j = 0; j < response[i].ingredient.length; j++) {
                                if (response[i].ingredient[j].itemCodeableConcept !== undefined) {
                                    response[i].ingredients += response[i].ingredient[j].itemCodeableConcept.coding[0].display + " ";
                                }
                            }
                        }
                        if (response[i].batch !== undefined) {
                            response[i].exDate = response[i].batch.expirationDate;
                            response[i].lotNum = response[i].batch.lotNumber;
                        } else {
                            response[i].exDate = 'Unknown';
                            response[i].lotNum = 'Unknown';
                        }
                    }
                    list = response;
                    this.setState({ loading: false});

                })
                .catch((err) => {
                    console.log(err);
                    this.setState({ loading: false });
                });
        }

    componentDidMount () {
        if (list.length === 0) {
            this.setState({ loading: true });
            this.getMed();
        }
    };


    displayRx() {
        this.setState({ clicked: true });

        rxLists = [];

        for (var i = 0; i < list.length; i++) {
            if (this.select === 0 || this.select === '0') {
                if (list[i].medName.toLowerCase().includes(this.searchWord)) {
                    rxLists.push(list[i]);
                }

            } else if (this.select === '1') {
                if (list[i].id.toLowerCase().includes(this.searchWord)) {
                    rxLists.push(list[i]);
                }
            } else if (this.select === '2') {
                if (list[i].codeSystem.toLowerCase().includes(this.searchWord)) {
                    rxLists.push(list[i]);
                }
            } else if (this.select === '3') {
                if (list[i].codeID.toLowerCase().includes(this.searchWord)) {
                    rxLists.push(list[i]);
                }
            } else if (this.select === '4') {
                if (list[i].ingredients.toLowerCase().includes(this.searchWord)) {
                    rxLists.push(list[i]);
                }
            } else if (this.select === '5') {
                if (list[i].formName.toLowerCase().includes(this.searchWord)) {
                    rxLists.push(list[i]);
                }
            } else if (this.select === '6') {
                if (list[i].exDate.toString().includes(this.searchWord)) {
                    rxLists.push(list[i]);
                }
            } else if (this.select === '7') {
                if (list[i].lotNum.toString().includes(this.searchWord)) {
                    rxLists.push(list[i]);
                }
            }

        }
        this.setState({ count: rxLists.length });
    }

    // if(isLoaded){
    //     return <p>Rx Loading...</p>
    // }

    render () {
        const {loading} = this.state;
        const {clicked} = this.state;
        const {count} = this.state;



        return (
            <div>
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
                                    Page Loading
                                </div>
                            </div>
                        ) : (
                            <React.Fragment>
                                <div className="input-group input-group-lg search-custom-style" role="toolbar"
                                     aria-label="Toolbar with button groups">
                                    <select onChange={this.updateDropdown} className="custom-select input-group-prepend col-md-2"
                                            id="dropdown">
                                        <option value='0' defaultValue="selected">Name</option>
                                        <option value='1'>ID</option>
                                        <option value='2'>Code System</option>
                                        <option value='3'>Code</option>
                                        <option value='4'>Ingredient</option>
                                        <option value='5'>Form</option>
                                        <option value='6'>Expiration Year</option>
                                        <option value='7'>Batch No</option>
                                    </select>

                                    <input className="form-control" type="search" placeholder="Search Medication"
                                           aria-label="Text input with dropdown button" onChange={this.handleSearch}/>

                                    <div className="input-group-append">
                                        <input className="btn btn-primary" type="submit" value="Search" onClick={this.displayRx}>
                                        </input>
                                    </div>
                                </div>
                                { !clicked ? (<p></p>) : (
                                    <React.Fragment> {
                                        count === 0 ? (<div className = 'row'>No Result Found</div>) : (
                                            <div className='displayRecord'>
                                                <div className="total-record">Total Record Count:{count}</div>


                                                <table className="table table-hover-md table-striped">
                                                    <thead>
                                                    <tr className="table-primary">
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
                                                    {rxLists.map(rxlist => (
                                                        <tr key={rxlist.id}>
                                                            <td>{rxlist.id}</td>
                                                            <td>{rxlist.medName}</td>
                                                            <td>{rxlist.codeSystem + ": " + rxlist.codeID}</td>
                                                            <td>{rxlist.formName}</td>
                                                            <td>{rxlist.ingredients}</td>
                                                            <td>{rxlist.lotNum}</td>
                                                            <td>{rxlist.exDate}</td>
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




                )}
            </div>
        )

    }

};

export default RxList;
