import React from 'react';

import { Grid } from "material-ui";

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Checkbox from '@material-ui/core/Checkbox';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
    RegularCard,
    Button,
    ItemGrid,
    IconButton,
    CustomInput
} from "components";
import axios from 'axios';
const styles = {

    menuItemStyle: {
        paddingTop: "4px",
        paddingBottom: "4px",
        fontSize: "15px"
    },
    fullWidth: {
        width: "25%",
        margin: "10px",
    },
    spanmargin: {
        marginRight: "10px",
    }, 
    Col_Heading: {
        fontSize: "13px",
    },
    grid_border: {
        "&:hover": {
            backgroundColor: "#F4F1F1"
        },
        borderTop: "1px solid #F4F1F1",
        padding: "5px 0px",
        marginBottom: "5px",
    },
    checkboxMargin: {
        margin: "-10px 0px;",

    },
    whiteColor: {
        color: "white",
    },
    // marginRight:{
    //     marginRight:"10px",
    // }

};

class ApprovalList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reason: 'All',
            approve: true,
            reject: true,
            reasons: ['All', 'Leave', 'Worked on weekend', 'Forgot ID Card', 'Access data issue', 'Tailgating', 'Worked outside odc', 'non-billable', 'Training'],
            checkAll: false,
            listArr: new Array(this.props.approveList.length).fill(false),
            allChecked: false,
            checkedList: [],
            toEmpty: [],
            filteredData: [],
            multipleSelect:[],
            openAlertDialog: false,
            postData: "",
            open: false,
            rejectReason:"",
            rejectID:""
        };
    }
    componentWillUpdate(nextProps, nextState) {     
        console.log("did mount");
        if (nextProps.approveList !== this.props.approveList) {            
            this.setState({ filteredData:nextProps.approveList });
        }
      }
    componentDidMount() {
        // alert("yes");
        this.setState({ filteredData: this.props.approveList });
        console.log("did mount");
      

    }

    handleRejectReason =(event) =>{
        this.setState({ [event.target.name]: event.target.value });
    }

    handleReason = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        let filterValue = event.target.value;
        let data = this.props.approveList;
      
        let filteredData = data.filter((val) => {
            if (filterValue === 'All') {
                return true
            }

            else if (filterValue === val.reason) {
                return true;
            }

            return false;
        });
        //   console.log(filteredData);
        this.setState({ filteredData: filteredData });
    }

    handleCheckbox(index) {
        // this.setState({ [name]: event.target.checked });
        let ctrl = this.state.listArr;
        ctrl[index] = !ctrl[index];
        this.setState({
            listArr: ctrl
        })
        if(this.state.listArr){
            this.setState({checkAll : false})
        }

    };
    
      commonChecked=()=>{
           
           
           const check = this.state.checkAll; 
           
          if(this.state.checkAll){
           this.setState({checkAll: !this.state.checkAll,listArr:this.state.listArr.fill(false)});
           this.state.filteredData.map((value, key) => {
           let newAdjList1 = {field : value.adjustMentSeq}
            this.state.multipleSelect.splice(newAdjList1, 1);
           })
           console.log("length of multipleselect inside commoncheck pop" +this.state.multipleSelect.length);
           console.log("length of multipleselect inside commoncheck pop" +this.state.multipleSelect);
            }
           else{
           
           this.setState({checkAll: !this.state.checkAll,listArr:this.state.listArr.fill(true)});
           this.state.filteredData.map((value, key) => {
           let newAdjList1 = {field : value.adjustMentSeq}
           this.state.multipleSelect.push(newAdjList1);
           })
           console.log("length of multipleselect inside commoncheck push" +this.state.multipleSelect.length);
             console.log("length of multipleselect inside commoncheck push" +this.state.multipleSelect);
            }
           
           const newlistArr = this.state.listArr;
           console.log("mynewarr" + !newlistArr);
        //    this.setState({listArr : !newlistArr}, function () {
        //         console.log(this.state.newlistArr);
        //      })
           
       }

       handleChange(index,value) {
         let newAdjlist = { "field": value.adjustMentSeq };
        console.log(value.adjustMentSeq);
        let ctrl = this.state.listArr;
        ctrl[index] = !ctrl[index];
        this.setState({
            listArr: ctrl
        })
        if(this.state.listArr[index]){
        console.log("push");
       
        this.state.multipleSelect.push(newAdjlist);
        console.log(this.state.multipleSelect);
        }
        else{
            var indexValue = this.state.multipleSelect.indexOf(newAdjlist);
            console.log("pop");
          this.state.multipleSelect.splice(indexValue, 1); 
        
        }
        console.log("=========to length array========"+this.state.multipleSelect.length);
       console.log("=========to length array========"+this.state.multipleSelect);

    };


    approvePendingStatus = id => {
        
        let adjlist = [{ "field": id }];
        axios({
            method: 'post',
            url: 'http://10.143.128.42:8889/ACCTMGT_V3/swipeDataController/adjustmentApprove',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT',
                "Content-Type": "application/json",
            },
            data: { "adjSeq": id, "adjustmentList": adjlist }
        }).then(res => {
            console.log(res);
          this.props.listApprovalsData();     
        });


    }

    rejectPendingStatus = id => {

        this.setState({
            open: true,
            rejectID:id

        })    

    }
    approveEvent = (e) =>{
          this.state.multipleSelect.map((value, key) => {
            axios({
            method: 'post',
            url: 'http://10.143.128.42:8889/ACCTMGT_V3/swipeDataController/adjustmentApprove',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT',
                "Content-Type": "application/json",
            },
            data: { "adjSeq": value.field, "adjustmentList": this.state.multipleSelect }
        }).then(res => {
            console.log(res);
            this.setState({listArr:this.state.listArr.fill(false)})
            this.props.listApprovalsData(); 
           
        });

        
          })
          
         this.setState({multipleSelect : this.state.toEmpty})
    }
    rejectEvent = (e) => {
        
        this.state.multipleSelect.map((value, key) => {
            
           let adjlist = [{ "field": value.field, "reason": "Group Reject" }];
        
                axios({
                    method: 'post',
                    url: 'http://10.143.128.42:8889/ACCTMGT_V3/swipeDataController/adjustmentReject',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT',
                        "Content-Type": "application/json",
                    },
                    data: { "adjSeq": this.state.rejectID, "adjustmentList": adjlist }
                }).then(res => {
                     this.setState({listArr:this.state.listArr.fill(false)})
                     this.props.listApprovalsData();             
                    
        
                });    
         
        })
         this.setState({multipleSelect : this.state.toEmpty})
                    
        }

  

    handleClose = () => {
        this.setState({ open: false });
        let adjlist = [{ "field": this.state.rejectID, "reason": "Group Reject" }];
        
                axios({
                    method: 'post',
                    url: 'http://10.143.128.42:8889/ACCTMGT_V3/swipeDataController/adjustmentReject',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT',
                        "Content-Type": "application/json",
                    },
                    data: { "adjSeq": this.state.rejectID, "adjustmentList": adjlist }
                }).then(res => {
                     this.setState({listArr:this.state.listArr.fill(false)})
                    this.props.listApprovalsData();             
                  
                    
        
                });
    };
    

   

    render() {
        const { classes } = this.props;

     
        return (
            <div>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                        <RegularCard
                            content={
                                <div>
                                    <Grid container>
                                        <ItemGrid xs={6} sm={6} md={12} classes={{ grid: "BottomMargin" }}>
                                            <span className={classes.spanmargin}>Approval List</span>

                                            <Button onClick={(e) => this.approveEvent(e)} color="primary" disabled={this.state.multipleSelect.length<=1} className={{ button: "buttonMargin" }}>Approve Selected</Button>
                                            <Button onClick={(e) => this.rejectEvent(e)} color="primary" disabled={this.state.multipleSelect.length<=1} className={{ button: "buttonMargin" }}>Reject Selected</Button>
                                            <Select
                                                value={this.state.reason}
                                                onChange={this.handleReason}
                                                inputProps={{
                                                    name: 'reason',
                                                    id: 'reason',
                                                }}
                                                className={classes.fullWidth}
                                            >

                                                {this.state.reasons.map((e, key) => {
                                                    return <MenuItem className={classes.menuItemStyle} key={key} value={e}>{e}</MenuItem>
                                                })}

                                            </Select>
                                        </ItemGrid>
                                        <Grid container className={classes.grid_border}>
                                            <ItemGrid>
                                                <Checkbox
                                                    checked={this.state.checkAll}
                                                    onChange={(event) => this.commonChecked()}
                                                    value="checkAll"
                                                    color="secondary"
                                                    className={classes.checkboxMargin}
                                                />
                                            </ItemGrid>
                                            <ItemGrid classes={{ grid: "Date_width" }}>
                                                <b className={classes.Col_Heading}>Date</b>
                                            </ItemGrid>
                                            <ItemGrid classes={{ grid: "resource_width" }}>
                                                <b className={classes.Col_Heading}>Resourse </b>
                                            </ItemGrid>
                                            <ItemGrid xs={1} sm={1} md={1}>
                                                <b className={classes.Col_Heading}>SwipedHrs</b>
                                            </ItemGrid>
                                            <ItemGrid xs={1} sm={1} md={1}>
                                                <b className={classes.Col_Heading}>AjustHrs</b>
                                            </ItemGrid>
                                            <ItemGrid classes={{ grid: "reason_width" }}>
                                                <b className={classes.Col_Heading}>Reason  </b>
                                            </ItemGrid>
                                            <ItemGrid xs={1} sm={1} md={1}>
                                                <b className={classes.Col_Heading}>Status  </b>
                                            </ItemGrid>
                                            <ItemGrid classes={{ grid: "remarks_width" }}>
                                                <b className={classes.Col_Heading}>Remarks</b>
                                            </ItemGrid>
                                            <ItemGrid xs={1} sm={1} md={1}>
                                                <b className={classes.Col_Heading}>Attachment</b>
                                            </ItemGrid>
                                            <ItemGrid xs={1} sm={1} md={1}>
                                                <b className={classes.Col_Heading}>Action</b>
                                            </ItemGrid>
                                        </Grid>

                                        {this.state && this.state.filteredData.length > 0 && this.state.filteredData.map((value, key) => {
                                            return (
                                                <Grid container key={key} className={classes.grid_border}>
                                                    <ItemGrid>
                                                        <Checkbox
                                                            checked={this.state.listArr[key]}
                                                             onChange={(event) => this.handleChange(key,value)}
                                                            value="checkAll"
                                                            color="secondary"
                                                            className={classes.checkboxMargin}
                                                        />
                                                    </ItemGrid>
                                                    <ItemGrid classes={{ grid: "Date_width" }}>
                                                        <span className={classes.Col_Heading}>{value.swipeDataLog.swipeDate}</span>
                                                    </ItemGrid>
                                                    <ItemGrid classes={{ grid: "resource_width" }}>
                                                        <span className={classes.Col_Heading}>{value.swipeDataLog.employee.empFirstName} {value.swipeDataLog.employee.empLastName}</span>
                                                    </ItemGrid>
                                                    <ItemGrid xs={1} sm={1} md={1}>
                                                        <span className={classes.Col_Heading}>{value.swipeDataLog.swipeAvgHrs}</span>
                                                    </ItemGrid>
                                                    <ItemGrid xs={1} sm={1} md={1}>
                                                        <span className={classes.Col_Heading}>{value.adjustMentHours}</span>
                                                    </ItemGrid>
                                                    <ItemGrid classes={{ grid: "reason_width" }}>
                                                        <span className={classes.Col_Heading}>{value.reason}</span>
                                                    </ItemGrid>
                                                    <ItemGrid xs={1} sm={1} md={1}>
                                                        <span className={classes.Col_Heading}>{value.status}</span>
                                                    </ItemGrid>
                                                    <ItemGrid classes={{ grid: "remarks_width" }}>
                                                        <span className={classes.Col_Heading}>{value.reasonDescription}</span>
                                                    </ItemGrid>
                                                    {/* <ItemGrid xs={1} sm={1} md={1}>
                                                <span className={classes.Col_Heading}></span>
                                            </ItemGrid> */}
                                                    <ItemGrid xs={1} sm={1} md={2}>
                                                        <span className={classes.Col_Heading}></span>
                                                        <IconButton onClick={(event) => this.approvePendingStatus(value.adjustMentSeq)} classes={{ button: "iconBtnStyle" }} color="success" aria-label="Done" className={classes.button}>
                                                            <DoneIcon className={classes.whiteColor} />
                                                        </IconButton>
                                                        <IconButton onClick={(event) => this.rejectPendingStatus(value.adjustMentSeq)} classes={{ button: "iconBtnStyle" }}  color="danger" aria-label="Done" className={classes.button}>
                                                            <CloseIcon className={classes.whiteColor} />
                                                        </IconButton>
                                                    </ItemGrid>
                                                </Grid>
                                            )

                                        })
                                        }
                                    </Grid>


                                </div>
                            }
                        />


                    </ItemGrid>

                </Grid>
         
                <Dialog
                   fullWidth={true}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Enter the reason for Rejection"}</DialogTitle>
                    <DialogContent>
                        <CustomInput
                            classes={{formControl:"inputStyle"}}                       
                            name="rejectReason"
                            value={this.state.rejectReason}
                            labelText="Reason"
                            formControlProps={{
                                fullWidth: true
                            }}
                            onChange={this.handleRejectReason}
                        />

                    </DialogContent>
                    <DialogActions>                   

                        <Button  classes={{button:"inputStyle"}}     onClick={this.handleClose} color="primary">
                            Submit
                      </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


ApprovalList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApprovalList);