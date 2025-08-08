import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DollarSign } from "lucide-react";

interface Props {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

const StatCard = ({ title, icon, children }: Props) => {
  return (
    <Card className="border-2 border-purple-100 dark:border-purple-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default StatCard;
