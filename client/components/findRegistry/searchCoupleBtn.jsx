import React from "react";

const SearchCoupleBtn = ({ checkCookies }) => {
  return checkCookies ? <> </> : <button>Find registry</button>;
};

export default SearchCoupleBtn;
