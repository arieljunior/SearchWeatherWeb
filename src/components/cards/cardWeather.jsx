import React, {Component} from 'react';

class CardWeatherToday extends Component {
    // constructor(props){
    //     super(props);
    // }

    render(){
        return(
            <div className="card">
                <img className="card-img-top" src="https://static.pontoslivelo.com.br/content/img/Canais/20180301/Content/Logo_HotelUrbano_300x140.png" alt="imagem teste"/>
                <div className="card-body">
                    <h5 className="card-title">Hoje <small>{this.props.dayWeek}</small></h5>
                    <p className="card-text">{this.props.text}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{this.props.temperature}</li>
                </ul>
                <div className="card-body">
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
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
            <div className="card">
                <img className="card-img-top" src="https://static.pontoslivelo.com.br/content/img/Canais/20180301/Content/Logo_HotelUrbano_300x140.png" alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.when} <small>{this.props.dayWeek}</small></h5>
                    <p className="card-text">{this.props.text}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Máxima {this.props.tempHigh}</li>
                    <li className="list-group-item">Mínima {this.props.tempLow}</li>
                </ul>
                <div className="card-body">
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                </div>
            </div>
        );
    }
}

export {CardWeatherToday, CardWeatherNextDays}