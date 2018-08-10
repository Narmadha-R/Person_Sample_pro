import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
    ExpansionPanelDetails,
    ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { primaryColor } from 'variables/styles';
import { Grid, InputLabel } from "material-ui";
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import ApprovalList from './ApprovalList.jsx';
import {
    ItemGrid,
    Button
} from "components";
import axios from 'axios';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        color: "white",
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    panelsummary: {
        backgroundColor: primaryColor,
        height: "48px !important",
        minHeight: "48px !important",
    },
    selectStyle: {
        width: "300px",
    },
    formControl: {
        margin: theme.spacing.unit,
        width: "80%",
    },
    iconStyle: {
        color: "white",
    },
    menuItemStyle: {
        paddingTop: "4px",
        paddingBottom: "4px",
        fontSize: "15px",
    },
});

class TOFAApprovals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamdata: [],
            team: '',
            disable: true,
            openList: false,
            approveList: [],
            isLoading: true

        };
    }

    componentDidMount() {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.get("http://10.143.128.42:8889/ACCTMGT_V3/employee/getTeamList?empId=117343", axiosConfig)
            .then(res => {
                console.log(res.data);
                this.setState({ teamdata: res.data });
            });
    }

    handleTeamChange = event => {
        event.preventDefault();

        this.setState({ [event.target.name]: event.target.value, "disable": false });
    };


    listApprovalsData = event => {
        this.setState({ openList: true });
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.get(`http://10.143.128.42:8889/ACCTMGT_V3/swipeDataController/getPendingApprovals?empId=117343&teamId=${this.state.team}`, axiosConfig)
            .then(res => {
                console.log(res.data);
                this.setState({ approveList: res.data, isLoading: false });
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <ExpansionPanel defaultExpanded={true}>
                    <ExpansionPanelSummary className={classes.panelsummary} expandIcon={<ExpandMoreIcon className={classes.iconStyle} />}>
                        <div className={classes.column}>
                            <Typography className={classes.heading}>Filter</Typography>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.details}>
                        <div>
                            <Grid container>
                                <ItemGrid classes={{ grid: "SelectMargin" }}>
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
                                            {this.state.teamdata.map((e, key) => {
                                                return <MenuItem className={classes.menuItemStyle} key={key} value={e.teamId}>{e.teamName}</MenuItem>
                                            })}

                                        </Select>
                                    </FormControl>
                                </ItemGrid>
                                <ItemGrid classes={{ grid: "TopMargin" }}>
                                    <Button onClick={this.listApprovalsData} color="primary" disabled={this.state.disable}>List Approvals</Button>
                                </ItemGrid>
                            </Grid>


                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                {this.state.openList ?
                    !this.state.isLoading && <ApprovalList team={this.state.team} listApprovalsData={this.listApprovalsData}approveList={this.state.approveList}></ApprovalList>
                    : ''
                }
            </div>
        )
    };
}


TOFAApprovals.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TOFAApprovals);