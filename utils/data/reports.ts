// Tipos para os relatórios
export type User = {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  role: "admin" | "user" | "moderator";
  createdAt: string;
  lastAccess: string;
  subscription: "free" | "premium" | "enterprise";
  totalRevenue: number;
};

export type Sale = {
  id: string;
  customerId: string;
  customerName: string;
  product: string;
  amount: number;
  status: "completed" | "pending" | "cancelled" | "refunded";
  paymentMethod: "credit_card" | "pix" | "boleto";
  date: string;
  commission: number;
};

export type Metric = {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  category: "revenue" | "users" | "engagement" | "conversion";
  period: "daily" | "weekly" | "monthly";
  date: string;
};

export type Activity = {
  id: string;
  userId: string;
  userName: string;
  action: string;
  description: string;
  timestamp: string;
  ip: string;
  userAgent: string;
};

// Dados mocados de usuários
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@email.com",
    status: "active",
    role: "admin",
    createdAt: "2024-01-15",
    lastAccess: "2024-09-15",
    subscription: "enterprise",
    totalRevenue: 5420.5,
  },
  {
    id: "2",
    name: "Carlos Santos",
    email: "carlos.santos@email.com",
    status: "active",
    role: "user",
    createdAt: "2024-02-20",
    lastAccess: "2024-09-14",
    subscription: "premium",
    totalRevenue: 2890.0,
  },
  {
    id: "3",
    name: "Maria Oliveira",
    email: "maria.oliveira@email.com",
    status: "inactive",
    role: "user",
    createdAt: "2024-03-10",
    lastAccess: "2024-08-30",
    subscription: "free",
    totalRevenue: 0,
  },
  {
    id: "4",
    name: "João Ferreira",
    email: "joao.ferreira@email.com",
    status: "pending",
    role: "moderator",
    createdAt: "2024-09-01",
    lastAccess: "2024-09-15",
    subscription: "premium",
    totalRevenue: 450.0,
  },
  {
    id: "5",
    name: "Luciana Costa",
    email: "luciana.costa@email.com",
    status: "active",
    role: "user",
    createdAt: "2024-01-05",
    lastAccess: "2024-09-16",
    subscription: "enterprise",
    totalRevenue: 8750.25,
  },
  {
    id: "6",
    name: "Ricardo Lima",
    email: "ricardo.lima@email.com",
    status: "active",
    role: "user",
    createdAt: "2024-04-12",
    lastAccess: "2024-09-13",
    subscription: "free",
    totalRevenue: 120.0,
  },
  {
    id: "7",
    name: "Fernanda Rocha",
    email: "fernanda.rocha@email.com",
    status: "inactive",
    role: "user",
    createdAt: "2024-05-08",
    lastAccess: "2024-07-22",
    subscription: "premium",
    totalRevenue: 1650.0,
  },
  {
    id: "8",
    name: "Pedro Almeida",
    email: "pedro.almeida@email.com",
    status: "active",
    role: "admin",
    createdAt: "2024-06-18",
    lastAccess: "2024-09-16",
    subscription: "enterprise",
    totalRevenue: 3200.75,
  },
];

// Dados mocados de vendas
export const mockSales: Sale[] = [
  {
    id: "S001",
    customerId: "1",
    customerName: "Ana Silva",
    product: "Plano Enterprise - Anual",
    amount: 2400.0,
    status: "completed",
    paymentMethod: "credit_card",
    date: "2024-09-15",
    commission: 240.0,
  },
  {
    id: "S002",
    customerId: "2",
    customerName: "Carlos Santos",
    product: "Plano Premium - Mensal",
    amount: 89.9,
    status: "completed",
    paymentMethod: "pix",
    date: "2024-09-14",
    commission: 8.99,
  },
  {
    id: "S003",
    customerId: "4",
    customerName: "João Ferreira",
    product: "Plano Premium - Trimestral",
    amount: 250.0,
    status: "pending",
    paymentMethod: "boleto",
    date: "2024-09-13",
    commission: 25.0,
  },
  {
    id: "S004",
    customerId: "5",
    customerName: "Luciana Costa",
    product: "Plano Enterprise - Semestral",
    amount: 1200.0,
    status: "completed",
    paymentMethod: "credit_card",
    date: "2024-09-12",
    commission: 120.0,
  },
  {
    id: "S005",
    customerId: "6",
    customerName: "Ricardo Lima",
    product: "Upgrade para Premium",
    amount: 49.9,
    status: "cancelled",
    paymentMethod: "credit_card",
    date: "2024-09-11",
    commission: 0,
  },
  {
    id: "S006",
    customerId: "8",
    customerName: "Pedro Almeida",
    product: "Plano Enterprise - Anual",
    amount: 2400.0,
    status: "refunded",
    paymentMethod: "credit_card",
    date: "2024-09-10",
    commission: -240.0,
  },
  {
    id: "S007",
    customerId: "2",
    customerName: "Carlos Santos",
    product: "Add-on Analytics",
    amount: 29.9,
    status: "completed",
    paymentMethod: "pix",
    date: "2024-09-09",
    commission: 2.99,
  },
  {
    id: "S008",
    customerId: "1",
    customerName: "Ana Silva",
    product: "Consultoria Premium",
    amount: 500.0,
    status: "completed",
    paymentMethod: "credit_card",
    date: "2024-09-08",
    commission: 100.0,
  },
];

