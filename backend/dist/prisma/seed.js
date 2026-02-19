"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const client_1 = require("../generated/prisma/client");
dotenv.config({ path: path_1.default.join(__dirname, '..', '.env') });
const prisma = new client_1.PrismaClient();
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
const users = ['admin', 'alice', 'bob', 'charlie', 'diana'];
const domains = ['gmail.com', 'yahoo.com', 'outlook.com'];
const categories = ['Electronics', 'Accessories', 'Office', 'Home', 'Fashion', 'Sports'];
const productNames = [
    'Wireless Headphones', 'USB-C Cable', 'Laptop Stand', 'Mechanical Keyboard', 'Mouse Pad',
    '4K Webcam', 'USB Hub', 'Desk Lamp', 'Phone Case', 'Portable SSD',
    'Monitor Arm', 'Cable Organizer', 'Bluetooth Speaker', 'Screen Protector', 'Desk Organizer',
    'Desk Chair', 'Monitor Stand', 'Keyboard Wrist Rest', 'Cable Clip', 'Desk Pad',
];
const statuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
const couriers = ['UPS', 'PACKETA', 'DPD', 'INPOST'];
async function main() {
    console.log('🌱 Starting database seed...\n');
    const createdUsers = [];
    for (const username of users) {
        try {
            const user = await prisma.users.create({
                data: {
                    username,
                    email: `${username}@${randomElement(domains)}`,
                    password_hash: 'demo123',
                    name: username.charAt(0).toUpperCase() + username.slice(1),
                    role: username === 'admin' ? 'ADMIN' : 'USER',
                },
            });
            createdUsers.push(user);
            console.log(`✓ User: ${user.username} (${user.email})`);
        }
        catch (e) {
            const existingUser = await prisma.users.findUnique({ where: { username } });
            if (existingUser) {
                createdUsers.push(existingUser);
                console.log(`✓ User already exists: ${username}`);
            }
        }
    }
    const createdProducts = [];
    for (const productName of productNames) {
        try {
            const product = await prisma.products.create({
                data: {
                    name: productName,
                    description: 'High quality product',
                    category: randomElement(categories),
                    price: random(10, 500),
                    stock: random(5, 200),
                    image: `https://via.placeholder.com/300x300?text=${encodeURIComponent(productName)}`,
                },
            });
            createdProducts.push(product);
        }
        catch (e) {
            const existingProduct = await prisma.products.findFirst({ where: { name: productName } });
            if (existingProduct) {
                createdProducts.push(existingProduct);
            }
        }
    }
    console.log(`✓ Created ${createdProducts.length} products\n`);
    for (let i = 0; i < 8; i++) {
        const user = createdUsers[random(1, createdUsers.length - 1)];
        const itemCount = random(1, 4);
        const orderItems = [];
        let total = 0;
        for (let j = 0; j < itemCount; j++) {
            const prod = randomElement(createdProducts);
            const qty = random(1, 3);
            total += prod.price * qty;
            orderItems.push({ productId: prod.id, quantity: qty, price: prod.price });
        }
        await prisma.orders.create({
            data: {
                userId: user.id,
                totalPrice: total,
                status: randomElement(statuses),
                courier: randomElement(couriers),
                shippingAddress: `${random(100, 999)} Main St, City ${random(1, 100)}`,
                trackingNumber: `TRK${Date.now()}${i}`,
                orderItems: { create: orderItems },
            },
        });
    }
    console.log('✓ Created 8 orders\n');
    for (let i = 0; i < 10; i++) {
        try {
            await prisma.reviews.create({
                data: {
                    userId: createdUsers[random(1, createdUsers.length - 1)].id,
                    productId: randomElement(createdProducts).id,
                    rating: random(3, 5),
                    title: 'Great product!',
                    comment: 'Very satisfied with this purchase.',
                },
            });
        }
        catch (e) {
        }
    }
    console.log('✓ Created reviews\n');
    for (let i = 0; i < 8; i++) {
        try {
            await prisma.wishlist.create({
                data: {
                    userId: createdUsers[random(1, createdUsers.length - 1)].id,
                    productId: randomElement(createdProducts).id,
                },
            });
        }
        catch (e) {
        }
    }
    console.log('✓ Created wishlist items\n');
    for (let i = 0; i < 15; i++) {
        try {
            await prisma.recentlyViewed.create({
                data: {
                    userId: createdUsers[random(1, createdUsers.length - 1)].id,
                    productId: randomElement(createdProducts).id,
                },
            });
        }
        catch (e) {
        }
    }
    console.log('✓ Created recently viewed items\n');
    console.log('✅ Database seeded successfully!\n');
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map