// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Images
import bgFront from "assets/images/rotating-card-bg-front.jpeg";
import bgBack from "assets/images/rotating-card-bg-back.jpeg";

function Information() {
  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                icon="touch_app"
                title={
                  <>
                    Predict Your
                    <br />
                    House Price
                  </>
                }
                description="Utilize our advanced AI model to get accurate house price predictions based on your property details."
              />
              <RotatingCardBack
                image={bgBack}
                title="Start Your Prediction"
                description="Get instant insights and predictions for your house's market value. Begin by entering your property details."
                action={{
                  type: "internal",
                  route: "/predict",
                  label: "Go to Prediction",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="analytics"
                  title="Accurate Predictions"
                  description="Our AI-driven model provides precise price estimates based on extensive market data and trends."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="support"
                  title="Expert Support"
                  description="Our team of real estate experts is here to assist you with any questions or concerns you may have."
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="alarm"
                  title="Save Time"
                  description="Skip the hassle of manual calculations and get quick, reliable price estimates in just a few clicks."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="mobile_friendly"
                  title="Mobile-Friendly"
                  description="Access our prediction tool on any device, ensuring a seamless experience whether you're on mobile or desktop."
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
