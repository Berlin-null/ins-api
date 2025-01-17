import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [RolesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
