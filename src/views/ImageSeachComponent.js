/**
 * ImageSearchComponent for seaching Image
 * and displaying it in grid format.
 *
 * @author Labhya Sharma
 */

import React from 'react';
import {
  SafeAreaView,
  TextInput,
  View,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import IMAGE_DATA from '../utils/ImageUtils';
import color from '../utils/ColorUtils';
import AppConstants from '../utils/AppConstants';
import AppService from '../NetworkService/AppService';

export default class ImageSearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: '',
      imageList: [],
      showLoader: false,
    };
  }

  componentDidMount() {
    this.searchImage('');
    this.onChangeTextDelayed = this.debounce(this.onChangeText, 1000);
  }

  /**
   * Fuction to handle the debounce so that
   * Api hits after few seconds.
   *
   * @argument func func
   * @argument wait wait
   * @argument immediate immediate
   */

  debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  onChangeText = searchText => {
    this.searchImage(searchText);
    this.setState({
      searchVal: searchText,
    });
  };

  /**
   * Fuction to hit api after text change
   *
   */
  searchImage = async searchText => {
    await this.setState({showLoader: true});

    AppService.searchImage(searchText)
      .then(response => {
        this.setState({
          imageList: response.data.hits,
          showLoader: false,
        });
      })
      .catch(error => {
        console.log('error message', error);
      });
  };

  render() {
    const loader = (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color={color.white} />
      </View>
    );

    return (
      <SafeAreaView>
        <View style={{flexDirection: 'column', height: '100%'}}>
          <View style={styles.topContainerSearch}>
            <View style={styles.inputContainer}>
              <Image style={{marginStart: 16}} source={IMAGE_DATA.searchIcon} />

              <TextInput
                style={[styles.inputs]}
                underlineColorAndroid="transparent"
                placeholder={AppConstants.commonConstants.search}
                onChangeText={this.onChangeTextDelayed}
              />
            </View>
          </View>

          <FlatList
            style={styles.listContainer}
            extraData={this.state}
            data={this.state.imageList}
            renderItem={({item, index}) => {
              return (
                <View
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    flex: 1,
                    height: 100,
                    marginTop: 16,
                    marginStart: 16,
                    marginEnd: 16,
                  }}>
                  <Image
                    source={{uri: item.previewURL}}
                    style={styles.imageStyle}
                  />
                </View>
              );
            }}
            keyExtractor={item => {
              return item.id;
            }}
          />
        </View>

        {this.state.showLoader ? loader : null}
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
  },
  topContainerSearch: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: color.screenBackground,
    alignItems: 'center',
  },
  inputContainer: {
    borderBottomColor: color.grey,
    backgroundColor: color.searchBackColor,
    borderRadius: 10,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
    marginLeft: 16,
  },
  listContainer: {
    marginTop: 16,
    paddingTop: 8,
    flexGrow: 1,
  },
  imageStyle: {
    flex: 1,
  },
  loaderStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
