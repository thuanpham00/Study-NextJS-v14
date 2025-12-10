import envConfig from '@/config'
import {
  loginController,
  logoutController,
  slideSessionController,
  registerController
} from '@/controllers/auth.controller'
import { requireLoginedHook } from '@/hooks/auth.hooks'
import {
  LoginBody,
  LoginBodyType,
  LoginRes,
  LoginResType,
  SlideSessionBody,
  SlideSessionBodyType,
  SlideSessionRes,
  SlideSessionResType,
  RegisterBody,
  RegisterBodyType,
  RegisterRes,
  RegisterResType
} from '@/schemaValidations/auth.schema'
import { MessageRes, MessageResType } from '@/schemaValidations/common.schema'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async function authRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post<{
    Reply: RegisterResType
    Body: RegisterBodyType
  }>(
    '/register',
    {
      schema: {
        response: {
          200: RegisterRes
        },
        body: RegisterBody
      }
    },
    async (request, reply) => {
      const { body } = request
      const { session, account } = await registerController(body)
      if (envConfig.COOKIE_MODE) {
        reply
          .setCookie('sessionToken', session.token, {
            path: '/',
            httpOnly: true,
            secure: envConfig.IS_PRODUCTION,
            expires: session.expiresAt,
            sameSite: envConfig.IS_PRODUCTION ? 'none' : 'lax',
            domain: envConfig.IS_PRODUCTION ? envConfig.DOMAIN : undefined
          })
          .send({
            message: 'Đăng ký thành công',
            data: {
              token: session.token,
              expiresAt: session.expiresAt.toISOString(),
              account
            }
          })
      } else {
        reply.send({
          message: 'Đăng ký thành công',
          data: {
            token: session.token,
            expiresAt: session.expiresAt.toISOString(),
            account
          }
        })
      }
    }
  )
  fastify.post<{ Reply: MessageResType }>(
    '/logout',
    {
      schema: {
        response: {
          200: MessageRes
        }
      },
      preValidation: fastify.auth([requireLoginedHook])
    },
    async (request, reply) => {
      const tokenFromCookie = request.cookies.sessionToken
      const tokenFromHeader = request.headers.authorization?.split(' ')[1]

      const sessionToken = envConfig.COOKIE_MODE ? tokenFromCookie ?? tokenFromHeader : tokenFromHeader
      const message = await logoutController(sessionToken as string)
      if (envConfig.COOKIE_MODE) {
        reply
          .clearCookie('sessionToken', {
            path: '/',
            httpOnly: true,
            sameSite: envConfig.IS_PRODUCTION ? 'none' : 'lax',
            secure: envConfig.IS_PRODUCTION,
            domain: envConfig.IS_PRODUCTION ? envConfig.DOMAIN : undefined
          })
          .send({
            message
          })
      } else {
        reply.send({
          message
        })
      }
    }
  )
  fastify.post<{ Reply: LoginResType; Body: LoginBodyType }>(
    '/login',
    {
      schema: {
        response: {
          200: LoginRes
        },
        body: LoginBody
      }
    },
    async (request, reply) => {
      const { body } = request
      const { session, account } = await loginController(body)
      if (envConfig.COOKIE_MODE) {
        reply
          .setCookie('sessionToken', session.token, {
            path: '/',
            httpOnly: true,
            secure: envConfig.IS_PRODUCTION,
            expires: session.expiresAt,
            sameSite: envConfig.IS_PRODUCTION ? 'none' : 'lax',
            domain: envConfig.IS_PRODUCTION ? envConfig.DOMAIN : undefined
          })
          .send({
            message: 'Đăng nhập thành công',
            data: {
              token: session.token,
              expiresAt: session.expiresAt.toISOString(),
              account
            }
          })
      } else {
        reply.send({
          message: 'Đăng nhập thành công',
          data: {
            token: session.token,
            expiresAt: session.expiresAt.toISOString(),
            account
          }
        })
      }
    }
  )

  fastify.post<{ Reply: SlideSessionResType; Body: SlideSessionBodyType }>(
    '/slide-session',
    {
      schema: {
        response: {
          200: SlideSessionRes
        },
        body: SlideSessionBody
      },
      preValidation: fastify.auth([requireLoginedHook])
    },
    async (request, reply) => {
      const tokenFromCookie = request.cookies.sessionToken
      const tokenFromHeader = request.headers.authorization?.split(' ')[1]

      const sessionToken = envConfig.COOKIE_MODE ? tokenFromCookie ?? tokenFromHeader : tokenFromHeader
      const session = await slideSessionController(sessionToken as string)
      if (envConfig.COOKIE_MODE) {
        reply
          .setCookie('sessionToken', session.token, {
            path: '/',
            httpOnly: true,
            secure: envConfig.IS_PRODUCTION,
            expires: session.expiresAt,
            sameSite: envConfig.IS_PRODUCTION ? 'none' : 'lax',
            domain: envConfig.IS_PRODUCTION ? envConfig.DOMAIN : undefined
          })
          .send({
            message: 'Refresh session thành công',
            data: {
              token: session.token,
              account: request.account!,
              expiresAt: session.expiresAt.toISOString()
            }
          })
      } else {
        reply.send({
          message: 'Refresh session thành công',
          data: {
            token: session.token,
            expiresAt: session.expiresAt.toISOString(),
            account: request.account!
          }
        })
      }
    }
  )
}
