import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { getEventos, getEventosByLevel } from "../Api";

const imageList = [];
const api = {
  baseUrl: 'https://api.soundcloud.com',
  client_id: 'caf73ef1e709f839664ab82bef40fa96'
};

class Infinite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: [],
      hasMoreItems: true,
      nextHref: null
    };
  }

  getEventos = async (page, self) => {
    try {
      const eventos = await getEventos(page);
      const resp = eventos.content
      if (resp) {
        var tracks = self.state.tracks;
        resp.content.map((track) => {
          if (track.artwork_url == null) {
            track.artwork_url = track.user.avatar_url;
          }

          tracks.push(track);
        });

        if (resp.next_href) {
          self.setState({
            tracks: tracks,
            nextHref: resp.next_href
          });
        } else {
          self.setState({
            hasMoreItems: false
          });
        }
      }
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };



  loadItems(page) {
    var self = this;

    const resp = this.getEventos(page, self)
    console.log(resp);
  }

  render() {
    const loader = <div className="loader">Loading ...</div>;

    var items = [];
    this.state.tracks.map((track, i) => {
      items.push(
        <div className="track" key={i}>
          <a href={track.permalink_url} target="_blank">
            <img src={track.artwork_url} width="150" height="150" />
            <p className="title">{track.title}</p>
          </a>
        </div>
      );
    });

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadItems.bind(this)}
        hasMore={this.state.hasMoreItems}
        loader={loader}>

        <div className="tracks">
          {items}
        </div>
      </InfiniteScroll>
    );
  }
};

export default Infinite;