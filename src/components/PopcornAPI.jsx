import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Global.css';

class PopcornAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      movieID: '',
      showSpinner: true,
      counter: 2
    };

    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        this.loadMoreMovies('https://tv-v2.api-fetch.website/movies/');
      }
    };
  }

  loadMoreMovies = url => {
    const { counter } = this.state;
    const _url = `${url}+${counter}`;
    axios.get(_url).then(res => {
      console.log(res.data);
      this.setState({
        data: this.state.data.concat(res.data),
        counter: counter + 1
      });
    });
  };

  componentWillMount() {
    // window.scrollTo(0, 0);
    axios.get('https://tv-v2.api-fetch.website/movies/1').then(res => {
      console.log(res.data);
      this.setState({
        data: res.data,
        showSpinner: false
      });
    });

    /*  original code before testing infinite scroll. dont delete this code
    const urlArray = [
      'https://tv-v2.api-fetch.website/movies/1',
      'https://tv-v2.api-fetch.website/movies/2',
      'https://tv-v2.api-fetch.website/movies/3',
      'https://tv-v2.api-fetch.website/movies/4',
      'https://tv-v2.api-fetch.website/movies/5',
      'https://tv-v2.api-fetch.website/movies/6',
      'https://tv-v2.api-fetch.website/movies/7',
      'https://tv-v2.api-fetch.website/movies/8',
      'https://tv-v2.api-fetch.website/movies/9',
      'https://tv-v2.api-fetch.website/movies/10',
      'https://tv-v2.api-fetch.website/movies/11',
      'https://tv-v2.api-fetch.website/movies/12',
      'https://tv-v2.api-fetch.website/movies/13',
      'https://tv-v2.api-fetch.website/movies/14',
      'https://tv-v2.api-fetch.website/movies/15',
      'https://tv-v2.api-fetch.website/movies/16',
      'https://tv-v2.api-fetch.website/movies/17',
      'https://tv-v2.api-fetch.website/movies/18',
      'https://tv-v2.api-fetch.website/movies/19',
      'https://tv-v2.api-fetch.website/movies/20',
      'https://tv-v2.api-fetch.website/movies/21',
      'https://tv-v2.api-fetch.website/movies/22'
    ];

    let promiseArray = urlArray.map(url => axios.get(url));
    axios.all(promiseArray).then(res => {
      var moviesDataArray = [];
      for (let index = 0; index < res.length; index++) {
        let temp = res[index].data;
        for (let s = 0; s < temp.length; s++) {
          moviesDataArray.push(res[index].data[s]);
        }
        this.setState({ showSpinner: false });
      }

      this.setState({
        data: moviesDataArray
      });
    });*/
  }

  handleClick = (e, data) => {
    const movieImdbID = data.imdb_id;
    localStorage.setItem('movieImdbID', movieImdbID);
  };

  render() {
    const { data, showSpinner } = this.state;

    return (
      <React.Fragment>
        <div className='container-fluid mx-2 item-container'>
          <div className='d-flex justify-content-center my-2'>
            <div
              className='spinner-border text-info'
              role='status'
              style={{ display: showSpinner ? 'block' : 'none' }}>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>

          <div className='row'>
            {data.length
              ? data.map(data => (
                  <div
                    className='col-md col-sm-6 col-xs-6 p-0 my-2'
                    key={data._id}
                    onClick={e => this.handleClick(e, data)}>
                    <Link to='/movie'>
                      <div className='item-wrap my-2 item'>
                        <img
                          className='item-images'
                          src={data.images.banner}
                          alt='movie'
                        />
                        <div className='text-bg' />
                        <h6 className='item-title text-center text-uppercase'>
                          {data.title}
                        </h6>
                        {/* <div className='item-overlay top' /> */}
                      </div>
                    </Link>
                  </div>
                ))
              : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PopcornAPI;
