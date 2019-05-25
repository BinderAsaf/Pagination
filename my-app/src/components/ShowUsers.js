import React, { Component } from 'react'
import axios from 'axios';
import {styles} from '../styles';


export class ShowUsers extends Component {
  constructor(props)
  {
      super(props);
      this.state={users:[],NumOfPages:0,PerPage:20,PageNumber:1,signal:props.signal}
      this.setUsers();
  }
  
  //Aplly the GET from the server
  setUsers= ()=>
  {
      //check that input contain only digits
      if(! (/^\d+$/.test(this.state.PageNumber)))
      {
        alert('Invalid page number');
        return;
      }
      // GET using axios
      axios.get('/getUsers',{params:{PageNum:this.state.PageNumber , PerPage:this.state.PerPage}})
      .then(res =>{
        // if an error detected on server
        if(res.data.error)
        {
          alert(res.data.msg);
        }
        // otherwise , the data sent. setting the state with new params
        else{
          var users = res.data.data;
          this.setState(
            { users,
              NumOfPages:res.data.numOfPages,
              PerPage:this.state.PerPage,
              PageNumber:this.state.PageNumber
            })
        }
      })
      .catch(err=> console.log('error GET users'));
  }
  // change value of html elemnts and connect then to the state
  ChangeVal=(e)=>{
      this.setState({[ e.target.name] : e.target.value});
  }
  // onClick event : ask for another page from the server
  GoToPage = ()=>{
    this.setUsers();
  }
  // onClick event: inc or dec a page. setting the state and ask for next/prev page from the server
  incOrDec = (op)=>{
    const page = parseInt(this.state.PageNumber,10);
    //case next been clicked
    if(op === 'next' && page+1 <= this.state.NumOfPages){
      this.setState( {PageNumber:page+1} ,()=>
      {
        this.setUsers();
      });
    }  
    // case prev been clicked
    else if(op === 'prev' && page-1 > 0) {
      this.setState( {PageNumber:page-1} ,()=>
      {
        this.setUsers();
      });
    }
    window.scrollTo(0, 0)  
  }
  //aplly changes after push notification
  componentWillReceiveProps({signal}) {
    
    this.setState({users:[],NumOfPages:0,PerPage:20,PageNumber:1,signal},()=>{
      this.setUsers();
    })
  }
  //changing the amount of records to load on each page
  ChangePePage=(event)=>
  {
      //in case nothing selected - defualt:20
      if(event.target.value === 'select')
        this.setState({PerPage: 20 , PageNumber:1} , ()=> this.setUsers());
      //otherwise the value the user picked from list
      else
        this.setState({PerPage: event.target.value , PageNumber:1} , ()=> this.setUsers());
  }
  // load table elemnts using the loaded state
  loadTableItems=()=>{
    var Items = this.state.users.map(item =>(
      <tr>
        <td  style={styles.TableRowStyle}>{item.name}</td>
        <td  style={styles.TableRowStyle}>{item.position}</td>
        <td  style={styles.TableRowStyle}>{item.monthlySlary}</td>
      </tr>
    ));
    return Items;
  }

  render() {
    
    return (
      <div >
        <div style={{ padding:'10px',marginTop:'15px'}}>
          <input  style={styles.pageInput} type='text'   name='PageNumber' value={this.state.PageNumber} onChange={this.ChangeVal}></input>
          <label  style={styles.LabelStyle} >/{this.state.NumOfPages} </label>
          <button style={styles.PageButton} onClick={this.GoToPage} >Go</button>
          <button style={styles.NextButton} onClick={()=> this.incOrDec('prev')}>&#8249; Prev</button>
          <button style={styles.NextButton} onClick={()=> this.incOrDec('next')}>next &#8250;</button>
          <label  style={styles.LabelStyle}>Records Per page:</label>
          <select style={{fontSize:'15px'}}  value={this.state.PerPage}  onChange={this.ChangePePage} >
            <option value="select">select</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
        </select>
        </div>
        
        <div >
          <table align='center' style={styles.TableStyle}>
            <tr>
              <th style={styles.TableHeaderStyle}>Name</th>
              <th style={styles.TableHeaderStyle}>Position</th>
              <th style={styles.TableHeaderStyle}>Salary</th>
            </tr>
            {this.loadTableItems()}
          </table>
        </div>
        <div>
          <button style={styles.NextButton} onClick={()=> this.incOrDec('prev')}>&#8249; Prev</button>
          <button style={styles.NextButton} onClick={()=> this.incOrDec('next')}>next &#8250;</button>
        </div>
      </div>
    )
  }
}

export default ShowUsers

