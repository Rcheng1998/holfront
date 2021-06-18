import React from 'react';
import { Link } from 'react-router-dom'
import vohiyo from '../images/vohiyo.png'

const NotFoundPage = () => (
    <div className="outer">
        <div className="middle">
            <div className="inner">
                <img alt="404picture" id="vohiyoIMG" src={vohiyo}></img>
                <h1>404 - Not Found</h1>
                <h4>Seems like something went wrong...</h4>
                <Link to="/">
                    <p>Go Home</p>
                </Link>
            </div>
        </div>
    </div>
);

export default NotFoundPage;