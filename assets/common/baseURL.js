import { Platform } from 'react-native'

// let baseURL='https://eshop-server-34343b52a8fa.herokuapp.com/api/v1/'


let baseURL = '';

{Platform.OS == 'android'
//  ? baseURL = 'http://192.168.39.124:9191/api/v1/'
 ?baseURL = 'http://192.168.1.126:9191/api/v1/'
// ?baseURL = 'http://192.168.56.1:9191/api/v1'

: baseURL = 'http://127.0.0.1:9191/api/v1/'

}

export default baseURL;