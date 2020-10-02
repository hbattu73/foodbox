import React from "react";
import star from '../images/star.svg';
import food from '../images/fork-knife.svg';
import check from '../images/check.svg';
import x from '../images/x.svg';

class Business extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    join(categories) {
        const titles = categories.map(function(c) {
            return c.title
        });
        const aliases = titles.join(", ");
        return aliases;
    }

    splice(transactions) {
        for (var i = transactions.length - 1; i >= 0; i--) {
            if (transactions[i].localeCompare('restaurant_reservation') === 0) {
                transactions.splice(i, 1);
            }
        } 
    }

    iconify(transactions) {
        const sources = [];
        this.splice(transactions);

        var takeout = null;
        var delivery = null;
        if (transactions.length == 0) {
            takeout = x;
            delivery = check;
        }
        else if (transactions.length == 1) {
            if (transactions[0].localeCompare('pickup') === 0) {
                takeout = check;
                delivery = x;
            }
            else {
                takeout = x;
                delivery = check;
            }
        }
        else {
            takeout = check;
            delivery = check;       
        }
        sources.push(takeout, delivery);
        return sources;

    }

    handleClick(event) {
        event.preventDefault();
        window.open(this.props.page_url);
    }

    render() {
        const address = this.props.address;
        const transactions = this.props.transactions;
        const sources = this.iconify(transactions);
        return (
            <li
            onMouseEnter={this.props.handleHover.bind(null, address)}
            onClick={this.handleClick}
            title="Click to see the Yelp business page"
            >
                <div className="business-image">
                    <img src={this.props.image_url} />
                </div>
                <p className="first-row" id="name">{this.props.name}</p>
                <img src={star} className="first-row" id ="star"/> 
                <p className="first-row" id = "rating">{this.props.rating} </p>
                <div className="row">
                    <div className="content">
                        <img src={food} className="second-row" id = "fork-knife"/>
                        <p className="second-row" id="categories">{this.join(this.props.categories)}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="content">
                        <img src={sources[0]} className="third-row" id ="takeout"/>
                        <p className="third-row" id="takeout">Takeout</p>
                        <img src={sources[1]} className="third-row" id ="delivery"/>
                        <p className="third-row" id="delivery">Delivery</p>
                    </div>
                </div>
            </li>
        );
    }
}
export default Business;