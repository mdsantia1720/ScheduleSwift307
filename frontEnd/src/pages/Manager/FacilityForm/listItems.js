import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BallotIcon from "@mui/icons-material/Ballot";
import BentoIcon from "@mui/icons-material/Bento";
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logo from '../Logo.png';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <BallotIcon />
            </ListItemIcon>
            <ListItemText primary="Reservations" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <DateRangeIcon />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <BentoIcon />
            </ListItemIcon>
            <ListItemText primary="Update Notes" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="My Account" />
        </ListItemButton><ListItemButton>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Create Accounts" />
        </ListItemButton>
    </React.Fragment>
);
