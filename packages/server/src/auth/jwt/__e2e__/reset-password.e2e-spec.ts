import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import request from 'supertest';
import { Repository } from 'typeorm';

import { bootstapE2eApp } from '__e2e__/helpers/bootstrap';
import { resetPasswordMutation } from 'auth/__e2e__/graphql/reset-password.mutation';
import { whoAmIQuery } from 'auth/__e2e__/graphql/who-am-i.query';
import { login } from 'auth/__e2e__/helpers/login';
import { expectMissingToken } from 'auth/jwt/__e2e__/helpers/token-errors.expect';
import { adminUser } from 'auth/jwt/__e2e__/helpers/users';
import { UserEntity } from 'auth/users/users.entity';
import { UsersFixture } from 'auth/users/fixture/fixture.service';
import { expectHasError } from '__e2e__/helpers/http-errors.expect';
import { sendBasicRequest } from 'auth/__e2e__/helpers/request';

describe('e2e: [Auth Jwt] => resetPassword mutation (GRAPHQL)', () => {
  let app: INestApplication;
  let userRepository: Repository<UserEntity>;
  let usersFixture: UsersFixture;
  const GOOD_PASSWORD = '@admiN1234';
  const BAD_PASSWORD = '1234';

  beforeAll(async () => {
    const { nestApp } = await bootstapE2eApp();

    app = nestApp;
    userRepository = app.get(getRepositoryToken(UserEntity));
    usersFixture = app.get(UsersFixture);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await userRepository.delete({});
    await usersFixture.exec();
  });

  describe('when sending with a valid access token', () => {
    let loggedInRequest: request.Test;

    beforeEach(async () => {
      const { preparedRequest } = await login(app, adminUser);

      loggedInRequest = preparedRequest;
    });

    describe('when sending the correct old password and a valid new one', () => {
      it('should return true and update the counter and the password', async () => {
        const {
          body: { data },
        } = await loggedInRequest
          .send({
            query: resetPasswordMutation,
            variables: {
              password: adminUser.password,
              newPassword: GOOD_PASSWORD,
            },
          })
          .expect(200);

        const user = await userRepository.findOne({
          where: { email: adminUser.email },
        });

        const isNewPasswordValid = await user.authenticate(GOOD_PASSWORD);

        expect(data.resetPassword).toBeTruthy();
        expect(user.count).toBe(1);
        expect(isNewPasswordValid).toBeTruthy();
      });
    });

    describe('when sending the correct old password and a unvalid new one', () => {
      it('should return a 400 error', async () => {
        const {
          body: { errors },
        } = await loggedInRequest
          .send({
            query: resetPasswordMutation,
            variables: {
              password: adminUser.password,
              newPassword: BAD_PASSWORD,
            },
          })
          .expect(200);

        expectHasError(errors);
      });
    });

    describe('when sending without payload', () => {
      it('should return a 400 error', async () => {
        const {
          body: { errors },
        } = await loggedInRequest
          .send({
            query: resetPasswordMutation,
          })
          .expect(400);

        expectHasError(errors);
      });
    });
  });

  describe('when sending without access token', () => {
    it('should return a missing token error', async () => {
      const {
        body: { errors },
      } = await sendBasicRequest(app)
        .send({ query: whoAmIQuery })
        .expect(200);

      expectMissingToken(errors);
    });
  });
});
