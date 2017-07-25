import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {StyleSheet, View, Text}  from 'react-native';
import arrow from './resources/ic_arrow.png';
import SpotCallout from './SpotCallout';
export default class MapHandler extends Component {

	configureMap(configData){}

	render() {

		var deg_val = null;

		return( 
			<View style={styles.map_container}>
			<MapView style={styles.map}
    			initialRegion={{
      			longitude: 10.524903,
      			latitude: 58.214131,
      			latitudeDelta: 3.0922,
      			longitudeDelta: 3.0421,
      			zoom:1,
    			}}
  			>

  			{this.props.data.map(function(cast, i){

				deg_val = cast.fcst_intervals[0].dir_deg + 'deg';

  				return(
	  			<MapView.Marker
	      			coordinate={{
	      				latitude: parseFloat(cast.latitude),
	      				longitude: parseFloat(cast.longitude),
	      			}}
	     			image={arrow}
	     			style={{transform: [{rotate:  deg_val}],}}
	     			key={i}
	    		>
	    		 	<MapView.Callout style={styles.spot_callout_view}>
	              		<SpotCallout>
	                		<Text style={styles.callout_title}>{cast.name}</Text>
	                		<Text>vindstyrke: {cast.fcst_intervals[0].mps}</Text>
	                		<Text>vindretning: {cast.fcst_intervals[0].dir_deg}</Text>
	              		</SpotCallout>
	            	</MapView.Callout> 
	            </MapView.Marker>);
  			})}

    		</MapView>
  			</View>
			);
	}

}



const styles = StyleSheet.create({
    map_container: {
    height:500,
    width:400,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }, 
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  spot_callout_view: {
  	backgroundColor:'#03a9f4'
  },
  callout_title: {
  	color:'#03a9f4',
  	fontWeight:'bold',
  }
});