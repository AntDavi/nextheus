"use client";

import { useState, useMemo } from "react";
import {
  Users,
  DollarSign,
  Activity as ActivityIcon,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportFilters, {
  FilterState,
} from "@/app/(main)/report/_components/report-filters";
import DataTable, {
  ColumnDefinition,
} from "@/app/(main)/report/_components/data-table";
import DetailModal from "@/app/(main)/report/_components/detail-modal";
import {
  mockUsers,
  mockSales,
  mockMetrics,
  mockActivities,
  User,
  Sale,
  Metric,
  Activity,
  filterByDateRange,
  calculateStats,
} from "../../../../utils/data/reports";

type ReportType = "users" | "sales" | "metrics" | "activities";

export default function ReportPage() {
  const [activeTab, setActiveTab] = useState<ReportType>("sales");
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { from: "", to: "" },
    status: "all",
    category: "all",
    search: "",
  });
  const [selectedItem, setSelectedItem] = useState<
    User | Sale | Metric | Activity | null
  >(null);
  const [modalType, setModalType] = useState<
    "user" | "sale" | "metric" | "activity"
  >("sale");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Configurações de filtros por tipo de relatório
  const getFilterConfig = (type: ReportType) => {
    switch (type) {
      case "users":
        return {
          statusOptions: [
            { value: "all", label: "Todos os Status" },
            { value: "active", label: "Ativo" },
            { value: "inactive", label: "Inativo" },
            { value: "pending", label: "Pendente" },
          ],
          categoryOptions: [
            { value: "all", label: "Todas as Assinaturas" },
            { value: "free", label: "Gratuito" },
            { value: "premium", label: "Premium" },
            { value: "enterprise", label: "Enterprise" },
          ],
          showCategoryFilter: true,
        };
      case "sales":
        return {
          statusOptions: [
            { value: "all", label: "Todos os Status" },
            { value: "completed", label: "Concluído" },
            { value: "pending", label: "Pendente" },
            { value: "cancelled", label: "Cancelado" },
            { value: "refunded", label: "Reembolsado" },
          ],
          categoryOptions: [
            { value: "all", label: "Todos os Métodos" },
            { value: "credit_card", label: "Cartão de Crédito" },
            { value: "pix", label: "PIX" },
            { value: "boleto", label: "Boleto" },
          ],
          showCategoryFilter: true,
        };
      case "metrics":
        return {
          statusOptions: [
            { value: "all", label: "Todos os Períodos" },
            { value: "daily", label: "Diário" },
            { value: "weekly", label: "Semanal" },
            { value: "monthly", label: "Mensal" },
          ],
          categoryOptions: [
            { value: "all", label: "Todas as Categorias" },
            { value: "revenue", label: "Receita" },
            { value: "users", label: "Usuários" },
            { value: "engagement", label: "Engajamento" },
            { value: "conversion", label: "Conversão" },
          ],
          showCategoryFilter: true,
        };
      case "activities":
        return {
          statusOptions: [
            { value: "all", label: "Todas as Ações" },
            { value: "login", label: "Login" },
            { value: "purchase", label: "Compra" },
            { value: "export", label: "Exportação" },
            { value: "settings_change", label: "Alteração de Configuração" },
          ],
          categoryOptions: [],
          showCategoryFilter: false,
        };
      default:
        return {
          statusOptions: [],
          categoryOptions: [],
          showCategoryFilter: false,
        };
    }
  };

  // Função de filtragem de dados
  const filterData = <T extends User | Sale | Metric | Activity>(
    data: T[],
    type: ReportType
  ): T[] => {
    let filtered = [...data];

    // Filtro por data
    if (filters.dateRange.from || filters.dateRange.to) {
      filtered = filterByDateRange(
        filtered,
        filters.dateRange.from || "1900-01-01",
        filters.dateRange.to || "2100-12-31"
      );
    }

    // Filtro por texto de busca
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter((item) => {
        return Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchLower)
        );
      });
    }

    // Filtro por status
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter((item) => {
        if (type === "users") {
          const user = item as User;
          return user.status === filters.status;
        }
        if (type === "sales") {
          const sale = item as Sale;
          return sale.status === filters.status;
        }
        if (type === "metrics") {
          const metric = item as Metric;
          return metric.period === filters.status;
        }
        if (type === "activities") {
          const activity = item as Activity;
          return activity.action === filters.status;
        }
        return true;
      });
    }

    // Filtro por categoria
    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter((item) => {
        if (type === "users") {
          const user = item as User;
          return user.subscription === filters.category;
        }
        if (type === "sales") {
          const sale = item as Sale;
          return sale.paymentMethod === filters.category;
        }
        if (type === "metrics") {
          const metric = item as Metric;
          return metric.category === filters.category;
        }
        return true;
      });
    }

    return filtered;
  };

  // Dados filtrados
  const filteredUsers = filterData(mockUsers, "users");
  const filteredSales = filterData(mockSales, "sales");
  const filteredMetrics = filterData(mockMetrics, "metrics");
  const filteredActivities = filterData(mockActivities, "activities");

  // Estatísticas dos dados filtrados
  const salesStats = useMemo(
    () => calculateStats(filteredSales as Sale[]),
    [filteredSales]
  );

  // Definições de colunas para cada tipo de tabela
  const userColumns: ColumnDefinition<User>[] = [
    { key: "name", label: "Nome", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "subscription", label: "Assinatura", sortable: true },
    { key: "totalRevenue", label: "Receita Total", sortable: true },
    { key: "createdAt", label: "Data de Cadastro", sortable: true },
  ];

  const saleColumns: ColumnDefinition<Sale>[] = [
    { key: "id", label: "ID", sortable: true },
    { key: "customerName", label: "Cliente", sortable: true },
    { key: "product", label: "Produto", sortable: true },
    { key: "amount", label: "Valor", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "paymentMethod", label: "Pagamento", sortable: true },
    { key: "date", label: "Data", sortable: true },
  ];

  const metricColumns: ColumnDefinition<Metric>[] = [
    { key: "name", label: "Métrica", sortable: true },
    { key: "value", label: "Valor Atual", sortable: true },
    { key: "previousValue", label: "Valor Anterior", sortable: true },
    { key: "category", label: "Categoria", sortable: true },
    { key: "period", label: "Período", sortable: true },
    { key: "date", label: "Data", sortable: true },
  ];

  const activityColumns: ColumnDefinition<Activity>[] = [
    { key: "userName", label: "Usuário", sortable: true },
    { key: "action", label: "Ação", sortable: true },
    { key: "description", label: "Descrição", sortable: true },
    { key: "timestamp", label: "Data/Hora", sortable: true },
    { key: "ip", label: "IP", sortable: true },
  ];

  // Handlers
  const handleRowClick = (item: User | Sale | Metric | Activity) => {
    setSelectedItem(item);
    const typeMap: Record<ReportType, "user" | "sale" | "metric" | "activity"> =
      {
        users: "user",
        sales: "sale",
        metrics: "metric",
        activities: "activity",
      };
    setModalType(typeMap[activeTab]);
    setIsModalOpen(true);
  };

  const handleExport = () => {
    const dataMap = {
      users: filteredUsers,
      sales: filteredSales,
      metrics: filteredMetrics,
      activities: filteredActivities,
    };

    const data = dataMap[activeTab];
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${activeTab}_${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">
            Análise completa dos dados e métricas do sistema
          </p>
        </div>
      </div>

      {/* Cards de estatísticas resumidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Usuários
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockUsers.filter((u: User) => u.status === "active").length}{" "}
              ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Vendas Realizadas
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {salesStats.completedSales}
            </div>
            <p className="text-xs text-muted-foreground">
              de {salesStats.totalSales} vendas totais
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(salesStats.completedRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Ticket médio:{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(salesStats.averageTicket)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atividades</CardTitle>
            <ActivityIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredActivities.length}
            </div>
            <p className="text-xs text-muted-foreground">últimas 24 horas</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de relatórios */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ReportType)}
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">Vendas</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="metrics">Métricas</TabsTrigger>
          <TabsTrigger value="activities">Atividades</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <ReportFilters
            filters={filters}
            onFiltersChange={setFilters}
            onExport={handleExport}
            {...getFilterConfig(activeTab)}
          />
        </div>

        <TabsContent value="sales" className="space-y-4">
          <DataTable
            data={filteredSales}
            columns={saleColumns}
            onRowClick={handleRowClick}
            emptyMessage="Nenhuma venda encontrada"
          />
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <DataTable
            data={filteredUsers}
            columns={userColumns}
            onRowClick={handleRowClick}
            emptyMessage="Nenhum usuário encontrado"
          />
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <DataTable
            data={filteredMetrics}
            columns={metricColumns}
            onRowClick={handleRowClick}
            emptyMessage="Nenhuma métrica encontrada"
          />
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <DataTable
            data={filteredActivities}
            columns={activityColumns}
            onRowClick={handleRowClick}
            emptyMessage="Nenhuma atividade encontrada"
          />
        </TabsContent>
      </Tabs>

      {/* Modal de detalhes */}
      <DetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedItem}
        type={modalType}
      />
    </div>
  );
}
