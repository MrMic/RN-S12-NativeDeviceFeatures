import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import PlacesList from "../components/Places/PlacesList";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  // * HACK: HOOKS  ______________________________________________________________________
  const isFocused = useIsFocused([]);

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces(curPlaces => [...curPlaces, route.params.place]);
    }
  }, [isFocused, route.params]);


  return (
    <PlacesList places={loadedPlaces} />
  )
}

export default AllPlaces;
