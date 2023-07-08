import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

const MenuCard = ({ menuFood }) => {
    const {name,imgSrc,price,qty}=menuFood;

  return (
    <Card maxW="sm" bgColor='gray.400' maxWidth ='300px' m={2}  >
      <CardBody>
        <Image
          src={imgSrc}
          alt={name}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
          <Text>Rs {price} for {qty}</Text>
          <Text>Pizza Plaza </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default MenuCard;
