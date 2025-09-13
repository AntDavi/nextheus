// Dados mocados para o dashboard

export interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  conversions: number;
  growthRate: number;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
}

export interface RecentActivity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  status: "success" | "pending" | "failed";
}

export interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
}

// Métricas principais do dashboard
export const dashboardMetrics: DashboardMetrics = {
  totalUsers: 2847,
  activeUsers: 1943,
  revenue: 45680.5,
  conversions: 342,
  growthRate: 12.5,
};

// Dados para gráfico de evolução mensal
export const monthlyData: ChartData[] = [
  { name: "Jan", value: 25000, date: "2024-01" },
  { name: "Fev", value: 28000, date: "2024-02" },
  { name: "Mar", value: 32000, date: "2024-03" },
  { name: "Abr", value: 29000, date: "2024-04" },
  { name: "Mai", value: 35000, date: "2024-05" },
  { name: "Jun", value: 38000, date: "2024-06" },
  { name: "Jul", value: 42000, date: "2024-07" },
  { name: "Ago", value: 45000, date: "2024-08" },
  { name: "Set", value: 48000, date: "2024-09" },
];

// Dados para gráfico de pizza - fontes de tráfego
export const trafficSources: TrafficSource[] = [
  { source: "Orgânico", visitors: 1245, percentage: 42.8 },
  { source: "Social Media", visitors: 890, percentage: 30.6 },
  { source: "Email Marketing", visitors: 456, percentage: 15.7 },
  { source: "Anúncios Pagos", visitors: 321, percentage: 11.0 },
];

// Atividades recentes
export const recentActivities: RecentActivity[] = [
  {
    id: "1",
    user: "João Silva",
    action: "Completou cadastro",
    timestamp: "2024-09-13 14:30",
    status: "success",
  },
  {
    id: "2",
    user: "Maria Santos",
    action: "Realizou pagamento",
    timestamp: "2024-09-13 14:15",
    status: "success",
  },
  {
    id: "3",
    user: "Pedro Costa",
    action: "Cancelou assinatura",
    timestamp: "2024-09-13 13:45",
    status: "failed",
  },
  {
    id: "4",
    user: "Ana Oliveira",
    action: "Atualizou perfil",
    timestamp: "2024-09-13 13:20",
    status: "success",
  },
  {
    id: "5",
    user: "Carlos Lima",
    action: "Processando pagamento",
    timestamp: "2024-09-13 12:55",
    status: "pending",
  },
];

// Dados semanais para o gráfico de barras
export const weeklyData: ChartData[] = [
  { name: "Seg", value: 1200 },
  { name: "Ter", value: 1450 },
  { name: "Qua", value: 1100 },
  { name: "Qui", value: 1680 },
  { name: "Sex", value: 1890 },
  { name: "Sáb", value: 950 },
  { name: "Dom", value: 800 },
];

// Categorias de produtos/serviços
export const productCategories = [
  { name: "SaaS Premium", value: 45 },
  { name: "SaaS Básico", value: 30 },
  { name: "Consultoria", value: 15 },
  { name: "Suporte", value: 10 },
];
