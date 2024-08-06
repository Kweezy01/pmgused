import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const pmgused = createTRPCRouter({

    createVehicle: publicProcedure
        .input(z.object({
            stockNum: z.string().min(1),
            VIN: z.string().min(1),
            MMCode: z.number(),
            Odometer: z.number(),
            StandInValue: z.number(),
            InternetPrice: z.number(),
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.vehicles.create({
                data: {
                    StockNum: input.stockNum,
                    VIN: input.VIN,
                    MMCode: input.MMCode,
                    Odometer: input.Odometer,
                    StandInValue: input.StandInValue,
                    InternetPrice: input.InternetPrice,
                },
            });
        }),

    getLatestVehicle: publicProcedure.query(async ({ ctx }) => {
        const vehicle = await ctx.db.vehicles.findFirst({
            orderBy: { createdAt: "asc" },
        });

        return vehicle ?? null;
    }),

    getAllVehicles: publicProcedure.query(async ({ ctx }) => {
        const vehicle = await ctx.db.vehicles.findMany();

        return vehicle ?? null;
    }),

    createValet: publicProcedure
        .input(z.object({
            valetName: z.string().min(1)
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.valets.create({
                data: {
                    ValetName: input.valetName,
                },
            });
        }),

    getAllValets: publicProcedure.query(async ({ ctx }) => {
        const vehicle = await ctx.db.valets.findMany();

        return vehicle ?? null;
    }),
});
