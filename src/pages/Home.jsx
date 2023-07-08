
import { useState } from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Flex, Heading } from '@chakra-ui/react';

const Home = () => {
  const [value, setValue] = useState();
  return (
    <Flex m={4} flexDir='column'  h='full'  alignItems='center' >
      <Heading>Food </Heading>
    </Flex>
  );
};

export default Home;
