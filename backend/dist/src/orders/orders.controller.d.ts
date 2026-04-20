import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<{
        emailStatus: {
            emailSent: boolean;
            reason?: string;
        };
        orderItems: {
            id: number;
            price: number;
            productId: number;
            quantity: number;
            orderId: number;
        }[];
        id: number;
        userId: number;
        totalPrice: number;
        createdAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        courier: import("@prisma/client").$Enums.CourierService;
        shippingAddress: string | null;
        trackingNumber: string | null;
        teljesitve: boolean;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        orderItems: {
            id: number;
            price: number;
            productId: number;
            quantity: number;
            orderId: number;
        }[];
    } & {
        id: number;
        userId: number;
        totalPrice: number;
        createdAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        courier: import("@prisma/client").$Enums.CourierService;
        shippingAddress: string | null;
        trackingNumber: string | null;
        teljesitve: boolean;
    })[]>;
    findByUser(userId: string): import("@prisma/client").Prisma.PrismaPromise<({
        orderItems: {
            id: number;
            price: number;
            productId: number;
            quantity: number;
            orderId: number;
        }[];
    } & {
        id: number;
        userId: number;
        totalPrice: number;
        createdAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        courier: import("@prisma/client").$Enums.CourierService;
        shippingAddress: string | null;
        trackingNumber: string | null;
        teljesitve: boolean;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__OrdersClient<({
        orderItems: ({
            product: {
                name: string;
                id: number;
                category: string;
                price: number;
                image: string | null;
            };
        } & {
            id: number;
            price: number;
            productId: number;
            quantity: number;
            orderId: number;
        })[];
    } & {
        id: number;
        userId: number;
        totalPrice: number;
        createdAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        courier: import("@prisma/client").$Enums.CourierService;
        shippingAddress: string | null;
        trackingNumber: string | null;
        teljesitve: boolean;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        orderItems: {
            id: number;
            price: number;
            productId: number;
            quantity: number;
            orderId: number;
        }[];
    } & {
        id: number;
        userId: number;
        totalPrice: number;
        createdAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        courier: import("@prisma/client").$Enums.CourierService;
        shippingAddress: string | null;
        trackingNumber: string | null;
        teljesitve: boolean;
    }>;
    updateStatus(id: string, body: {
        status: string;
    }): Promise<{
        orderItems: {
            id: number;
            price: number;
            productId: number;
            quantity: number;
            orderId: number;
        }[];
    } & {
        id: number;
        userId: number;
        totalPrice: number;
        createdAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        courier: import("@prisma/client").$Enums.CourierService;
        shippingAddress: string | null;
        trackingNumber: string | null;
        teljesitve: boolean;
    }>;
    fulfillOrder(id: string, body: {
        teljesitve?: boolean;
    }): Promise<{
        orderItems: {
            id: number;
            price: number;
            productId: number;
            quantity: number;
            orderId: number;
        }[];
    } & {
        id: number;
        userId: number;
        totalPrice: number;
        createdAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        courier: import("@prisma/client").$Enums.CourierService;
        shippingAddress: string | null;
        trackingNumber: string | null;
        teljesitve: boolean;
    }>;
    remove(id: string): Promise<{
        id: number;
        userId: number;
        totalPrice: number;
        createdAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        courier: import("@prisma/client").$Enums.CourierService;
        shippingAddress: string | null;
        trackingNumber: string | null;
        teljesitve: boolean;
    }>;
}
