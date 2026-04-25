import { PetNotFoundError } from '@/services/errors';
import { makeDetailsPetService } from '@/services/pets/details/factory';
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export const details = async(request: FastifyRequest, reply: FastifyReply) => {
  const detailsQuerySchema = z.object({
    petId: z.string(),
  });

  const {petId} = detailsQuerySchema.parse(request.query);

  try {
    const detailsPet = makeDetailsPetService();

    const {pet} = await detailsPet.execute({petId});

    return reply.status(200).send({pet});

  } catch (err) {
    if (err instanceof PetNotFoundError) return reply.status(404).send({ message: err.message });

    throw err;
  };
};