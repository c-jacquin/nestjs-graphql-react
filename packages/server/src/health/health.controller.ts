import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  DNSHealthIndicator,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly dns: DNSHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.dns.pingCheck('http', 'https://www.wikipedia.org'),
      () => this.db.pingCheck('database', { timeout: 300 }),
    ]);
  }
}
