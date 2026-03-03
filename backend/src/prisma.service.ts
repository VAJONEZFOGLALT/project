import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      if (process.env.DATABASE_URL) {
        await this.$connect();
      }
    } catch (error) {
      console.error('Failed to connect to database:', error);
      // Don't throw - allow app to start without DB connection
      // This prevents serverless timeout issues
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
