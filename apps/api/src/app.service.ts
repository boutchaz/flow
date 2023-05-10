import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nesty/config';
import * as chalk from 'chalk';

@Injectable()
export class AppService {
  public count = 0;

  constructor(
    @Inject(forwardRef(() => ConfigService))
    private readonly configService: ConfigService,
  ) {}
}
