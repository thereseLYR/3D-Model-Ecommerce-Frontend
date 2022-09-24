import React, { useState, useContext } from 'react';
import { Heading } from '@chakra-ui/react';
import BackendUrlContext from '../components/BackendUrl.jsx';


const Landing = ({ setUser }) => {
  const { backendUrl } = useContext(BackendUrlContext);

  return (
    <Heading>This is Landing Page</Heading>
  );
};

export default Landing;

