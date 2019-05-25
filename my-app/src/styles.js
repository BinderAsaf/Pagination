const App={
  marginBottom:'50px' , 
  textAlign:"center"
}

// showUsers Styles
const TableStyle={
    width: '60%',
    border: '3px solid #606875',
    borderCollapse: 'collapse',
    fontSize:'20px'
  }
const TableHeaderStyle={
    borderCollapse: 'collapse',
    color:'white',
    backgroundColor:'#333333',
    width: '33%'
  }
const TableRowStyle={
    borderCollapse: 'collapse',
    width: '33%',
    fontSize:'15px',
    border:'1px solid',
    textAlign:'left',
    padding:'5px'
  
  }
const NextButton={
    color: 'black',
    backgroundColor:'#ccc',
    textDecoration: 'none',
    display: 'inline-block',
    padding:'4px 8px',
    fontSize:'15px',
    marginRight:'5px',
    border:'0px',
    cursor: 'pointer',
    marginTop:'15px'
  
  }
const pageInput={
    width:'35px',
    height:'15px',
    fontSize:'15px',
    marginLeft:'15px',
    marginRight:'2px'
    
  }
const PageButton={
    backgroundColor: 'white',
    color: 'black',
    border:'2px solid #555555',
    fontSize:'15px',
    cursor: 'pointer',
    marginRight:'15px'
  }
const LabelStyle={
    marginRight:'5px',
    fontSize:'15px',
    marginLeft:'5px'
  }


// Header Styles
const SubHeaderStyle ={
    marginBottom:'0',
    marginTop:'5px',
    fontSize:'25px'
   
  }
const HeaderStyle={
      background:'#333',
      textAlign:'center',
      color:'#fff',
      padding: '15px'
  }
const H1Style={
    color:"white",
    marginTop:'0px',
    marginBottom:'10px',
    fontSize:'40px'
  }

  
// push notification styles
const divStyle={
  width:'100%',
  height:'100%',
  backgroundColor:'rgb(0,0,0,0.7)',
  position:'absolute',
  top:'0',
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
}
const modalContent={
  width:'50%',
  height:'50%',
  backgroundColor:'white',
  borderRadius:'4px',
  overflowY:'scroll',
  position:'relative'
}
const PopUpButton={
  cursor:'pointer',
  fontSize:'20px',
  fontWeight: 'bold',
  position: 'absolute',
  right:  '45%',
  bottom:  '5%'
}




// using this const to hold all styles
export const styles={
    App,
    TableStyle,
    TableHeaderStyle,
    TableRowStyle,
    NextButton,
    pageInput,
    PageButton,
    LabelStyle,
    SubHeaderStyle,
    HeaderStyle,
    H1Style,
    divStyle,
    modalContent,
    PopUpButton,
 
  }
  export default styles;