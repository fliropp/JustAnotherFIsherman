import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import copyright from './resources/ic_copyright.png';

export default class MapHandler extends Component {

render() {
	return(
		<View style={styles.menu_container}>
			<Image style={styles.copyright} source={copyright}/>
			<Text style={styles.menu_text}> Just Another Fisherman hipster dufus brigade </Text>
   		</View>);
}

}

const styles = StyleSheet.create({
    menu_container: {
    	flexDirection: 'row',
    	justifyContent: 'flex-start',
    	alignItems: 'flex-start',
  },
    menu_text: {
    	justifyContent: 'flex-end',
    	alignItems: 'center',
    	color: '#ff9800',
    	fontWeight:'bold',
    	top:10,
    	left:10,
  },
  copyright: {
  		width:25,
  		height:25,
  		top:7,
  		left:4,
  }
});