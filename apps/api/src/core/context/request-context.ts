// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta

import { HttpException, HttpStatus } from '@nestjs/common';
import * as cls from 'cls-hooked';
import { ExtractJwt } from 'passport-jwt';
import { JsonWebTokenError, verify } from 'jsonwebtoken';
import { environment as env } from '@nesty/config';
import { isNotEmpty } from '@nesty/common';

export class RequestContext {
  readonly id: number;
  request: Request;
  response: Response;

  constructor(request: Request, response: Response) {
    this.id = Math.random();
    this.request = request;
    this.response = response;
  }

  static currentRequestContext(): RequestContext {
    const session = cls.getNamespace(RequestContext.name);
    if (session && session.active) {
      return session.get(RequestContext.name);
    }

    return null;
  }

  static currentRequest(): Request {
    const requestContext = RequestContext.currentRequestContext();

    if (requestContext) {
      return requestContext.request;
    }

    return null;
  }

  static currentTenantId(): string {
    try {
      const user: any = RequestContext.currentUser();
      return user.tenantId;
    } catch (error) {
      return null;
    }
  }

  static currentUserId(): string {
    const user: any = RequestContext.currentUser();
    if (user) {
      return user.id;
    }
    return null;
  }

  static currentRoleId(): string {
    const user: any = RequestContext.currentUser();
    if (user) {
      return user.roleId;
    }
    return null;
  }

  static currentEmployeeId(): string {
    try {
      const user: any = RequestContext.currentUser();
      if (isNotEmpty(user)) {
        if (!RequestContext.hasPermission('employee.view')) {
          return user.employeeId;
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  static currentUser(throwError?: boolean): any {
    const requestContext = RequestContext.currentRequestContext();

    if (requestContext) {
      // tslint:disable-next-line
      const user: any = requestContext.request['user'];

      if (user) {
        return user;
      }
    }

    if (throwError) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return null;
  }

  static hasPermission(permission: any, throwError?: boolean): boolean {
    return this.hasPermissions([permission], throwError);
  }

  static getLanguageCode(): any {
    const req = this.currentRequest();
    let lang: any;
    const keys = ['language'];
    if (req) {
      for (const key of keys) {
        if (req.headers && req.headers[key]) {
          lang = req.headers[key];
          break;
        }
      }
    }

    return lang;
  }

  static hasPermissions(findPermissions: any[], throwError?: boolean): boolean {
    const requestContext = RequestContext.currentRequestContext();

    if (requestContext) {
      // tslint:disable-next-line
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(
        requestContext.request as any,
      );

      if (token) {
        const { permissions } = verify(token, env.JWT_SECRET) as {
          id: string;
          permissions: any[];
        };
        if (permissions) {
          const found = permissions.filter(
            (value) => findPermissions.indexOf(value) >= 0,
          );

          if (found.length === findPermissions.length) {
            return true;
          }
        } else {
          return false;
        }
      }
    }

    if (throwError) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return false;
  }

  static hasAnyPermission(
    findPermissions: any[],
    throwError?: boolean,
  ): boolean {
    const requestContext = RequestContext.currentRequestContext();

    if (requestContext) {
      // tslint:disable-next-line
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(
        requestContext.request as any,
      );

      if (token) {
        const { permissions } = verify(token, env.JWT_SECRET) as {
          id: string;
          permissions: any[];
        };
        const found = permissions.filter(
          (value) => findPermissions.indexOf(value) >= 0,
        );
        if (found.length > 0) {
          return true;
        }
      }
    }

    if (throwError) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return false;
  }

  static currentToken(throwError?: boolean): any {
    const requestContext = RequestContext.currentRequestContext();

    if (requestContext) {
      // tslint:disable-next-line
      return ExtractJwt.fromAuthHeaderAsBearerToken()(
        requestContext.request as any,
      );
    }

    if (throwError) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return null;
  }

  static hasRole(role: any, throwError?: boolean): boolean {
    return this.hasRoles([role], throwError);
  }

  static hasRoles(roles: any[], throwError?: boolean): boolean {
    const context = RequestContext.currentRequestContext();
    if (context) {
      try {
        const token = this.currentToken();
        if (token) {
          const { role } = verify(token, env.JWT_SECRET) as {
            id: string;
            role: any;
          };
          return role ? roles.includes(role) : false;
        }
      } catch (error) {
        if (error instanceof JsonWebTokenError) {
          return false;
        } else {
          throw error;
        }
      }
    }
    if (throwError) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return false;
  }
}
