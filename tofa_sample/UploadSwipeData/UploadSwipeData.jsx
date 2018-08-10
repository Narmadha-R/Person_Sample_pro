import React from "react";
import { withStyles } from "material-ui/styles";
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails
} from "material-ui/ExpansionPanel";
import Typography from "material-ui/Typography";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import { primaryColor } from "variables/styles";
import { Grid } from 'material-ui/';

import Divider from 'material-ui/Divider';
import moment from 'moment';
import CustomAlertDialog from '../../components/dialog/CustomAlertDialog';

import {
    Button,
    ItemGrid,
    RegularCard,
    CustomInput
} from "components";

import axios from 'axios';

const styles = theme => ({

    headingPanel: {
        backgroundColor: primaryColor,
        height: "48px !important",
        minHeight: "48px !important",
    },
    heading: {
        color: "white",
        fontSize: "18px",
        fontFamily: "sans-serif",
        fontWeight: "300"
    },
    iconStyle: {
        color: "white",
        float: "right"
    },
    topMargin: {
        marginTop: "15px"
    },
    tableHeading: {
        color: primaryColor,
        fontWeight: "bold"
    },
    top: {
        top: "-25px",
        zIndex: "4"
    },
    marginTopStyle: {
        marginTop: "30px"
    },
    infoText: {
        color: "white",
        padding: "4px"

    },
    makeBold: {
        fontWeight: "550"
    },
    textPadding: {
        padding: "2px"
    }
});

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    }
};

