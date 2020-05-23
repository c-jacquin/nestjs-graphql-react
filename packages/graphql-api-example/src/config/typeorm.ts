import { registerAs } from '@nestjs/config';

export default registerAs('typeorm', () => ({
  debug: !!process.env.DEBUG,
}));


