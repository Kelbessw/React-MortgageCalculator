import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here
  constructor(props) {
    super(props);
    
    this.state = {
      term: '15',
      payment: ''
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: parseFloat(e.target.value) //finding the name value for each
    });
  }

  handleSubmit(e) {

    ////////// CALCULATE FORMULA ///////////
      
    var M; //monthly mortgage payment
    var P = this.state.balance; //principle / initial amount borrowed
    var I = this.state.rate / 100 / 12; //monthly interest rate
    var N = this.state.term * 12; //number of payments months
    
    //monthly mortgage payment
    M = monthlyPayment(P, N, I);
    
    console.log(M);
    
    function monthlyPayment(p, n, i) {
      return p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    }

    M = M.toFixed(2);

    this.setState({
      payment: M
     
    })

}





  render() {
    return (
      <div className='container'>

          <div className="page-header">
            <h1>Mortgage Calculator</h1>
          </div>
          
          <div className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="col-sm-2 control-label">Loan Balance</label>
              <div className="col-sm-10">
                <input 
                  className="form-control" 
                  name="balance" 
                  type="number" 
                  onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label">Interest Rate (%)</label>
              <div className="col-sm-10">
                <input className="form-control"
                  name="rate"  
                  type="number" 
                  step="0.01" 
                  onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label">Loan Term</label>
              <div className="col-sm-10">
              <select name='term' onChange={this.handleChange} >
                <option value='15'>15</option>
                <option value='30'>30</option>
              </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10"><br />
                <button className="btn btn-default"
                  name="submit" 
                  type="submit" 
                  onClick={this.handleSubmit}>Calculate</button>
              </div>
            </div>
          </div>
          <div id='output' className="col-sm-offset-2 col-sm-10">
            {this.state.payment}
          </div>

          

      </div>
    );
  }
}
