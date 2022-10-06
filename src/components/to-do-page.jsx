import React, { useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import {Container, Box, Button} from '@mui/material';
import { Todo } from "./to-do-input";
import { Tasks } from "./to-do-list";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import errorPage from '../assets/404-Page.png';


const theme = createTheme({
    palette: {
        mode: 'dark'
    },
});

function TodoPage() {
    const [error, setError] = useState(false);
    useEffect(() => {
        fetch('http://localhost:5000/api')
        .then (res => {
            if (!res.ok) {
                throw Error('bad connection');
            }
            return console.log(res);
        })
        .catch(err => {
            setError(true)
        }
            ) 
    }, []);

    console.log(error);
    if (error) {
    return (
            <ThemeProvider theme={theme}>
                <CssBaseline>
            <Container>
                <Box sx={{m:1, display: 'flex', flexWrap: 'wrap', paddingTop: "2ch"}}>
                <img src={errorPage} style={{width:'800px', height:'600px'}} />
                </Box>
                <Box sx={{m:1, display: 'flex', flexWrap: 'wrap', paddingTop: "2ch", alignItems: 'center', justifyContent: 'center'}}>
                    <h2>Sorry, this isn't ready yet...</h2>
                </Box>
                <Box sx={{m:1, display: 'flex', flexWrap: 'wrap', paddingTop: "2ch", alignItems: 'center', justifyContent: 'center'}}>
                <Button variant="outlined" href="/">Go Back and Try Again</Button>
                </Box>
            </Container>
            </CssBaseline>
            </ThemeProvider>
    )
    }
    else {
        return (
                <div>
                <ThemeProvider theme={theme}> 
                  <CssBaseline>  
                      <Todo />
                      <Tasks />
                  </CssBaseline>
                  </ThemeProvider> 
                  </div>
            )
            }
}
export default (TodoPage);