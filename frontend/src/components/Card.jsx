import React from "react";
import Card from "../components/Card";
import { FaWalking } from "react-icons/fa";

export default function DashboardWidgets() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
      <Card title="Steps Today" value={10234} icon={<FaWalking />} />
      <Card title="Water Intake" value="6 cups" />
      <Card title="Health Tip">
        <p>Drink more water & take a walk today 🚶‍♂️</p>
      </Card>
    </div>
  );
}
