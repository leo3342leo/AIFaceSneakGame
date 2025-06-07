import React, { Component } from 'react';
import './Home.scss';
import { IRootState } from '../store';
import { connect } from 'react-redux';
import { IHomeState } from './state';
import { getHiScoreThunk } from './thunks';
import { push } from 'connected-react-router';
import { logoutThunk } from '../auth/thunks';

interface IHomeProps {
    hi_score:number
    logout:()=> void
    getHiScore:()=>void
    push:(path:string)=>void
}

class Home extends Component<IHomeProps,IHomeState>{

    componentDidMount(){
        this.props.getHiScore()
    }

    componentDidUpdate(){
        this.props.getHiScore()
    }

    clickSignOut(){
        const confirm = window.confirm("Are you sure to logout?");
        if(confirm === true){
            this.props.logout()
            this.props.push('/userLogin')
        }
    }
        
    render() {
        return (
            <div>
                <>
                <div className='menu'>
                <button className="menu-btn" onClick={()=>this.props.push('/solo')}>Play</button>
                <button className="menu-btn" onClick={()=>this.props.push('/leaderboard')}>Leaderboard</button>
                <button className="menu-btn" onClick={()=>this.clickSignOut()}>Sign Out</button>
                <br></br>
                <div className="score">My Highest Score: {this.props.hi_score}</div>
                </div>
                </>
            </div>
        );
    }
}

    const mapStateToProps = (state:IRootState)=>{
        return{
        hi_score:state.home.hi_score
        }
    }
  
    const mapDispatchToProps = {
    getHiScore:getHiScoreThunk,
    logout:logoutThunk,
    push
    }
  
  
  // export default Canvas;
  export default connect(mapStateToProps, mapDispatchToProps)(Home);