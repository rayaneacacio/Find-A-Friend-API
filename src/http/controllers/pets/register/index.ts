import { makeRegisterPetService } from '@/services/pets/register/factory';
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export const register = async(request: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.coerce.number(),
    adopted: z.coerce.boolean(),
    images: z.array(z.string()),
    petAttributes: z.array(z.string()).default([]),
  });

  const body = registerBodySchema.parse(request.body);

  try {
    const registerPet = makeRegisterPetService();

    await registerPet.execute({
      ...body,
      orgId: request.user.sub
    });
  } catch (err) {
    throw err;
  };

  return reply.status(201).send();
};