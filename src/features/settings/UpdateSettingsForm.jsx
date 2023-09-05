import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useEditSettings } from './useEditSettings';
import { useSettings } from './useSettings';

function UpdateSettingsForm() {

  const {isLoading, settings: {minimumBookingLength, maxBookingLength, maxGuestPerBooking, breakfastPrice} = {}} = useSettings()
  const {isUpdating, updateSettings} = useEditSettings()

  if(isLoading) return <Spinner />

   function handleUpdate(e, fieldName) {
    const {value} = e.target.value

    if(!value) return

    updateSettings({[fieldName] : value})
   }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minimumBookingLength} disabled={isUpdating} onBlur={(e) => handleUpdate(e, "minimumBookingLength")} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength} disabled={isUpdating} onBlur={(e) => handleUpdate(e, "maxBookingLength")}/>
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxGuestPerBooking} disabled={isUpdating} onBlur={(e) => handleUpdate(e, "maxGuestPerBooking")}/>
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfastPrice} disabled={isUpdating} onBlur={(e) => handleUpdate(e, "breakfastPrice")}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
