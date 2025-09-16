"use client";

import { useState } from "react";
import { Download, Share, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Sale,
  Metric,
  Activity,
} from "../../../../../utils/data/reports";

type DetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: User | Sale | Metric | Activity | null;
  type: "user" | "sale" | "metric" | "activity";
};

export default function DetailModal({
  isOpen,
  onClose,
  data,
  type,
}: DetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      {
        variant: "default" | "secondary" | "destructive" | "outline";
        label: string;
      }
    > = {
      active: { variant: "default", label: "Ativo" },
      inactive: { variant: "secondary", label: "Inativo" },
      pending: { variant: "outline", label: "Pendente" },
      completed: { variant: "default", label: "Concluído" },
      cancelled: { variant: "destructive", label: "Cancelado" },
      refunded: { variant: "destructive", label: "Reembolsado" },
    };

    const config = statusMap[status] || {
      variant: "secondary" as const,
      label: status,
    };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const renderUserDetails = (user: User) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(user.status)}
          <Badge variant="outline">{user.role}</Badge>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            ID do Usuário
          </label>
          <div className="flex items-center gap-2">
            <p className="font-mono text-sm">{user.id}</p>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(user.id)}
              className="h-6 w-6 p-0"
            >
              {copied ? (
                <CheckCircle className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Assinatura
          </label>
          <p className="capitalize">{user.subscription}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Data de Cadastro
          </label>
          <p>{formatDate(user.createdAt)}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Último Acesso
          </label>
          <p>{formatDate(user.lastAccess)}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Receita Total
          </label>
          <p className="font-semibold text-green-600">
            {formatCurrency(user.totalRevenue)}
          </p>
        </div>
      </div>
    </div>
  );

  const renderSaleDetails = (sale: Sale) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{sale.product}</h3>
          <p className="text-muted-foreground">Cliente: {sale.customerName}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(sale.amount)}
          </p>
          {getStatusBadge(sale.status)}
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            ID da Venda
          </label>
          <div className="flex items-center gap-2">
            <p className="font-mono text-sm">{sale.id}</p>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(sale.id)}
              className="h-6 w-6 p-0"
            >
              {copied ? (
                <CheckCircle className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">
            ID do Cliente
          </label>
          <p className="font-mono text-sm">{sale.customerId}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Data da Venda
          </label>
          <p>{formatDate(sale.date)}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Método de Pagamento
          </label>
          <p className="capitalize">{sale.paymentMethod.replace("_", " ")}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Comissão
          </label>
          <p
            className={`font-semibold ${
              sale.commission >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatCurrency(sale.commission)}
          </p>
        </div>
      </div>
    </div>
  );

  const renderMetricDetails = (metric: Metric) => {
    const growth =
      ((metric.value - metric.previousValue) / metric.previousValue) * 100;
    const isPositive = growth > 0;

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold">{metric.name}</h3>
          <p className="text-3xl font-bold mt-2">
            {metric.value.toLocaleString("pt-BR")}
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span
              className={`text-sm font-medium ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPositive ? "+" : ""}
              {growth.toFixed(1)}%
            </span>
            <span className="text-sm text-muted-foreground">
              vs período anterior
            </span>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Categoria
            </label>
            <p className="capitalize">{metric.category}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Período
            </label>
            <p className="capitalize">{metric.period}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Data de Referência
            </label>
            <p>{formatDate(metric.date)}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Valor Anterior
            </label>
            <p>{metric.previousValue.toLocaleString("pt-BR")}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderActivityDetails = (activity: Activity) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{activity.userName}</h3>
        <p className="text-muted-foreground">{activity.description}</p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Ação
          </label>
          <p className="font-mono text-sm bg-muted px-2 py-1 rounded">
            {activity.action}
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Data e Hora
          </label>
          <p>{formatDateTime(activity.timestamp)}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Endereço IP
          </label>
          <div className="flex items-center gap-2">
            <p className="font-mono text-sm">{activity.ip}</p>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(activity.ip)}
              className="h-6 w-6 p-0"
            >
              {copied ? (
                <CheckCircle className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">
            User Agent
          </label>
          <p className="text-xs text-muted-foreground break-all">
            {activity.userAgent}
          </p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (type) {
      case "user":
        return renderUserDetails(data as User);
      case "sale":
        return renderSaleDetails(data as Sale);
      case "metric":
        return renderMetricDetails(data as Metric);
      case "activity":
        return renderActivityDetails(data as Activity);
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (type) {
      case "user":
        return "Detalhes do Usuário";
      case "sale":
        return "Detalhes da Venda";
      case "metric":
        return "Detalhes da Métrica";
      case "activity":
        return "Detalhes da Atividade";
      default:
        return "Detalhes";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>

        <div className="mt-4">{renderContent()}</div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => window.print()}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button
            variant="outline"
            onClick={() => copyToClipboard(JSON.stringify(data, null, 2))}
          >
            <Share className="mr-2 h-4 w-4" />
            Compartilhar
          </Button>
          <Button onClick={onClose}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
