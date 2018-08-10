import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from "material-ui/Typography";
import { Grid, InputLabel } from "material-ui";
import Paper from 'material-ui/Paper';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import axios from 'axios';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CustomDialog from '../../components/dialog/CustomDialog';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import {
    ItemGrid,
    IconButton,
    Button,
    CustomInput
} from "components";
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { primaryColor, defaultFont } from "variables/styles";
import ListItemText from '@material-ui/core/ListItemText';
import moment from "moment";


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
    },
    tabsIndicator: {
        backgroundColor: '#1890ff',
    },
    tabRoot: {
        textTransform: 'initial',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing.unit * 1,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$tabSelected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    tabSelected: {},
    typography: {
        padding: theme.spacing.unit * 3,
    },
    formControl: {
        width: "100%",
        marginTop: "30px"
    },
    inkbar: {
        "&:after": {
            backgroundColor: primaryColor
        }
    },
    underline: {
        "&:before": {
            backgroundColor: "#D2D2D2",
            height: "1px !important"
        }
    },
    labelRoot: {
        ...defaultFont,
        color: "#AAAAAA",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "1.42857",
        width: "100%",
        height: "23px"

    },
    dialogContent: {
        color: "black",
        fontSize: "15px",
        width: "670px",
        padding: "10px 0px 5px 0px",
        fontWeight: "bold"


    },
    menuItemStyle: {
        paddingTop: "4px",
        paddingBottom: "4px",
        fontSize: "15px"
    },
    containerPadding: {
        padding: "0px 20px",
    },
    tableHead: {
        fontWeight: "700"
    },
    tableBody: {
        fontSize: "13px"
    },
    labelPadding: {
        padding: "15px 0px"
    },
    makeWhite: {
        color: "white",
        margin: "-5px"
    },
    tabPadding: {
        minWidth: "50px !important",

    },


    divPadding: {
        height: "50px",
        textAlign: "center",
        padding: "15px"
    },
    minHeight: {
        height: "60px"
    },
    whiteColor: {
        color: "white",
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        margin: "0px",


    },
    listStyle: {

        padding: "8px"



    },
    secondary: {
        fontSize: "12px !important",
        color: "black",
        textAlign: "center"


    },
    selectedList: {
        borderTop: "3px solid  #9c27b0 ",
        
    },
    makeSemiCircle: {
        borderRadius: "8px"
    }

});


const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    }
};




