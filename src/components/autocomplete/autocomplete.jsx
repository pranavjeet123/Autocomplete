import React, { Component } from 'react';
import './autocomplete.css'
import data from '../../Data/data.json'
export class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.items = data.titles;

        this.state = {
            suggestions: [],
            titles: [],
            userInput: "",
            searchIndex: ''
        }
    }

    async fetchData() {
        const titles = await fetch("/resources/data.json")

            .catch(err => {
                this.setError("Cannot Load titles from Service");
            });

        this.setState({ titles: (await titles.json()).titles });

    }


    componentDidMount() {
        console.log("data is fetching");
        this.fetchData();
    }
    onchangeHandler = (e) => {
        const value = e.target.value.toLowerCase();
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`${value}`, 'gi');
            suggestions = this.state.titles.filter(v => regex.test(v))
        }
        this.setState(() => ({ suggestions }));
        this.setState({ userInput: e.target.value });
    }

 


    updateInput = (item, index) => {
        this.setState({ searchIndex: index });
        this.setState({ userInput: item });
    }

    renderSuggestionsHandler = () => {
        const { suggestions } = this.state;

        if (suggestions.length === 0) {
            return null;
        }
        return (
            <>

            {suggestions.map((item, index) => <div key={index} onClick={() => this.updateInput(item, index)}>{item}</div>)}
            </>
        )
    }
handleSubmit=(e)=>{
    e.preventDefault();
console.log("the value of input needs to be passed",this.state.userInput);
this.setState({ userInput: '',suggestions:[] });
}
    render() {
        return (
            <React.Fragment>
                <div className="container">
<form onSubmit={this.handleSubmit}>
                    <input type="text"
                        className="search-box"
                        value={this.state.userInput}
                        placeholder="Type title of book"
                        onChange={this.onchangeHandler}
                    />
                    <button type="submit"
                        value=""
                        className="search-btn">Search</button>
</form>
                    <div className="suggestions">
                        {this.renderSuggestionsHandler()}
                    </div>

                </div>
                <div>

                </div>
            </React.Fragment>
        );
    }
}
export default Autocomplete;