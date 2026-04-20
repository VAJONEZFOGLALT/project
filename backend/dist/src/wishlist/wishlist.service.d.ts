import { PrismaService } from '../prisma.service';
export declare class WishlistService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByUser(userId: number): import("@prisma/client").Prisma.PrismaPromise<({
        product: {
            name: string;
            id: number;
            description: string | null;
            category: string;
            price: number;
            stock: number;
            image: string | null;
            deletedAt: Date | null;
        };
    } & {
        id: number;
        userId: number;
        createdAt: Date;
        productId: number;
    })[]>;
    add(userId: number, productId: number): Promise<{
        id: number;
        userId: number;
        createdAt: Date;
        productId: number;
    }>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__WishlistClient<{
        id: number;
        userId: number;
        createdAt: Date;
        productId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    removeByUserProduct(userId: number, productId: number): Promise<{
        id: number;
        userId: number;
        createdAt: Date;
        productId: number;
    } | null>;
    isInWishlist(userId: number, productId: number): Promise<boolean>;
}
