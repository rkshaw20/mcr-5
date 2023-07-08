import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import RestaurantReview from './pages/RestaurantReview';


const router = createBrowserRouter([

  {
    path:'/',element:<Home/>
  },
  {
    path:'/restaurant/:id' , element:<RestaurantReview/>
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
