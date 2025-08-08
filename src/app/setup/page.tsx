"use client";

import { usePortfolioStore } from "@/store/portfolio-store";
import {
  InvestorSetupData,
  investorSetupSchema,
} from "@/entities/investor-setup";
import { Banknote, TrendingUp, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProgressSteps } from "@/components/ui/progress-steps";
import Spinner from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const InvestorSetupPage = () => {
  const router = useRouter();
  const { setInitialCapital, setGoalAmount, setInvestorType } =
    usePortfolioStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const form = useForm<InvestorSetupData>({
    resolver: zodResolver(investorSetupSchema),
    mode: "onChange", // Validate on every change for real-time updates
    defaultValues: {
      initialCapital: 100000,
      goalAmount: 120000,
      investorType: undefined,
    },
  });

  // Track form validity using useRef
  useEffect(() => {
    const subscription = form.watch((values) => {
      const isInitialCapitalFilled =
        values.initialCapital !== undefined && values.initialCapital >= 1000;
      const isGoalAmountFilled =
        values.goalAmount !== undefined && values.goalAmount >= 1000;
      const isInvestorTypeSelected = values.investorType !== undefined;
      const isFormValid =
        isInitialCapitalFilled && isGoalAmountFilled && isInvestorTypeSelected;

      setIsFormValid(isFormValid);
    });

    return () => subscription.unsubscribe();
  }, [form, form.formState]);

  async function onSubmit(data: InvestorSetupData) {
    setIsLoading(true);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 500));

    setInitialCapital(data.initialCapital);
    setGoalAmount(data.goalAmount);
    setInvestorType(data.investorType);
    console.log(data);

    setIsLoading(false);
    setIsFormValid(false);
    router.push("/results");
  }
  const selectedInvestorType = form.watch("investorType");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ProgressSteps />

      <Card className="border-2 border-purple-100 dark:border-purple-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <CardHeader className="text-center pb-8">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl mx-auto mb-4">
            <Banknote className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
            Investment Setup
          </CardTitle>
          <CardDescription className="text-lg">
            Define your investment goals and investor profile to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="initialCapital"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Initial Capital
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            $
                          </span>
                          <Input
                            type="number"
                            placeholder="100,000"
                            className="pl-8 h-12 text-lg border-2 focus:border-purple-500"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Amount you're planning to invest
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="goalAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Goal Amount
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            $
                          </span>
                          <Input
                            type="number"
                            placeholder="120,000"
                            className="pl-8 h-12 text-lg border-2 focus:border-purple-500"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Target amount after 1 year
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="investorType"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-base font-semibold">
                      Investor Type
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        onClick={() => {
                          console.log(field.value, isFormValid);
                        }}
                        className="grid md:grid-cols-2 gap-4"
                      >
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <RadioGroupItem
                                value="active"
                                id="active"
                                className="peer sr-only"
                              />
                              <label
                                htmlFor="active"
                                className={cn(
                                  "flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all",
                                  "hover:border-purple-600",
                                  selectedInvestorType === "active" &&
                                    "border-purple-600",
                                  "peer-checked:border-purple-600 peer-checked:bg-purple-50 dark:peer-checked:bg-red-900"
                                )}
                              >
                                <TrendingUp className="h-11 w-11 text-purple-600 mb-2 border border-purple-600 rounded-md p-1.5" />
                                <span className="font-semibold text-lg">
                                  Active Investor
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">
                                  At least 50% in stocks for higher growth
                                  potential
                                </span>
                              </label>
                            </div>
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <RadioGroupItem
                                value="passive"
                                id="passive"
                                className="peer sr-only"
                              />
                              <label
                                htmlFor="passive"
                                className={cn(
                                  "flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all",
                                  "hover:border-purple-300 dark:hover:border-purple-700",
                                  selectedInvestorType === "passive" &&
                                    "border-purple-600",
                                  "peer-checked:border-purple-600 peer-checked:bg-purple-50 dark:peer-checked:bg-purple-900/20"
                                )}
                              >
                                <Shield className="h-11 w-11 text-purple-600 mb-2 border border-purple-600 rounded-md p-1.5" />
                                <span className="font-semibold text-lg">
                                  Passive Investor
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">
                                  At least 50% in bonds/cash for stability
                                </span>
                              </label>
                            </div>
                          </FormControl>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading || !isFormValid}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 hover:cursor-pointer px-8 py-3 text-lg dark:text-white"
                >
                  {isLoading ? <Spinner /> : "Continue to Portfolio"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestorSetupPage;
