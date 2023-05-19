import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalArticles: 0,
    };
    document.title = this.upperCase(this.props.category);
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  moveTop() {
    window.scrollTo(0, 0);
  }

  upperCase = (event) => {
    return event.charAt(0).toUpperCase() + event.slice(1);
  };

//   componentDidUpdate() {
//     this.setState({
//       page: this.state.page + 1,
//     });
//     this.fetchMoreData();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.data !== this.state.data) {
//       // Now fetch the new data here.
//     }
//   }

  fetchMoreData = async (page) => {
    debugger;

    console.log(this.state.page);

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticles: parsedData.totalResults,
      loading: false,
    });
    console.log(this.state.articles.length !== this.state.totalArticles);
  };

  render() {
    return (
      <>
        <h2 className="text-center my-3">
          DailyNews - Top {this.upperCase(this.props.category)} Headlines
        </h2>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalArticles}
          loader={this.state.loading && <Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-3 my-3" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : " "}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : " "
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://www.hindustantimes.com/ht-img/img/2023/05/11/1600x900/Alia_Bhatt_Gucci_Ambassador_1683786115031_1683786115317.jpg"
                      }
                      newsUrl={element.url ? element.url : " "}
                      author={element.author ? element.author : "Unknown"}
                      time={element.publishedAt ? element.publishedAt : " "}
                      source={element.source.name ? element.source.name : ""}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
