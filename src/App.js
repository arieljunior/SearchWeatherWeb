import React, { Component } from 'react';
import './main.css';
import axios from 'axios';

import imageCelsius from './images/celsius.svg';
import imageFahrenheit from './images/fahrenheit.svg';


import {CardWeatherToday, CardWeatherNextDays} from '../src/components/cards/cardWeather';

class App extends Component {

  render() {
    return (
      <div>
        <div className="container">
            <div className="inputCity col">
              <div className='form-inline'>
                <input type="text" className="form-control form-control-lg" onChange={(e) => this.setState({newCity: e.target.value})} value={this.state.newCity}  placeholder="Cidade ou Estado"/>
                <button className="btn btn-primary btn-lg" onClick={() => this.handleWeather()} type="button">Pesquisar</button>
              </div>
            </div>
            <div className="col" style={{width: '82%', margin: '0 auto'}}>
              <h1 className="title">{this.state.city}</h1>
              <div className="row">
                <CardWeatherToday onClickLineTemp={() => this.handleToggleTypeTemperature()} objToday = {this.state.today} typeTempSrc={this.state.typeTempSrc}/>

                <CardWeatherNextDays onClickLineTemp={() => this.handleToggleTypeTemperature()} when="Amanhã" objData={this.state.tomorrow} typeTempSrc={this.state.typeTempSrc}/>

                <CardWeatherNextDays onClickLineTemp={() => this.handleToggleTypeTemperature()} when="Depois de Amanhã" objData={this.state.afterTomorrow} typeTempSrc={this.state.typeTempSrc}/>
              </div>
            </div>
            
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
        city:'',
        newCity:'',
        typeTempSrc: imageCelsius,
        today:{
          temperature: '-',
          dayWeek: '',
          text: '',
          humidity: 0,
          pressure: 0,
          color:'#f2f2f2'
        },
        tomorrow:{
          tempHigh: '-',
          tempLow: '-',
          dayWeek: '',
          text: '',
          colorHigh:'#f2f2f2',
          colorLow:'#f2f2f2'
        },
        afterTomorrow:{
          tempHigh: '-',
          tempLow: '-',
          dayWeek: '',
          text: '',
          colorHigh:'#f2f2f2',
          colorLow:'#f2f2f2'
        }
    }

    this.handleWeather = this.handleWeather.bind(this);
    this.getColor = this.getColor.bind(this);
    this.handleToggleTypeTemperature = this.handleToggleTypeTemperature.bind(this);
  }

  handleToggleTypeTemperature(){
    var typeName = 'celsius';
    var newTypeSrc = imageCelsius
    if(this.state.typeTempSrc === imageCelsius){
      typeName = 'fahrenheit';
      newTypeSrc = imageFahrenheit;
    }

    if(this.state.newCity !== ''){
      const today = {
        temperature: this.handleConvertTemperature(this.state.today.temperature, typeName),
        dayWeek: this.state.today.dayWeek,
        text: this.state.today.text,
        humidity: this.state.today.humidity,
        pressure: this.state.today.pressure,
        color:this.getColor(this.handleConvertTemperature(this.state.today.temperature, typeName), newTypeSrc)
      }
  
      const tomorrow = {
        tempHigh: this.handleConvertTemperature(this.state.tomorrow.tempHigh, typeName),
        tempLow: this.handleConvertTemperature(this.state.tomorrow.tempLow, typeName),
        dayWeek: this.state.tomorrow.dayWeek,
        text: this.state.tomorrow.text,
        colorHigh: this.getColor(this.handleConvertTemperature(this.state.tomorrow.tempHigh, typeName), newTypeSrc),
        colorLow: this.getColor(this.handleConvertTemperature(this.state.tomorrow.tempLow, typeName), newTypeSrc)
      }
  
      const afterTomorrow = {
        tempHigh: this.handleConvertTemperature(this.state.afterTomorrow.tempHigh, typeName),
        tempLow: this.handleConvertTemperature(this.state.afterTomorrow.tempLow, typeName),
        dayWeek: this.state.afterTomorrow.dayWeek,
        text: this.state.afterTomorrow.text,
        colorHigh: this.getColor(this.handleConvertTemperature(this.state.afterTomorrow.tempHigh, typeName), newTypeSrc),
        colorLow: this.getColor(this.handleConvertTemperature(this.state.afterTomorrow.tempLow, typeName), newTypeSrc)
      }
      
  
  
      this.setState({
        typeTempSrc: newTypeSrc,
        today: today,
        tomorrow: tomorrow,
        afterTomorrow: afterTomorrow
      });
    }

  }

