import {
  Button,
  Container,
  Flex,
  HStack,
  Link,
  Text
} from "@chakra-ui/react"
import { IoNewspaperSharp } from "react-icons/io5";


function Navbar() {
  return (
    <Container 
      width={'full'} 
      maxWidth={'container.lg'} 
      p={4} 
    >
      <Flex
        h={16}
        alignItems='center'
        justifyContent={'space-between'}
        flexDir={{
          base: 'column',
          sm: 'row'
        }}
      >
        <Text
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip={'text'}
          textAlign={'center'}
          textTransform={'uppercase'}
          fontSize={{ base: '3xl', sm: '6xl' }}
          fontWeight='extrabold'
        >
          <Link href='/' style={{ display: 'flex', alignItems: 'center' }}>Noob Blog <IoNewspaperSharp color="#7928CA" /></Link>
        </Text>
        <HStack spacing={2} alignItems={'center'}>
          <Link href='/create'>
            <Button>Create Post</Button>
          </Link>
        </HStack>
      </Flex>

    </Container>
  )
}

export default Navbar