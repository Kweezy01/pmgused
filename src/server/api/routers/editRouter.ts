import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const editRouter = createTRPCRouter({

  getVehicleByStockNum: publicProcedure
    .input(z.object({ stockNum: z.string() }))
    .query(async ({ ctx, input }) => {
      const vehicle = await ctx.db.vehicles.findUnique({
        where: { StockNum: input.stockNum }
      });
      return vehicle;
    }),

  getReconByStockNum: publicProcedure
    .input(z.object({ stockNum: z.string() }))
    .query(async ({ ctx, input }) => {
      const vehicle = await ctx.db.reconStates.findUnique({
        where: { StockNum: input.stockNum }
      });
      return vehicle;
    }),

  getInternetByStockNum: publicProcedure
    .input(z.object({ stockNum: z.string() }))
    .query(async ({ ctx, input }) => {
      const vehicle = await ctx.db.internetStates.findUnique({
        where: { StockNum: input.stockNum }
      });
      return vehicle;
    }),

  updateVehicle:

    publicProcedure
      .input(z.object({
        stockNum: z.string(),
        VIN: z.string(),
        Registration: z.string(),
        Model: z.string(),
        MMCode: z.number(),
        Odometer: z.number(),
        StandInValue: z.number(),
        InternetPrice: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        await ctx.db.vehicles.update({
          where: {
            StockNum: input.stockNum
          },
          data: {
            VIN: input.VIN,
            Registration: input.Registration,
            Model: input.Model,
            MMCode: input.MMCode,
            Odometer: input.Odometer,
            StandInValue: input.StandInValue,
            InternetPrice: input.InternetPrice,
          },
        });
      }),

  updateRecon:

    publicProcedure
      .input(z.object({
        stockNum: z.string().min(1),
        WorkshopID: z.number().min(1),
        WorkshopDate: z.date(),
        PannelBeaterID: z.number().min(1),
        PannelBeaterDate: z.date(),
        InteriorRepairerID: z.number().min(1),
        InteriorRepairDate: z.date(),
        ValetID: z.number().min(1),
        ValetDate: z.date(),
        DateOnFloor: z.date(),
      }))
      .mutation(async ({ ctx, input }) => {
        await ctx.db.reconStates.update({
          where: {
            StockNum: input.stockNum
          },
          data: {
            WorkshopID: input.WorkshopID,
            WorkshopDate: input.WorkshopDate,
            PannelBeaterID: input.PannelBeaterID,
            PannelBeaterDate: input.PannelBeaterDate,
            InteriorRepairerID: input.InteriorRepairerID,
            InteriorRepairDate: input.InteriorRepairDate,
            ValetID: input.ValetID,
            ValetDate: input.ValetDate,
          },
        });
      }),

  updateInternet:

    publicProcedure
      .input(z.object({
        StockNum: z.string().min(1),
        PicsTaken: z.boolean(),
        PicsOnPc: z.boolean(),
        OnAutoTrader: z.boolean(),
        OnCars: z.boolean(),
        OnPMGUsed: z.boolean(),
        OnWhatsapp: z.boolean(),
        OnPinnacle: z.boolean(),
      })).mutation(async ({ ctx, input }) => {
        await ctx.db.internetStates.update({
          where: {
            StockNum: input.StockNum,
          },
          data: {
            PicsTaken: input.PicsTaken,
            PicsOnPc: input.PicsOnPc,
            OnAutoTrader: input.OnAutoTrader,
            OnCars: input.OnCars,
            OnPMGUsed: input.OnPMGUsed,
            OnWhatsapp: input.OnWhatsapp,
            OnPinnacle: input.OnPinnacle,
          },
        });
      }),


  // updateAll: publicProcedure
  //   .input(
  //     z.object({
  //       StockNum: z.string(),
  //       VIN: z.string().nullable(),
  //       MMCode: z.number().nullable(),
  //       Registration: z.string().nullable(),
  //       Model: z.string().nullable(),
  //       Odometer: z.number().nullable(),
  //       StandInValue: z.number().nullable(),
  //       InternetPrice: z.number().nullable(),
  //       InternetState: z.object({
  //         PicsTaken: z.boolean(),
  //         PicsOnPc: z.boolean(),
  //         OnAutoTrader: z.boolean(),
  //         OnCars: z.boolean(),
  //         OnPMGUsed: z.boolean(),
  //         OnWhatsapp: z.boolean(),
  //         OnPinnacle: z.boolean(),
  //       }),
  //       ReconState: z.object({
  //         WorkshopID: z.number().nullable(),
  //         WorkshopDate: z.date().nullable(),
  //         PannelBeaterID: z.number().nullable(),
  //         PannelBeaterDate: z.date().nullable(),
  //         InteriorRepairerID: z.number().nullable(),
  //         InteriorRepairDate: z.date().nullable(),
  //         ValetID: z.number().nullable(),
  //         ValetDate: z.date().nullable(),
  //         DateOnFloor: z.date().nullable(),
  //       }),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const updatedVehicle = await ctx.db.vehicles.update({
  //       where: { StockNum: input.StockNum },
  //       data: {
  //         VIN: input.VIN,
  //         MMCode: input.MMCode,
  //         Registration: input.Registration,
  //         Model: input.Model,
  //         Odometer: input.Odometer,
  //         StandInValue: input.StandInValue,
  //         InternetPrice: input.InternetPrice,
  //         InternetState: {
  //           update: {
  //             where: { StockNum: input.StockNum },
  //             data: input.InternetState,
  //           },
  //         },
  //         ReconState: {
  //           update: {
  //             where: { StockNum: input.StockNum },
  //             data: input.ReconState,
  //           },
  //         },
  //       },
  //       include: {
  //         InternetState: true,
  //         ReconState: true,
  //       },
  //     });
  //     return updatedVehicle;
  //   }),

  getAllWorkshops: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.workshops.findMany();
  }),

  getAllPannelBeaters: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.pannelBeaters.findMany();
  }),

  getAllInteriorRepairers: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.interiorRepairers.findMany();
  }),

  getAllValets: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.valets.findMany();
  }),
});