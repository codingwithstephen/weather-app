import { Component, OnInit } from '@angular/core';
import {WeatherDataService} from "../weatherData.service";

@Component({
  selector: 'app-weathers',
  templateUrl: './weathers.component.html',
  styleUrls: ['./weathers.component.css']
})
export class WeathersComponent implements OnInit {
  data:any=[];
  isDataLoaded:boolean=false;
  constructor(public weatherData:WeatherDataService) { }

  ngOnInit(): void {  }

  removeWeather(index: number) {
    this.weatherData.remove(index);
  }

  type(type: string, weather: any) {
    console.log(this.weatherData.weatherData);
    return weather.weather[0].main.toLowerCase() === type;
  }
}
