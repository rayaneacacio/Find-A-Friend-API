import { PetNotFoundError } from '@/services/errors';
import { makeSetAttributesService } from '@/services/pets/set-attributes/factory';
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export const setAttributes = async(request: FastifyRequest, reply: FastifyReply) => {
  const patchQuerySchema = z.object({
    petId: z.string()
  });

  const patchBodySchema = z.object({
    petAttributes: z.array(z.string()).default([])
  });

  const {petId} = patchQuerySchema.parse(request.query);
  const {petAttributes} = patchBodySchema.parse(request.body);

  try {
    const setPetAttributesService = makeSetAttributesService();

    await setPetAttributesService.execute({
      petAttributes, 
      petId,
    });

    return reply.status(200).send();

  } catch (err) {
    if (err instanceof PetNotFoundError) return reply.status(404).send({ message: err.message });

    throw err;
  };
};