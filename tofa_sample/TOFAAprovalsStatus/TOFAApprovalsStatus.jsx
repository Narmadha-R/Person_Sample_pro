import React from "react";
import { withStyles } from "material-ui";
import { Grid, InputLabel } from "material-ui";
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import Paper from 'material-ui/Paper';
import {
    RegularCard,
    Button,
    ItemGrid
} from "components";

import axios from 'axios';
import moment from 'moment';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 330,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: "80%",
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    selectStyle: {
        width: "100%",
    },
    menuItemStyle: {
        paddingTop: "4px",
        paddingBottom: "4px",
        fontSize: "14px" 
    },
    small:{
        fontSize:"14px !important",
        
    },
    bold:{
        fontWeight:"bold",
    },
    asTable:{
        "&:hover": {
            backgroundColor: "#F4F1F1"
        },
            borderBottom:"2px solid #EBEBEB",
            padding:"5px 0px 5px 0px",
    },
    search: {
        float: "right",
        marginLeft: "70px",
    },
    headingTable: {
        fontSize: "20px",
        margin: "30px 0px 0px 20px",
    },
    datePickerStyle:{
        margin:"0px 8px",
        minWidth:"80%",
    }
  
});

class TOFAApprovalsStatus extends React.Component {
    constructor(props) {
        super(props);
        //  var moment = require('moment');
        this.state = {
            startDate: '',
            endDate:'',
            team: '',
            Emp: '',
            reason: '',
            status: '',
            disable: true,
            displayTable: true,
            teamNames:[],
            Status: ["All", "Approved", "Rejected", "Submitted"],
            reasonList: [],
            employeeList:[],
            teamLeaveData:[],
            search:"",
        }
       
        

    }

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    };

    handleTeamChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value ,"disable": false});
         let axiosConfig = {
            headers: {
            'Content-Type':'application/json',
            "Access-Control-Allow-Origin":"*",
            }
            };
      
        axios.get(`http://10.143.128.42:8889/ACCTMGT_V3/employee/getEmployeeList?teamId=${event.target.value}`,axiosConfig).then(
        res=>{
            console.log(res.data);
            this.setState({employeeList:res.data});
        }    
        );

    };
    handleStatusChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    };
    handleReasonChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    };
    resetAction = event => {
       this.setState({ showTable: "false"});
       console.log(this.state.showTable);
    }

    handleStartDateChange = (date) => {
        this.setState({ startDate: date});
        //  console.log(moment(startDate).format('DD/MM/YYYY'));
        //  this.setState({startDate : moment(date).format('DD MM YYYY') });
        this.setState({ minDate: date});
     
    }

    handleEndDateChange =(date) =>{
        this.setState({ endDate: date});
        this.setState({ maxDate: date });
    }

    handleSearchChange = event=>{
    this.setState({[event.target.name]:event.target.value});
    let searchValue=event.target.value;
    console.log(searchValue.toLowerCase());
    
    // {this.state.teamLeaveData.map((e,key)=>{

    //     return this.setState({teamLeaveData:""})
    // })}
    let data=this.state.teamLeaveData;
    console.log(data);
    
    let filteredData= data.filter((searchValue,val)=>{
       if(val.reason===searchValue){
           return true;
       }
       return false;
    });
    console.log(filteredData);
    // this.setState({teamLeaveData:data.filter(search=>{return }));
    this.setState({teamLeaveData:filteredData});
    }

    componentDidMount() {
        let axiosConfig = {
            headers: {
            'Content-Type':'application/json',
            "Access-Control-Allow-Origin":"*",
            }
            };
        axios.get("http://10.143.128.42:8889/ACCTMGT_V3/employee/getTeamList?empId=117343",axiosConfig)
        .then(res => {
          console.log(res.data);
          this.setState({teamNames:res.data});
        });

        axios.get("http://10.143.128.42:8889/ACCTMGT_V3/swipeDataController/getReasonList",axiosConfig).then(
            res =>{
                console.log(res.data);
                this.setState({reasonList:res.data});
            }
        );
    }
    
    showTable = () => {
        let axiosConfig = {
            headers: {
            // 'Content-Type':'application/json',
            "Access-Control-Allow-Origin":"*",
            "Content-Type": "application/x-www-form-urlencoded",
            }
            };
        this.setState({ displayTable: false });
        // var moment = require('moment');
        console.log(this.state.team);
        // console.log(moment(this.state.startDate).format('DD/MM/YYYY'));

        // this.setState({startDate:moment(this.state.startDate).format('DD/MM/YYYY')});
        console.log(this.state.startDate);
        console.log(this.state.endDate);
        console.log(this.state.reason);
        console.log(this.state.status);

        axios.get(`http://10.143.128.42:8889/ACCTMGT_V3/swipeDataController/getTofaApprovalList?empId=${this.state.Emp}&endDate=${moment(this.state.endDate).format('DD/MM/YYYY')}&reason=${this.state.reason}&startDate=${moment(this.state.startDate).format('DD/MM/YYYY')}&status=${this.state.status}`,axiosConfig)
        .then(res => {
          console.log(res);
            this.setState({teamLeaveData:res.data});
            
        });
        console.log(this.state.teamNames);
    }
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={10}>
                        <RegularCard
                            content={
                                <div>
                                    <Grid container>
                                        <ItemGrid classes={{ grid: "TopMargin" }} xs={8} sm={6} md={6}>
                                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                               
                                                <DatePicker
                                                className={classes.datePickerStyle}
                                                keyboard
                                                autoOk
                                                showTodayButton={true}
                                                disableFuture={true}
                                                    label="Start Date"
                                                    format="DD/MM/YYYY"
                                                    value={this.state.startDate}
                                                    maxDate={this.state.maxDate}
                                                    placeholder="DD/MM/YYYY"
                                                    mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                                                    onChange={this.handleStartDateChange}
                                                />
                                           
                                            </MuiPickersUtilsProvider>
                                        </ItemGrid>
                                        <ItemGrid classes={{ grid: "TopMargin" }} xs={8} sm={6} md={6}>
                                            
                                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                                <DatePicker className={classes.datePickerStyle}
                                                keyboard
                                                autoOk
                                                showTodayButton={true}
                                                disableFuture={true}
                                                    label="End Date"
                                                    format="DD/MM/YYYY"
                                                    value={this.state.endDate}
                                                    minDate={this.state.minDate}
                                                    placeholder="DD/MM/YYYY"
                                                    mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                                                    onChange={this.handleEndDateChange}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </ItemGrid>
                                        <ItemGrid classes={{ grid: "SelectMargin" }} xs={8} sm={6} md={6}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="team">Team</InputLabel>
                                                <Select
                                                    value={this.state.team}
                                                    onChange={this.handleTeamChange}
                                                    inputProps={{
                                                        name: 'team',
                                                        id: 'team',
                                                    }}
                                                    className={classes.selectStyle}
                                                >
                                                <MenuItem className={classes.menuItemStyle} value="0">All</MenuItem>
                                                    {this.state.teamNames.map((e, key) => {
                                                        return <MenuItem className={classes.menuItemStyle} key={key} value={e.teamId}>{e.teamName}</MenuItem>
                                            
                                                    })}

                                                </Select>
                                            </FormControl>
                                        </ItemGrid>
                                        <ItemGrid classes={{ grid: "SelectMargin" }} xs={8} sm={6} md={6}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="Emp">Employees</InputLabel>
                                                <Select
                                                    value={this.state.Emp}
                                                    onChange={this.handleChange}
                                                    inputProps={{
                                                        name: 'Emp',
                                                        id: 'Emp',
                                                        
                                                    }}
                                                    className={classes.selectStyle}
                                                >
                                                <MenuItem className={classes.menuItemStyle} value="0">All</MenuItem>
                                                    {this.state.employeeList.map((e, key) => {
                                                        return <MenuItem className={classes.menuItemStyle} key={key} value={e.empId}>{e.empFirstName} {e.empLastName}</MenuItem>
                                                    })}


                                                </Select>
                                            </FormControl>
                                        </ItemGrid>
                                        <ItemGrid classes={{ grid: "SelectMargin" }} xs={8} sm={6} md={6}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="status">Status</InputLabel>
                                                <Select
                                                    value={this.state.status}
                                                    onChange={this.handleStatusChange}
                                                    inputProps={{
                                                        name: 'status',
                                                        id: 'status',
                                                    }}
                                                    className={classes.selectStyle}
                                                >
                                                    {this.state.Status.map((e, key) => {
                                                        return <MenuItem className={classes.menuItemStyle} key={key} value={e}>{e}</MenuItem>
                                                    })}

                                                </Select>
                                            </FormControl>
                                        </ItemGrid>
                                        <ItemGrid classes={{ grid: "SelectMargin" }} xs={8} sm={6} md={6}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="reason">Reason</InputLabel>
                                                <Select
                                                    value={this.state.reason}
                                                    onChange={this.handleReasonChange}
                                                    inputProps={{
                                                        name: 'reason',
                                                        id: 'reason',
                                                    }}
                                                    className={classes.selectStyle}
                                                >
                                                <MenuItem className={classes.menuItemStyle} value="All">All</MenuItem>
                                                    {this.state.reasonList.map((e, key) => {
                                                        return <MenuItem className={classes.menuItemStyle} key={key} value={e.constVal}>{e.constVal}</MenuItem>
                                                    })}

                                                </Select>
                                            </FormControl>
                                        </ItemGrid>


                                        <ItemGrid classes={{ grid: "TopMargin" }} xs={8} sm={6} md={11}>
                                            <Button classes={{ button: "rightButton showbtn" }} disabled={this.state.disable} onClick={this.showTable}  color="primary">Show</Button>
                                        </ItemGrid>

                                    </Grid>

                                </div>
                            }
                        />
                    </ItemGrid>

                </Grid>



                <Paper className={classes.paperTable} elevation={4} hidden={this.state.displayTable} >
                    <Grid container spacing={0}>

                        <Grid item md={9}>
                            <p className={classes.headingTable}>Team Leave Data </p>
                        </Grid>
                        <Grid item className={classes.search}  md={2}>
                            <TextField
                                label="Search"
                                margin="normal"
                                name="search"
                                value={this.state.search}
                                onChange={this.handleSearchChange}
                            />
                        </Grid>   
                        </Grid>
                       


                        <Grid container spacing={0} className={classes.small + " " + classes.asTable + " " + classes.bold}>
                        <ItemGrid classes={{grid:"idWidth x-gridPadding"}}>   
                        Employee ID   
                         </ItemGrid>
                          <ItemGrid classes={{grid:"x-gridPadding"}} md={3} >      
                          Employee Name
                              </ItemGrid>
                          <ItemGrid classes={{grid:"dateWidth x-gridPadding"}}>    	Date
                          </ItemGrid>
                          <ItemGrid classes={{grid:"reasonWidth x-gridPadding"}}>     	Reason
                          </ItemGrid>
                          <ItemGrid md={1} classes={{grid:"x-gridPadding"}} >      	Status
                          </ItemGrid>
                          <ItemGrid md={2} classes={{grid:"x-gridPadding"}} >      Reason Description
                          </ItemGrid>
                          <ItemGrid classes={{grid:"x-gridPadding"}} >      Rejection Reason
                          </ItemGrid>


                        </Grid>

                            {this.state.teamLeaveData.map((e,key)=>{
                                return (
                                <div>
                                <Grid container spacing={0} className={classes.small + " " + classes.asTable}>
                        <ItemGrid classes={{grid:"idWidth x-gridPadding"}}  >   
                       <span>{e.empId}</span>
                         </ItemGrid>
                          <ItemGrid  md={3} classes={{grid:"x-gridPadding"}} >      
                          <span> {e.empName} </span>
                              </ItemGrid>
                          <ItemGrid classes={{grid:"dateWidth x-gridPadding"}} > <span>{e.swipeDate}</span>
                          </ItemGrid>
                          <ItemGrid  classes={{grid:"reasonWidth x-gridPadding"}}>  <span>{e.reason}</span>
                          </ItemGrid>
                          <ItemGrid md={1} classes={{grid:"x-gridPadding"}} >   <span>{e.status}</span>
                          </ItemGrid>
                          <ItemGrid md={2} classes={{grid:"x-gridPadding"}} >  <span >{e.reasonDescription}</span>
                          </ItemGrid>
                          <ItemGrid classes={{grid:"reasonDescWidth x-gridPadding"}}>   <span> {e.rejectionReason}</span>
                          </ItemGrid>
                        </Grid>
                                </div>)
                            })}
                    
                  
                </Paper>
 

            </div>
        )
    };
}


TOFAApprovalsStatus.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TOFAApprovalsStatus);
