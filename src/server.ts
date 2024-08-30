import fastify from "fastify";
import { createMeasure } from "./routes/create-measures";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createMeasure)

app.listen({ port: 3333 }).then(() => {
    console.log(`Server running at http://localhost:3333`);
})