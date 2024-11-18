import { Box, Grid, Paper, Stack } from '@mui/material'
import React from 'react'

const MuiLayout = () => {
  return (
    <Paper sx={{backgroundColor:'white', padding:'32px'}} elevation={4}>
    <Stack sx={{border : '1px solid black'}} direction='row' spacing={2}>

    <Box 
    sx={{
        backgroundColor : 'primary.main',
        color : 'white',
        height : '100px',
        width : '100px',
        padding : '16px'
    }}
    >
        Dell
    </Box>

    <Box 
    display='flex'
    height='100px'
    width='100px'
    bgcolor='success.light'
    p={2}
    ></Box>
    </Stack>

    <Grid container my={2}>
        <Grid item xs>
            <Box bgcolor='primary.light' p={2}>Item 1</Box>
        </Grid>
        <Grid item xs>
            <Box bgcolor='primary.light' p={2}>Item 2</Box>
        </Grid>
        <Grid item xs>
            <Box bgcolor='primary.light' p={2}>Item 3</Box>
        </Grid>
        <Grid item xs>
            <Box bgcolor='primary.light' p={2}>Item 4</Box>
        </Grid>
    </Grid>
    </Paper>
  )
}

export default MuiLayout