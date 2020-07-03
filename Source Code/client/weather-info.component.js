"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var weather_data_service_1 = require("./app/_services/weather-data.service");
var WeatherInfoComponent = /** @class */ (function () {
    function WeatherInfoComponent(weatherService) {
        this.weatherService = weatherService;
        this.accessToken = 'pk.eyJ1IjoiY2hyYXZpNDE0IiwiYSI6ImNrMXVoaW1jaTBwN3kzaHF5dmp3dHFwYTcifQ.chUU1f2nmdvLNT2Xp6efYg';
        this.showError = false;
        this.showInvalidError = false;
        this.weatherData = [];
        this.hourlyData = [];
    }
    WeatherInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (navigator) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                console.log(pos);
                _this.getWeatherData(+pos.coords.latitude, +pos.coords.longitude);
                _this.weatherService.getLocationName(+pos.coords.latitude, +pos.coords.longitude).
                    subscribe(function (data) {
                    _this.locationName = data['features'][0]['place_name'].split(',')[1].trim();
                    console.log(_this.locationName.trim());
                    _this.weatherData['location'] = _this.locationName.trim();
                });
                console.log(_this.locationName);
            });
        }
    };
    WeatherInfoComponent.prototype.getLocationData = function () {
        var _this = this;
        console.log(this.locationName);
        if (this.locationName) {
            this.weatherService.getLocationData(this.locationName).
                subscribe(function (locationData) {
                console.log(locationData);
                _this.showError = false;
                _this.showInvalidError = false;
                if (locationData['features'].length > 0) {
                    var long = locationData['features'][0]['center'][0];
                    var lat = locationData['features'][0]['center'][1];
                    _this.getWeatherData(lat, long);
                }
                else {
                    _this.showInvalidError = true;
                }
            });
        }
        else {
            this.showError = true;
            this.showInvalidError = false;
            console.log("Error");
        }
    };
    WeatherInfoComponent.prototype.getWeatherData = function (lat, long) {
        var _this = this;
        this.weatherService.getWeatherData(lat, long).
            subscribe(function (data) {
            _this.weatherData['summary'] = data['currently']['summary'];
            _this.weatherData['location'] = _this.locationName;
            _this.weatherData['temperature'] = data['currently']['temperature'];
            _this.weatherData['humidity'] = data['currently']['humidity'];
            _this.weatherData['pressure'] = data['currently']['pressure'];
            _this.weatherData['rainChance'] = data['currently']['precipProbability'];
            _this.weatherData['windSpeed'] = data['currently']['windSpeed'];
            _this.getHourlyData(data);
        });
    };
    WeatherInfoComponent.prototype.getHourlyData = function (data) {
        var _this = this;
        this.hourlyData = [];
        var hourlyData = data['hourly']['data'];
        hourlyData.forEach(function (h) {
            var hrs = new Date(h['time'] * 1000).getHours();
            var time = hrs > 12 ? hrs % 12 + 'PM' : hrs + 'AM';
            var hourlyObject = {
                time: time,
                temperature: h['temperature'],
                feelsLike: h['apparentTemperature']
            };
            _this.hourlyData.push(hourlyObject);
        });
    };
    WeatherInfoComponent = __decorate([
        core_1.Component({
            selector: 'app-weather-info',
            templateUrl: './weather-info.component.html',
            styleUrls: ['./weather-info.component.css']
        }),
        __metadata("design:paramtypes", [weather_data_service_1.WeatherDataService])
    ], WeatherInfoComponent);
    return WeatherInfoComponent;
}());
exports.WeatherInfoComponent = WeatherInfoComponent;
//# sourceMappingURL=weather-info.component.js.map