// const contractDetails = { "contractId": 258, "pwoNbr": "MWO 353", "contractType": "MWO", "projName": "gjkljkSdfadg", "status": "PROJECT_TEAM", "capability": "2", "cerNumber": "1234", "pcmName": "afsdgd", "totalFee": 1000.0, "otherExpense": 5.0, "totalHours": 50.0, "blendedRate": null, "oppID": "3756476589", "signatureCtrct": "Steve Jobs", "vmoContract": null, "capContract": "Udhay", "financialModel": "CAPTM", "projStartDate": "2018-07-08", "projEndDate": "2018-07-31", "dtCrtd": "2018-07-25", "dtSubmtd": null, "createdBy": "moules", "updatedBy": null, "parentContractId": null, "pricingId": "876907", "traceId": null, "contractWorkNotes": null, "contractAttachments": null, "rlsMapping": null }
class ViewContract extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            capability: '',
            contractType: '',
            ProjectName: '',
            CerNo: "",
            FinanceModel: "",
            OppId: "",
            pricingId: "",
            totFee: "",
            totExpenses: "",
            totHrs: "",
            blendedRate: "",
            pcmName: "",
            bbySign: "",
            pwoNbr: '',
            capabilityLead: "",
            startDate: "",
            endDate: "",
            traceId: '',
            contractTypeList: [],
            FinanceModelList: [],
            bbySignList: [],
            capabilityLeadList: [],
            capabilityList: [],
            contractsFiles: [],
            showUpload: false,
            constantsList: [],
            notesOpen: false,
            workNotes: "",
            contractDetails: "",
            updatedContract: "",
            count: 0,
            showNotes: false,
            updateBtn: false,
            contNotes: "",
            currentStatus: "",
            statusList: [
                { "id": "PROJECT_TEAM", "value": "Project Team" },
                { "id": "CCO_TEAM", "value": "CCO Team" },
                { "id": "WIPRO_FINANCE_LEGAL", "value": "Wipro Finance/Legal" },
                { "id": "BBY_TEAM", "value": "BBY PCM" },
                { "id": "BBY_VMO_TEAM", "value": "BBY VMO" },
                { "id": "WIPRO_SIGNATURE", "value": "Wipro Sign" },
                { "id": "active", "value": "BBY Sign" },
                { "id": "CANCELLED", "value": "Active" },
                { "id": "ON_HOLD", "value": "Cancelled" },
                { "id": "CLOSED", "value": "Closed" }],
            contractStatus:"",
            file:"",
            fileName:"",
            btnLabel:"",
            btnActionName:""
        }
    }

    handleStartDateChange = (date) => {
        this.setState({ startDate: date });
    }

    handleEndDateChange = (date) => {
        this.setState({ endDate: date });
    }

    componentDidMount() {


        var id = this.props.match.params.id;

        axios.get(`http://10.143.128.42:8889/ACCTMGT_V3/contract/viewContract?contractId=${id}`, axiosConfig).then(
            res => {
                var total = Number(res.data.totalFee) + Number(res.data.otherExpense);
                console.log(res.data.contractType);
                this.getContractCurrentStatus(res.data.status)

                this.setState({
                    contractDetails: res.data,
                    capability: Number(res.data.capability),
                    contractType: res.data.contractType,
                    ProjectName: res.data.projName,
                    OppId: res.data.cerNumber,
                    FinanceModel: res.data.financialModel,
                    OppId: res.data.oppID,
                    pricingId: res.data.pricingId,
                    traceId: res.data.contractId,
                    totFee: res.data.totalFee,
                    totExpenses: total,
                    othExpenses: res.data.otherExpense,
                    totHrs: res.data.totalHours,
                    blendedRate: res.data.blendedRate,
                    pcmName: res.data.pcmName,
                    bbySign: res.data.signatureCtrct,
                    capabilityLead: res.data.capContract,
                    startDate: res.data.projStartDate,
                    endDate: res.data.projEndDate,
                    workNotes: res.data.contractWorkNotes,
                    currentStatus: res.data.status


                })



            }
        );


        axios.get("http://10.143.128.42:8889/ACCTMGT_V3/employee/getTeamList?empId=117343", axiosConfig)
            .then(res => {

                this.setState({ capabilityList: res.data });

            });

       
            this.getListOfFiles(id);

      

        axios.get(`http://10.143.128.42:8889/ACCTMGT_V3/utility/getConstants?selectConstant=CONTRACT_TYPE`, axiosConfig).then(
            res => {
                console.log(res.data);
                this.setState({ contractTypeList: res.data });
            }
        );

        axios.get(`http://10.143.128.42:8889/ACCTMGT_V3/utility/getConstants?selectConstant=WIPRO_CAPABILITY_CONTACT`, axiosConfig).then(
            res => {
                console.log(res.data);
                this.setState({ capabilityLeadList: res.data });
            }
        );

        axios.get(`http://10.143.128.42:8889/ACCTMGT_V3/utility/getConstants?selectConstant=BBY_SIGNATURE_CONTACT`, axiosConfig).then(
            res => {
                console.log(res.data);
                this.setState({ bbySignList: res.data });
            }
        );

        axios.get(`http://10.143.128.42:8889/ACCTMGT_V3/utility/getConstants?selectConstant=FINANCIAL_MODEL`, axiosConfig).then(
            res => {
                console.log(res.data);
                this.setState({ FinanceModelList: res.data });
            }
        );






    }

    getContractCurrentStatus=(status)=>{
        axios.get(`http://10.143.128.42:8889/ACCTMGT_V3/utility/getConstants?selectConstant=${status}`, axiosConfig)
        .then(res => {
            console.log(res.data);
            this.setState({ constantsList: res.data });
        });
    }

    getListOfFiles(id){
        axios.get(`http://10.143.128.42:8889/ACCTMGT_V3/contract/getListOfFiles?contractId=${id}`, axiosConfig)
        .then(res => {
            console.log(res.data);
            this.setState({ contractsFiles: res.data });
        });
    }




    handleBbySignChange = event => {
        this.setState({ [event.target.name]: event.target.value, count: this.state.count + 1 });


    }

    handlecapabilityLeadChange = event => {
        this.setState({ [event.target.name]: event.target.value, count: this.state.count + 1 });


    }

    handlePcmNameChange = (event) => {
        //  alert(0);
        this.setState({ [event.target.name]: event.target.value });

    }

    handlecontractTypeChange = event => {
        this.setState({ [event.target.name]: event.target.value, count: this.state.count + 1 });


    }


    handleOppIdChange = event => {
        this.setState({ [event.target.name]: event.target.value, count: this.state.count + 1 });
    }

    handleFinanceModelChange = event => {
        this.setState({ [event.target.name]: event.target.value, count: this.state.count + 1 });


    }

    handleProjectNameChange = event => {
        // alert(event.target.value);
        this.setState({ [event.target.name]: event.target.value, count: this.state.count + 1 });

    }

    handlecapabilityChange = event => {
        this.setState({ [event.target.name]: event.target.value, count: this.state.count + 1 });

    }
    handleCerNoChange = event => {
        this.setState({ [event.target.name]: event.target.value, count: this.state.count + 1 });

    }
    handletraceIdChange = event => {
        this.setState({ [event.target.name]: event.target.value, count: this.state.count + 1 });

    }
    handlepricingIdChange = event => {
        this.setState({ [event.target.name]: event.target.value, count: this.state.count + 1 });

    }

    handletotFeeChange = event => {
        this.setState({ [event.target.name]: parseFloat(event.target.value), totExpenses: (parseFloat(event.target.value) + this.state.othExpenses), blendedRate: (this.state.totExpenses / event.target.value).toFixed(2), count: this.state.count + 1 });
    }
    handleOthExpensesChange = event => {
        this.setState({ [event.target.name]: parseFloat(event.target.value), totExpenses: (parseFloat(event.target.value) + this.state.totFee), blendedRate: (this.state.totExpenses / event.target.value).toFixed(2), count: this.state.count + 1 });
    }


    handletotExpensesChange = event => {
        this.setState({ [event.target.name]: event.target.value, count: this.state.count + 1 });

    }
    handletotHrsChange = event => {
        this.setState({ [event.target.name]: event.target.value, blendedRate: (this.state.totExpenses / event.target.value).toFixed(2), count: this.state.count + 1 });

    }

    handleblendedRateChange = event => {
        this.setState({ [event.target.name]: event.target.value, count: this.state.count + 1 });

    }


    handleTabChange = (event, value) => {
        this.setState({ value });
    };


    handleAddContract = (event) => {
        this.setState({ showUpload: true })
    }

    handleAddNotes = (e) => {
        this.setState({
            showNotes: true
        })
    }

    handlecontractStatusChange=(e)=>{
        this.setState({ [e.target.name]: e.target.value})
    }


    handleWorkNotes = (event) => {

        this.setState({ notesOpen: true })

        axios.get(`http://10.143.128.42:8889/ACCTMGT_V3/contract/getWorkNotes?contractId=${this.state.contractDetails.contractId}`, axiosConfig).then(
            res => {
                console.log(res.data);
                this.setState({ workNotes: res.data });
            }
        );
    }

    updateContractNotes = (e) => {
        this.setState({
            count: 0,
            notesOpen: true,
            showNotes: true,
            updateBtn: true
        })

    }


    handleContractNotes = (event) => {
        this.setState({ [event.target.name]: event.target.value });

    }

    uploadContractFilesNotes=(e)=>{
        this.setState({
            notesOpen:true,
            showNotes:true
        })
    }

    uploadContractFiles=(event)=>{

        let notes=[{pwoWorkNotes:this.state.contNotes}]    

        var formData = new FormData();
        formData.append("uploadFile", this.state.file);       
        formData.append("userId", "moules");
        formData.append("contractId", this.state.contractDetails.contractId);
        formData.append("docType", "CONTRACT_DOC");
        formData.append("fileType", "DOCX");
        formData.append("pwoWorkNotes", this.state.contNotes);



        axios({
            method: 'post',
            url: 'http://10.143.128.42:8889/ACCTMGT_V3/contract/uploadContractFiles',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data',
                'Accept-Encoding': 'gzip, deflate'
            },
            data: formData
        })
            .then(res => {
                //handle success
               
                this.setState({
                     notesOpen: false,
                    showNotes: false
                });
                 this.getListOfFiles(this.state.contractDetails.contractId);
            });

       
    }

    updateContract = (event) => {

        var data = {
            "contractId": this.state.contractId,
            "pwoNbr": this.state.contractDetails.pwoNbr,
            "contractId": this.state.contractDetails.contractId,
            "contractType": this.state.contractType,
            "projName": this.state.ProjectName,
            "status": this.state.contractDetails.status,
            "capability": Number(this.state.capability),
            "cerNumber": this.state.CerNo,
            "pcmName": this.state.contractDetails.pcmName,
            "totalFee": this.state.totFee,
            "otherExpense": this.state.othExpenses,
            "totalHours": this.state.totalHours,
            "blendedRate": this.state.blendedRate,
            "oppID": this.state.OppId,
            "signatureCtrct": this.state.bbySign,
            "vmoContract": this.state.contractDetails.vmoContract,
            "capContract": this.state.capabilityLead,
            "financialModel": this.state.FinanceModel,
            "projStartDate": this.state.startDate,
            "projEndDate": this.state.endDate,
            "dtCrtd": this.state.contractDetails.dtCrtd,
            "dtSubmtd": this.state.contractDetails.dtSubmtd,
            "createdBy": this.state.contractDetails.createdBy,
            "updatedBy": "moules",
            "parentContractId": this.state.contractDetails.parentContractId,
            "pricingId": this.state.contractDetails.pricingId,
            "traceId": this.state.traceId,
            "contractWorkNotes": [{ "pwoWorkNotes": this.state.contNotes }],
            "contractAttachments": null,
            "rlsMapping": this.state.contractDetails.rlsMapping
        }

        axios({
            method: 'post',
            url: 'http://10.143.128.42:8889/ACCTMGT_V3/contract/updateContract',
            data: data,
            headers: {
                'Access-Control-Allow-Origin': '*',
                //   'Content-Type':'application/x-www-form-urlencoded',
                // 'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT'
            },
        })
            .then(res => {
                this.setState({
                    updatedContract: res.data,
                    notesOpen: false,
                    showNotes: false,


                })



            });
    }

    handleStatusChangeNotes = (e) => {
        this.setState({ notesOpen: true,showNotes:true,updateBtn:false })        

    }

    handleUploadFile(e) {
       
            this.setState({              
                file: e.target.files[0],
                fileName: e.target.files[0].name
            });  
    }


    updateContractStatus=(e)=>{

        var data=this.state.contractDetails;
        var notes="* Status Changed From "+data.status+" To "+this.state.contractStatus+" * "+this.state.contNotes;
        data.status=this.state.contractStatus;
        data.contractWorkNotes=[{pwoWorkNotes:notes}]      
        axios({
            method: 'post',
            url: 'http://10.143.128.42:8889/ACCTMGT_V3/contract/updateContractStatus',
            data: data,
            headers: {
                'Access-Control-Allow-Origin': '*',
                //   'Content-Type':'application/x-www-form-urlencoded',
                // 'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT'
            },
        })
            .then(res => {

                this.setState({
                    contractDetails: res.data,
                    notesOpen: false,
                    showNotes: false,
                    
                    currentStatus:this.state.contractStatus
                })
                this.getContractCurrentStatus(this.state.contractStatus);


            });

    }

    render() {
        const { classes } = this.props;
        console.log(this.state.capability)


        return (
            <div>

                <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                        <Grid className={classes.minHeight} container>
                            <ItemGrid xs={12} sm={12} md={11}>
                                <Typography variant="display1">{this.state.contractDetails.pwoNbr}</Typography>
                            </ItemGrid>
                            <ItemGrid xs={12} sm={12} md={1}>
                                <IconButton classes={{ button: "menuButton" }} color="primary" onClick={(e) => { this.handleWorkNotes(e) }}><MenuIcon className={classes.whiteColor} /></IconButton>
                            </ItemGrid>

                        </Grid>
                        <CustomDialog open={this.state.notesOpen} handleClose={() => this.setState({ notesOpen: false, showNotes: false })} title="Work Notes">
                            {!this.state.showNotes ? (<Grid container spacing={0} className={classes.dialogContent}>
                                <ItemGrid md={12}>
                                    <Grid container>
                                        <ItemGrid md={3}>
                                            <Typography variant="headline">Notes
                                             </Typography>
                                        </ItemGrid>
                                        <ItemGrid md={1}>
                                            <IconButton color="primary" classes={{ button: "addnotes-btn" }} onClick={(e) => { this.handleAddNotes(e) }} aria-label="add">
                                                <AddIcon className={classes.makeWhite} />
                                            </IconButton>
                                        </ItemGrid>
                                    </Grid>
                                </ItemGrid>
                                <ItemGrid md={12}>


                                    {this.state.workNotes && this.state.workNotes.map((obj, key) => {
                                        return (
                                            <div>
                                                <div className="notes-container">
                                                    <Typography variant="body1" >{obj.createdBy} - {moment(obj.createdOn).format('DD/MM/YYYY - hh:mm:ss:a')}</Typography>
                                                    <Typography variant="body1" >{obj.pwoWorkNotes} </Typography>
                                                </div>

                                                <Divider />
                                            </div>
                                        )

                                    })}

                                </ItemGrid>
                            </Grid>) : (
                                    <Grid className={classes.dialogContent} container>
                                        <ItemGrid sm={12}>
                                            <TextField
                                                fullWidth
                                                id="multiline-static"
                                                label="Notes"
                                                multiline
                                                value={this.state.contNotes}
                                                onChange={(e) => { this.handleContractNotes(e) }}
                                                rows="4"
                                                name="contNotes"
                                                margin="normal" />
                                        </ItemGrid>
                                        <Grid container>
                                            <ItemGrid md={8}>
                                                {!this.state.updateBtn && <Button color="primary" onClick={(e) => { this.updateContract(e) }}> Done </Button>}
                                                {this.state.file && <Button color="primary" onClick={(e) => { this.uploadContractFiles(e) }}> Upload File </Button>}
                                                
                                            </ItemGrid>
                                            <ItemGrid md={4}> {this.state.updateBtn && <Button color="primary" onClick={(e) => { this.updateContract(e) }}> Submit </Button>}
                                            {this.state.contractStatus!=="" && <Button color="primary" onClick={(e) => { this.updateContractStatus(e) }}> Change status </Button>}
                                            </ItemGrid>
                                        </Grid>



                                    </Grid>)}







                        </CustomDialog>
                    </ItemGrid>

                    <ItemGrid xs={12} sm={12} md={12}>

                        <Paper >

                            <List className={classes.flexContainer + " " + classes.makeSemiCircle}>
                                {this.state.statusList.map((obj, key) => {
                                    return <ListItem className={classes.listStyle + " " + `${(this.state.currentStatus.toLowerCase() === obj.id.toLowerCase()) ? classes.selectedList : ""}`}>
                                        <ListItemText primary={<Typography type="body2" className={classes.secondary} >
                                            {obj.value}
                                        </Typography>} />
                                    </ListItem>
                                })}
                                {/* <ListItem className={classes.listStyle}>
                                    CCO Team
                                        </ListItem>
                                <ListItem className={classes.listStyle}>
                                    Wipro Finance/Legal
                                        </ListItem>
                                <ListItem className={classes.listStyle}>
                                    BBY PCM
                                        </ListItem>
                                <ListItem className={classes.listStyle}>
                                    BBY VMO
                                </ListItem>
                                <ListItem className={classes.listStyle}>
                                    Wipro Sign
                                        </ListItem>
                                <ListItem className={classes.listStyle}>
                                    BBY Sign
                                        </ListItem>
                                <ListItem className={classes.listStyle}>
                                    Active
                                        </ListItem>
                                <ListItem className={classes.listStyle}>
                                    Cancelled
                                        </ListItem>
                                <ListItem className={classes.listStyle}>
                                    On Hold
                                        </ListItem>
                                <ListItem className={classes.listStyle}>
                                    Closed
                                        </ListItem> */}
                            </List>



                            {/* <ItemGrid classes={{ grid: "itemPadding" }} xs={12} sm={12} md={1}><Typography className={classes.textStyle} >Project Team</Typography>
                                </ItemGrid>
                                <ItemGrid classes={{ grid: "itemPadding" }} xs={12} sm={12} md={1}> <Typography className={classes.textStyle} >CCO Team</Typography>
                                </ItemGrid>
                                <ItemGrid classes={{ grid: "itemPadding" }} xs={12} sm={12} md={1}><Typography className={classes.textStyle} >Wipro Finance</Typography>
                                </ItemGrid>
                                <ItemGrid classes={{ grid: "itemPadding" }} xs={12} sm={12} md={1}>  <Typography className={classes.textStyle} >Wipro Legal</Typography>
                                </ItemGrid>
                                <ItemGrid classes={{ grid: "itemPadding" }} xs={12} sm={12} md={1}>  <Typography className={classes.textStyle} >BBY VMO</Typography>
                                </ItemGrid>
                                <ItemGrid classes={{ grid: "itemPadding" }} xs={12} sm={12} md={1}> <Typography className={classes.textStyle} >BBY Legal</Typography>
                                </ItemGrid>

                                <ItemGrid classes={{ grid: "itemPadding" }} xs={12} sm={12} md={1}> <Typography className={classes.textStyle} >Wipro Sign</Typography>
                                </ItemGrid>
                                <ItemGrid classes={{ grid: "itemPadding" }} xs={12} sm={12} md={1}><Typography className={classes.textStyle} >BBY Sign</Typography>
                                </ItemGrid>
                                <ItemGrid classes={{ grid: "itemPadding" }} xs={12} sm={12} md={1}><Typography className={classes.textStyle} >Completed</Typography>
                                </ItemGrid>

                                <ItemGrid classes={{ grid: "itemPadding" }} xs={12} sm={12} md={1}><Typography className={classes.textStyle} >Project Team</Typography>
                                </ItemGrid>
                                <ItemGrid classes={{ grid: "itemPadding" }} xs={12} sm={12} md={1}><Typography className={classes.textStyle} >Project Team</Typography>
                                </ItemGrid> */}

                        </Paper>


                    </ItemGrid>


                    <ItemGrid xs={12} sm={12} md={12}>
                        <Paper>
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleTabChange}

                                textColor="primary"
                                classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}

                            >
                                <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Contact Info" />
                                <Tab disabled={this.state.count>0} classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Documents" />
                                <Tab disabled={this.state.count>0} classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Summary" />
                            </Tabs>

                            {this.state.value === 0 && <div>
                                <Grid className={classes.containerPadding} container>


                                    <ItemGrid xs={4} sm={4} md={3}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="Capability" className={classes.labelRoot}>Capability <span className="red-color">*</span> </InputLabel>
                                            <Select
                                                className={classes.inkbar + " " + classes.underline}
                                                value={this.state.capability}
                                                onChange={this.handlecapabilityChange}
                                                disabled={true}
                                                inputProps={{
                                                    name: 'capability',
                                                    id: 'capability',

                                                }}
                                            >
                                                <MenuItem value="" className={classes.menuItemStyle}>
                                                    Select
                                                                        </MenuItem>
                                                {this.state.capabilityList.map((e, key) => {
                                                    return <MenuItem className={classes.menuItemStyle} key={key} value={e.teamId}>{e.teamName}</MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>
                                    </ItemGrid>

                                    <ItemGrid xs={4} sm={4} md={2}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="contract type" className={classes.labelRoot}>Contract Type <span className="red-color">*</span></InputLabel>
                                            <Select
                                                className={classes.inkbar + " " + classes.underline}
                                                label="asdfas"
                                                value={this.state.contractType}
                                                onChange={this.handlecontractTypeChange}
                                                disabled={true}
                                                name='contractType'
                                                inputProps={{
                                                    id: 'contractType'
                                                }}
                                            >
                                                <MenuItem value="" className={classes.menuItemStyle}>
                                                    Select
                                                                    </MenuItem>
                                                {this.state.contractTypeList.map((e, key) => {
                                                    return <MenuItem className={classes.menuItemStyle} key={key} value={e.constVal}>{e.constKey}</MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>
                                    </ItemGrid>

                                    <ItemGrid xs={4} sm={4} md={5}>
                                        <CustomInput
                                            labelProps={{
                                                required: true
                                            }}
                                            labelText="Project Name"
                                            name="ProjectName"
                                            id="ProjectName"
                                            value={this.state.ProjectName}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            onChange={(e) => this.handleProjectNameChange(e)}


                                        />
                                    </ItemGrid>

                                    <ItemGrid xs={4} sm={4} md={1}>
                                        <CustomInput
                                            labelText="CER NO"
                                            name="CerNo"
                                            id="CerNo"
                                            value={this.state.CerNo}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            onChange={this.handleCerNoChange}
                                        />
                                    </ItemGrid>
                                </Grid>

                                <Grid className={classes.containerPadding} container>

                                    <ItemGrid xs={4} sm={4} md={3}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="FinanceModel" className={classes.labelRoot}>Finance Model <span className="red-color">*</span> </InputLabel>
                                            <Select
                                                className={classes.inkbar + " " + classes.underline}
                                                value={this.state.FinanceModel}
                                                onChange={this.handleFinanceModelChange}
                                                name='FinanceModel'
                                                inputProps={{
                                                    id: 'FinanceModel'

                                                }}
                                            >
                                                <MenuItem value="" className={classes.menuItemStyle}>
                                                    Select
                                                            </MenuItem>
                                                {this.state.FinanceModelList.map((e, key) => {
                                                    return <MenuItem className={classes.menuItemStyle} key={key} value={e.constKey}>{e.constVal}</MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>
                                    </ItemGrid>

                                    <ItemGrid xs={4} sm={4} md={3}>
                                        <CustomInput
                                            labelText="Oppurtunity ID"
                                            name="OppId"
                                            id="OppId"
                                            value={this.state.OppId}
                                            onChange={this.handleOppIdChange}
                                            formControlProps={{
                                                fullWidth: true,

                                            }}

                                        />
                                    </ItemGrid>

                                    <ItemGrid xs={4} sm={4} md={3}>
                                        <CustomInput
                                            labelText="Trace ID"
                                            name="traceId"
                                            id="traceId"
                                            value={this.state.traceId}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            onChange={this.handletraceIdChange}
                                        />
                                    </ItemGrid>
                                    <ItemGrid xs={4} sm={4} md={3}>
                                        <CustomInput
                                            labelText="Pricing ID"
                                            name="pricingId"
                                            id="pricingId"
                                            value={this.state.pricingId}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            onChange={this.handlepricingIdChange}
                                        />
                                    </ItemGrid>

                                </Grid>

                                <Grid className={classes.containerPadding} container>
                                    <ItemGrid xs={4} sm={4} md={2}>
                                        <CustomInput
                                            labelText="Fee"
                                            type="number"
                                            name="totFee"
                                            id="totFee"
                                            value={this.state.totFee}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            onChange={this.handletotFeeChange}
                                            //   required={true}    
                                            // error={true}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    $
                      </InputAdornment>
                                            }
                                        />
                                    </ItemGrid>

                                    <ItemGrid xs={4} sm={4} md={3}>

                                        <CustomInput
                                            labelProps={{
                                                required: true
                                            }}
                                            labelText="Other Expenses"
                                            name="othExpenses"
                                            id="othExpenses"
                                            value={String(this.state.othExpenses)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            onChange={(e) => this.handleOthExpensesChange(e)}

                                            endAdornment={
                                                <InputAdornment position="end">
                                                    $
                      </InputAdornment>
                                            }
                                        />
                                    </ItemGrid>
                                    <ItemGrid xs={4} sm={4} md={3}>
                                        <CustomInput
                                            labelText="Total Expenses"
                                            type="number"
                                            name="totExpenses"
                                            id="totExpenses"
                                            value={this.state.totExpenses}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            disabled={true}
                                            onChange={this.handletotExpensesChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    $
                      </InputAdornment>
                                            }
                                        />
                                    </ItemGrid>

                                    <ItemGrid xs={4} sm={4} md={2}>
                                        <CustomInput
                                            labelText="Total Hours"

                                            type="number"
                                            name="totHrs"
                                            id="totHrs"
                                            value={this.state.totHrs}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            onChange={this.handletotHrsChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    Hrs
                      </InputAdornment>
                                            }
                                        />
                                    </ItemGrid>



                                    <ItemGrid xs={4} sm={4} md={2}>
                                        <CustomInput
                                            labelText="Blended Rate"
                                            type="number"
                                            name="blendedRate"
                                            id="blendedRate"
                                            value={this.state.blendedRate}
                                            disabled={true}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            onChange={this.handleblendedRateChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    $
                      </InputAdornment>
                                            }
                                        />
                                    </ItemGrid>

                                </Grid>


                                <Grid container className={classes.containerPadding}>
                                    <ItemGrid xs={4} sm={4} md={3}>
                                        <CustomInput
                                            labelText="PCM Name"
                                            name="pcmName"
                                            id="pcmName"
                                            value={this.state.pcmName}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            onChange={this.handlePcmNameChange}
                                            inputProps={{
                                                'aria-label': 'Weight',
                                            }}
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        />
                                    </ItemGrid>

                                    <ItemGrid xs={4} sm={4} md={3}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="bbySign" className={classes.labelRoot}>BBY Signature <span className="red-color">*</span> </InputLabel>
                                            <Select
                                                className={classes.inkbar + " " + classes.underline}
                                                value={this.state.bbySign}
                                                onChange={this.handleBbySignChange}
                                                name='bbySign'
                                                inputProps={{
                                                    id: 'bbySign'
                                                }}

                                            >
                                                <MenuItem value="" className={classes.menuItemStyle}>
                                                    Select
                                               </MenuItem>
                                                {this.state.bbySignList.map((e, key) => {
                                                    return <MenuItem className={classes.menuItemStyle} key={key} value={e.constVal}>{e.constKey}</MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>
                                    </ItemGrid>
                                    <ItemGrid xs={4} sm={4} md={3} >
                                        <CustomInput
                                            labelText="Wipro Capability Lead"
                                            name='capabilityLead'
                                            id='capabilityLead'
                                            value={this.state.capabilityLead}
                                            onChange={this.handlecapabilityLeadChange}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </ItemGrid>

                                </Grid>

                                <Grid container className={classes.containerPadding}>

                                    <ItemGrid classes={{ grid: "gridStyle" }} xs={12} sm={12} md={3}>
                                        <MuiPickersUtilsProvider utils={MomentUtils}>

                                            <DatePicker
                                                className={classes.datePickerStyle}
                                                keyboard
                                                showTodayButton
                                                label="Start Date"
                                                format="DD/MM/YYYY"
                                                value={this.state.startDate}
                                                maxDate={this.state.endDate}
                                                placeholder="DD/MM/YYYY"
                                                mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                                                onChange={this.handleStartDateChange}
                                            />

                                        </MuiPickersUtilsProvider>
                                    </ItemGrid>
                                    <ItemGrid classes={{ grid: "gridStyle" }} xs={12} sm={12} md={3}>
                                        <MuiPickersUtilsProvider utils={MomentUtils}>
                                            <DatePicker className={classes.datePickerStyle}
                                                keyboard
                                                showTodayButton={true}
                                                label="End Date"
                                                format="DD/MM/YYYY"
                                                value={this.state.endDate}
                                                minDate={this.state.startDate}
                                                placeholder="DD/MM/YYYY"
                                                mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                                                onChange={this.handleEndDateChange}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </ItemGrid>
                                </Grid>

                                <Grid className={classes.containerPadding} container>
                                    <ItemGrid xs={12} sm={12} md={6}>
                                        <Button color="primary" disabled={this.state.count === 0} onClick={(e) => { this.updateContractNotes(e) }} >Update Details</Button>
                                    </ItemGrid>

                                </Grid>

                            </div>}

                            {this.state.value === 1 &&
                                <Grid className={classes.containerPadding} container>
                                    {(!this.state.showUpload) && <ItemGrid xs={12} sm={12} md={12}><br />
                                        <IconButton color="primary" onClick={(e) => { this.handleAddContract(e) }} classes={{ button: "addBtnStyle" }} aria-label="add">
                                            <AddIcon className={classes.makeWhite} />
                                        </IconButton>
                                    </ItemGrid>}
                                    {(this.state.showUpload) &&
                                        <ItemGrid xs={12} sm={12} md={12}>
                                            <Grid container className={classes.topMargin}>
                                                <ItemGrid xs={12} sm={12} md={12}>
                                                    <Typography className={classes.tableHead + " " + classes.labelPadding} >Contract XSL</Typography>
                                                    <input
                                                        onChange={(e) => { this.handleUploadFile(e) }}
                                                        id="name"
                                                        type="file"
                                                        margin="normal"
                                                    />
                                                </ItemGrid>

                                            </Grid>
                                            <Grid container className={classes.topMargin}>
                                                <ItemGrid xs={12} sm={12} md={10}>
                                                    <Button color="primary" >Reset</Button>
                                                </ItemGrid>
                                                <ItemGrid xs={12} sm={12} md={2}>
                                                    <Button color="primary" onClick={(e)=>this.uploadContractFilesNotes(e)}>Upload Files</Button>
                                                </ItemGrid>
                                            </Grid>
                                        </ItemGrid>
                                    }
                                    {this.state.contractsFiles.length!==0 && <Grid container>
                                    <ItemGrid xs={12} sm={12} md={12}>
                                        <Typography className={classes.tableHead} >Contract Files</Typography>
                                    </ItemGrid>

                                        <ItemGrid xs={12} sm={12} md={12}>

                                            <Grid container>
                                                <ItemGrid xs={12} sm={12} md={1}>
                                                    <Typography className={classes.tableBody} variant="body2">S.No</Typography>
                                                </ItemGrid>
                                                <ItemGrid xs={12} sm={12} md={3}>
                                                    <Typography className={classes.tableBody} variant="body2">Document Types</Typography>
                                                </ItemGrid>
                                                <ItemGrid xs={12} sm={12} md={6}>
                                                    <Typography className={classes.tableBody} variant="body2">Files</Typography>
                                                </ItemGrid>
                                            </Grid>


                                            {this.state.contractsFiles.map((obj, key) => {
                                                return (<Grid container key={key}>
                                                    <ItemGrid classes={{ grid: "tableSpacing" }} xs={12} sm={12} md={1}>
                                                        <Typography className={classes.tableBody} variant="body1">{key}</Typography>
                                                    </ItemGrid>
                                                    <ItemGrid classes={{ grid: "tableSpacing" }} xs={12} sm={12} md={3}>
                                                        <Typography className={classes.tableBody} variant="body1">{obj.attachmentType}</Typography>
                                                    </ItemGrid>
                                                    <ItemGrid classes={{ grid: "tableSpacing" }} xs={12} sm={12} md={6}>
                                                        <Typography className={classes.tableBody} variant="body1">{obj.attachmentFileName}</Typography>
                                                    </ItemGrid>
                                                </Grid>)
                                            })}
                                        </ItemGrid>
                                        </Grid>
                                        }
                                         {!this.state.showUpload && <ItemGrid classes={{ grid: "center" }} xs={12} sm={12} md={12}><Typography>No files uploaded yet</Typography></ItemGrid>}
                                </Grid>
                            }
                            {this.state.value === 2 && <div>
                                <Grid item xs={12} sm={12} md={3} container className={classes.containerPadding}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="Capability" className={classes.labelRoot}>Move To</InputLabel>
                                        <Select
                                            className={classes.inkbar + " " + classes.underline}
                                            value={this.state.contractStatus}
                                            onChange={this.handlecontractStatusChange}
                                            inputProps={{
                                                name: 'contractStatus',
                                                id: 'contractStatus'
                                            }}
                                        >
                                            <MenuItem value="" className={classes.menuItemStyle}>
                                                Select
                                                </MenuItem>
                                            {this.state.constantsList.map((e, key) => {
                                                return <MenuItem className={classes.menuItemStyle} key={key} value={e.constVal}>{e.constVal}</MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>


                                    <Button color="primary" onClick={(e) => { this.handleStatusChangeNotes(e) }}>Proceed</Button>

                                </Grid>
                            </div>}
                        </Paper>

                    </ItemGrid>

                </Grid>





            </div>
        )
    }
}

export default withStyles(styles)(ViewContract);