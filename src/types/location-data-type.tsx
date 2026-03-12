export type LocationOption = {
  id: number
  name: string
  value: string
}


export type LocationsApiResponse = {
  statusCode: number
  success: boolean
  message: string
  data: LocationOption[]
}


