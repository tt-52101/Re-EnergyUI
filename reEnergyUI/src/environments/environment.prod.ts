export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  },

  totalCtrl_hosp: 1000,
  totalCtrl_center: 1000,
  //PaymentFor: 'live', // rrc live/test/local
  PaymentFor: 'test',  //test
  reportUrl: 'http://aeltest.nabh.co:5008/',//test
  apiUrl: 'http://aeltest.nabh.co:5002/api/',// test 'https://aelc.nabh.co:5002/api/'


  // reportUrl: 'http://aelc.nabh.co:5004/', //live
  // apiUrl: 'https://aelc.nabh.co:5002/api/', //for live server
};
