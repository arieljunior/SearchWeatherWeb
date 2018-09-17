import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class Home extends Component{
    render(){
        return(
            <div className="container">
                <div className="card" style={{width:"23rem",margin: "77px auto"}}>
                    <div className="card-body">
                        <small style={{float:'right'}}>By: Ariel Junior</small>
                        <h5 className="card-title">Olá :)</h5>
                        <p className="card-text">
                            Esse projeto foi desenvolvido com React js e Bootstrap 4.1!<br/><br/>
                            
                        </p>
                        <Link to="/app" className='btn btn-primary'>Go</Link>
                        <a href="https://github.com/arieljunior/SearchWeatherWeb" target="_blank" style={{marginLeft: "55px"}} className="card-link">Código Fonte</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;