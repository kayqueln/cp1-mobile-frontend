import { api } from '../..'

export const uploadImage = async ({
  idCamera,
  image,
}: {
  idCamera: number
  image: File
}) => {
  await api.post(`/fotografias/upload?idCamera=${idCamera}`, { image })
}
