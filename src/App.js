import React from 'react';
import Clock from "./Clock";

class App extends React.Component {

    state = {
        latitude: null,
        errorMessage: '',
        value: 1,
    }

    // Set state here
    componentDidMount() {
        console.log("Component mounted")
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ latitude: position.coords.latitude }),
            () => this.setState({errorMessage: "Something went wrong!"})
        )
        setInterval(() => {
            this.setState((state, props) => {
                return { value: this.state.value + 1 }
            })
        }, 1000)
    }

    componentDidUpdate() {
        console.log("Component updated")
    }

    isWarm() {
        const { latitude } = this.state
        if ( latitude ) {
            const month = new Date().getMonth()

            if (
                // April to September, Northern Hemisphere
                (month >=4 && month <= 9 && latitude > 0)
                ||
                // September to April, Southern Hemisphere
                ((month > 9 || month < 4) && latitude < 0)
                || 
                // Equator
                (latitude == 0)
            ) {
                return true
            }
        }

        return false

    }
    render() {  
        let { latitude } = this.state
        return (
            <div>
                { this.state.errorMessage ||
                    <>
                        <h4>{latitude}</h4>
                        <Clock 
                            icon={this.isWarm() ? "sun.svg" : "snowflake.svg"}
                            timezone={"Sydney/Australia"} 
                            date={new Date()} 
                        />
                    </>
                }
            </div>
        );
    }
}

export default App;
