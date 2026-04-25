import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrgAlreadyExistsError } from '@/services/errors';
import { makeRegisterOrgService } from '@/services/orgs/register/factory';

export const register = async(request: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    city: z.string(),
    phone: z.string(),
  });

  const org = registerBodySchema.parse(request.body);

  try {
    const registerOrg = makeRegisterOrgService();

    await registerOrg.execute(org);
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) return reply.status(409).send({ message: err.message });
    
    throw err;
  };

  return reply.status(201).send();
};