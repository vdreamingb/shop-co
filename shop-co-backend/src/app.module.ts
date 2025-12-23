import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { R2Service } from './r2/r2.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DetailsModule } from './details/details.module';
@Module({
  imports: [UserModule, AuthModule, ProductsModule, ConfigModule.forRoot({
    isGlobal: true
  }), DetailsModule],
  providers: [R2Service, ConfigService],
})
export class AppModule {}
