import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { usePostStore } from "../stores/post.js";
import { useState } from "react";

const PostCard = ({ post }) => {
    const [updatedPost, setUpdatedPost] = useState(post);
    const { deletePost, updatePost } = usePostStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeletePost = async (pid) => {
        const { success, message } = await deletePost(pid);
        toast({
            title: success ? "Success" : "Error",
            description: message,
            status: success ? "success" : "error",
            duration: 3000,
            isClosable: true,
        });
    };

    const handleUpdatePost = async (pid, updatedPost) => {
        const { success, message } = await updatePost(pid, updatedPost);
        onClose();
        toast({
            title: success ? "Success" : "Error",
            description: success
                ? "Post updated successfully"
                : message,
            status: success ? "success" : "error",
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Box
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        >
            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {post.title}
                </Heading>

                <Text fontWeight="bold" fontSize="xl" mb={4}>
                    {post.author}
                </Text>

                <HStack spacing={2}>
                    <IconButton
                        icon={<EditIcon />}
                        onClick={onOpen}
                        colorScheme="blue"
                    />
                    <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => handleDeletePost(post._id)}
                        colorScheme="red"
                    />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Post Title"
                                name="title"
                                value={updatedPost.title}
                                onChange={(e) =>
                                    setUpdatedPost({
                                        ...updatedPost,
                                        title: e.target.value,
                                    })
                                }
                            />
                            <Input
                                placeholder="Content"
                                name="content"
                                value={updatedPost.content}
                                onChange={(e) =>
                                    setUpdatedPost({
                                        ...updatedPost,
                                        content: e.target.value,
                                    })
                                }
                            />
                            <Input
                                placeholder="Author"
                                name="author"
                                value={updatedPost.author}
                                onChange={(e) =>
                                    setUpdatedPost({
                                        ...updatedPost,
                                        author: e.target.value,
                                    })
                                }
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() =>
                                handleUpdatePost(post._id, updatedPost)
                            }
                        >
                            Update
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default PostCard;
