import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock')
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => 'timestamp' })
  @IsNumber()
  @Column({ nullable: false })
  timestamp?: number;

  @ApiProperty({ type: () => Number })
  @IsNumber()
  @Column({ nullable: false })
  highestPriceOfTheDay?: number;

  @ApiProperty({ type: () => Number })
  @IsNumber()
  @Column({ nullable: false })
  lowestPriceOfTheDay?: number;

  @ApiProperty({ type: () => String })
  @IsNumber()
  @Column({ nullable: false })
  company?: string;
}
