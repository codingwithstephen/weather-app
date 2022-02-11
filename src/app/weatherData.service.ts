import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class WeatherDataService {
  zipCodes: any = localStorage.getItem("zipCodes") ? localStorage.getItem("zipCodes") : '';
  weatherData: any = [];
  constructor(private http: HttpClient) {
    this.loadWeatherData();
  }
  loadWeatherData = async (): Promise<any> => {
    if (this.zipCodes === '') {
      return;
    }
    let data = this.zipCodes.split(',');
    for (let i = 0; i < data.length; i++) {
      this.http.get(environment.apiBaseUrl + `weather?zip=${data[i]}&units=imperial&appid=5a4b2d457ecbef9eb2a71e480b947604`, {
        responseType: "json"
      }).subscribe((result) => {
        this.weatherData.push({ ...result, zipcode: data[i] });
      });
    }
  }

  addLoc(locZipCode: any) {
    this.zipCodes = this.zipCodes === '' ? ('' + locZipCode) : (this.zipCodes + ',' + locZipCode);
    localStorage.setItem("zipCodes", this.zipCodes);
    this.addWeatherToList(locZipCode);
  }

  addWeatherToList(zipCode: any) {
    this.http.get(environment.apiBaseUrl + `weather?zip=${zipCode}&units=imperial&appid=5a4b2d457ecbef9eb2a71e480b947604`, {
      responseType: "json"
    }).subscribe((result) => {
      this.weatherData.push({ ...result, zipcode: zipCode });
    });
  }

  remove(index: number) {
    let data:any=localStorage.getItem("zipCodes");
    let newZipCodes='';
    data=data!.split(',');
    data.splice(index,1);
    for(let i=0;i<data.length;i++)
    {
      newZipCodes=newZipCodes===''?(data[i]):(newZipCodes+','+data[i]);
    }
    localStorage.setItem("zipCodes",newZipCodes);
    this.weatherData.splice(index,1);
  }
}
