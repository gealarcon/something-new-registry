import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../nav/NavBar";
import { Button, TextField, Dialog } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useInput from "../hooks/useInput";
import useStyles from "../../style/theme";
import Search from "../search/Search";
import useToggler from "../hooks/useToggler";
import { Grid, Fab } from "@material-ui/core";
import ScrollTop from "../product/ScrollTop";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
// import ProductList from "../product/ProductList";

const SearchCouple = () => {
  const [searchCoupleRegistry, handleSearchVal, resetSearch] = useInput("");
  // const [guessList, setGuessList] = useState([]);
  const classes = useStyles();
  const [lookingCouple, toggler] = useToggler(false);

  const coupleSearch = (e) => {
    e.preventDefault();

    if (!searchCoupleRegistry)
      return alert("Please fill in the search bar input!");

    toggler();

    console.log(searchCoupleRegistry);
    fetch(`/api/auth/searchcouple/${searchCoupleRegistry}`, {
      method: "GET",
      header: {
        "content-type": "Application/JSON",
      },
    })
      .then((resp) => resp.json())
      .then(({ products }) => setGuessList(products))
      .catch((err) => {
        console.log("err", err);
        alert(
          "Uh oh! looks like we did not find this couple, please try again."
        );
      });
  };
  // buy product from the Register list
  const buyProduct = (e) => {
    e.preventDefault();

    fetch(`/api/products/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        google_url,
        userId,
        product_name,
        image_url,
        store_name,
        lowest_daily_price,
        product_id,
        date,
      }),
    })
      .then((resp) => resp.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("main ue addProduct", err);
        alert(
          "Uh oh! someone already bough this item, or maybe it will be release later. Try again later"
        );
      });
  };

  return (
    <>
      <Link to="/login">Welcome page</Link>

      <form onSubmit={coupleSearch}>
        <TextField
          className={classes.searchBar}
          variant="outlined"
          label="Search for a registry"
          value={searchCoupleRegistry}
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

      <Grid container justify="center" style={{ marginTop: 64 }}>
        <Grid
          id="back-to-top-anchor"
          container
          item
          justify="center"
          xs={12}
          style={{ margin: "2rem 0" }}
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
          {/*<ProductList buyProduct={buyProduct} />*/}
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
