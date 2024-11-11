import { z, type ZodNumber, type ZodOptional } from 'zod';

export function IntegerString<schema extends ZodNumber | ZodOptional<ZodNumber>>(schema: schema) {
  return z.preprocess(value => (typeof value === 'string' ? Number.parseInt(value, 10) : typeof value === 'number' ? value : undefined), schema);
}
