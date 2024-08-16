import React, { useState } from 'react';
import { Grid, Box, Typography, Button, TextField } from '@mui/material';
import DefaultNavbar from 'examples/Navbars/DefaultNavbar';
import DefaultFooter from 'examples/Footers/CenteredFooter';
import bgImage from 'assets/images/illustrations/illustration-reset.jpg';
import axios from 'axios';
import routes from "routes";
import footerRoutes from "footer.routes";
function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    messageBody: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Sending...');
    
    try {
        const response = await axios.post('http://localhost:5000/api/contact', new URLSearchParams(formData), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        setStatus('Message sent successfully');
    } catch (error) {
        console.error('Error sending message:', error.response || error.message);
        setStatus('Failed to send message');
    }
};


  return (
    <>
      <Box position="fixed" top="0.5rem" width="100%">
        <DefaultNavbar routes={routes} />
      </Box>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} lg={6}>
          <Box
            display={{ xs: 'none', lg: 'flex' }}
            width="calc(100% - 2rem)"
            height="calc(100vh - 2rem)"
            borderRadius="lg"
            ml={2}
            mt={2}
            sx={{ backgroundImage: `url(${bgImage})` }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={10}
          md={7}
          lg={6}
          xl={4}
          ml={{ xs: 'auto', lg: 6 }}
          mr={{ xs: 'auto', lg: 6 }}
        >
          <Box
            bgColor="white"
            borderRadius="xl"
            shadow="lg"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mt={{ xs: 20, sm: 18, md: 20 }}
            mb={{ xs: 20, sm: 18, md: 20 }}
            mx={3}
          >
            <Box
              variant="gradient"
              bgColor="info"
              coloredShadow="info"
              borderRadius="lg"
              p={2}
              mx={2}
              mt={-3}
            >
              <Typography variant="h3" color="white">
                Contact us
              </Typography>
            </Box>
            <Box p={3}>
              <Typography variant="body2" color="text" mb={3}>
                For further questions, including partnership opportunities, please email
                certifiedweeb269@gmail.com or contact using our contact form.
              </Typography>
              <Box width="100%" component="form" method="post" autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="standard"
                      label="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      type="email"
                      variant="standard"
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      label="What can we help you?"
                      placeholder="Describe your problem in at least 250 characters"
                      name="messageBody"
                      value={formData.messageBody}
                      onChange={handleChange}
                      multiline
                      fullWidth
                      rows={6}
                    />
                  </Grid>
                </Grid>
                <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
                  <Button type="submit" variant="gradient" color="info">
                    Send Message
                  </Button>
                </Grid>
                <Typography variant="body2" color="text" align="center">
                  {status}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </Box>
    </>
  );
}

export default ContactUs;
