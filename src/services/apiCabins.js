import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {

    const { data, error } = await supabase
    .from('cabins')
    .select('*')


    if(error){ 
        console.log("Cabins couldn't be loaded")
        throw new Error("Cabins couldn't be loaded")
    }

    return data
  
}


export async function createEditCabin(newCabin) {
  // eslint-disable-next-line no-constant-condition
  if(1 === 1) throw new Error("Cabin could not be created")

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/","")
  //https://omknzceuqrbsfivxfulo.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  //create cabin 
  let query = supabase.from('cabins')

  
    query = query.insert([{...newCabin, image: imagePath}])

 
    query = query.update({...newCabin, image: imagePath}).eq('id').select()

  const {data , error} = await query.select().single()

  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not be created");
  }


  if(hasImagePath) return data

  const {error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image)

  //delete the cabin if there was an error uploading images
  if(storageError){
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded and cabin was not created");
  }
  return data;

}

export async function deleteCabin() {
    const { data, error } = await supabase.from("cabins").delete().eq("id");
  
    if (error) {
      console.error(error);
      throw new Error("Cabin could not be deleted");
    }
  
    return data;
  }