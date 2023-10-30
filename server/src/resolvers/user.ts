import {
  Resolver,
  Mutation,
  Arg,
  Field,
  Ctx,
  ObjectType,
  Query,
} from "type-graphql";
import { MyContext } from "../types";
import argon2 from "argon2";
import { User } from "../entities/User";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { UsernamePasswordInput } from "../types/UsernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
require("express");

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redisClient, emFork, req }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 3) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "Password does not meet requirements",
          },
        ],
      };
    }

    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redisClient.get(key);
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "Token expired",
          },
        ],
      };
    }

    const user = await emFork.findOne(User, { id: parseInt(userId) });
    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "User no longer exists",
          },
        ],
      };
    }

    user.password = await argon2.hash(newPassword);
    await emFork.persistAndFlush(user);
    await redisClient.del(key);
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { emFork, redisClient }: MyContext
  ) {
    const user = await emFork.findOne(User, { email });
    if (!user) {
      return true;
    }

    const token = v4();
    await redisClient.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "EX",
      1000 * 60 * 60 * 72
    );
    sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">Reset password</a>`,
      "Password change requested for BookTracker"
    );
    return true;
  }

  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() { emFork, req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    const user = await emFork.findOne(User, { id: req.session.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { emFork, req }: MyContext
  ): Promise<UserResponse> {
    const validationErrors = validateRegister(options);
    if (validationErrors) {
      return { errors: validationErrors };
    }

    const hashedPassword = await argon2.hash(options.password);
    const user = emFork.create(User, {
      username: options.username,
      email: options.email,
      password: hashedPassword,
    });
    try {
      await emFork.persistAndFlush(user);
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "Username has already been taken",
            },
          ],
        };
      }
    }

    //log user in after registering
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { emFork, req }: MyContext
  ): Promise<UserResponse> {
    const user = await emFork.findOne(
      User,
      usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail }
    );
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "Invalid login",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Invalid login",
          },
        ],
      };
    }

    //set user cookie to store user session
    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
