import React, { Component } from 'react';
import { IRootState } from '../store';
import { IPlayer } from './state';
import { connect } from 'react-redux';
import { allUserThunk } from './thunks';
import { push } from 'connected-react-router';
import './Leaderboard.scss' ;
import { Container, Col, Row } from 'react-bootstrap';



interface ILeaderboardProps{
    ranking:IPlayer[]
    allUser:()=>void
    push:(path:string)=>void
}


class Leaderboard extends Component<ILeaderboardProps,{}>{
    
   componentWillMount(){
       this.props.allUser()
   }
    
    render=()=> {
        return (
            <>
            <div>
                <button onClick={()=>this.props.push('')}>BACK</button>
                <Container className="l-board">
                    <Row className="l-board-row">
                        <Col className="l-board-cols" xs="4">
                            <div>Rank</div>
                            {this.props.ranking.map((p,i) => (
                            <>
                            <div key={i.toString()}>{i+1}</div>
                            </>
                        ))}
                        </Col>
                        <Col className="l-board-cols" xs="4">
                            <div>Name</div>
                            {this.props.ranking.map((p,i) => (
                            <>
                            <div key={i.toString()}>{p.username}</div>
                            </>
                        ))}
                        </Col>
                        <Col className="l-board-cols" xs="4">
                            <div>Score</div>
                            {this.props.ranking.map((p,i) => (
                            <>
                            <div key={i.toString()}>{p.hi_score}</div>
                            </>
                        ))}
                        </Col>
                    </Row>
                    {/* {this.props.ranking.map((p,i) => (
                        <>
                        <div key={i.toString()}>{i+1} {p.username} {p.hi_score}</div>
                        </>
                    ))} */}
                </Container>
            </div>
            </>
        );
    }
}

const mapStateToProps=(state:IRootState)=>{
    return{
        ranking:state.leaderBoard.ranking
    }
}

const mapDispatchToProps ={
    allUser:allUserThunk,
    push,
}



export default connect(mapStateToProps,mapDispatchToProps)(Leaderboard)