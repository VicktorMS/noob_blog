import { useState } from 'react'
import { 
  Container, 
  VStack, 
  Heading, 
  Button,
  Input,
  Box,
  useToast
} from '@chakra-ui/react'
import { usePostStore } from '../stores/post';


function CreatePage() {
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: '',
  })

  const toast = useToast();

  const { createPost } = usePostStore();

  const handleCreatePost = async () => {
		const { success, message } = await createPost(newPost);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
		}
		setNewPost({
      title: '',
      content: '',
      author: '',
    });
	};


  return (
    <Container 
      maxW={'container.sm'}
    >
      <VStack
        spacing={8}
      >
        <Heading as={"h1"}>Create a New Post</Heading>
        <Box w={"full"} bg={"white"} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Title'
							name='title'
							value={newPost.name}
							onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
						/>
						<Input
							placeholder='Content'
							name='content'
							value={newPost.content}
							onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
						/>
						<Input
							placeholder='Author'
							name='author'
							value={newPost.image}
							onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
						/>

						<Button colorScheme='blue' onClick={handleCreatePost} w='full'>
							Add Product
						</Button>
					</VStack>
				</Box>
      </VStack>
    </Container>
  )
}

export default CreatePage