  handleWeather(){
    if(this.state.newCity !== ''){

      const url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+this.state.newCity+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
    
      axios.get(url)
        .then(res => {
          const data = res.data;

          var city = '"'+ this.state.newCity + '" não encontrado!';
          var today = {
            temperature: '',
            dayWeek: '',
            text: '',
            humidity: 0,
            pressure: 0,
            color: '#f2f2f2'
          }
          var tomorrow ={
            tempHigh: '',
            tempLow: '',
            dayWeek: '',
            text: '',
            colorHigh: '#f2f2f2',
            colorLow: '#f2f2f2'
          }
          var afterTomorrow = {
            tempHigh: '',
            tempLow: '',
            dayWeek: '',
            text: '',
            colorHigh: '#f2f2f2',
            colorLow: '#f2f2f2'
          }

          if(data.query.results === null || data.query.results.channel.item === undefined || data.query.results === null){
            //do nothing
            //error data

          }else{
            //data ok!
            const date = new Date(data.query.results.channel.item.forecast[0].date);
            const daysWeek = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
            city = data.query.results.channel.location.city+' - '+data.query.results.channel.location.region+', '+ data.query.results.channel.location.country
            
            var typeTemp = 'celsius';
            if(this.state.typeTempSrc === imageFahrenheit){
              //is Fahrenheit
              today = {
                temperature: data.query.results.channel.item.condition.temp,
                dayWeek: daysWeek[date.getDay()],
                text: data.query.results.channel.item.condition.text,
                humidity: data.query.results.channel.atmosphere.humidity,
                pressure: data.query.results.channel.atmosphere.pressure,
                color: this.getColor(data.query.results.channel.item.condition.temp, this.state.typeTempSrc)
              }

              tomorrow = {
                tempHigh: data.query.results.channel.item.forecast[1].high,
                tempLow: data.query.results.channel.item.forecast[1].low,
                dayWeek: daysWeek[new Date(data.query.results.channel.item.forecast[1].date).getDay()],
                text: data.query.results.channel.item.forecast[1].text,
                colorHigh: this.getColor(data.query.results.channel.item.forecast[1].high, this.state.typeTempSrc),
                colorLow: this.getColor(data.query.results.channel.item.forecast[1].low, this.state.typeTempSrc)
              }

              afterTomorrow = {
                tempHigh: data.query.results.channel.item.forecast[2].high,
                tempLow: data.query.results.channel.item.forecast[2].low,
                dayWeek: daysWeek[new Date(data.query.results.channel.item.forecast[2].date).getDay()],
                text: data.query.results.channel.item.forecast[2].text,
                colorHigh: this.getColor(data.query.results.channel.item.forecast[2].high,this.state.typeTempSrc),
                colorLow: this.getColor(data.query.results.channel.item.forecast[2].low, this.state.typeTempSrc)
              
              }

            }else{
              //is Celsius
              const todayTemp = this.handleConvertTemperature(data.query.results.channel.item.condition.temp, typeTemp);
              today = {
                temperature: todayTemp,
                dayWeek: daysWeek[date.getDay()],
                text: data.query.results.channel.item.condition.text,
                humidity: data.query.results.channel.atmosphere.humidity,
                pressure: data.query.results.channel.atmosphere.pressure,
                color: this.getColor(todayTemp)
              }

              tomorrow = {
                tempHigh: this.handleConvertTemperature(data.query.results.channel.item.forecast[1].high, typeTemp),
                tempLow: this.handleConvertTemperature(data.query.results.channel.item.forecast[1].low, typeTemp),
                dayWeek: daysWeek[new Date(data.query.results.channel.item.forecast[1].date).getDay()],
                text: data.query.results.channel.item.forecast[1].text,
                colorHigh: this.getColor(this.handleConvertTemperature(data.query.results.channel.item.forecast[1].high, typeTemp)),
                colorLow: this.getColor(this.handleConvertTemperature(data.query.results.channel.item.forecast[1].low, typeTemp))
              }

              afterTomorrow = {
                tempHigh: this.handleConvertTemperature(data.query.results.channel.item.forecast[2].high, typeTemp),
                tempLow: this.handleConvertTemperature(data.query.results.channel.item.forecast[2].low, typeTemp),
                dayWeek: daysWeek[new Date(data.query.results.channel.item.forecast[2].date).getDay()],
                text: data.query.results.channel.item.forecast[2].text,
                colorHigh: this.getColor(this.handleConvertTemperature(data.query.results.channel.item.forecast[2].high, typeTemp)),
                colorLow: this.getColor(this.handleConvertTemperature(data.query.results.channel.item.forecast[2].low, typeTemp))
              }
            }
    
            
          }
          
          this.setState({
            city: city,
            today: today,
            tomorrow: tomorrow,
            afterTomorrow: afterTomorrow
          });

        });

    }
  }

  handleConvertTemperature(valueTemperature, toTemperature){

    const temperature = parseInt(valueTemperature,10);
    var temperatureReturn = temperature;
    switch(toTemperature){
      case 'celsius':
        //convert to celsius
        temperatureReturn = parseInt(((temperature -32) * 5 / 9),10);
        break;
        case 'fahrenheit':
        //convert to fahrenheit
        temperatureReturn = parseInt((temperature * 9 / 5 + 32),10);
        break;
      default:
        //do notthing
        break;
    }
    return temperatureReturn;
  }

  getColor(temperature, forNewType){

    var tempMin = 15;
    var tempMax = 35;
    var colorReturn = '';

    if(forNewType === imageFahrenheit){
      tempMin = 59;
      tempMax = 95;
    }

    if(temperature < tempMin){
      //color blue
      colorReturn = '#80bfff';
    }else if(temperature > tempMax){
      //color red
      colorReturn = '#ff8080';
    }else{
      //color yellow
      colorReturn = '#ffffb3';
    }

    return colorReturn;
  }
}

export default App;
