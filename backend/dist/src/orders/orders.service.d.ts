import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class OrdersService {
    private readonly prisma;
    private readonly notificationsService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    private generateTrackingNumber;
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
    findByUser(userId: number): import("@prisma/client").Prisma.PrismaPromise<({
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
    findOne(id: number): import("@prisma/client").Prisma.Prisma__OrdersClient<({
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
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<{
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
    remove(id: number): Promise<{
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
