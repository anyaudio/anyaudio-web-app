import React from 'react';
import MiniCardList from "./miniCard/miniCardList";
import './static/css/index.css';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


class SideBar extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.dispatchNext) {
      if (nextProps.nextSongs.length > 0) {
        let video = nextProps.nextSongs[0];
        this.props.removeSong(video);
        this.playSong(video);
      } else if (nextProps.suggestedSongs.length > 0) {
        let video = nextProps.suggestedSongs[0];
        this.playSong(video);
      }
    }
  }

  moveCard = (dragIndex, hoverIndex) => {
    console.log(dragIndex + " "+ hoverIndex);
    this.props.swapSong(dragIndex, hoverIndex);
  } 

  playSong(video) {
    this.props.playSong(video);
    this.props.playedNext(video);
  }

  render() {
    return (
      <div className="sidebar" style={{display:this.props.playlistActive?'block':'none'}}>
        <div>
          {/*Related Song*/}
          <div className="related-song-list-container">

            <div className="sidebar-title uk-text-uppercase font-size-14">Related Songs</div>
            <div className="sidebar-item-container related-songs-list uk-margin-small-top">
              <MiniCardList name="related" songs={this.props.suggestedSongs} playSong={this.props.playSong}
                            addToNowPlaying={this.props.addToNowPlaying}
                            removeSong = {this.props.removeSong}/>
            </div>
          </div>

          <div className="upnext-song-list-container uk-margin-medium-top">

            <div className="sidebar-title uk-text-uppercase font-size-14">Coming Up Next</div>
            <div className="sidebar-item-container related-songs-list uk-margin-small-top">
              <MiniCardList name="queue" songs={this.props.nextSongs} playSong={this.props.playSong}
                            addToNowPlaying={this.props.addToNowPlaying}
                            removeSong = {this.props.removeSong}
                            moveCard = {this.moveCard}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(SideBar) ;