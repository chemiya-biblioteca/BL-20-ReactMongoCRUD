

import { Box, Typography, styled } from '@mui/material';



const Header = styled(Box)`
    margin: 50px;
    & > div {
        margin-top: 50px;
    }
`;//creo elemento con estilo

const Image = styled('img')({
    width: '50%',
    height: '50%'
});

const CodeForInterview = () => {

    return (
        <Header>{/**muestro el elemento */}
            
        </Header>
    )
}

export default CodeForInterview;