// Dados mocados de métricas
export const mockMetrics: Metric[] = [
  {
    id: "M001",
    name: "Receita Total",
    value: 15420.5,
    previousValue: 12890.25,
    category: "revenue",
    period: "monthly",
    date: "2024-09-01",
  },
  {
    id: "M002",
    name: "Usuários Ativos",
    value: 1250,
    previousValue: 1180,
    category: "users",
    period: "monthly",
    date: "2024-09-01",
  },
  {
    id: "M003",
    name: "Taxa de Conversão",
    value: 3.2,
    previousValue: 2.8,
    category: "conversion",
    period: "monthly",
    date: "2024-09-01",
  },
  {
    id: "M004",
    name: "Tempo Médio de Sessão",
    value: 24.5,
    previousValue: 22.1,
    category: "engagement",
    period: "weekly",
    date: "2024-09-08",
  },
  {
    id: "M005",
    name: "MRR (Monthly Recurring Revenue)",
    value: 8750.0,
    previousValue: 8200.0,
    category: "revenue",
    period: "monthly",
    date: "2024-09-01",
  },
  {
    id: "M006",
    name: "Churn Rate",
    value: 2.1,
    previousValue: 2.8,
    category: "users",
    period: "monthly",
    date: "2024-09-01",
  },
  {
    id: "M007",
    name: "CAC (Customer Acquisition Cost)",
    value: 45.8,
    previousValue: 52.3,
    category: "conversion",
    period: "monthly",
    date: "2024-09-01",
  },
  {
    id: "M008",
    name: "LTV (Lifetime Value)",
    value: 485.2,
    previousValue: 412.15,
    category: "revenue",
    period: "monthly",
    date: "2024-09-01",
  },
];

// Dados mocados de atividades
export const mockActivities: Activity[] = [
  {
    id: "A001",
    userId: "1",
    userName: "Ana Silva",
    action: "login",
    description: "Usuário fez login na aplicação",
    timestamp: "2024-09-16T08:30:15Z",
    ip: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "A002",
    userId: "2",
    userName: "Carlos Santos",
    action: "purchase",
    description: "Compra do Plano Premium realizada",
    timestamp: "2024-09-15T14:22:30Z",
    ip: "192.168.1.101",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  },
  {
    id: "A003",
    userId: "5",
    userName: "Luciana Costa",
    action: "export",
    description: "Exportação de relatório de vendas",
    timestamp: "2024-09-15T11:45:20Z",
    ip: "192.168.1.102",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "A004",
    userId: "8",
    userName: "Pedro Almeida",
    action: "settings_change",
    description: "Alteração nas configurações de notificação",
    timestamp: "2024-09-15T09:15:45Z",
    ip: "192.168.1.103",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
  },
  {
    id: "A005",
    userId: "4",
    userName: "João Ferreira",
    action: "password_reset",
    description: "Solicitação de redefinição de senha",
    timestamp: "2024-09-14T16:30:10Z",
    ip: "192.168.1.104",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15",
  },
  {
    id: "A006",
    userId: "2",
    userName: "Carlos Santos",
    action: "logout",
    description: "Usuário fez logout da aplicação",
    timestamp: "2024-09-14T18:45:30Z",
    ip: "192.168.1.101",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  },
];

// Função para filtrar dados por data
export const filterByDateRange = <
  T extends { date?: string; timestamp?: string; createdAt?: string }
>(
  data: T[],
  startDate: string,
  endDate: string
): T[] => {
  return data.filter((item) => {
    const dateField = item.date || item.timestamp || item.createdAt;
    if (!dateField) return false;

    const itemDate = new Date(dateField);
    const start = new Date(startDate);
    const end = new Date(endDate);

    return itemDate >= start && itemDate <= end;
  });
};

// Função para calcular estatísticas
export const calculateStats = (data: Sale[]) => {
  const total = data.reduce((acc, sale) => acc + sale.amount, 0);
  const completed = data.filter((sale) => sale.status === "completed");
  const completedRevenue = completed.reduce(
    (acc, sale) => acc + sale.amount,
    0
  );
  const averageTicket =
    completed.length > 0 ? completedRevenue / completed.length : 0;

  return {
    totalSales: data.length,
    completedSales: completed.length,
    totalRevenue: total,
    completedRevenue,
    averageTicket,
    conversionRate:
      data.length > 0 ? (completed.length / data.length) * 100 : 0,
  };
};
