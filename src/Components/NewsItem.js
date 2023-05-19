import React, { Component } from 'react';

export default class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, time, source } = this.props;
        return (
            <div>
                <div className="card" style={{ height: "29rem" }}>
                    <span className="position-absolute top-0  translate-middle badge square-pill bg-primary" style={{ left: "90%", zIndex: '1' }}>
                        {source}
                    </span>
                    <img style={{ height: "11rem" }} src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body" style={{ height: "14rem" }}>
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>

                        <p className="card-text"><small className="text-muted">By {author} on {new Date(time).toGMTString()}</small></p>
                        
                    </div>
                    <div className="container" style={{display:"flex",justifyContent:"center", marginBottom:"20px"}} >
                    <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-dark" >Read More</a>
                    </div>
                    
                </div>
            </div>
        );
    }
}










