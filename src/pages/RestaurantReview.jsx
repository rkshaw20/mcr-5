import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useParams, Link as ReachLink } from 'react-router-dom';
import { useDataContext } from '../context/DataContextProvider';

import { BiArrowBack } from 'react-icons/bi';
import { useRef, useState } from 'react';

const RestaurantReview = () => {
  const { id: restaurantIdFromParam } = useParams();
  const { restaurantsData } = useDataContext();
  const initialValue = { rating: '', comment: '' };
  const [inputValue, setInputValue] = useState(initialValue);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const selectedRestaurant = restaurantsData.find(
    restaurant => restaurant.id === +restaurantIdFromParam
  );
  console.log(selectedRestaurant);

  const handleInput = e => {
    setInputValue(prev => ({
      ...prev,
      [e.target.name]:
        e.target.name === 'rating' ? Number(e.target.value) : e.target.value,
    }));
  };

  const handleModalSubmit = () => {
console.log(inputValue);
    const review = {
      ...inputValue,
      revName: 'Raj',
      pp: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5tbKdv1HDbAjPc526SK0yDZuoOmaaOyGNoj_e1q3ngruK2bTqzub3&s=0',
    };

    selectedRestaurant.ratings.push(review);
    onClose();
    setInputValue(initialValue);
  };

  return (
    <Flex mt={4} m={2} w="full" h="full" flexDir="column">
      <Link as={ReachLink} to="/">
        <Icon as={BiArrowBack} fontSize="3xl" />
      </Link>
      <Flex alignItems="center" w="full">
        <Flex flexDir="column">
          <Heading>{selectedRestaurant.name}</Heading>
          <Flex gap={4}>
            {selectedRestaurant?.menu.map(({ name, i }) => (
              <Text key={i}>{name}</Text>
            ))}
          </Flex>
          <Text>{selectedRestaurant.address}</Text>
          <Text>Average Rating: {selectedRestaurant.averageRating}</Text>
          <Divider />
        </Flex>
        <Button bgColor="red.400" onClick={() => onOpen()}>
          Add Review
        </Button>
      </Flex>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        colorScheme="red"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Your Review</ModalHeader>
          <ModalCloseButton />
          {/* <form onSubmit={()=>handleFormSubmit()} > */}
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Rating</FormLabel>
              <Select
                name="rating"
                onChange={handleInput}
                placeholder="select rating"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Comments</FormLabel>
              <Input name="comments" onChange={handleInput} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleModalSubmit}>
              Submit
            </Button>
            {/* <Button onClick={onClose}>Cancel</Button> */}
          </ModalFooter>
          {/* </form> */}
        </ModalContent>
      </Modal>

      <Flex flexDir="column" mt="1rem">
        <Text fontWeight="bold">Reviews</Text>
        <Flex flexDir="column" maxW="600px" gap={4}>
          {selectedRestaurant.ratings.map(rating => {
            return (
              <Flex justifyContent="space-between">
                <Flex flexDir="column">
                  <Flex gap={2}>
                    <Avatar src={rating.pp} name={rating.revName} />
                    <Text fontWeight="bold">{rating.revName}</Text>
                  </Flex>

                  <Text>{rating.comment}</Text>
                </Flex>
                <Flex>
                  <Text bgColor="red.400" rounded="md" h="fit-content" p={2}>
                    {rating.rating}
                  </Text>
                </Flex>
                {/* <Divider/> */}
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RestaurantReview;
