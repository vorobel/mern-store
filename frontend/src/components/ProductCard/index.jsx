import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../../store/product.js";
import { useEffect, useState } from "react";

const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const deleteProduct = useProductStore((s) => s.deleteProduct);
    const updateProduct = useProductStore((s) => s.updateProduct);

    const toast = useToast();

    // Update modal
    const { isOpen, onOpen, onClose } = useDisclosure();
    // Details modal
    const {
        isOpen: isDetailsOpen,
        onOpen: onOpenDetails,
        onClose: onCloseDetails,
    } = useDisclosure();

    useEffect(() => {
        if (isOpen) setUpdatedProduct(product);
    }, [isOpen, product]);

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        toast({
            title: success ? "Success" : "Error",
            description: message,
            status: success ? "success" : "error",
            duration: 3000,
            isClosable: true,
        });
    };

    const handleUpdateProduct = async (pid, payload) => {
        const { success, message } = await updateProduct(pid, payload);
        onClose();
        toast({
            title: success ? "Success" : "Error",
            description: success ? "Product updated successfully" : message,
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
            bg={bg}
            cursor="pointer"
            onClick={onOpenDetails} // ⬅️ open details on click anywhere on the card
        >
            <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />

            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
                    ${product.price}
                </Text>

                <HStack spacing={2}>
                    <IconButton
                        icon={<EditIcon />}
                        colorScheme="blue"
                        onClick={(e) => {
                            e.stopPropagation(); // ⬅️ prevent opening details
                            onOpen();
                        }}
                    />
                    <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        onClick={(e) => {
                            e.stopPropagation(); // ⬅️ prevent opening details
                            handleDeleteProduct(product._id);
                        }}
                    />
                </HStack>
            </Box>

            {/* Details Modal */}
            <Modal isOpen={isDetailsOpen} onClose={onCloseDetails}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Product Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4} align="stretch">
                            <Image
                                src={product.image}
                                alt={product.name}
                                rounded="md"
                                objectFit="cover"
                                maxH="240px"
                            />
                            <Box>
                                <Text fontWeight="bold">Name:</Text>
                                <Text>{product.name}</Text>
                            </Box>
                            <Box>
                                <Text fontWeight="bold">Price:</Text>
                                <Text>${product.price}</Text>
                            </Box>
                            {product.createdAt && (
                                <Box>
                                    <Text fontWeight="bold">Created:</Text>
                                    <Text>{new Date(product.createdAt).toLocaleString()}</Text>
                                </Box>
                            )}
                            <Box>
                                <Text fontWeight="bold">ID:</Text>
                                <Text fontSize="sm" color="gray.500">
                                    {product._id ?? product.id}
                                </Text>
                            </Box>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onCloseDetails}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Update Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Product Name"
                                name="name"
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                            <Input
                                placeholder="Price"
                                name="price"
                                type="number"
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                            <Input
                                placeholder="Image URL"
                                name="image"
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
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

export default ProductCard;
