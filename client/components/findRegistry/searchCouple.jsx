import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../nav/NavBar';
import { Button, TextField, Dialog } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useInput from '../hooks/useInput';
import useStyles from '../../style/theme';
import Search from '../search/Search';
import useToggler from '../hooks/useToggler';
import { Grid, Fab } from '@material-ui/core';
import ScrollTop from '../product/ScrollTop';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ProductList from '../product/ProductList';

const SearchCouple = ({ list, setList }) => {
  const [coupleUsername, handleSearchVal, resetSearch] = useInput('');
  const classes = useStyles();
  const [lookingCouple, toggler] = useToggler(false);

  const coupleSearch = (e) => {
    e.preventDefault();

    if (!coupleUsername) return alert('Please fill in the search bar input!');

    toggler();

    console.log(coupleUsername);
    fetch(`/api/auth/searchcouple/${coupleUsername}`, {
      method: 'GET',
      header: {
        'content-type': 'Application/JSON',
      },
    })
      .then((resp) => resp.json())
      .then(({ products }) => setList(products))
      .catch((err) => {
        console.log('err', err);
        alert(
          'Uh oh! looks like we did not find this couple, please try again.'
        );
      });
  };
  const refreshProducts = (userId) => {
    fetch(`/api/products/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(({ products }) => setList(products))
      .catch((err) => console.log(err));
  };

  const socket = io();
  socket.on('products updated', () => {
    console.log('received a products updated socket');
    let userId = list[0].couple_id;
    refreshProducts(userId);
  });

  // buy product from the Register list
  const buyProduct = (productId, coupleId) => {
    fetch(`/api/products/buyproduct/${coupleId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coupleId,
        productId,
      }),
    })
      .then((resp) => resp.json())
      .then((res) => {
        console.log(res);
        console.log(res.storeUrl);
        window.open(res.storeUrl, '_blank');
        //Stretch feature: have the page auto refresh when user buys product.
      })
      .catch((err) => {
        console.log('main ue addProduct', err);
        alert(
          'Uh oh! someone already bough this item, or maybe it will be release later. Try again later'
        );
      });
  };

  return (
    <>
      <Button>
        <Link style={{ textDecorationLine: 'none' }} to="/login">
          Back
        </Link>
      </Button>
      <div style={{ position: 'relative', top: '10px', left: '30%' }}>
        <form onSubmit={coupleSearch}>
          <TextField
            className={classes.searchBar}
            variant="outlined"
            label="Search for a registry"
            value={coupleUsername}
            onChange={handleSearchVal}
            inputProps={{ className: classes.searchBar }}
          />
        </form>
        <Button
          className={classes.searchBtn}
          variant="contained"
          color="primary"
          onClick={coupleSearch}
          endIcon={<SearchIcon />}
        >
          Search couple registry
        </Button>
      </div>

      <Grid container justify="center" style={{ marginTop: 64 }}>
        <Grid
          id="back-to-top-anchor"
          container
          item
          justify="center"
          xs={12}
          style={{ margin: '2rem 0' }}
        ></Grid>
        <Grid
          container
          item
          justify="center"
          align="center"
          spacing={4}
          xs={12}
          md={10}
          xl={9}
        >
          {/* buyProduct is for the guess to add to a temp cart locations: ProfuctList*/}
          <ProductList
            list={list}
            buyProduct={buyProduct}
            refreshProducts={refreshProducts}
          />
        </Grid>
      </Grid>
      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default SearchCouple;
