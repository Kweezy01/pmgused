import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const editRouter = createTRPCRouter({
  getVehicle: publicProcedure
    .input(z.object({ stockNum: z.string() }))
    .query(async ({ ctx, input }) => {
      const entry = await ctx.db.vehicles.findUnique({
        where: { StockNum: input.stockNum },
        select: {
          StockNum: true,
          VIN: true,
          MMCode: true,
          Model: true,
          Odometer: true,
          StandInValue: true,
          InternetPrice: true,
          InternetState: {
            select: {
              PicsTaken: true,
              PicsOnPc: true,
              OnAutoTrader: true,
              OnCars: true,
              OnPMGUsed: true,
              OnWhatsapp: true,
              OnPinnacle: true,
            },
          },
          ReconState: {
            select: {
              WorkshopID: true,
              WorkshopDate: true,
              PannelBeaterID: true,
              PannelBeaterDate: true,
              InteriorRepairerID: true,
              InteriorRepairDate: true,
              ValetID: true,
              ValetDate: true,
              DateOnFloor: true,
              Workshop: {
                select: {
                  WorkshopName: true,
                },
              },
              PannelBeater: {
                select: {
                  PannelBeaterName: true,
                },
              },
              InteriorRepair: {
                select: {
                  InteriorRepairerName: true,
                },
              },
              Valet: {
                select: {
                  ValetName: true,
                },
              },
            },
          },
        },
      });

      if (!entry) {
        throw new Error('Vehicle not found');
      }

      // Reshape the data to match EntryType
      return {
        StockNum: entry.StockNum,
        VIN: entry.VIN,
        MMCode: entry.MMCode,
        Model: entry.Model,
        Odometer: entry.Odometer,
        StandInValue: entry.StandInValue,
        InternetPrice: entry.InternetPrice,
        ReconStates: {
          WorkshopID: entry.ReconState[0]?.WorkshopID ?? null,
          WorkshopDate: entry.ReconState[0]?.WorkshopDate ?? null,
          PannelBeaterID: entry.ReconState[0]?.PannelBeaterID ?? null,
          PannelBeaterDate: entry.ReconState[0]?.PannelBeaterDate ?? null,
          InteriorRepairerID: entry.ReconState[0]?.InteriorRepairerID ?? null,
          InteriorRepairDate: entry.ReconState[0]?.InteriorRepairDate ?? null,
          ValetID: entry.ReconState[0]?.ValetID ?? null,
          ValetDate: entry.ReconState[0]?.ValetDate ?? null,
          DateOnFloor: entry.ReconState[0]?.DateOnFloor ?? null,
        },
        InternetStates: {
          PicsTaken: entry.InternetState[0]?.PicsTaken ?? false,
          PicsOnPc: entry.InternetState[0]?.PicsOnPc ?? false,
          OnAutoTrader: entry.InternetState[0]?.OnAutoTrader ?? false,
          OnCars: entry.InternetState[0]?.OnCars ?? false,
          OnPMGUsed: entry.InternetState[0]?.OnPMGUsed ?? false,
          OnWhatsapp: entry.InternetState[0]?.OnWhatsapp ?? false,
          OnPinnacle: entry.InternetState[0]?.OnPinnacle ?? false,
        },
      };
    }),

  updateVehicle: publicProcedure
    .input(z.object({
      StockNum: z.string(),
      VIN: z.string().nullable(),
      MMCode: z.number().nullable(),
      Model: z.string().nullable(),
      Odometer: z.number().nullable(),
      StandInValue: z.number().nullable(),
      InternetPrice: z.number().nullable(),
      ReconStates: z.object({
        WorkshopID: z.number().nullable(),
        WorkshopDate: z.date().nullable(),
        PannelBeaterID: z.number().nullable(),
        PannelBeaterDate: z.date().nullable(),
        InteriorRepairerID: z.number().nullable(),
        InteriorRepairDate: z.date().nullable(),
        ValetID: z.number().nullable(),
        ValetDate: z.date().nullable(),
        DateOnFloor: z.date().nullable(),
      }),
      InternetStates: z.object({
        PicsTaken: z.boolean(),
        PicsOnPc: z.boolean(),
        OnAutoTrader: z.boolean(),
        OnCars: z.boolean(),
        OnPMGUsed: z.boolean(),
        OnWhatsapp: z.boolean(),
        OnPinnacle: z.boolean(),
      }),
    }))
    .mutation(async ({ input }) => {
      const { StockNum, ReconStates, InternetStates, ...vehicleData } = input;

      await prisma.$transaction([
        prisma.vehicles.update({
          where: { StockNum },
          data: vehicleData,
        }),
        prisma.reconStates.upsert({
          where: { StockNum },
          create: { StockNum, ...ReconStates },
          update: ReconStates,
        }),
        prisma.internetStates.upsert({
          where: { StockNum },
          create: { StockNum, ...InternetStates },
          update: InternetStates,
        }),
      ]);

      return { success: true, message: 'Vehicle updated successfully' };
    }),
});