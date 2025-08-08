'use client';

import { ProgressSteps } from "@/components/ui/progress-steps";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { COLORS } from "@/lib/constants";
import { usePortfolioStore } from "@/store/portfolio-store";
import { PieChartIcon, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PortfolioPage = () => {
  const router = useRouter();
  const { initialCapital, investorType, assets, calculatePortfolio } =
    usePortfolioStore();

  useEffect(() => {
    if (!initialCapital || !investorType) {
      router.push("/setup");
      return;
    }
    calculatePortfolio();
  }, [initialCapital, investorType, calculatePortfolio, router]);

  if (!initialCapital || !investorType) {
    return null;
  }

  const chartData = assets.map((asset, index) => ({
    name: asset.name,
    allocation: asset.allocation,
    yield: asset.yield,
    amount: (asset.allocation / 100) * initialCapital,
    color: COLORS[index],
  }));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ProgressSteps />

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl mb-4">
          <PieChartIcon className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
          Portfolio Breakdown
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Your {investorType} investor allocation with Ethiopian market assets
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <Card className="border-2 border-purple-100 dark:border-purple-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-purple-600" />
              Asset Allocation
            </CardTitle>
            <CardDescription>
              Portfolio distribution by asset type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="allocation"
                    label={({ name, allocation }) => `${name}: ${allocation}%`}
                    labelLine={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-100 dark:border-purple-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Expected Yields
            </CardTitle>
            <CardDescription>Annual return rates by asset</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="yield" fill="#7C3AED" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {assets.map((asset, index) => (
          <Card
            key={asset.name}
            className="border-2 border-purple-100 dark:border-purple-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">{asset.name}</CardTitle>
              <CardDescription className="capitalize">
                {asset.type} Investment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Allocation</span>
                  <span className="font-medium">{asset.allocation}%</span>
                </div>
                <Progress value={asset.allocation} className="h-2" />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Amount
                </span>
                <span className="font-semibold">
                  {formatCurrency((asset.allocation / 100) * initialCapital)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Annual Yield
                </span>
                <span className="font-semibold text-green-600">
                  {asset.yield}%
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-purple-100 dark:border-purple-800">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Expected Return
                </span>
                <span className="font-bold text-purple-600">
                  {formatCurrency(
                    ((asset.allocation / 100) * initialCapital * asset.yield) /
                      100
                  )}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Link href="/results">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 hover:cursor-pointer px-8 py-3 text-lg dark:text-white"
          >
            View Results & Analysis
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PortfolioPage;
