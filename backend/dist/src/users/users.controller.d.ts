import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class UsersController {
    private readonly usersService;
    private readonly cloudinaryService;
    constructor(usersService: UsersService, cloudinaryService: CloudinaryService);
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
    findOne(id: string): import("../../generated/prisma/models").Prisma__UsersClient<{
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
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        username: string;
        email: string;
        password_hash: string;
        name: string;
        avatar: string | null;
        role: string;
        id: number;
    }>;
    uploadAvatar(id: string, file: Express.Multer.File): Promise<{
        username: string;
        email: string;
        password_hash: string;
        name: string;
        avatar: string | null;
        role: string;
        id: number;
    }>;
    remove(id: string): import("../../generated/prisma/models").Prisma__UsersClient<{
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
