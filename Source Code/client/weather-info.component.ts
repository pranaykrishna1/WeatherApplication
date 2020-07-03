import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from './app/_services/weather-data.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent implements OnInit {
  public locationName: String;
  public accessToken = 'pk.eyJ1IjoiY2hyYXZpNDE0IiwiYSI6ImNrMXVoaW1jaTBwN3kzaHF5dmp3dHFwYTcifQ.chUU1f2nmdvLNT2Xp6efYg';
  public showError = false;
  public showInvalidError = false;
  public weatherData: any = [];
  public hourlyData: any = [];
  constructor(private weatherService: WeatherDataService) { }

  ngOnInit() {
    if (navigator) {
    navigator.geolocation.getCurrentPosition( pos => {
        console.log(pos);
        this.getWeatherData(+pos.coords.latitude, +pos.coords.longitude);
        this.weatherService.getLocationName(+pos.coords.latitude, +pos.coords.longitude).
          subscribe(data => {
            this.locationName = data['features'][0]['place_name'].split(',')[1].trim();
            console.log(this.locationName.trim())
            this.weatherData['location'] = this.locationName.trim();
          });
        console.log(this.locationName);
        
      });
    }
  }

  public getLocationData() {
    console.log(this.locationName);
    if (this.locationName) {
      this.weatherService.getLocationData(this.locationName).
          subscribe(locationData => {
            console.log(locationData);
            this.showError = false;
            this.showInvalidError = false;
            if(locationData['features'].length > 0) {
              const long = locationData['features'][0]['center'][0];
              const lat = locationData['features'][0]['center'][1];
              this.getWeatherData(lat, long);
            } else {
              this.showInvalidError = true;
            }
        });
    } else {
      this.showError = true;
      this.showInvalidError = false;
      console.log("Error");
    }
  }

  public getWeatherData(lat: Number, long: Number) {
    this.weatherService.getWeatherData(lat, long).
      subscribe(data => {
        this.weatherData['summary'] = data['currently']['summary'];
        this.weatherData['location'] = this.locationName;
        this.weatherData['temperature'] = data['currently']['temperature'];
        this.weatherData['humidity'] = data['currently']['humidity'];
        this.weatherData['pressure'] = data['currently']['pressure'];
        this.weatherData['rainChance'] = data['currently']['precipProbability'];
        this.weatherData['windSpeed'] = data['currently']['windSpeed'];
        this.getHourlyData(data);
      })
  }

  public getHourlyData(data: any) {
    this.hourlyData = [];
    const hourlyData = data['hourly']['data'];
    hourlyData.forEach((h: any) => {
      const hrs = new Date(h['time'] * 1000).getHours();
      const time = hrs > 12 ? hrs %12 + 'PM' : hrs + 'AM';
      const hourlyObject = {
        time : time,
        temperature : h['temperature'],
        feelsLike : h['apparentTemperature']
      }
      this.hourlyData.push(hourlyObject);
    })
  }
}
