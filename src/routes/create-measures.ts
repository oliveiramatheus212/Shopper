import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"
import { getImageInfo } from "../lib/gemini-IA";

export async function createMeasure(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/upload', {
        schema: {
            body: z.object({
                base64_image: z.string(),
            })
        }
    }, async (request) => {
        const { base64_image } = request.body

        return {
            base64_image
        }
    })

    getImageInfo();
}