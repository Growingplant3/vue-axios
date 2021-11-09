import axios from 'axios';

// カスタムインスタンスの作成
const instance = axios.create({ 
  baseURL: 'https://identitytoolkit.googleapis.com/v1',
});

export default instance;