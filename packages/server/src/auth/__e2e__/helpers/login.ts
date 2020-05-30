import { INestApplication } from '@nestjs/common';

import { HttpHeaders } from '@app/common';
import { sendBasicRequest } from 'auth/__e2e__/helpers/request';
import { loginMutation } from 'auth/__e2e__/graphql/login.mutation';
import { SignInArgs } from 'auth/dto/sign-in.args';

export async function login(app: INestApplication, user: SignInArgs) {
  const {
    body: {
      data: {
        login: { accessToken, refreshToken },
      },
    },
  } = await sendBasicRequest(app)
    .send({
      query: loginMutation,
      variables: user,
    })
    .expect(200);

  const preparedRequest = sendBasicRequest(app).set(
    HttpHeaders.AUTHORIZATION,
    `Bearer ${accessToken}`,
  );

  return {
    preparedRequest,
    accessToken,
    refreshToken,
  };
}
