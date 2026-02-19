import { PrismaService } from '../prisma.service';
export declare class WishlistService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByUser(userId: number): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        product: {
            id: number;
            name: string;
            description: string | null;
            category: string;
            price: number;
            stock: number;
            image: string | null;
        };
    } & {
        id: number;
        userId: number;
        productId: number;
        createdAt: Date;
    })[]>;
    add(userId: number, productId: number): Promise<{
        id: number;
        userId: number;
        productId: number;
        createdAt: Date;
    }>;
    remove(id: number): import("../../generated/prisma/models").Prisma__WishlistClient<{
        id: number;
        userId: number;
        productId: number;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    removeByUserProduct(userId: number, productId: number): Promise<{
        id: number;
        userId: number;
        productId: number;
        createdAt: Date;
    } | null>;
    isInWishlist(userId: number, productId: number): Promise<boolean>;
}
