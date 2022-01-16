import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AllArticles from '../Components/AllArticels';
import UploadForm from './UploadForm';
import * as articlesAction from '../Redux/articleSlice/articleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Box, Grid, makeStyles, Tab, Tabs, Typography } from '@material-ui/core';
import Subscribers from './Subscribers';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        children
      )}
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

  useEffect(() => {
    dispatch(articlesAction.getAllArticlesAsync());
  }, []);

  return (
    <div>
      <AppBar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" style={{ textTransform: 'none' }}>
              {tabs.map((tab, idx) => {
                return <Tab label={tab.name} {...a11yProps(idx)} />;
              })}
            </Tabs>
          </Grid>
          <Grid item>
            <Typography>LOGOUT BUTTON HERE</Typography>
          </Grid>
        </Grid>
      </AppBar>
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
