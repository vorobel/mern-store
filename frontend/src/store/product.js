import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],

    setProducts: (products) => set({ products }),

    fetchProducts: async () => {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const json = await res.json();
        set({ products: json.data ?? [] });
    },

    createProduct: async (newProduct) => {
        const name = newProduct.name?.trim();
        const price = String(newProduct.price ?? "").trim();
        const image = newProduct.image?.trim();

        if (!name || !price || !image) {
            return { success: false, message: "Please fill all required fields!" };
        }

        const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price: Number(price), image })
        });

        if (!res.ok) {
            const text = await res.text();
            return { success: false, message: `Server error: ${res.status} ${text}` };
        }

        const json = await res.json();
        set((state) => ({ products: [json.data, ...state.products] }));
        return { success: true, message: "Product created successfully." };
    },

    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProduct)
        });
        const data = await res.json();
        if (data.success === false) return { success: false, message: data.message };
        const updated = data.data ?? data;
        set((state) => ({
            products: state.products.map((product) =>
                product._id === pid || product.id === pid ? { ...product, ...updated } : product
            )
        }));
        return { success: true, message: data.message };
    },

    deleteProduct: async (productId) => {
        const res = await fetch(`/api/products/${productId}`, { method: "DELETE", headers: { "Content-Type": "application/json" } });
        if (!res.ok) {
            const text = await res.text();
            return { success: false, message: `Delete failed: ${res.status} ${text}` };
        }
        const json = await res.json();
        const deletedId = json?.data?._id ?? json?.data?.id ?? productId;
        set((state) => ({ products: state.products.filter((p) => p._id !== deletedId && p.id !== deletedId) }));
        return { success: true, message: "Product deleted successfully." };
    }
}));
