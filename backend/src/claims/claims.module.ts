import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaimsService } from './claims.service';
import { ClaimsController } from './claims.controller';
import { Claim } from './entities/claim.entity';
import { UserClaim } from './entities/user-claim.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Claim, UserClaim])],
  controllers: [ClaimsController],
  providers: [ClaimsService],
  exports: [ClaimsService],
})
export class ClaimsModule {}

