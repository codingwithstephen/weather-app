import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WeatherDataService} from "../weatherData.service";
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fivedayforecast',
  templateUrl: './fivedayforecast.component.html',
  styleUrls: ['./fivedayforecast.component.css']
})
export class FivedayforecastComponent implements OnInit {
  dayName: string[] =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  reqWeatherData:any=[];
  reqZipCode:string='';
  reqCityName:string='';
  constructor(private route:ActivatedRoute,private weatherData:WeatherDataService,private http:HttpClient) { }

  ngOnInit(): void {
    let zc=this.route.snapshot.params['zipcode'];
    this.reqZipCode = zc;
    var url = environment.apiBaseUrl + `forecast/daily?zip=${zc}&cnt=5&units=imperial&appid=5a4b2d457ecbef9eb2a71e480b947604`;
    this.http.get(url,{
      responseType:"json"
    }).subscribe((result:any)=>{
      this.reqCityName=result['city'].name;
      for(let i=0;i<result['list'].length;i++)
      {
        let dt=new Date(1970, 0, 1);
        dt.setSeconds(result['list'][i].dt);
        this.reqWeatherData.push({dayName:this.dayName[dt.getDay()],minTemp:result['list'][i]['temp'].min,maxTemp:result['list'][i]['temp'].max,condition:result['list'][i]['weather'][0].main})
      }
    });
  }

}
