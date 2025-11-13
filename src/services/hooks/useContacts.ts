import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  getContacts, 
  getContactById, 
  updateContactStatus, 
  deleteContact 
} from "../api/contactsService";
import { QUERY_KEYS } from "@/lib/api/queryKeys";

export const useContacts = (page: number, limit: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.contacts.paginated(page, limit),
    queryFn: () => getContacts(page, limit),
  });
};

export const useContact = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.contacts.byId(id),
    queryFn: () => getContactById(id),
    enabled: !!id,
  });
};

export const useUpdateContactStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isConfirmed }: { id: string; isConfirmed: boolean }) =>
      updateContactStatus(id, isConfirmed),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.contacts.root] });
    },
  });
};

export const useDeleteContact = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteContact(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEYS.contacts.root] });
    },
  });
};

