import { Component, OnInit, Input } from '@angular/core';
import { weatherBit } from '../../environments/environment';
import { WeatherForecast } from '../models/weather-forecast';
import { CityDetails } from '../models/city-details';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather-forecast-list',
  templateUrl: './weather-forecast-list.component.html',
  styleUrls: ['./weather-forecast-list.component.css']
})
export class WeatherForecastListComponent implements OnInit {

  @Input() searchText: string;

  weatherBitUrl: string;
  weatherForecasts: WeatherForecast[];
  //searchText: string;
  cityDetails: CityDetails;
  constructor(private http: HttpClient) {
    this.weatherForecasts = [];
    this.weatherBitUrl = ``;
    this.cityDetails = {
      cityName: '',
      stateCode: '',
    };
  }

  getWeather() {
    this.weatherBitUrl = `${weatherBit.urlBase}?city=${this.searchText}&key=${weatherBit.apiKey}`;
    //subscribe to weatherbit forecase results here
    this.http.get(this.weatherBitUrl).subscribe( (results: any) => {
      //console.log('WEATHER FORECAST.....');
      console.log(results);
      this.weatherForecasts = results['data'];
      this.cityDetails.cityName = results['city_name'];
      this.cityDetails.stateCode = results['state_code'];
    });
  }

  ngOnInit() {
  }

}
