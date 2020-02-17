import {API_KEY} from '../utils/ApiConstants';
import request from '../NetworkService/ApiCentral';

function searchImage(searchKey) {
    return request({
      url: '/?key='+API_KEY+'&q='+searchKey ,
      method: 'GET'
    });
  }

  const AppService = {
    searchImage
  }
  
  export default AppService;