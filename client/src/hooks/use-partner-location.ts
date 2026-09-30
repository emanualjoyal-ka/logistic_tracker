import { useMutation } from "@tanstack/react-query";
import { updatePartnerLocation } from "@/api/partner.api";
import { LocationInput } from "@/types/partner";


export const useUpdatePartnerLocation=()=> {
  return useMutation({mutationFn: async (location: LocationInput) => updatePartnerLocation(location)
  });
}