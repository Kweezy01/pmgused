import { postRouter } from "~/server/api/routers/post";
import { vehicleRouter } from "~/server/api/routers/vehicle"
import { editRouter } from "~/server/api/routers/editRouter"
import { createVehicleRouter } from "~/server/api/routers/vehicleRouter"
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { pmgused } from "./routers/pmgusedRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  main: createVehicleRouter,
  editRouter: editRouter,
  vehicle: vehicleRouter,
  pmgused: pmgused,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
