import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import {CardWeatherToday, CardWeatherNextDays} from '../src/components/cards/cardWeather';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        city:'',
        today:{
          temperature: 0,
          dayWeek: '',
          text: '',
          humidity: 0,
          pressure: 0
        },
        tomorrow:{
          tempHigh: 0,
          tempLow: 0,
          dayWeek: '',
          text: ''
        },
        afterTomorrow:{
          tempHigh: 0,
          tempLow: 0,
          dayWeek: '',
          text: ''
        }
    }

    this.handleWeather = this.handleWeather.bind(this);
  }

  handleWeather(){
    const url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+this.state.city+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
    
    axios.get(url)
      .then(res => {
        const data = res.data;
        
        const date = new Date(data.query.results.channel.item.forecast[0].date);
        const daysWeek = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

        this.setState({
          today:{
            temperature: this.convertTemperature(data.query.results.channel.item.condition.temp, 'celsius'),
            dayWeek: daysWeek[date.getDay()],
            text: data.query.results.channel.item.condition.text,
            humidity: data.query.results.channel.atmosphere.humidity,
            pressure: data.query.results.channel.atmosphere.pressure
          },
          tomorrow:{
            tempHigh: this.convertTemperature(data.query.results.channel.item.forecast[1].high, 'celsius'),
            tempLow: this.convertTemperature(data.query.results.channel.item.forecast[1].low, 'celsius'),
            dayWeek: daysWeek[new Date(data.query.results.channel.item.forecast[1].date).getDay()],
            text: data.query.results.channel.item.forecast[1].text
          },
          afterTomorrow:{
            tempHigh: this.convertTemperature(data.query.results.channel.item.forecast[2].high, 'celsius'),
            tempLow: this.convertTemperature(data.query.results.channel.item.forecast[2].low, 'celsius'),
            dayWeek: daysWeek[new Date(data.query.results.channel.item.forecast[2].date).getDay()],
            text: data.query.results.channel.item.forecast[2].text
          }
      });

      });
  }

  convertTemperature(valueTemperature, toTemperature){

    const temperature = parseInt(valueTemperature,10);
    var temperatureReturn = temperature;
    switch(toTemperature){
      case 'celsius':
        //convert to celsius
        temperatureReturn = parseInt(((temperature -32) * 5 / 9),10) + "ºC";
        break;
        case 'fahrenheit':
        //convert to fahrenheit
        temperatureReturn = parseInt((temperature * 9 / 5 + 32),10) + "ºF";
        break;
      default:
        //do notthing
        break;
    }

    return temperatureReturn;
  }

  render() {
    return (
      <div className="container">
          <div className="col">
            <div className='form-inline'>
              <input type="text" className="form-control form-control-lg" onChange={(e) => this.setState({city: e.target.value})}  placeholder="Cidade ou Estado"/>
              <button className="btn btn-secondary btn-lg active" onClick={() => this.handleWeather()} type="button">Pesquisar</button>
            </div>
          </div>

          <div className="col-10">
            <div className="row">
              <CardWeatherToday dayWeek={this.state.today.dayWeek} temperature={this.state.today.temperature} 
                                text={this.state.today.text}/>

              <CardWeatherNextDays when="Amanhã" dayWeek={this.state.tomorrow.dayWeek} tempHigh={this.state.tomorrow.tempHigh}
                                  tempLow={this.state.tomorrow.tempLow} text={this.state.tomorrow.text} />

              <CardWeatherNextDays when="Depois de Amanhã" dayWeek={this.state.afterTomorrow.dayWeek} tempHigh={this.state.afterTomorrow.tempHigh}
                                  tempLow={this.state.afterTomorrow.tempLow} text={this.state.afterTomorrow.text} />
            </div>
          </div>
          
      </div>
    );
  }
}

export default App;
