import prisma from "@/lib/prisma";
import { ProductStatus, OrderStatus, OrderPayment, Categories, Products } from "@prisma/client";
import "dotenv/config";

async function resetDatabase() {
    await prisma.orderItem.deleteMany();
    await prisma.orders.deleteMany();
    await prisma.products.deleteMany();
    await prisma.categories.deleteMany();
}

function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function createCategories(): Promise<Categories[]> {
    const categories = Array.from({ length: 5 }, (_, i) => ({
        name: `Category ${i + 1}`,
        description: "Seeded category",
    }));

    await prisma.categories.createMany({ data: categories });

    return prisma.categories.findMany();
}

async function createProducts(categories: Categories[]) {
    const createdProducts = [];

    for (const category of categories) {
        const count = randomInt(3, 8);

        for (let i = 0; i < count; i++) {
            const product = await prisma.products.create({
                data: {
                    name: `Product ${i + 1} - ${category.name}`,
                    description: "Dummy product",
                    price: randomInt(10, 100),
                    discount: randomInt(0, 20),
                    salesCount: randomInt(0, 50),
                    status:
                        Object.values(ProductStatus)[
                        randomInt(0, Object.values(ProductStatus).length - 1)
                        ],
                    imgs: [
                        {
                            url: `https://placehold.co/300x300`,
                            alt: "Product image",
                        },
                    ],
                    tags: [],
                    inventory: {
                        sku: `SKU-${Date.now()}-${i}`,
                        barcode: randomInt(100000, 999999),
                        quantity: randomInt(0, 100),
                    },
                    shipping: {
                        weight: randomInt(1, 10),
                        length: randomInt(10, 50),
                        width: randomInt(10, 50),
                        height: randomInt(10, 50),
                    },
                    category: {
                        connect: { id: category.id },
                    },
                    metadata: {
                        seo: {
                            title: `Product ${i + 1} - ${category.name}`,
                            description: "Dummy product",
                        }
                    }
                },
            });

            createdProducts.push(product);
        }
    }

    return createdProducts;
}

async function createOrders(products: Products[]) {
    for (let i = 0; i < 5; i++) {
        const order = await prisma.orders.create({
            data: {
                name: `Order ${i + 1}`,
                orderId: randomInt(100000, 999999),
                status: OrderStatus.PROCESSING,
                payment: OrderPayment.PENDING,
                ownerContact: `customer${i + 1}@mail.com`,
                ownerName: `Customer ${i + 1}`,
                totalOrderedItemsCount: 0,
            },
        });

        const numberOfItems = randomInt(1, 4);
        let totalCount = 0;

        for (let j = 0; j < numberOfItems; j++) {
            const randomProduct =
                products[randomInt(0, products.length - 1)];

            const quantity = randomInt(1, 3);

            await prisma.orderItem.create({
                data: {
                    orderId: order.id,
                    productId: randomProduct.id,
                    quantity,
                    priceAtPurchase: randomProduct.price,
                },
            });

            totalCount += quantity;
        }

        await prisma.orders.update({
            where: { id: order.id },
            data: { totalOrderedItemsCount: totalCount },
        });
    }
}

export async function main() {
    await resetDatabase();

    const categories = await createCategories();
    const products = await createProducts(categories);
    await createOrders(products);

    console.log("🌱 Database seeded successfully");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
