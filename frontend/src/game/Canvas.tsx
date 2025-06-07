import * as React from 'react';
import { GridElem, Directions, KeyCode } from './util/enums';
import {Position} from './util/position';
import { connect } from 'react-redux';
import {nextStep, initGame, setFood, changeDirection, timeCountdown, resetGame, addTime} from './canvas/actions';
import { IRootState } from '../store';
import './Canvas.scss';
import { updateHiScoreThunk } from './canvas/thunks';
import { push } from 'connected-react-router';
//tensorflow packages
import * as tf from "@tensorflow/tfjs-core";
import * as facemesh from "@tensorflow-models/facemesh";
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";
import { version } from "@tensorflow/tfjs-backend-wasm/dist/version";
import { Vertex, getAngleBetweenVertices } from "./Geometry";

//pass to tfjswasm for handle tensorflow
tfjsWasm.setWasmPath(
  `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${version}/dist/tfjs-backend-wasm.wasm`
);

interface ICanvasProps {
    grid: Array<Array<GridElem>>
    score:number
    snakeQueue:Array<Position>
    direction:Directions
    eatFood:boolean
    time:number
    hi_score:number
    nextStep:()=>void
    initGame:()=>void
    setFood:()=>void
    changeDirection:(d:Directions)=>void
    timeCountdown:()=>void
    resetGame:()=>void
    updateHiScore:(score:number)=>void
    addTime:(s:number)=>void
    push:(path:string)=>void
}

