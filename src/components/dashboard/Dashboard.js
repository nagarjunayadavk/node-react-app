import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        axios
            .get('/products')
            .then(response => {
                this.setState({ products: response.data });
            });
    }


    render() {

        const { products } = this.state;

        return (
            <Fragment>
                {products.map(product =>
                    <div className="product">
                        {product.name}
                    </div>
                )}
            </Fragment>
        );
    }
}

export default Dashboard;