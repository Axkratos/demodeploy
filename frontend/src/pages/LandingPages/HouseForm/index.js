import React, { useState } from 'react';
import axios from 'axios';
import { TextField, MenuItem, Checkbox, FormControlLabel, Grid, Paper, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import MKBox from 'components/MKBox'; // Assuming MKBox is a custom component
import MKTypography from 'components/MKTypography'; // Assuming MKTypography is a custom component
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/CenteredFooter";
import routes from "routes";
import footerRoutes from "footer.routes";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '2rem',
  marginTop: '2rem',
  boxShadow: theme.shadows[5],
}));

const HouseForm = () => {
    const [formData, setFormData] = useState({
        Bedroom: '',
        Bathroom: '',
        Floors: '',
        Year: '',
        RoadWidth: '',
        Area_in_sqft: '',
        Backyard: false,
        Balcony: false,
        Fencing: false,
        Frontyard: false,
        Parking: '',
        Garden: false,
        Jacuzzi: false,
        KidsPlayground: false,
        Lawn: false,
        ModularKitchen: false,
        StoreRoom: false,
        SwimmingPool: false,
        Face: '',
        RoadType: '',
        City: ''
    });

    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const faceOptions = [
        'Face_East', 'Face_North', 'Face_North East', 'Face_North West',
        'Face_South', 'Face_South East', 'Face_South West', 'Face_West'
    ];

    const roadTypeOptions = [
        'Road Type_Alley', 'Road Type_Blacktopped', 'Road Type_Concrete',
        'Road Type_Gravelled', 'Road Type_Paved', 'Road Type_Soil Stabilized', 'Road Type_Unknown'
    ];

    const cityOptions = [
        'City_Bhaktapur', 'City_Kathmandu', 'City_Lalitpur'
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleCityChange = (e) => {
        setFormData({
            ...formData,
            City: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setShowPopup(true);
        setPopupMessage('Please note that this is only a predicted value and not the true price. Calculating...');

        const featureNames = [
            'Bedroom', 'Bathroom', 'Floors', 'Year', 'Road Width', 'Area_in_sqft',
            'Backyard', 'Balcony', 'Fencing', 'Frontyard', 'Parking', 'Garden', 
            'Jacuzzi', 'Kids Playground', 'Lawn', 'Modular Kitchen', 'Store Room', 
            'Swimming Pool', 'City_Bhaktapur', 'City_Kathmandu', 'City_Lalitpur', 
            'Face_East', 'Face_North', 'Face_North East', 'Face_North West', 
            'Face_South', 'Face_South East', 'Face_South West', 'Face_West',
            'Parking_0', 'Parking_1', 'Road Type_ Alley', 'Road Type_ Blacktopped', 
            'Road Type_ Concrete', 'Road Type_ Gravelled', 'Road Type_ Paved', 
            'Road Type_ Soil Stabilized', 'Road Type_Unknown'
        ];

        const featuresArray = new Array(featureNames.length).fill(0);

        featuresArray[featureNames.indexOf('Bedroom')] = parseInt(formData.Bedroom) || 0;
        featuresArray[featureNames.indexOf('Bathroom')] = parseInt(formData.Bathroom) || 0;
        featuresArray[featureNames.indexOf('Floors')] = parseInt(formData.Floors) || 0;
        featuresArray[featureNames.indexOf('Year')] = parseInt(formData.Year) || 0;
        featuresArray[featureNames.indexOf('Road Width')] = parseInt(formData.RoadWidth) || 0;
        featuresArray[featureNames.indexOf('Area_in_sqft')] = parseInt(formData.Area_in_sqft) || 0;
        featuresArray[featureNames.indexOf('Backyard')] = formData.Backyard ? 1 : 0;
        featuresArray[featureNames.indexOf('Balcony')] = formData.Balcony ? 1 : 0;
        featuresArray[featureNames.indexOf('Fencing')] = formData.Fencing ? 1 : 0;
        featuresArray[featureNames.indexOf('Frontyard')] = formData.Frontyard ? 1 : 0;
        featuresArray[featureNames.indexOf('Parking')] = formData.Parking === 'Type0' ? 1 : (formData.Parking === 'Type1' ? 1 : 0);
        featuresArray[featureNames.indexOf('Garden')] = formData.Garden ? 1 : 0;
        featuresArray[featureNames.indexOf('Jacuzzi')] = formData.Jacuzzi ? 1 : 0;
        featuresArray[featureNames.indexOf('Kids Playground')] = formData.KidsPlayground ? 1 : 0;
        featuresArray[featureNames.indexOf('Lawn')] = formData.Lawn ? 1 : 0;
        featuresArray[featureNames.indexOf('Modular Kitchen')] = formData.ModularKitchen ? 1 : 0;
        featuresArray[featureNames.indexOf('Store Room')] = formData.StoreRoom ? 1 : 0;
        featuresArray[featureNames.indexOf('Swimming Pool')] = formData.SwimmingPool ? 1 : 0;
        featuresArray[featureNames.indexOf('City_Bhaktapur')] = formData.City === 'City_Bhaktapur' ? 1 : 0;
        featuresArray[featureNames.indexOf('City_Kathmandu')] = formData.City === 'City_Kathmandu' ? 1 : 0;
        featuresArray[featureNames.indexOf('City_Lalitpur')] = formData.City === 'City_Lalitpur' ? 1 : 0;

        faceOptions.forEach(option => {
            featuresArray[featureNames.indexOf(option)] = option === formData.Face ? 1 : 0;
        });

        roadTypeOptions.forEach(option => {
            featuresArray[featureNames.indexOf(option)] = option === formData.RoadType ? 1 : 0;
        });

        if (featuresArray.length !== featureNames.length) {
            console.error(`Feature length mismatch: Expected ${featureNames.length}, got ${featuresArray.length}`);
            setLoading(false);
            return;
        }

        try {
            setTimeout(async () => {
                try {
                    const response = await axios.post('http://localhost:5000/api/predict', {
                        feature_names: featureNames,
                        features: featuresArray
                    });

                    setPopupMessage(`The predicted price is Rs ${response.data.prediction}`);
                } catch (error) {
                    console.error('Error fetching prediction:', error);
                    setPopupMessage('An error occurred while fetching the prediction.');
                }
                setLoading(false);
            }, 1000); // Simulated delay
        } catch (error) {
            console.error('Error submitting form:', error);
            setPopupMessage('An error occurred while submitting the form.');
            setLoading(false);
        }
    };

    return (
        <>
            
                <DefaultNavbar routes={routes} />
                <MKBox component="main" sx={{ flexGrow: 1, py: 6, px: 3 }}>
                    <StyledPaper>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Bedroom"
                                        name="Bedroom"
                                        type="number"
                                        value={formData.Bedroom}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Bathroom"
                                        name="Bathroom"
                                        type="number"
                                        value={formData.Bathroom}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Floors"
                                        name="Floors"
                                        type="number"
                                        value={formData.Floors}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Year"
                                        name="Year"
                                        type="number"
                                        value={formData.Year}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Road Width"
                                        name="RoadWidth"
                                        type="number"
                                        value={formData.RoadWidth}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Area in sqft"
                                        name="Area_in_sqft"
                                        type="number"
                                        value={formData.Area_in_sqft}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        select
                                        label="City"
                                        name="City"
                                        value={formData.City}
                                        onChange={handleCityChange}
                                        fullWidth
                                    >
                                        {cityOptions.map(option => (
                                            <MenuItem key={option} value={option}>
                                                {option.replace('City_', '')}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        select
                                        label="Face"
                                        name="Face"
                                        value={formData.Face}
                                        onChange={handleChange}
                                        fullWidth
                                    >
                                        {faceOptions.map(option => (
                                            <MenuItem key={option} value={option}>
                                                {option.replace('Face_', '')}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        select
                                        label="Road Type"
                                        name="RoadType"
                                        value={formData.RoadType}
                                        onChange={handleChange}
                                        fullWidth
                                    >
                                        {roadTypeOptions.map(option => (
                                            <MenuItem key={option} value={option}>
                                                {option.replace('Road Type_', '')}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <FormControlLabel
                                                control={<Checkbox checked={formData.Backyard} onChange={handleChange} name="Backyard" />}
                                                label="Backyard"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={formData.Balcony} onChange={handleChange} name="Balcony" />}
                                                label="Balcony"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={formData.Fencing} onChange={handleChange} name="Fencing" />}
                                                label="Fencing"
                                            />
                                             <FormControlLabel
                                                control={<Checkbox checked={formData.Parking} onChange={handleChange} name="Parking" />}
                                                label="Parking"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={formData.Frontyard} onChange={handleChange} name="Frontyard" />}
                                                label="Frontyard"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={formData.Garden} onChange={handleChange} name="Garden" />}
                                                label="Garden"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={formData.Jacuzzi} onChange={handleChange} name="Jacuzzi" />}
                                                label="Jacuzzi"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControlLabel
                                                control={<Checkbox checked={formData.KidsPlayground} onChange={handleChange} name="KidsPlayground" />}
                                                label="Kids Playground"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={formData.Lawn} onChange={handleChange} name="Lawn" />}
                                                label="Lawn"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={formData.ModularKitchen} onChange={handleChange} name="ModularKitchen" />}
                                                label="Modular Kitchen"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={formData.StoreRoom} onChange={handleChange} name="StoreRoom" />}
                                                label="Store Room"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={formData.SwimmingPool} onChange={handleChange} name="SwimmingPool" />}
                                                label="Swimming Pool"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} container justifyContent="center">
                                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                                        {loading ? <CircularProgress size={24} /> : 'Predict'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </StyledPaper>
                    <Dialog
                        open={showPopup}
                        onClose={() => setShowPopup(false)}
                    >
                        <DialogTitle>Prediction Result</DialogTitle>
                        <DialogContent>
                            <MKTypography variant="body1">
                                {popupMessage}
                            </MKTypography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setShowPopup(false)} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </MKBox>
                <DefaultFooter
                    content={<MKTypography variant="body1">&copy; {new Date().getFullYear()} Adevi. All rights reserved.</MKTypography>}
                    routes={footerRoutes}
                />
            </>
        );
    }
export default HouseForm;
