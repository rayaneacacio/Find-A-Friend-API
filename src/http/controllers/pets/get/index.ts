import { NoPetsAvailableError } from '@/services/errors';
import { makeGetPetService } from '@/services/pets/get/factory';
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export const get = async(request: FastifyRequest, reply: FastifyReply) => {
  const getQuerySchema = z.object({
    city: z.string(),
    petAttributes: z.preprocess(value => 
      (typeof value === 'string' ? [value] : value),
      z.array(z.string()).optional()
    ).default([])
  });

  const {city, petAttributes = []} = getQuerySchema.parse(request.query);

  try {
    const getPet = makeGetPetService();

    const {pets} = await getPet.execute({city, petAttributes});

    return reply.status(200).send({pets});

  } catch (err) {
    if (err instanceof NoPetsAvailableError) return reply.status(409).send({ message: err.message });

    throw err;
  };
};