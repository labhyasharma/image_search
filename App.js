/**
 * App component of Travel Triangle app
 *
 * @author Labhya Sharma
 */

import React from 'react';
import ImageSearchComponent from './src/views/ImageSeachComponent';
import {
  SafeAreaView
} from 'react-native';

const App: () => React$Node = () => {
  return (
   
      <SafeAreaView>
       <ImageSearchComponent />
      </SafeAreaView>
    
  );
};

export default App;
