import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrgAuthenticateError } from '@/services/orgs/errors';
import { makeAuthenticateOrgService } from '@/services/orgs/authenticate/factory';

export const authenticate = async(request: FastifyRequest, reply: FastifyReply) => {
  const loginBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const body = loginBodySchema.parse(request.body);

  try {
    const loginOrg = makeAuthenticateOrgService();

    const {org} = await loginOrg.execute(body);

    const token = await reply.jwtSign({sub: org.id});

    const refreshToken = await reply.jwtSign(
      {
        sub: org.id,
      },
      {
        expiresIn: '7d',
      }
    );

    return reply.setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true
    })
    .status(200)
    .send({token});

  } catch (err) {
    if (err instanceof OrgAuthenticateError) return reply.status(400).send({ message: err.message });
    
    throw err;
  };
};