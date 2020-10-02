import React from "react";
import Select from "react-select";

const options = [
    { value: 'best_match', label: 'Best Match' },
    { value: 'rating', label: 'Rating' },
    { value: 'review_count', label: 'Review Count' },
    { value: 'distance', label: 'Distance'}
];

const customStyles = {
    container: provided => ({
        ...provided,
        width: 160,
        float: 'left'
    })
};
function Results(props) {
    return (
        <div>
            <div id = 'search-area'>
                <div id = 'search-title'>
                    Crave it? Find it.
                </div>
                <form onSubmit = {props.handleSubmit}>
                    <input 
                    type = "text" 
                    name = "term" 
                    value = {props.term} 
                    placeholder = "Your go-to meal, eatery, or cuisine."  
                    onChange={props.handleChange} 
                    />
                    <div id = 'filter-search'>
                        <Select
                        styles = {customStyles}
                        placeholder = "Sort by"
                        name = "sort-by-dropdown" 
                        options={options} 
                        onChange={props.handleSelectChange} 
                        value={props.sortBy}
                        />
                        <input
                        type = "number"
                        min = "1"
                        step = "1"
                        name = "limit"
                        value = {props.limit}
                        placeholder = "Limit"
                        onChange = {props.handleChange}
                        />
                    </div>
                    <div>
                        <button>FIND!</button>
                    </div>
                </form>
            </div>
            <div id = "results-area">
                <h3>
                    Results for {props.displayTerm}
                </h3>
                <h4>
                    Showing {props.locations} nearby
                </h4>
                <ul>{props.list}</ul>
            </div>
        </div>
    );
}

export default Results;