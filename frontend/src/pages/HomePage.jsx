import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePostStore } from "../stores/post.js";
import PostCard from "../components/PostCard";


function HomePage() {
  const {fetchPosts, posts} = usePostStore();

  useEffect(() =>{
    fetchPosts();
  }, [])


  return (
    <Container maxW='container.xl' py={12}>
    <VStack spacing={8}>
      <Text
        fontSize={"30"}
        fontWeight={"bold"}
        bgGradient={"linear(to-r, cyan.400, blue.500)"}
        bgClip={"text"}
        textAlign={"center"}
      >
        Current Posts 🚀
      </Text>

      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg: 3,
        }}
        spacing={10}
        w={"full"}
      >
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </SimpleGrid>

      {posts.length === 0 && (
        <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
          No posts found 😢{" "}
          <Link to={"/create"}>
            <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
              Create a post
            </Text>
          </Link>
        </Text>
      )}
    </VStack>
  </Container>

  )
}

export default HomePage