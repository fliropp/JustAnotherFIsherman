import React, { Component} from 'react';
import XmlHandler from './XmlHandler';
import logo from './resources/ic_logo.png';
import yrlist from './resources/spots.json';
import {
    Text,
    AppRegistry,
    StyleSheet,
    View,
    ActivityIndicator,
    Image,
} from 'react-native';

class vindfull extends Component {

 

render() {

	var yrls = [];
	for(i = 0; i < yrlist.spots.length; i++) {
		yrls.push(yrlist.spots[i].yrl);
	}

	/*if(this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop:20}}>
          <ActivityIndicator/>
        </View>
      );  
    } */

    return (
       <View style={styles.container}>
       	<View style={styles.header}>
       		<Image style={styles.logo} source={logo}/>
      	</View>
      	<View style={styles.body }>
       		<XmlHandler yrls={yrls}/>
   		</View>
       </View>

    );

	}
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  header: {
  	 width: 400,
     height: 75,
     backgroundColor: '#ff9800',
     alignItems:'center',
  },
  heading: {
  	fontSize:32,
  	paddingTop:15,
  	color:'#03a9f4',
  	fontWeight:'bold',
  },
  body:{
  	 width: 400,
     height: 800,
     backgroundColor: '#03a9f4'
  },
  logo:{
  	height:160,
  	top:-40
  }
 
  

});

AppRegistry.registerComponent('vindfull', () => vindfull);