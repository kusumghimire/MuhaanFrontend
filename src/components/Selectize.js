Form = React.createClass({displayName: "Form",
    
    // render :: a -> ReactElement
    render: function(){
        var self = this;
        return React.createElement("div", null, 
            function(){
                if (self.state.selectedCountries.length > 0)
                    return React.createElement("div", {style: {margin: 8}}, 
                        React.createElement("span", null, "you selected: "), 
                        React.createElement("span", {style: {fontWeight: "bold"}}, 
                            self.state.selectedCountries.map(function(selectedCountry){
                                return selectedCountry.label;
                            }).join(", ")
                        )
                    )
            }(), 
            React.createElement(MultiSelect, {
                ref: "select", 
                placeholder: "Select countries", 
                options: this.state.countries, 
                value: this.state.selectedCountries, 

                // onValueChange :: Item -> (a -> Void) -> void
                onValuesChange: function(selectedCountries){
                    self.setState({selectedCountries: selectedCountries});
                }, 

                // renderNoResultsFound :: a -> ReactElement
                renderNoResultsFound: function() {
                    return React.createElement("div", {className: "no-results-found"}, 
                        !!self.req ? "loading countries ..." : "No results found"
                    )
                }}
            )
        )
    },

    // getInitialState :: a -> UIState
    getInitialState: function(){
        return {
            countries: [],
            selectedCountries: []
        };
    },

    // component-will-mount :: a -> Void
    componentWillMount: function(){
        var self = this;
        this.req = $.getJSON("http://restverse.com/countries").done(function(countries){
            self.setState({countries: countries}, function(){
                self.refs.select.highlightFirstSelectableOption();
            });
        }).always(function(){
            delete self.req;
        });
    }
    
});

render(React.createElement(Form, null), mountNode)