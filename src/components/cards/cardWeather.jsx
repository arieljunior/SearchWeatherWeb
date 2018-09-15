import React, {Component} from 'react';
import './card.css';

class CardWeatherToday extends Component {

    render(){
        return(
            <div className="card" style={{margin:'10px', width: '280px'}}>
                <img className="card-img-top" src="https://static.pontoslivelo.com.br/content/img/Canais/20180301/Content/Logo_HotelUrbano_300x140.png" alt="imagem teste"/>
                <div className="card-body">
                    <h5 className="card-title">Hoje <small>{this.props.objToday.dayWeek}</small></h5>
                    <p className="card-text">{this.props.objToday.text}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item" onClick={this.props.onClickLineTemp} style={{backgroundColor: this.props.objToday.color}}>
                        {this.props.objToday.temperature}
                        <img className="img-icon" src={this.props.typeTempSrc} alt="temperatura"/>
                    </li>
                </ul>
                <div className="card-body">
                    <a  className="card-link">Card link</a>
                    <a  className="card-link">Another link</a>
                </div>
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
                <img className="card-img-top" src="https://static.pontoslivelo.com.br/content/img/Canais/20180301/Content/Logo_HotelUrbano_300x140.png" alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.when} <small>{this.props.objData.dayWeek}</small></h5>
                    <p className="card-text">{this.props.objData.text}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item" style={{backgroundColor: this.props.objData.colorHigh}} onClick={this.props.onClickLineTemp}>
                        Máxima {this.props.objData.tempHigh}
                        <img className="img-icon" src={this.props.typeTempSrc} alt="temperatura"/>
                    </li>
                    <li className="list-group-item" style={{backgroundColor: this.props.objData.colorLow}} onClick={this.props.onClickLineTemp}>
                        Mínima {this.props.objData.tempLow}
                        <img className="img-icon" src={this.props.typeTempSrc} alt="temperatura"/>
                    </li>
                </ul>
                <div className="card-body">
                    <a  className="card-link">Card link</a>
                    <a  className="card-link">Another link</a>
                </div>
            </div>
        );
    }
}

export {CardWeatherToday, CardWeatherNextDays}