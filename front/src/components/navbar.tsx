import { AppBar, IconButton, Link, makeStyles, Menu, Toolbar, Tooltip } from '@material-ui/core'
import React, { useState } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Typography } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { urls, useRouting } from '../routing/routes';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        color: 'white',
        fontSize: 50,
    },
    title: {
        color: 'white',
    },
    menuLogo: {
        color: 'white',
        fontSize: 40,
        marginRight: '5px'
    },
}))


export const NavBar = () => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const classes = useStyles();

    const { routeTo } = useRouting();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return <AppBar position="fixed">
        <Toolbar>
            <Link href="/app/content">
                    <IconButton edge="start">
                        <MenuBookIcon className={classes.menuLogo}>
                        </MenuBookIcon>
                        <Typography variant="h6" className={classes.title}>
                            Book Club
                </Typography>
                    </IconButton>
            </Link>
            <div style={{ flexGrow: 1 }}>
            </div>
            <Tooltip title="My Profile" style={{color: 'white'}}>
            <IconButton onClick={handleClick} aria-controls="profile-dropwdown" edge="end">
                <AccountCircleIcon className={classes.menuButton}>
                </AccountCircleIcon>
            </IconButton>
            </Tooltip>
           
        </Toolbar>
    </AppBar>
}