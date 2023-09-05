import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";



  export function useEditSettings () {
    const queryClient = useQueryClient()


    const {mutate: updateSettings, isLoading: isUpdating} =  useMutation({
        mutationFn: updateSetting,
        onSuccess: () => {
          toast.success("Setting successfully edited");
          queryClient.invalidateQueries({queryKey: ["settings"]})
        },
        onError:error=> toast.error(error.message)
      })

      return {isUpdating, updateSettings}
  }