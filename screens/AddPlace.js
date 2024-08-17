import PlaceForm from "../components/Places/PlaceForm";

function AddPlace({ navigation }) {
  function createPlaceHandler(place) {
    // * TODO: Insert place into DB on the phone
    navigation.navigate("AllPlaces", {
      place: place
    });
  }

  return (
    <PlaceForm onCreatePlace={createPlaceHandler} />
  )
}

export default AddPlace;
