import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps={
    nrows:5,
    ncols:5,
    chanceLightStartsOn:1.7
  }
  constructor(props) {
    super(props);
    this.state={
      hasWon: false,
      board: this.createBoard()
    }
    this.flipCellsAround=this.flipCellsAround.bind(this);
  }

  createBoard() {
    let board = [];
    for(let i=0;i<this.props.nrows;i++){
      let row=[]
      for(let i=0;i<this.props.ncols;i++){
        let light=Math.random()*this.props.chanceLightStartsOn>1?true:false;
        row.push(light)
      }
      board.push(row)
    }
    return board
  }

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let newBoard = [...this.state.board];
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        newBoard[y][x] = !newBoard[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y+1, x);
    flipCell(y-1, x);
    flipCell(y, x-1);
    flipCell(y, x+1);

    let lightCells=0;
    newBoard.forEach(element => {
      element.forEach(element => {
        lightCells+=element?1:0;
      });
    });
    this.setState({board: newBoard, hasWon: lightCells===0});
  }

  render() {
    if(this.state.hasWon){
      return (
        <div className="Board-title winner">
          <div className="neon-orange">YOU</div>
          <div className="neon-blue">WiN!</div>
        </div>
      );
    }else{
      return(
        <div>
          <div className="Board-title">
            <div className="neon-orange">LIGHTS</div>
            <div className="neon-blue">OUT</div>
          </div>
          <table className="Board">
            <tbody>
            {this.state.board.map((arr,y)=>
              <tr key={y} className="CellRow">
                {arr.map((cell,x)=><Cell key={y+'-'+x} id={y+'-'+x} isLit={cell} flipCellsAroundMe={this.flipCellsAround}/>)}
              </tr>
              )}
            </tbody>
          </table>
        </div>

        
      )
    }
    
  }
}


export default Board;
