import React from 'react';
import ReactDOM from 'react-dom/client';
import {asyncWithLDProvider} from 'launchdarkly-react-client-sdk';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import Paths from './components/routes';

(async () => {
	// IMPORTANT NOTE: if you've checked out step two of the branch, you will need to re-add your SDK key. Create a .env file and use VITE_LD_CLIENT_KEY as your variable
	const LDProvider = await asyncWithLDProvider({
		clientSideID: import.meta.env.VITE_LD_CLIENT_KEY,
		user: {
			key: 'anonymous',
		},
	});

	// eslint-disable-next-line no-undef
	ReactDOM.createRoot(document.querySelector('#root')).render(
		<LDProvider>
			<Paths>
				<App />
			</Paths>
		</LDProvider>,
	);
})();
