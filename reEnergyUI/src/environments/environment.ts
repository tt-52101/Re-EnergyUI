// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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
  // PaymentFor: 'live', // rrc live/test/local
  PaymentFor: 'local',
  
    reportUrl: 'http://localhost:49360/',
    apiUrl: 'http://localhost:50970/api/',  // local

// reportUrl: 'http://aeltest.nabh.co:5004/',//test
// apiUrl: 'http://13.232.213.66:5004/api/', // test

  // reportUrl: 'http://aelc.nabh.co:5004/', //live
 //  apiUrl: 'https://aelc.nabh.co:5002/api/',   // live
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
