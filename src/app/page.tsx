import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, Target, PieChart, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto  px-4 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl mb-6">
          <TrendingUp className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 dark:from-purple-400 dark:via-purple-500 dark:to-purple-600 bg-clip-text text-transparent">
            Smart Portfolio
          </span>
          <br />
          <span className="text-gray-900 dark:text-white">Planning</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
          Plan your investment portfolio with intelligent allocation based on
          your investor profile. Get clear projections and see if you'll meet
          your financial goals.
        </p>
        <Link href="/setup">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-500 hover:border-purple-600 hover:cursor-pointer text-white px-8 py-3 text-lg"
          >
            Start Planning
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="p-8 text-center border-2 border-purple-100 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-600 transition-colors bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm">
          <div className="inline-flex items-center justify-center p-4 bg-purple-100 dark:bg-purple-900 rounded-xl mb-4">
            <Target className="h-8 w-8 text-purple-600 dark:text-gray-300" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Define Your Goal
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Set your investment capital and target amount with a clear 1-year
            timeline.
          </p>
        </Card>

        <Card className="p-8 text-center border-2 border-purple-100 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-600 transition-colors bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm">
          <div className="inline-flex items-center justify-center p-4 bg-purple-100 dark:bg-purple-900 rounded-xl mb-4">
            <PieChart className="h-8 w-8 text-purple-600 dark:text-gray-300" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Smart Allocation
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Get automatic portfolio allocation based on your investor type and
            risk profile.
          </p>
        </Card>

        <Card className="p-8 text-center border-2 border-purple-100 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-600 transition-colors bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm">
          <div className="inline-flex items-center justify-center p-4 bg-purple-100 dark:bg-purple-900 rounded-xl mb-4">
            <CheckCircle className="h-8 w-8 text-purple-600 dark:text-gray-300" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Track Results
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            See projected returns and whether you'll achieve your investment
            goals.
          </p>
        </Card>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <span>🇪🇹 Ethiopian Market Focus</span>
          <span>•</span>
          <span>💼 Professional Analysis</span>
          <span>•</span>
          <span>📊 Clear Visualization</span>
        </div>
      </div>
    </div>
  );
}
