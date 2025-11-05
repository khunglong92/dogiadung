import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/api/queryKeys";
import {
  servicesService,
  type CreateServiceDto,
  type UpdateServiceDto,
  type CompanyService,
} from "../api/servicesService";

export const useServices = (parentId?: string) => {
  return useQuery({
    queryKey: parentId
      ? QUERY_KEYS.services.byParent(parentId)
      : [QUERY_KEYS.services.root],
    queryFn: () => servicesService.getAll(parentId),
  });
};

export const useService = (id?: string) => {
  return useQuery({
    queryKey: id ? QUERY_KEYS.services.byId(id) : [QUERY_KEYS.services.root],
    queryFn: () => servicesService.getById(id as string),
    enabled: !!id,
  });
};

export const useCreateService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateServiceDto) => servicesService.create(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.services.root] });
    },
  });
};

export const useUpdateService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateServiceDto }) =>
      servicesService.update(id, body),
    onSuccess: (_res, variables) => {
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.services.root] });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.services.byId(variables.id) });
    },
  });
};

export const useDeleteService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => servicesService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.services.root] });
    },
  });
};

export type { CompanyService };


