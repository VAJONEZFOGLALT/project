import { WishlistService } from './wishlist.service';
export declare class WishlistController {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    findByUser(userId: string): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<({
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
    add(body: {
        userId: number;
        productId: number;
    }): Promise<{
        id: number;
        userId: number;
        productId: number;
        createdAt: Date;
    }>;
    remove(id: string): import("../../generated/prisma/models").Prisma__WishlistClient<{
        id: number;
        userId: number;
        productId: number;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    removeByUserProduct(userId: string, productId: string): Promise<{
        id: number;
        userId: number;
        productId: number;
        createdAt: Date;
    } | null>;
    isInWishlist(userId: string, productId: string): Promise<boolean>;
}
