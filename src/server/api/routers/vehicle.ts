import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const vehicleRouter = createTRPCRouter({

  create: publicProcedure
    .input(z.object({ 
        stockNum: z.string().min(1), 
        VIN: z.string().min(1),
        MMCode: z.number(),
        Odometer: z.number(),
        StandInValue: z.number(),
        InteretPrice: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.vehicles.create({
        data: {
          StockNum: input.stockNum,
          VIN: input.VIN,
          MMCode: input.MMCode,
          Odometer: input.Odometer,
          StandInValue: input.StandInValue,
          InternetPrice: input.InteretPrice,
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const vehicle = await ctx.db.vehicles.findFirst({
      orderBy: { createdAt: "asc" },
    });

    return vehicle ?? null;
  }),
});
