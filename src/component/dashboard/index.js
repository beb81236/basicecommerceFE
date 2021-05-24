import React,{useEffect,useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import store from '../../store';
import {HandleGetUserDetails,HandleInitiatePayment} from '../../action';
import  {connect} from 'react-redux'
// import Title from './Title';



let rows = [];



const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const  Index = ({user,payments,error_message,success_message}) =>{
  const classes = useStyles();
  const [amount, setAmount] = useState(0)

  useEffect(()=>{
    store.dispatch(HandleGetUserDetails())
  },[])

  const submitForm=(e)=>{
    e.preventDefault();

    let data = {amount};

    store.dispatch(HandleInitiatePayment(data))
  }

useEffect(()=>{
rows= payments
},[payments])


  return (
    <React.Fragment>
      <p>{user ? user.email : null}</p>
      <input  onChange={(e)=>setAmount(e.target.value)} type="number" />
      <button onClick={e=>submitForm(e)} >Button</button>
      {/* <Title>Recent Orders</Title> */}
      <Table size="small">
        <TableHead>
          <TableRow>
            {/* <TableCell>Date</TableCell> */}
            <TableCell>id</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Payment Type</TableCell>
            <TableCell align="right">Satus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.payment_info.id}>
              <TableCell>{row.payment_info.id}</TableCell>
              <TableCell>{row.payment_info.amount}</TableCell>
              <TableCell>{row.payment_info.payment_type}</TableCell>
              
              <TableCell align="right">{row.payment_info.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
            {error_message && error_message.type === 'initiate-payment-fail' ? error_message.info : null}


            {success_message && success_message.type === 'inititate-payment-success' ? window.location.replace(success_message.info) : null}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps =({data:{user,payments,error_message,success_message}})=>({
  payments,user,success_message,error_message
})

export default  connect(mapStateToProps, null)(Index);