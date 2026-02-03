import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
export declare class OrderItemsController {
    private readonly orderItemsService;
    constructor(orderItemsService: OrderItemsService);
    create(createOrderItemDto: CreateOrderItemDto): import("../../generated/prisma/models").Prisma__OrderItemsClient<{
        id: number;
        price: number;
        orderId: number;
        productId: number;
        quantity: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        id: number;
        price: number;
        orderId: number;
        productId: number;
        quantity: number;
    }[]>;
    findOne(id: string): import("../../generated/prisma/models").Prisma__OrderItemsClient<{
        id: number;
        price: number;
        orderId: number;
        productId: number;
        quantity: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    update(id: string, updateOrderItemDto: UpdateOrderItemDto): import("../../generated/prisma/models").Prisma__OrderItemsClient<{
        id: number;
        price: number;
        orderId: number;
        productId: number;
        quantity: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    remove(id: string): import("../../generated/prisma/models").Prisma__OrderItemsClient<{
        id: number;
        price: number;
        orderId: number;
        productId: number;
        quantity: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
