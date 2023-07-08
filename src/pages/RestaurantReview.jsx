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

  const handleInput = e => {
    setInputValue(prev => ({
      ...prev,
      [e.target.name]:
        e.target.name === 'rating' ? Number(e.target.value) : e.target.value,
    }));
  };

  const handleModalSubmit = () => {
    const review = {
      rating: inputValue.rating,
      comment: inputValue.comment,
      revName: 'Raj',
      pp: 'https://res.cloudinary.com/dn5zs5sqx/image/upload/v1687185484/FhNGqSr__400x400_fnkcno.jpg',
    };
    // selectedRestaurant.averageRating =
    //   selectedRestaurant.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
    //   selectedRestaurant.ratings.length;

    selectedRestaurant.ratings.push(review);
    onClose();
    setInputValue(initialValue);
  };

  return (
    <Flex
      mt={4}
      m={2}
      w="full"
      h="full"
      flexDir="column"
      justifyContent="center"
    >
      <Link as={ReachLink} to="/">
        <Icon as={BiArrowBack} fontSize="3xl" />
      </Link>
      <Flex alignItems="center" w="full" justifyContent="center">
        <Flex flexDir="column">
          <Heading>{selectedRestaurant.name}</Heading>
          <Flex gap={3}>
            {selectedRestaurant?.menu.map(({ name, i }) => (
              <Text key={i}>{name}</Text>
            ))}
          </Flex>
          <Text>{selectedRestaurant.address}</Text>
          <Text>Average Rating: {selectedRestaurant.averageRating}</Text>
          <Divider />
        </Flex>
        <Button m={1} bgColor="red.400" onClick={() => onOpen()}>
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
              <Input name="comment" onChange={handleInput} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleModalSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex flexDir="column" mt="1rem" alignItems="center">
        <Text fontWeight="bold">Reviews</Text>
        <Flex flexDir="column" maxW="600px" gap={4}>
          {selectedRestaurant.ratings.map((rating, i) => {
            return (
              <Flex justifyContent="space-between" key={i} w="500px">
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
