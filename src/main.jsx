import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import LaunchDarkly SDK components

/*
We need to initialize the LaunchDarkly SDK in order to start using our flags
Add the necessary function to initialize LaunchDarkly, if you need a hint
consult this documentation: https://docs.launchdarkly.com/sdk/client-side/react/react-web */




// eslint-disable-next-line no-undef
ReactDOM.createRoot(document.querySelector('#root')).render(	
		<App />
);
