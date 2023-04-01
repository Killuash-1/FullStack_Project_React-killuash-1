import { Box,  Grid } from "@chakra-ui/react";
import ContactsList from "../../components/ContactsCard";
import Header from "../../components/header";

import UserCard from "../../components/UserCard";

function HomePage() {
  return (
    <>
      <Header isHomePage />
      <Box p={8}>
        <Grid templateColumns={{ base: "1fr", md: "2fr" }} gap={8}>
          <UserCard />
          <ContactsList />
        </Grid>
      </Box>
    </>
  );
}

export default HomePage;
