import React, {Component} from 'react';
import './card.css';
import cloud from '../../images/cloud.png'; 

class CardWeatherToday extends Component {

    render(){
        return(
            <div className="card" style={{margin:'10px', width: '280px'}}>
                <img className="card-img-top" src={cloud} alt="imagem teste"/>
                <div className="card-body">
                    <h5 className="card-title">Hoje <small>{this.props.objToday.dayWeek}</small></h5>
                    <p className="card-text">{this.props.objToday.text}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item" onClick={this.props.onClickLineTemp} style={{backgroundColor: this.props.objToday.color, cursor:'pointer'}}>
                        {this.props.objToday.temperature}
                        <img className="img-icon" src={this.props.typeTempSrc} alt="temperatura"/>
                    </li>
                    <li className="list-group-item" style={{backgroundColor: '#f2f2f2', fontSize: '12px'}}>
                        clique na temperatura para alterar para Fahrenheit
                    </li>
                </ul>
               
            </div>
        );
    }
}

class CardWeatherNextDays extends Component  {
    // constructor(props){
    //     super(props);
    // }

    render(){
        return(
            <div className="card" style={{margin:'10px', width: '280px'}}>
                <img className="card-img-top" src={cloud} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.when} <small>{this.props.objData.dayWeek}</small></h5>
                    <p className="card-text">{this.props.objData.text}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item" style={{backgroundColor: this.props.objData.colorHigh, cursor:'pointer'}} onClick={this.props.onClickLineTemp}>
                        Máxima {this.props.objData.tempHigh}
                        <img className="img-icon" src={this.props.typeTempSrc} alt="temperatura"/>
                    </li>
                    <li className="list-group-item" style={{backgroundColor: this.props.objData.colorLow, cursor:'pointer'}} onClick={this.props.onClickLineTemp}>
                        Mínima {this.props.objData.tempLow}
                        <img className="img-icon" src={this.props.typeTempSrc} alt="temperatura"/>
                    </li>
                </ul>
               
            </div>
        );
    }
}

export {CardWeatherToday, CardWeatherNextDays}