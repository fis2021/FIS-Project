import { AppBar, fade, IconButton, InputBase, Link, makeStyles, Menu, Toolbar, Tooltip } from '@material-ui/core'
import React, { KeyboardEventHandler, useContext, useState } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Typography } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { urls, useRouting } from '../routing/routes';
import { headers } from '../services/config';
import SearchIcon from '@material-ui/icons/Search';
import { SearchContext } from '../contexts/searchContext';

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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
}))


export const NavBar = () => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const classes = useStyles();

    const { routeTo } = useRouting();
    const [,setSearchWord] = useContext(SearchContext);
    const [searchText, setSearchText] = useState<string>("");

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("isAdmin");
        headers.Authorization = "";
        routeTo(urls.loginPage)
    }

    const handleKeyPress = (e: any) => {
        if(e.keyCode === 13){
            routeTo(urls.contentPage);
            setSearchWord(searchText);
        }
    }


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
            <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        onKeyUp={handleKeyPress}
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        onChange={ (e) => setSearchText(e.target.value)}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
            <Tooltip title="My Profile" style={{ color: 'white' }}>
                <IconButton onClick={handleClick} aria-controls="profile-dropwdown" edge="end">
                    <AccountCircleIcon className={classes.menuButton}>
                    </AccountCircleIcon>
                </IconButton>
            </Tooltip>
            <Menu
                id="profile-dropdown"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <Typography>Favorites</Typography>
                </MenuItem>
                {localStorage.getItem("isAdmin") === "false" ? null!
                    : < MenuItem onClick={() => routeTo(urls.adminPanel)}>
                        <Typography>Admin Panel</Typography>
                    </MenuItem>}
                <MenuItem onClick={handleLogOut}>
                    <Typography>Log Out</Typography>
                </MenuItem>
            </Menu>
        </Toolbar>
    </AppBar >
}