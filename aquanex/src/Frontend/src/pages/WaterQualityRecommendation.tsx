import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const recommendationsByZone: Record<string, any> = {
  "zone-a-north-field": {
    title: "Maintain Stable Water Chemistry",
    priority: "Low",
    summary: "Water quality is within target range. Continue current dosing and monitoring cadence.",
    actions: [
      "Maintain chlorine dosing at 0.45-0.55 mg/L during this week.",
      "Run pH calibration check at next maintenance window.",
      "Keep current filter backwash schedule unchanged.",
    ],
    targetWindow: "Within 7 days",
  },
  "zone-b-south-field": {
    title: "Reduce TDS Drift and Turbidity Spikes",
    priority: "Medium",
    summary: "TDS and turbidity are trending toward warning thresholds, likely due to inlet solids load.",
    actions: [
      "Increase sediment filter inspection frequency to every 24 hours.",
      "Blend with lower TDS source line for next irrigation cycle.",
      "Run 15-minute line flush before first daily irrigation block.",
    ],
    targetWindow: "Within 24 hours",
  },
  "zone-c-east-field": {
    title: "Preserve Optimal Conditions",
    priority: "Low",
    summary: "Readings are healthy. Preventive checks are recommended to avoid sudden drift.",
    actions: [
      "Keep dosing profile unchanged for this zone.",
      "Verify turbidity sensor cleaning once this week.",
      "Track daily min/max pH variance for anomaly baseline.",
    ],
    targetWindow: "Within 7 days",
  },
  "zone-d-west-field": {
    title: "Urgent Stabilization for Critical Quality Deviation",
    priority: "High",
    summary: "pH, TDS, and turbidity exceed safe operating range; immediate corrective action required.",
    actions: [
      "Pause irrigation to affected sub-lines until corrective flush completes.",
      "Perform dual-stage flush and media replacement on filtration unit.",
      "Apply pH correction dosing to bring levels toward 7.2-7.6.",
      "Re-sample every 10 minutes for one hour and re-open only if stable.",
    ],
    targetWindow: "Start immediately",
  },
};

const zoneNameFromId = (zoneId?: string) =>
  String(zoneId || "")
    .split("-")
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");

const WaterQualityRecommendation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { zoneId } = useParams();

  const stateZone = (location.state as any)?.zone;
  const recommendation = useMemo(() => {
    if (zoneId && recommendationsByZone[zoneId]) {
      return recommendationsByZone[zoneId];
    }
    return {
      title: "General Water Quality Recommendation",
      priority: "Medium",
      summary: "Investigate current sensor trend and apply standard mitigation protocol.",
      actions: [
        "Inspect upstream filtration system.",
        "Validate sensor calibration and repeat reading.",
        "Adjust dosing gradually and monitor trend response.",
      ],
      targetWindow: "Within 24 hours",
    };
  }, [zoneId]);

  const zoneLabel = String(stateZone?.zone || zoneNameFromId(zoneId) || "Selected Zone");
  const badgeClass =
    recommendation.priority === "High"
      ? "bg-red-100 text-red-800 border-red-300"
      : recommendation.priority === "Medium"
      ? "bg-yellow-100 text-yellow-800 border-yellow-300"
      : "bg-green-100 text-green-800 border-green-300";

  return (
    <div className="p-8 space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", path: "/home" },
          { label: "Water Quality", path: "/water-quality" },
          { label: "Recommendation" },
        ]}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Recommendation: {zoneLabel}</h1>
          <p className="text-muted-foreground">Actionable guidance for the current water quality state.</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/water-quality")}>
          Back to Water Quality
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle>{recommendation.title}</CardTitle>
            <Badge className={`${badgeClass} border`}>Priority: {recommendation.priority}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <p className="text-sm text-muted-foreground">Summary</p>
            <p className="mt-1 text-sm">{recommendation.summary}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Recommended Actions</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {recommendation.actions.map((action: string, idx: number) => (
                <li key={idx}>{action}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Target Execution Window</p>
            <p className="mt-1 text-sm font-medium">{recommendation.targetWindow}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterQualityRecommendation;
