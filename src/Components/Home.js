import React, { Component } from "react";
import axios from "axios";
import '../App.css'
import spin from "./R.gif"

class Home extends Component {
  state = {
    people: [],
    total:0,
    print:false,
    result: []
  };
  toggleButtonState = async(sel) => {
    await axios
      .get("https://reqres.in/api/users/"+sel)
      .then(response => {
        this.successShow1(response);
      })
      .catch(error => {
        this.successShow1(error);
      });
     
};


  componentDidMount() {
    axios
      .get("https://reqres.in/api/users")
      .then(response => {
        this.successShow(response);
      })
      .catch(error => {
        this.successShow(error);
      });
  }

  successShow(response) {
    this.setState({
      people: response.data.data,
      total: response.data.total
    });
  }
  successShow1(response) {
    this.setState({
      result: response.data.data,
      print:true,
    });
  }

  render() {
      console.log(this.state.total);
      console.log(this.state.result);
      console.log(this.state.people);
      const qtyButtons = Array(this.state.total).fill().map((_, i) => {
        const value = parseInt(i);
        return (
            <div className="btn">
          <button onClick={this.toggleButtonState.bind(this,value+1)}>
            {value+1}
          </button>
          </div>
        );
      });
    return (
    <div>
        {
        (this.state.print)?(<div >
          <div key={this.state.result.id} >
            <div className="avatar">
            <img src={this.state.result.avatar} alt="display image" /> 
            </div>
            <div className="info">
                <div>First Name : {this.state.result.first_name}</div>
                <div>Last Name : {this.state.result.last_name}</div>
                <div>Email : {this.state.result.email}</div>
            </div>
          </div>
            </div>):(<img src={spin} alt="nothing" />)
        }
            <div className="buttons">
                {qtyButtons}
            </div>
        {/* {this.state.people.map(({id, first_name, last_name,email, avatar}) => (
          <div key={id}>
            <div className="avatar">
            <img src={avatar} alt="display image" /> 
            </div>
            <div className="info">
            First Name: {first_name}
            Last Name: {last_name}
            Email: {email}
            </div>
          </div>))
        } */}
      </div>);
  }
}
export default Home;
