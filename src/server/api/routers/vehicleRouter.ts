import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function sleep(ms: number): Promise<void> {
   return new Promise(
       (resolve) => setTimeout(resolve, ms));
}

export const createVehicleRouter = createTRPCRouter({
   createVehicleWithReconAndInternet: publicProcedure
      .input(z.object({
         StockNum: z.string().min(1),
         VIN: z.string().min(1),
         Registration: z.string().min(1),
         Model: z.string().min(1),
         MMCode: z.number(),
         Odometer: z.number(),
         StandInValue: z.number(),
         InternetPrice: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
         const { StockNum } = input;

         const result = await prisma.$transaction(async (prisma: any) => {
            const vehicle = await ctx.db.vehicles.create({
               data: {
                  StockNum: input.StockNum,
                  VIN: input.VIN,
                  Registration: input.Registration,
                  Model: input.Model,
                  MMCode: input.MMCode,
                  Odometer: input.Odometer,
                  StandInValue: input.StandInValue,
                  InternetPrice: input.InternetPrice,
               },
            });

            await sleep(2500)

            const recon = await ctx.db.reconStates.create({
               data: {
                   StockNum: input.StockNum,
               },
           });

            const internet = await ctx.db.internetStates.create({
               data: {
                   StockNum: input.StockNum,
               },
           });

            return { vehicle, recon, internet };
         });

         return result;
      }),
});