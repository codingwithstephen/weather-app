import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {WeatherDataService} from "../weatherData.service";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addlocation',
  templateUrl: './addlocation.component.html',
  styleUrls: ['./addlocation.component.css']
})
export class AddlocationComponent implements OnInit {
  zipCodes:any=[];
  isWeatherLoaded:boolean=false;
  constructor(private http:HttpClient,private weatherData:WeatherDataService) { }
  ngOnInit(): void {  }

  addLocation(formData: NgForm) {
    this.http.get(environment.apiBaseUrl + `weather?zip=${formData.value['loc_zipcode']}&appid=5a4b2d457ecbef9eb2a71e480b947604`,{
      responseType:"json"
    }).subscribe((result)=>{
      this.weatherData.addLoc(formData.value['loc_zipcode']);
      formData.reset();
    });
  }
}
