"use client";

import { ProgressSteps } from "@/components/ui/progress-steps";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { usePortfolioStore } from "@/store/portfolio-store";
import {
  CheckCircle,
  XCircle,
  DollarSign,
  TrendingUp,
  Target,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import StatCard from "@/components/Layout/StatCard";

const SummaryResultPage = () => {
  const router = useRouter();
  const {
    initialCapital,
    goalAmount,
    investorType,
    assets,
    totalReturn,
    goalMet,
    reset,
  } = usePortfolioStore();

  useEffect(() => {
    if (!initialCapital || !investorType) {
      router.push("/setup");
    }
  }, [initialCapital, investorType, router]);

  if (!initialCapital || !investorType) {
    return null;
  }

  const finalAmount = initialCapital + totalReturn;
  const goalDifference = finalAmount - goalAmount;
  const returnPercentage = (totalReturn / initialCapital) * 100;

  const resultData = assets.map((asset) => ({
    name: asset.name,
    allocated: (asset.allocation / 100) * initialCapital,
    return: ((asset.allocation / 100) * initialCapital * asset.yield) / 100,
    yield: asset.yield,
  }));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleReset = () => {
    reset();
    router.push("/setup");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ProgressSteps />

      <div className="text-center mb-8">
        <div
          className={`inline-flex items-center justify-center p-4 rounded-2xl mb-4 ${
            goalMet
              ? "bg-gradient-to-br from-green-500 to-green-700"
              : "bg-gradient-to-br from-red-500 to-red-700"
          }`}
        >
          {goalMet ? (
            <CheckCircle className="h-8 w-8 text-white" />
          ) : (
            <XCircle className="h-8 w-8 text-white" />
          )}
        </div>
        <h1 className="text-3xl font-bold mb-2">
          <span
            className={`${
              goalMet
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {goalMet ? "Goal Achieved!" : "Goal Missed"}
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {goalMet
            ? `Congratulations! You'll exceed your goal by ${formatCurrency(
                Math.abs(goalDifference)
              )}`
            : `You'll miss your goal by ${formatCurrency(
                Math.abs(goalDifference)
              )}`}
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Initial Capital"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        >
          <div className="text-2xl font-bold">
            {formatCurrency(initialCapital)}
          </div>
        </StatCard>

        <StatCard
          title="Total Return"
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        >
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(totalReturn)}
          </div>
          <p className="text-xs text-muted-foreground">
            {returnPercentage.toFixed(1)}% annual return
          </p>
        </StatCard>

        <StatCard
          title="Final Amount"
          icon={<Target className="h-4 w-4 text-muted-foreground" />}
        >
          <div className="text-2xl font-bold">
            {formatCurrency(finalAmount)}
          </div>
          <p className="text-xs text-muted-foreground">After 1 year</p>
        </StatCard>

        <Card className="border-2 border-purple-100 dark:border-purple-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goal Status</CardTitle>
            {goalMet ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge
                variant={goalMet ? "default" : "destructive"}
                className="text-base"
              >
                {goalMet ? "Achieved" : "Missed"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Target: {formatCurrency(goalAmount)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Returns by Asset */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <Card className="border-2 border-purple-100 dark:border-purple-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Returns by Asset</CardTitle>
            <CardDescription>
              Detailed breakdown of returns from each investment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resultData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      formatCurrency(Number(value)),
                      name === "return" ? "Return" : "Allocated",
                    ]}
                  />
                  <Bar dataKey="allocated" fill="#E879F9" name="allocated" />
                  <Bar dataKey="return" fill="#7C3AED" name="return" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-100 dark:border-purple-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Asset Performance</CardTitle>
            <CardDescription>
              Individual asset allocation and returns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {resultData.map((asset, index) => (
              <div
                key={asset.name}
                className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
              >
                <div>
                  <h4 className="font-semibold">{asset.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatCurrency(asset.allocated)} allocated • {asset.yield}%
                    yield
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">
                    {formatCurrency(asset.return)}
                  </p>
                  <p className="text-xs text-gray-500">return</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="text-center space-y-4">
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleReset}
            variant="outline"
            size="lg"
            className="border-purple-300 dark:border-purple-700 hover:bg-purple-50 hover:cursor-pointer dark:hover:bg-purple-900/20"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Start New Plan
          </Button>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Based on historical performance of Ethiopian market assets • Results
          are projections only
        </p>
      </div>
    </div>
  );
};

export default SummaryResultPage;
