import { Button, Flex, Heading, Link } from '@chakra-ui/react';
import { useDataContext } from '../context/DataContextProvider';
import { useState } from 'react';
import { Link as ReachLink } from 'react-router-dom';
import MenuCard from '../component/MenuCard';

const Home = () => {
  const { cuisineData, restaurantsData } = useDataContext();
  const [restaurants, setRestaurants] = useState({});

  const handleClick = id => {
    let restaurantObj = restaurantsData.filter(
      ({ cuisine_id }) => cuisine_id === id
    );
    setRestaurants(restaurantObj);
  };
  return (
    <Flex m={2} flexDir="column" h="full" alignItems="center" gap={2}>
      <Heading>Food Ordereing App </Heading>
      <Heading size="md">Select Your Cuisine:</Heading>
      <Flex flexDir="column" gap={6}>
        <Flex gap={4}>
          {cuisineData.map(cuisine => (
            <Button
              key={cuisine.id}
              bgColor="red.400"
              onClick={() => handleClick(cuisine.id)}
            >
              {cuisine.name}
            </Button>
          ))}
        </Flex>
        <Flex flexDir='column' >
          {/* {  } */}
            {restaurants.length > 0 &&
              restaurants.map(restaurant => {
                return (
                  <Flex key={restaurant.id} gap={2} flexDir='column' >
                    <Heading>{restaurant.name}</Heading>
                    <Link as={ReachLink} to={`/restaurant/${restaurant.id}`} >
                      <Flex>
                      {restaurant.menu.map((menuFood, menuId) => (
                        <MenuCard key={menuId} menuFood={menuFood} />
                      ))}
                      </Flex>
                      
                     
                    </Link>
                  </Flex>
                );
              })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
