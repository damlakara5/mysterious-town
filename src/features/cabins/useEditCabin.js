import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";


  export function useEditCabin () {
    const queryClient = useQueryClient()


    const {mutate: editCabin, isLoading: isEditing} =  useMutation({
        mutationFn: ({newCabinData, id}) =>  createEditCabin(newCabinData , id),
        onSuccess: () => {
          toast.success("Cabin successfully edited");
          queryClient.invalidateQueries({queryKey: ["cabins"]})
        },
        onError:()=> toast.error("Cabin could not be updated")
      })

      return {isEditing, editCabin}
  }