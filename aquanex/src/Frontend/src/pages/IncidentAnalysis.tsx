import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, TrendingUp, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/layout/PageHeader";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { MapContainer, TileLayer, Polygon, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useAuth } from "@/contexts/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DUBAI_CENTER: [number, number] = [25.2048, 55.2708];

// Helper to fit map bounds once
const FitMapToPointsOnce = ({ points }: { points: [number, number][] }) => {
  const map = useMap();
  const [fitted, setFitted] = useState(false);

  if (points.length > 2 && !fitted) {
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
    setFitted(true);
  }
  return null;
};

const timeSeriesData = [
  { month: "Jan", leaks: 45, salinity: 23, quality: 12 },
  { month: "Feb", leaks: 52, salinity: 28, quality: 15 },
  { month: "Mar", leaks: 38, salinity: 31, quality: 18 },
  { month: "Apr", leaks: 48, salinity: 27, quality: 14 },
  { month: "May", leaks: 41, salinity: 35, quality: 20 },
  { month: "Jun", leaks: 35, salinity: 29, quality: 16 },
];

const costData = [
  { name: "Water Loss", value: 2400000, color: "hsl(var(--primary))" },
  { name: "Materials", value: 1800000, color: "hsl(var(--secondary))" },
  { name: "Labor", value: 950000, color: "hsl(var(--warning))" },
];

const systemicIssues = [
  { component: "Pipe Type X - Zone 3", frequency: 47, avgCost: "42k", totalCost: "1.99M", severity: "critical" },
  { component: "Sensor Model A - Zone 5", frequency: 38, avgCost: "8k", totalCost: "312k", severity: "high" },
  { component: "Valve System B - Zone 2", frequency: 29, avgCost: "15k", totalCost: "435k", severity: "high" },
  { component: "Irrigation Line C - Zone 4", frequency: 24, avgCost: "22k", totalCost: "528k", severity: "medium" },
  { component: "Filter Unit D - Zone 1", frequency: 19, avgCost: "6k", totalCost: "114k", severity: "medium" },
  { component: "Pump Station E - Zone 6", frequency: 15, avgCost: "35k", totalCost: "525k", severity: "high" },
];

const incidents = [
  { timestamp: "2024-11-15 14:23", type: "Pipeline Break", zone: "Zone 3", severity: "critical", cost: "AED 156k", status: "Resolved" },
  { timestamp: "2024-11-15 11:47", type: "Salinity Spike", zone: "Zone 5", severity: "high", cost: "AED 42k", status: "In Progress" },
  { timestamp: "2024-11-15 09:12", type: "Quality Violation", zone: "Zone 2", severity: "medium", cost: "AED 18k", status: "Resolved" },
  { timestamp: "2024-11-14 18:34", type: "Sensor Failure", zone: "Zone 4", severity: "low", cost: "AED 8k", status: "Resolved" },
  { timestamp: "2024-11-14 15:22", type: "Pipeline Leak", zone: "Zone 1", severity: "high", cost: "AED 89k", status: "Resolved" },
  { timestamp: "2024-11-14 12:08", type: "Salinity Event", zone: "Zone 6", severity: "medium", cost: "AED 31k", status: "Resolved" },
  { timestamp: "2024-11-14 08:45", type: "Pressure Anomaly", zone: "Zone 3", severity: "high", cost: "AED 67k", status: "Resolved" },
  { timestamp: "2024-11-13 16:19", type: "Flow Interruption", zone: "Zone 5", severity: "critical", cost: "AED 198k", status: "Resolved" },
];

