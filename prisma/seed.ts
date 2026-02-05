import prisma from "@/lib/prisma";
import { Prisma, ProductStatus } from "@prisma/client";
import 'dotenv/config';

const categories: Prisma.CategoryCreateInput[] = []

const createProducts = async (categoryName: string) => {
    const randomProductsCount = Math.floor(Math.random() * 10);

    const products = Array.from({ length: randomProductsCount }, (_, i) => ({
        name: `product ${i + 1}`,
        description: "this is a dummy product to test the db, and the api",
        price: Math.floor(Math.random() * 91) + 10,
        imgs: [
            {
                url: `https://placehold.co/300x300?text=Product+Image+${i + 1}`,
                alt: `product ${i + 1} img ${i}`
            },
            {
                url: `https://placehold.co/300x300?text=Product+Image+${i + 1}`,
                alt: `product ${i + 1} img ${i}`
            },
            {
                url: `https://placehold.co/300x300?text=Product+Image+${i + 1}`,
                alt: `product ${i + 1} img ${i}`
            },
            {
                url: `https://placehold.co/300x300?text=Product+Image+${i + 1}`,
                alt: `product ${i + 1} img ${i}`
            },
        ],
        // status: ["DRAFT", "ACTIVE", "OUT_OF_STOCK", "DISCONTINUED"][Math.floor(Math.random() * 4)] as Prisma.CategoryCreateInput.ProductStatus,
        status: Object.values(ProductStatus)[Math.floor(Math.random() * Object.values(ProductStatus).length)],
        salesCount: Math.floor(Math.random() * 100),
        category: { connect: { name: categoryName } }
    }))

    for (const product of products) { 
        await prisma.product.create({data: product})
    }
}

const createCategories = async () => {
    for(let i = 0; i < 10; i++) {
        categories.push({
            name: `category ${i + 1}`,
            description: "this category is for tesing the db and the api",
        })
    }

    await prisma.category.createMany({data: categories});
}

const fetchCategoris = async () => {
    return await prisma.category.findMany();
}

export async function main() {
    // create 10 categoris
    await createCategories();

    // fetch categories
    const dbCategoris = await fetchCategoris();

    // create products
    for (const c of dbCategoris) {
        await createProducts(c.name);
    }
}

main();