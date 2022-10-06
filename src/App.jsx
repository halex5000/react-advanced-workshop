import * as React from 'react'; // eslint-disable-line unicorn/filename-case
import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import {useTheme, ThemeProvider, createTheme} from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CssBaseline from '@mui/material/CssBaseline';
import {Container} from '@mui/material';
import TopToolBar from './components/top-toolbar';
import ImageMasonry from './components/image-masonry';
import {useLDClient} from 'launchdarkly-react-client-sdk';



const ColorModeContext = React.createContext({toggleColorMode() {}});

function Toggler() {
	const theme = useTheme();
	const colorMode = React.useContext(ColorModeContext);
	return (
		<AppBar
			position="sticky"
			color="inherit"
			sx={{top: 'auto', bottom: 0, width: '100%'}}
		>
			<Toolbar color="inherit">
				<Box
					sx={{
						display: 'flex',
						width: '100%',
						alignItems: 'center',
						justifyContent: 'center',
						bgcolor: 'background.default',
						color: 'text.primary',
						borderRadius: 1,
						p: 3,
					}}
				>
					{theme.palette.mode} mode
					<IconButton
						sx={{ml: 1}}
						color="inherit"
						onClick={colorMode.toggleColorMode}
					>
						{theme.palette.mode === 'dark' ? (
							<Brightness7Icon />
						) : (
							<Brightness4Icon />
						)}
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

function MyApp() {	
	const [userName, setUserName] = React.useState();
	const ldClient = useLDClient();

	useEffect(() => {
		if (userName) {
			ldClient.identify({key: userName});
			console.log(userName);
		}
	}, [userName])
		
	return (
		<>
			<TopToolBar userName={userName} setUserName={setUserName} />
			<Container
				sx={{
					width: '1',
				}}
			>
			<ImageMasonry />
			</Container>
			<Container>
			</Container>
			<Toggler />
		</>
	);
}


export default function ToggleColorMode() {
	const [mode, setMode] = React.useState('light');
	const colorMode = React.useMemo(
		() => ({
			toggleColorMode() {
				setMode((previousMode) =>
					previousMode === 'light' ? 'dark' : 'light',
				);
			},
		}),
		[],
	);

	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode],
	);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<MyApp />
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}
