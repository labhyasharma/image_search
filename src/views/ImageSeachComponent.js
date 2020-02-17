/**
 * ImageSearchComponent for seaching Image
 * and displaying it in grid format.
 *
 * @author Labhya Sharma
 */

import React from 'react';
import {SafeAreaView, TextInput, View, Image, StyleSheet, FlatList} from 'react-native';
import IMAGE_DATA from '../utils/ImageUtils';
import color from '../utils/ColorUtils';
import AppConstants from '../utils/AppConstants';
import AppService from '../NetworkService/AppService';


export default class ImageSearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: '',
      imageList: []
    };
  }

  componentDidMount () {
    this.searchImage('');
    this.onChangeTextDelayed = this.debounce(this.onChangeText, 2000);
  }

debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

  onChangeText = (searchText) => {
                this.searchImage(searchText)
                this.setState({
                  searchVal: searchText
                });
  }


  searchImage = (searchText) => {
    AppService.searchImage(searchText)
    .then(response => {
        this.setState({
            imageList:response.data.hits
        })
        console.log('response message searchImage:::', response);
    })
    .catch(error  => {
        console.log('error message', error);
    });
  }

  render() {
    return (
      <SafeAreaView>
        <View style={{flexDirection:'column'}}>

        <View style={styles.topContainerSearch}>
          <View style={styles.inputContainer}>
            <Image style={{marginStart: 16}} source={IMAGE_DATA.searchIcon} />

            <TextInput
              style={[styles.inputs]}
              underlineColorAndroid="transparent"
              placeholder={AppConstants.commonConstants.search}
              onChangeText={ this.onChangeTextDelayed }
            />
          </View>
        </View>

        <FlatList
          style={styles.listContainer}
          extraData={this.state}
          data={this.state.imageList}
          renderItem={({ item, index }) => {
            return (
                <View style={{width:'100%', height:100}}>
                     <Image
                         source={{ uri: item.previewURL }}
                         style={styles.imageStyle}
                     />
                </View>
            )
          }}
          //Setting the number of column

          keyExtractor={(item) => {
            return item.id
          }}
        />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  inputs: {
    height: 40,
    marginLeft: 8,
    borderBottomColor: color.white,
    flex: 1,
    color: color.textColor,
    fontSize: 14,
    color: color.textColor
  },
  topContainerSearch: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: color.screenBackground,
    alignItems: 'center'
  },
  inputContainer: {
    borderBottomColor: '#DADDE2',
    backgroundColor: color.searchBackColor,
    borderRadius: 10,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
   flex:1,
    marginRight: 16,
    marginLeft: 16
  },
  listContainer: {
    marginTop: 16,
    paddingTop: 8,
    flexGrow: 1,
    paddingBottom: 20
  },
  imageStyle: {
    width: '100%',
    height: '100%'
  }
});