class Canvas extends React.Component<ICanvasProps, {
  countdown: number;
}> {
//Define constants
  private _canvasRef = React.createRef<HTMLCanvasElement>()
  // loop next step (update component state)
  private frameUpdate:NodeJS.Timeout | null = null;
  //game time conutdown
  private countDown = 0
  //ready phase timeout
  private timeout_1:NodeJS.Timeout = setTimeout(() => {}, 0);
  private timeout_2:NodeJS.Timeout = setTimeout(() => {}, 0);
  private timeout_3:NodeJS.Timeout = setTimeout(() => {}, 0);
  //for enable camera & facemesh tensorflow
  private videoRef= React.createRef<HTMLVideoElement>();
  private stream:MediaStream | null = null 
  private faceModel:facemesh.FaceMesh | null = null;
  private unmounted: boolean = false;
//End of define constants
  
state: {countdown:number} = {
  countdown: 3
}

//canvas draw func
  draw = (context:CanvasRenderingContext2D) =>{
    const tw = this._canvasRef.current!.width / 26;
    const th = this._canvasRef.current!.height / 26;
    const playgroundImg = new Image(26,26);
    playgroundImg.src = 'images/playground.png';
    const snakeImg = new Image(26,26);
    snakeImg.src = 'images/circle.png';
    const foodImg = new Image(26,26);
    foodImg.src = 'images/apple.png';
    if(context){
      for(let x=0; x<26; x++){
        for(let y=0; y<26; y++){
          if(this.props.grid){
            switch(this.props.grid[x][y]){
              case GridElem.EMPTY:
                context.drawImage(playgroundImg,x*tw, y*th, tw, th)
                context.fill()
                break;
              case GridElem.SNAKE:
                context.drawImage(snakeImg,x*tw, y*th, tw, th)
                context.fill()
                break;
              case GridElem.FOOD:
                context.drawImage(foodImg,x*tw, y*th, tw, th)
                context.fill()
                break;
            }
          }
        }
      }
    }
    context.fillStyle = "#000";
    context.fillText(`SCORE: ${this.props.score}  TIME: ${Math.floor(this.props.time)} `, 22*tw, 10);
  }

// arrow key control
  handleKeyDown = (e:React.KeyboardEvent<Element>)=>{
    if(e.keyCode === KeyCode.LEFT){
      this.props.changeDirection(Directions.LEFT)
    }
    if(e.keyCode === KeyCode.UP){
      this.props.changeDirection(Directions.UP)
    }
    if(e.keyCode === KeyCode.RIGHT){
      this.props.changeDirection(Directions.RIGHT)
    }
    if(e.keyCode === KeyCode.DOWN){
      this.props.changeDirection(Directions.DOWN)
    }
  }

//facemash predict facecam control
  predict = async () => {
    try {
      if (this.faceModel != null) {
        const video: HTMLVideoElement = this.videoRef!.current!;
        const predictions = await this.faceModel.estimateFaces(video);

        if (predictions.length > 0) {
          const prediction = predictions[0] as any;
          const annotations = prediction.annotations;

          // 3D geometry
          const angle = getAngleBetweenVertices(
            new Vertex(annotations.noseBottom[0]),
            new Vertex(annotations.noseTip[0])
          );

          console.log(angle);
          
          if (angle.x < 160) {
            this.props.changeDirection(Directions.LEFT)
          } else if (angle.x > 200) {
            this.props.changeDirection(Directions.RIGHT)
          } else if (angle.y < 210) {
            this.props.changeDirection(Directions.DOWN)
          } else if (angle.y > 220) {
            this.props.changeDirection(Directions.UP)
          }
        }

        if (!this.unmounted) {
          // Replace this with setTimeout to continuously check in your real app
          // window.requestAnimationFrame(this.predict, 100);
          window.setTimeout(this.predict, 1000);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

//React lifecycles
  componentDidMount = async ()=> {
    //focus on canvas
    this._canvasRef.current!.focus()
    //init game actions
    this.props.initGame();
    this.props.setFood()
    
    //Enable camera   for predict
    try {
      const video: HTMLVideoElement = this.videoRef!.current!;
      this.stream = await navigator.mediaDevices.getUserMedia({
        video:{
          facingMode:"user"
        }
      });
      video.srcObject = this.stream;
      video.play()
      await tf.setBackend("wasm")
      this.faceModel = await facemesh.load({maxFaces: 1});
      this.predict();
    }catch(e){
      alert("Your browser do not support or allow access to your webcam")
    }
    //setTimout before game start
    this.timeout_1 = setTimeout(() => {
      this.setState({
        countdown: 2
      })
    }, 1000)
    this.timeout_2 = setTimeout(() => {
      this.setState({
        countdown: 1
      })
    }, 2000)
    this.timeout_3 = setTimeout(() => {
      this.setState({
        countdown: 0
      })
    }, 3000)
  }

  UNSAFE_componentWillUpdate(){
    //Gameover conditions and actions
    if(Math.floor(this.props.time) === 0){
      if(this.props.hi_score < this.props.score){
        this.props.updateHiScore(this.props.score);
      }
      this.props.push("/");
    }
  }

  componentDidUpdate =() =>{
    if(!this.frameUpdate && this.state.countdown === 0 && this.countDown === 0){
      this.frameUpdate = setInterval(()=>{
        this.props.nextStep()
      },200)
    }
    //execute canvas draw func per update
    const canvas = this._canvasRef.current!;
    this._canvasRef.current!.focus();
    const ctx = canvas.getContext('2d')
    if(ctx){
      this.draw(ctx)
    }
    //start countdown after timeout
    if (this.state.countdown === 0 && this.countDown === 0){ 
      this.countDown = window.setInterval(()=>
        this.props.timeCountdown()
      ,100);
    }
    //snake eat food condition and actions
    if(this.props.eatFood){
      this.props.addTime(3);
      this.props.setFood()
    }
  }

  componentWillUnmount(){
    if(this.stream !== null){
      const streamTrack:MediaStreamTrack = this.stream.getVideoTracks()[0]
      streamTrack.stop()
    }
    clearTimeout(this.timeout_1);
    clearTimeout(this.timeout_2);
    clearTimeout(this.timeout_3);
    this.faceModel = null;
    if(this.frameUpdate){
      clearInterval(this.frameUpdate);
    }
    clearInterval(this.countDown);
    this.unmounted = true;
    this.props.resetGame();
  }
//End of React lifecycles

  render() {
    return (
      <>
        <div className="sprite">
        {
        this.state.countdown === 3 ? 
        <span className="sprite three"></span> :
        this.state.countdown === 2 ?
        <span className="sprite two"></span> :
        this.state.countdown === 1 ?
        <span className="sprite one"></span> :
        <span></span>
        }
        </div>
        <canvas
        ref={this._canvasRef}
        width={26*25}
        height={26*25}
        onKeyDown={(e)=>this.handleKeyDown(e)}
        tabIndex={0}
        />
        <video className="webcam" ref={this.videoRef} width={260} height={200}/>
      </>
    );
  }
}

const mapStateToProps = (state:IRootState)=>{
  return{
    grid:state.canvas.grid,
    score:state.canvas.score,
    snakeQueue:state.canvas.snakeQueue,
    direction:state.canvas.direction,
    eatFood:state.canvas.eatFood,
    time:state.canvas.time,
    hi_score:state.home.hi_score,
  }
}

const mapDispatchToProps = {
  nextStep,
  initGame,
  setFood,
  changeDirection,
  timeCountdown,
  updateHiScore:updateHiScoreThunk,
  resetGame,
  addTime,
  push,
}


// export default Canvas;
export default connect(mapStateToProps, mapDispatchToProps)(Canvas);