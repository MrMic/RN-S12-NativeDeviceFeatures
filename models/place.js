export class Place {
  constructor(title, imageUri, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng }; // * NOTE: { lat: 0.12255, lng: 151.20732 }
    this.id = new Date().toString() + Math.random().toString();
  }
}
