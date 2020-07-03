import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()

export class WeatherDataService {
  public mapBoxToken = environment.MAPBOX_KEY;
  public darkSkyToken = environment.DARKSKY_KEY;
  private proxy = 'https://cors-anywhere.herokuapp.com/';
  
  
  constructor(private http: HttpClient) { }

  getLocationData(locationName: any) {
    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationName}.json?access_token=${this.mapBoxToken}`;
    return this.http.get(mapboxUrl).
      pipe(response => {
        return response;
      });
  }

  getLocationName(lat: Number, long:Number){
    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${this.mapBoxToken}`;
    return this.http.get(mapboxUrl).
      pipe(response => {
        return response;
      })

  }
  getWeatherData(lat: Number, long:Number) {
    const darkSkyAPiUrl = `https://api.darksky.net/forecast/${this.darkSkyToken}/${lat},${long}`;
    return this.http.get(this.proxy+darkSkyAPiUrl).
      pipe(response => {
        return response;
      });
  }
}
