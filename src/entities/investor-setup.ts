import { z } from "zod";

export const investorSetupSchema = z
  .object({
    initialCapital: z
      .number()
      .min(1000, "Initial capital must be at least $1,000"),
    goalAmount: z.number().min(1000, "Goal amount must be at least $1,000"),
    investorType: z.enum(["active", "passive"], {
      error: "Please select an investor type",
    }),
  })
  .refine((data) => data.goalAmount > data.initialCapital, {
    message: "Goal amount must be greater than initial capital",
    path: ["goalAmount"],
  });

export type InvestorSetupData = z.infer<typeof investorSetupSchema>;