class UploadSwipeData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hisEvent: false,
            file: "",
            showDiv: false,
            data: [],
            uploadDateTime: "",
            unProcessedUpload: "",
            openAlertDialog: false,
            postData: "",
            disable: true,
            searchField: ""
        }
    }



    handleUploadHistory(e) {



        this.setState({
            hisEvent: true
        })
        axios.get("http://10.143.128.42:8889/ACCTMGT_V3/swipeDataController/getSwipeDataUploadHistory", axiosConfig).then(
            res => {

                this.setState({ data: res.data });
            }
        );

    }


    handleSearch = event => {

        this.setState({ [event.target.name]: event.target.value });

        var searchResults = this.state.data.filter(function (text) {
            console.log(text);
            return text.uploadTime.includes(event.target.value) || text.uploadRemarks.includes(event.target.value) || text.uploadStatus.includes(event.target.value) || text.uploadBy.includes(event.target.value);
        });

        this.setState({
            data: searchResults
        })
    }

    handleUploadFile(e) {
        var re = /(\.xlsx)$/i;
        if (!re.exec(e.target.files[0].name)) {
            this.setState({
                openAlertDialog: true,
                postData: "Please choose the file of format .xlxs",
                disable: true,
            })
        }
        else {
            this.setState({
                disable: false,
                file: e.target.files[0],
                fileName: e.target.files[0].name
            });

        }
        console.log(e.target.files);





    }
    getPendingSwipeUploadProcess() {


        axios.get("http://10.143.128.42:8889/ACCTMGT_V3/swipeDataController/getPendingSwipeUploadProcess", axiosConfig).then(
            res => {

                console.log("unProcessedUpload")
                console.log(res.data);
                this.setState({ unProcessedUpload: res.data })

            }
        );




    }
    handleUpload(e) {
        this.setState({ showDiv: true });
        this.setState({ uploadDate: "test" });


        var todayDateTime = moment().format('DD/MM/YYYY HH:mm:ss');
        this.setState({ uploadDateTime: todayDateTime })
        // alert(todayDateTime);
        // var uploadTime = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()+" "+date.getHours()+":"+date.getMinutes() + ":" + date.getSeconds()
        let data = new FormData();
        data.append('uploadFile', this.state.file);
        data.append('filename', this.state.fileName);
        data.append('userName', "moules");
        data.append('format', "New");
        axios({
            method: 'post',
            url: 'http://10.143.128.42:8889/ACCTMGT_V3/swipeDataController/uploadSwipeData',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data',
                'Accept-Encoding': 'gzip, deflate'
            },
            data: data
        })
            .then(res => {
                //handle success

                this.getPendingSwipeUploadProcess();
            });
    }

    render() {
        const { classes } = this.props;
        var opts = {};

        return (
            <div>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={8}>
                        {(this.state.showDiv) && <RegularCard classes={{ card: "successDiv" }}
                            content={
                                <div >
                                    <Typography className={classes.infoText + " " + classes.makeBold} variant="subheading" >TOFA data upload request submitted successfully</Typography>
                                    <Typography className={classes.infoText} variant="body2" >Data processing in progress </Typography>
                                </div>
                            } />}

                        <ExpansionPanel defaultExpanded={true}>
                            <ExpansionPanelSummary className={classes.headingPanel} expandIcon={<ExpandMoreIcon className={classes.iconStyle} />} >
                                <Typography className={classes.heading}>Upload ODC Access Time Sheet</Typography>
                            </ExpansionPanelSummary>
                            {(!this.state.showDiv) && <ExpansionPanelDetails>

                                {/* <Grid>
                                        <FormControl component="fieldset" required className={classes.formControl}>
                                            <FormLabel component="legend">Gender</FormLabel>
                                            <RadioGroup
                                                aria-label="gender"
                                                name="gender1"
                                                className={classes.group}
                                                value={this.state.value}
                                                onChange={this.handleChange}
                                            >
                                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                                                <FormControlLabel
                                                    value="disabled"
                                                    disabled
                                                    control={<Radio />}
                                                    label="(Disabled option)"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid> */}

                                <Grid container className={classes.topMargin}>
                                    <ItemGrid xs={12} sm={12} md={12}>
                                        <input
                                            onChange={(e) => { this.handleUploadFile(e) }}
                                            id="name"
                                            type="file"
                                            margin="normal"
                                        />
                                    </ItemGrid>

                                    <ItemGrid >
                                        <Button disabled={this.state.disable} color="primary" onClick={(e) => { this.handleUpload(e) }}>upload</Button>
                                    </ItemGrid>
                                    <ItemGrid xs={12} sm={12} md={7}>
                                        <Button color="primary" onClick={(e) => { this.handleUploadHistory(e) }}>upload history</Button>
                                    </ItemGrid>
                                </Grid>

                            </ExpansionPanelDetails>}
                            {(this.state.showDiv) && <ExpansionPanelDetails>

                                <Grid container className={classes.topMargin}>
                                    <ItemGrid xs={12} sm={12} md={12}>
                                        <Typography className={classes.textPadding}>Upload Alredy in Progress</Typography>
                                        <Typography className={classes.textPadding}>Initiated By: {this.state.unProcessedUpload.uploadBy}</Typography>
                                        <Typography className={classes.textPadding}>Initiated Time : {this.state.unProcessedUpload.uploadTime}</Typography>
                                    </ItemGrid>
                                    <ItemGrid xs={12} sm={12} md={7}>
                                        <Button color="primary" onClick={(e) => { this.handleUploadHistory(e) }}>upload history</Button>
                                    </ItemGrid>
                                </Grid>

                            </ExpansionPanelDetails>}
                        </ExpansionPanel>
                    </ItemGrid>
                    {this.state.hisEvent &&
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                content={
                                    <div>
                                        <Grid container >
                                            <ItemGrid xs={12} sm={12} md={9} >
                                                <Typography className={classes.topMargin} variant="title">Swipe Upload Data History</Typography></ItemGrid>
                                            <ItemGrid xs={12} sm={12} md={3}>
                                                <CustomInput
                                                    formControlProps={{
                                                        className: classes.top,
                                                        fullWidth: true
                                                    }}
                                                    name="searchField"
                                                    value={this.state.searchField}
                                                    onChange={this.handleSearch}
                                                    inputProps={{

                                                        placeholder: "Search"
                                                    }}
                                                />
                                            </ItemGrid>
                                            <Grid container >
                                                <ItemGrid xs={12} sm={12} md={2} >
                                                    <Typography className={classes.tableHeading}>Upload Time</Typography>
                                                </ItemGrid>
                                                <ItemGrid xs={12} sm={12} md={6} >
                                                    <Typography className={classes.tableHeading}>Remarks</Typography>
                                                </ItemGrid>
                                                <ItemGrid xs={12} sm={12} md={2} >
                                                    <Typography className={classes.tableHeading}>Status</Typography>
                                                </ItemGrid>
                                                <ItemGrid xs={12} sm={12} md={2} >
                                                    <Typography className={classes.tableHeading}>Upload By</Typography>
                                                </ItemGrid>
                                            </Grid>
                                            {this.state.data.map((obj, key) => (
                                                <Grid container key={key} className={classes.marginTopStyle} >
                                                    <ItemGrid xs={12} sm={12} md={2} >
                                                        <Typography>{obj.uploadTime}</Typography>
                                                    </ItemGrid>
                                                    <ItemGrid xs={12} sm={12} md={6} >
                                                        <Typography>{obj.uploadRemarks}</Typography>
                                                    </ItemGrid>
                                                    <ItemGrid xs={12} sm={12} md={2} >
                                                        <Typography>{obj.uploadStatus}</Typography>
                                                    </ItemGrid>
                                                    <ItemGrid xs={12} sm={12} md={2} >
                                                        <Typography>{obj.uploadBy}</Typography>
                                                    </ItemGrid>
                                                </Grid>
                                            ))}
                                            <Divider />
                                        </Grid>
                                    </div>
                                } />
                        </ItemGrid>
                    }
                </Grid>
                <CustomAlertDialog openAlert={this.state.openAlertDialog} handleClose={() => this.setState({ openAlertDialog: false })} alertTitle={this.state.postData}> </CustomAlertDialog>
            </div>
        )
    };
}

export default withStyles(styles)(UploadSwipeData);