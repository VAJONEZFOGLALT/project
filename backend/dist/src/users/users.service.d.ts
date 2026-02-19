import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        username: string;
        email: string;
        password_hash: string;
        name: string;
        avatar: string | null;
        role: string;
        id: number;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        username: string;
        email: string;
        password_hash: string;
        name: string;
        avatar: string | null;
        role: string;
        id: number;
    }[]>;
    findOne(id: number): import("../../generated/prisma/models").Prisma__UsersClient<{
        username: string;
        email: string;
        password_hash: string;
        name: string;
        avatar: string | null;
        role: string;
        id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        username: string;
        email: string;
        password_hash: string;
        name: string;
        avatar: string | null;
        role: string;
        id: number;
    }>;
    remove(id: number): import("../../generated/prisma/models").Prisma__UsersClient<{
        username: string;
        email: string;
        password_hash: string;
        name: string;
        avatar: string | null;
        role: string;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
