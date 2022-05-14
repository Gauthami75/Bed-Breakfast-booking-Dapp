import React from "react";
import "./Rentals.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import logo from "../images/airbnbRed.png";
import RentalsMap from "../components/RentalsMap";
import { ConnectButton, Icon, Button } from "web3uikit";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

const Rentals = () => {
  const { state: searchFilters } = useLocation();
  const [highLight, setHighLight] = useState();
  const { Moralis } = useMoralis();
  const [rentalsList, setRentalsList] = useState();
  const [coOrdinates, setCoOrdinates] = useState([]);

  useEffect(() => {
    async function fetchRentalsList() {
      const Rentals = Moralis.Object.extend("Rentals");
      const query = new Moralis.Query(Rentals);
      query.equalTo("city", searchFilters.destination);
      query.greaterThanOrEqualTo("maxGuests_decimal", searchFilters.guests);

      const result = await query.find();

      let cords = [];
      result.forEach((e) => {
        cords.push({ lat: e.attributes.lat, lng: e.attributes.long });
      });

      setCoOrdinates(cords);
      setRentalsList(result);
    }

    fetchRentalsList();
  }, [searchFilters]);

  return (
    <>
      <div className="topBanner">
        {/* { ...Content Minimized ... } */}
        <div className="rentalsContentR">
          <RentalsMap locations={coOrdinates} setHighLight={setHighLight} />
        </div>
      </div>
    </>
  );
};

export default Rentals;