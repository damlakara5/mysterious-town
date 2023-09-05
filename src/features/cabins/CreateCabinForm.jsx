import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
  

function CreateCabinForm({cabinToEdit = {}, onClose}) {

  const {id: editId, ...editValues} = cabinToEdit
  const isEditSession = Boolean(editId)

  const {register, handleSubmit, reset , getValues, formState} = useForm({
    defaultValues: isEditSession ? editValues : {}
  })
  const {errors} = formState

  const {isCreating ,createCabin} = useCreateCabin()
  const {isEditing ,editCabin} = useEditCabin()


  const isWorking = isCreating || isEditing

  function onSubmit(data) {
    const image = typeof data.image === "string" ?  data.image : data.image[0]

    if(isEditSession) editCabin({newCabinData : {...data, image}, id: editId}, {
      onSuccess: () => {
        reset(),
        onClose?.()
      }
  })
    else createCabin({...data, image: image} , {
      onSuccess: () =>{ 
        reset(),
        onClose?.()
      }
  })
  }
  function onError(errors) {
    console.log(errors)
  }


  return (
    //if there is any error on validaiton the second function calls
    <Form  onSubmit={handleSubmit(onSubmit, onError)}  type={onClose ? "modal" : "regular"} >
      <FormRow error={errors?.name?.message}  label="Cabin name">
        <Input type="text" id="name"  disabled={isWorking}  {...register("name", {
            required: "This field is required"
          })} />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message}  label="Maximum capacity">
        <Input type="number" id="maxCapacity" disabled={isWorking} {...register("maxCapacity",{
            required: "This field is required",
            min : {
              value : 1,
              message: "Capacity should be at least 1"
            }
          })}/>
      </FormRow>

      <FormRow error={errors?.regularPrice?.message}  label="Regular price">
        <Input type="number" id="regularPrice" disabled={isWorking} {...register("regularPrice",{
            required: "This field is required",
            min : {
              value : 1,
              message: "Capacity should be at least 1"
            }
          })}/>
      </FormRow>

      <FormRow error={errors?.discount?.message}  label="Discount">
        <Input type="number" id="discount"  disabled={isWorking} defaultValue={0}  {...register("discount",{
            required: "This field is required",
            validate: (value) => value <= getValues().regularPrice || "Discount should be less than regular price"
          })} />
      </FormRow>

      <FormRow error={errors?.description?.message}  label="Description for website">
        <Textarea type="number" id="description" disabled={isWorking} defaultValue="" {...register("description",{
            required: "This field is required"
          })} />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*"
          {...register("image",{
            required: isEditSession ? false : "This field is required"
          })}  />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>  {isEditSession ? "Edit cabin" : "Create new cabin"} </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
