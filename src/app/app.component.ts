import { Component } from '@angular/core';
import { weatherBit } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  searchText: string;
  weatherBitUrl: string;
  weatherForecasts: any[];
  cityDetails: any;
  constructor(private http: HttpClient) {

    this.cityDetails = {
      cityName: '',
      stateCode: '',
    };
    this.weatherForecasts = [];
  }
  getWeather() {

    this.weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily/?city=${this.searchText}&key=${weatherBit.apiKey}`;    
    this.http.get(this.weatherBitUrl).subscribe( (results: any) => {
      console.log('WEATHER FORECAST.....');
      console.log(results);
      this.weatherForecasts = results['data'];
      this.cityDetails.cityName = results['city_name'];
      this.cityDetails.stateCode = results['state_code'];
    
    });

  }

}