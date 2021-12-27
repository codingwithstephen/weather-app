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

  removeWeather(ind: number) {
    let data:any=localStorage.getItem("zipCodes");
    let newZipCodes='';
    data=data!.split(',');
    data.splice(ind,1);
    for(let i=0;i<data.length;i++)
    {
      newZipCodes=newZipCodes===''?(data[i]):(newZipCodes+','+data[i]);
    }
    console.log(data);
    localStorage.setItem("zipCodes",newZipCodes);
    this.weatherData.weatherData.splice(ind,1);
  }
}