const IncidentAnalysis = () => {
  const { workspace } = useAuth();
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const layoutPolygon = useMemo(() => {
    if (!workspace?.layout_polygon || workspace.layout_polygon.length < 3) return [];
    return workspace.layout_polygon.map((p: any) => [p[1], p[0]] as [number, number]);
  }, [workspace]);

  // Mock heatmap points (scattered within Dubai roughly or relative to layout)
  // For now, we'll just put some random points near the layout center if available, else Dubai center
  const heatmapPoints = useMemo(() => {
    const center = layoutPolygon.length > 0 
        ? layoutPolygon[0] 
        : DUBAI_CENTER;
    
    return [
        { lat: center[0] + 0.001, lng: center[1] + 0.001, intensity: 0.8 },
        { lat: center[0] - 0.002, lng: center[1] + 0.002, intensity: 0.5 },
        { lat: center[0] + 0.003, lng: center[1] - 0.001, intensity: 0.9 },
    ];
  }, [layoutPolygon]);

  const toggleCard = (index: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  const kpiCards = [
    { 
      title: "Total Incidents This Quarter", 
      value: "342", 
      change: "+12%",
      trend: "up",
      details: {
        leak: { count: 156, change: "+8%" },
        salinity: { count: 124, change: "+15%" },
        quality: { count: 62, change: "+18%" }
      }
    },
    { 
      title: "Estimated Water Loss", 
      value: "AED 2.4M", 
      change: "–8%",
      trend: "down",
      details: {
        zone1: { amount: "AED 420k", change: "–12%" },
        zone2: { amount: "AED 380k", change: "–5%" },
        zone3: { amount: "AED 640k", change: "+2%" }
      }
    },
    { 
      title: "Material Replacement Cost", 
      value: "AED 1.8M", 
      change: "+5%",
      trend: "up",
      details: {
        pipes: { amount: "AED 980k", change: "+8%" },
        valves: { amount: "AED 540k", change: "+2%" },
        sensors: { amount: "AED 280k", change: "+4%" }
      }
    },
    { 
      title: "Labor Hours Spent", 
      value: "4,567 hours", 
      change: "–3%",
      trend: "down",
      details: {
        repairs: { hours: 2340, change: "–5%" },
        inspection: { hours: 1567, change: "–2%" },
        maintenance: { hours: 660, change: "+1%" }
      }
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <PageHeader 
        title="INCIDENT ANALYTICS ENGINE"
        subtitle="Cross-module operational and financial intelligence"
        breadcrumbs={[{ label: "Home", path: "/home" }, { label: "Incident Analytics" }]}
      />

      {/* Expandable KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleCard(index)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                {expandedCards.has(index) ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                <div className={`text-sm ${kpi.trend === 'down' ? 'text-success' : 'text-destructive'}`}>
                  {kpi.change}
                </div>
              </div>
              
              {expandedCards.has(index) && (
                <div className="pt-3 border-t space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">Breakdown</p>
                  {Object.entries(kpi.details).map(([key, value]: [string, any]) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <div className="text-right">
                        <span className="font-medium">{value.count || value.amount || value.hours}</span>
                        <span className={`ml-2 ${value.change.startsWith('–') ? 'text-success' : 'text-destructive'}`}>
                          {value.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Central Analytics Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="timeline">Anomalies Over Time</TabsTrigger>
              <TabsTrigger value="cost">Cost Impact</TabsTrigger>
              <TabsTrigger value="map">Hotspot Map</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="mt-6">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)"
                    }}
                  />
                  <Line type="monotone" dataKey="leaks" stroke="hsl(var(--destructive))" strokeWidth={2} name="Pipeline Breaks" />
                  <Line type="monotone" dataKey="salinity" stroke="hsl(var(--warning))" strokeWidth={2} name="Salinity" />
                  <Line type="monotone" dataKey="quality" stroke="hsl(var(--info))" strokeWidth={2} name="Quality" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="cost" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={costData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {costData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => `AED ${(value / 1000000).toFixed(2)}M`}
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)"
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Top 5 Cost-Driving Zones</h4>
                  <div className="space-y-2">
                    {[
                      { zone: "Zone 3", cost: "AED 1.99M" },
                      { zone: "Zone 5", cost: "AED 1.12M" },
                      { zone: "Zone 2", cost: "AED 890k" },
                      { zone: "Zone 4", cost: "AED 745k" },
                      { zone: "Zone 1", cost: "AED 625k" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="font-medium">{item.zone}</span>
                        <span className="text-primary font-bold">{item.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="map" className="mt-6">
              <div className="rounded-xl border border-border overflow-hidden h-[500px]">
                {layoutPolygon.length < 3 ? (
                  <div className="flex items-center justify-center h-full bg-muted/20 text-muted-foreground">
                    No layout polygon available.
                  </div>
                ) : (
                  <MapContainer center={DUBAI_CENTER} zoom={11} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                      attribution="Tiles © Esri"
                    />
                    <FitMapToPointsOnce points={layoutPolygon} />
                    <Polygon
                      positions={layoutPolygon}
                      pathOptions={{ color: "#10b981", weight: 2, fillOpacity: 0.15 }}
                    />
                    {heatmapPoints.map((pt, i) => (
                        <CircleMarker
                            key={i}
                            center={[pt.lat, pt.lng]}
                            radius={20 * pt.intensity}
                            pathOptions={{ 
                                color: pt.intensity > 0.7 ? '#ef4444' : '#f59e0b', 
                                fillColor: pt.intensity > 0.7 ? '#ef4444' : '#f59e0b',
                                fillOpacity: 0.6 
                            }}
                        >
                            <Popup>Incident Hotspot (Intensity: {(pt.intensity * 100).toFixed(0)}%)</Popup>
                        </CircleMarker>
                    ))}
                  </MapContainer>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Systemic Issue Ranking */}
      <Card>
        <CardHeader>
          <CardTitle>Systemic Issue Ranking</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component / Zone</TableHead>
                <TableHead>Incident Frequency</TableHead>
                <TableHead>Avg Cost Per Incident</TableHead>
                <TableHead>Total Cost Impact</TableHead>
                <TableHead>Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {systemicIssues.map((issue, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{issue.component}</TableCell>
                  <TableCell>{issue.frequency}</TableCell>
                  <TableCell>AED {issue.avgCost}</TableCell>
                  <TableCell className="font-semibold text-primary">AED {issue.totalCost}</TableCell>
                  <TableCell>
                    <Badge variant={
                      issue.severity === 'critical' ? 'destructive' :
                      issue.severity === 'high' ? 'alert' : 'warning'
                    }>
                      {issue.severity.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Cross-Module Correlation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-destructive" />
              <h4 className="font-semibold">Pipeline → Water Loss</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Pipeline failures account for 68% of total water loss this quarter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-warning" />
              <h4 className="font-semibold">Salinity → Crop Risk</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              High salinity events correlated with 42% reduction in crop yield projections
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-info" />
              <h4 className="font-semibold">Quality → Treatment Cost</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Poor water quality increases treatment costs by average of AED 34k per incident
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Incident Log */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Incident Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Incident Type</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Estimated Cost</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-mono text-xs">{incident.timestamp}</TableCell>
                  <TableCell>{incident.type}</TableCell>
                  <TableCell>{incident.zone}</TableCell>
                  <TableCell>
                    <Badge variant={
                      incident.severity === 'critical' ? 'destructive' :
                      incident.severity === 'high' ? 'alert' :
                      incident.severity === 'medium' ? 'warning' : 'secondary'
                    }>
                      {incident.severity.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">{incident.cost}</TableCell>
                  <TableCell>
                    <Badge variant={incident.status === 'Resolved' ? 'success' : 'warning'}>
                      {incident.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <button className="text-sm text-primary hover:underline">View Details</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
export default IncidentAnalysis;
