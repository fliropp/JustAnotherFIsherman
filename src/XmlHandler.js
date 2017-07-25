import React, {Component} from 'react';
import MapHandler from './MapHandler';
import MenuHandler from './MenuHandler';
import {
    Text,
    AppRegistry,
    StyleSheet,
    View,
    ActivityIndicator,
} from 'react-native';
import yrlist from './resources/spots.json';

export default class XmlHandler extends Component {

	constructor(props) {
		super(props);

		var yrls = [];
		for(i = 0; i < yrlist.spots.length; i++) {
			yrls.push(yrlist.spots[i].yrl);
		}

    	this.state = {
      		fcst: [],
      		isLoading:true,
	    };
  	}

	componentDidMount() {
		
		for(i = 0; i < this.props.yrls.length; i++){
			fetch(this.props.yrls[i])
    			.then((response) => response.text())
    			.then((responseText) => {
      				this.state.fcst.push(this.parseXml(responseText));
	      		})
    			.catch((error) => {
    				this.setState({err: error});
        			console.error(error);
  				});
		}
		this.setState({isLoading:false});
		
	}


	parseXml(raw){

		var DOMParser = require('xmldom').DOMParser;

		var parser = new DOMParser();
		var doc = parser.parseFromString(raw, 'text/xml');
		
		
		var location  = doc.getElementsByTagName('location');
		var name = location[0].getElementsByTagName('name')[0].textContent;
		var lat = location[0].getElementsByTagName('location')[0].getAttribute('latitude');
		var lon = location[0].getElementsByTagName('location')[0].getAttribute('longitude');

		var casts = doc.getElementsByTagName('tabular')[0].getElementsByTagName('time');
		var forecastInterval = [];

		for(i = 0; i < casts.length; i++){
			forecastInterval.push({
				from: casts[i].getAttribute('from'),
				to: casts[i].getAttribute('to'),
				dir_deg:casts[i].getElementsByTagName('windDirection')[0].getAttribute('deg'),
				dir_code: casts[i].getElementsByTagName('windDirection')[0].getAttribute('code'),
				mps: casts[i].getElementsByTagName('windSpeed')[0].getAttribute('mps'),
				type: casts[i].getElementsByTagName('windSpeed')[0].getAttribute('name'),
			});
		}
		return {name:name, latitude:lat, longitude:lon, fcst_intervals: forecastInterval};

	}

	render(){

		if(this.state.isLoading){
			return(<ActivityIndicator style={styles.indicator}/>);
		}

		return(
			<View>
				<MapHandler data={this.state.fcst}/>
				<MenuHandler/>
			</View>
			);
	}
	
	
}

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }
});

