import React, { useEffect, useState } from 'react';
import { LOGIN_SUCCESS } from '../Redux/auth/constants';
import axios from 'axios';
import PropTypes from 'prop-types';
import AllArticles from '../Components/AllArticels';
import { ReactComponent as MakorLogo } from '../Assets/makorLogo.svg';
import * as articlesAction from '../Redux/articleSlice/articleSlice';
import * as authAction from '../Redux/auth/action';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Box, Grid, makeStyles, Tab, Tabs, Typography, withStyles } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Subscribers from './Subscribers';
import { FilledButton } from '../Styles/mainStyles';
import { Redirect } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const Research = () => {
  const dispatch = useDispatch();
  const [tabs, setTabs] = useState([
    { name: 'Articles', component: <AllArticles /> },
    { name: 'Subscribers', component: <Subscribers /> },
  ]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleLogout = () => {
    dispatch(authAction.logout());
  };

  useEffect(() => {
    dispatch(articlesAction.getAllArticlesAsync());
    dispatch(articlesAction.getAllSubsAsync());
  }, []);

  useEffect(() => {
    let token = localStorage.getItem('token');

    if (token !== null) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      dispatch({ type: LOGIN_SUCCESS, payload: { token: localStorage.getItem('token') } });

      return <Redirect to="/research" />;
    } else {
      return;
    }
  }, []);

  return (
    <div>
      <StyledAppBar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container justifyContent="space-around" alignItems="center">
              <Grid item style={{ paddingInline: 20 }}>
                <MakorLogo />
              </Grid>
              <Grid item>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                  TabIndicatorProps={{ style: { background: '#0074cc', height: '4px', borderRadius: '8px 8px 0px 0px' } }}
                  style={{ textTransform: 'none' }}
                >
                  {tabs.map((tab, idx) => {
                    return <Tab label={tab.name} {...a11yProps(idx)} />;
                  })}
                </Tabs>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ paddingRight: 20 }}>
            <FilledButton style={{ padding: '5px 12px 5px 12px ' }} onClick={handleLogout}>
              Logout <ExitToAppIcon />
            </FilledButton>
          </Grid>
        </Grid>
      </StyledAppBar>
      <TabPanel value={value} index={0}>
        <AllArticles />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Subscribers />
      </TabPanel>
    </div>
  );
};

export default Research;

const StyledAppBar = withStyles((theme) => ({
  root: {
    backgroundColor: 'black',
    '& .MuiTab-wrapper': {
      textTransform: 'none',
      fontSize: '16px',
    },
  },
}))(AppBar);
