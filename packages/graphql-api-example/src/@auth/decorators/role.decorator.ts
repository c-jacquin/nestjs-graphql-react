import { SetMetadata } from '@nestjs/common';

import { Roles } from 'shared';

export const RestrictTo = (...roles: Roles[]) => SetMetadata('roles', roles);
