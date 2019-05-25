import React, { Component } from 'react'
import {styles} from '../styles';

export class PushNotify extends Component {

    loadTableItems=()=>{
        var Items = this.props.NewUsers.map(item =>(
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
        <div  style={styles.divStyle}>
            <div style={styles.modalContent}>
                <h1 >New Push notification!</h1>
                <h3  >These records have been added right now</h3>
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
                <h4  >Note: After closing this window all new records can be seen on the last page</h4>
                <bottun style={styles.PopUpButton}  onClick={this.props.close}>Cancle</bottun>
            </div>
        </div>
    )}  
}

export default PushNotify

