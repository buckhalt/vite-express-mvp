import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { db } from '../db/db';
import { InsertProject, projects } from '../db/schema';
import { z } from 'zod';

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();
const publicProcedure = t.procedure;
// eventually, we'll have a protectedProcedure too

const appRouter = t.router({
    greeting: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { text: `${input?.name ?? "world"}` };
    }),
    
});

const app = express();

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.listen(4000);