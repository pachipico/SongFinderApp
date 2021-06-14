import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const fetch = async url => {
  try {
    let response = await AsyncStorage.getItem(url);
    let timestamp = await AsyncStorage.getItem('T' + url);
    if (response !== null) {
      timestamp = Number(timestamp);
      const now = new Date().getTime();
      if (now - timestamp < 86400000) {
        console.log('storage');
        return JSON.parse(response);
      } else {
        await AsyncStorage.multiRemove([url, 'T' + url]);
      }
    }
    const result = await axios.get(url);
    response = result;
    await AsyncStorage.setItem(url, JSON.stringify(response));
    await AsyncStorage.setItem('T' + url, new Date().getTime().toString());
    console.log('axios');
    return response;
  } catch (err) {
    alert(err.message);
  }
};

export default fetch;
