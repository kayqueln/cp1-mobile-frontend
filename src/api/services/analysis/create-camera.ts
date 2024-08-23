import { api } from '../..'

export const createCamera = async ({
  modeloCamera,
  localizacao,
  latitude,
  longitude,
}: {
  modeloCamera: string
  localizacao: string
  latitude: number
  longitude: number
}) => {
  const reqObj = {
    modeloCamera: modeloCamera,
    localizacao: localizacao,
    latitude: latitude,
    longitude: longitude,
  }

  await api.post(`/cameras`, reqObj)
}
