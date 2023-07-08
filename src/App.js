import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import RecipieDetails from './pages/RecipieDetails';


const router = createBrowserRouter([

  {
    path:'/',element:<Home/>
  },
  {
    path:'/:itemId' , element:<RecipieDetails/>
  }

]);
function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router}/>
    </ChakraProvider>
  );
}

export default App;
