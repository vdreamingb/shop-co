import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { R2Service } from './r2/r2.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DetailsModule } from './details/details.module';
import { SalesModule } from './sales/sales.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ExpediationsModule } from './expediations/expediations.module';
@Module({
  imports: [AuthModule, ProductsModule, ConfigModule.forRoot({
    isGlobal: true
  }), DetailsModule, SalesModule, ReviewsModule, ExpediationsModule],
  providers: [R2Service, ConfigService],
})
export class AppModule {}
