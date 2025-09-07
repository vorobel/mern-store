import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { useProductStore } from "../../store/product.js";
import { useEffect } from "react";

const HomePage = () => {
    const products = useProductStore((s) => s.products);
    const fetchProducts = useProductStore((s) => s.fetchProducts);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <Container maxW="container.xl" py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize="30px"
                    fontWeight="bold"
                    bgGradient="linear(to-r, cyan.400, blue.500)"
                    bgClip="text"
                    textAlign="center"
                >
                    Current Products 🚀
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
                    {products.length > 0 &&
                        products.map((product) => <ProductCard key={product._id ?? product.id} product={product} />)}
                </SimpleGrid>

                {products.length === 0 && (
                    <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
                        No products found 😢{" "}
                        <Link to="/create">
                            <Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
                                Create a product
                            </Text>
                        </Link>
                    </Text>
                )}
            </VStack>
        </Container>
    );
};

export default HomePage;
