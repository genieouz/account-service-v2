export enum MSGFields {
  task_UID = "Task UID",
  task_type = "Task type",
  task_status = "Task status",
  parcel_amount_to_collect = "Parcel amount to collect",
  order_size = "Order size",
  order_UID = "Order UID",
  parcel_UID = "Parcel UID",
  parcel_size = "Parcel size",
  parcel_attempts = "Parcel attempts",
  parcel_status = "Parcel status",
  delivery_date = "Parcel delivery date",
  vehicle_type = "Vehicle type",
  vehicle_license_plat = "Vehicle License",
  driver_fullname = "Driver",
  driver_id = "Driver UID",
  driver_phone_number = "Driver phone",
  partner_name = "Partner",
  conveyor_fullname = "Conveyor",
  conveyor_id = "Conveyor UID",
  conveyor_phone_number = "Conveyor phone",
  address = "Address",
  city = "City",
  execution_date = "Execution date",
  client_id = "Client UID",
  client_fullname = "Client",
  client_phone_number = "Client phone",
  receiver_fullname = "Receiver",
  receiver_phone_number = "Receiver phone",
  country = "country",
  creation_date = "Creation Date",
  updated_date = "Last Updated"
}

export enum NTFields {
  task_ID = "ID TASK",
  client_fullname = "CLIENT NAME",
  client_phone_number = "CLIENT PHONE",
  client_address = "CLIENT ADRESS",
  client_city = "CLIENT CITY",
  client_country = "CLIENT COUNTRY",
  vehicle_type = "VEHICLE TYPE",
  requested_vehicle_type = "Requested Vehicle type",
  product_type = "Product Type",
  driver_fullname = "DRIVER NAME",
  conveyor_fullname = "Conveyor",
  stop = "Stop",
  product_to_pick = "Product to pick",
  product_to_deliver = "Product to deliver",
  parcel_tracking = "Parcel tracking",
  product_value = "Product value",
  execution_date = "Execution date",
  mission_price = "Mission price",
  discount = "discount",
  total_price_estimated = "Total price estimated",
  additionalInfos = "Additional infos",
  papser_pickup_date = "Papser pickup date",
  papser_delivery_date = "Papser delivery date",
  task_status = "Task Status"
}

export enum MADFields {
  task_ID = "Task ID",
  client_fullname = "Client name",
  client_phone_number = "Client phone",
  client_address = "Client Address",
  client_city = "Client City",
  client_country = "Client Country",
  mad_address = "MAD Address",
  mad_city = "MAD City",
  product_type = "Product Type",
  vehicle_type = "Vehicle type",
  driver_fullname = "Driver name",
  conveyor_fullname = "Conveyor",
  dispatcher_number = "Number of Dispatcher",
  manufacturer_number = "Number of Manufacturer",
  mission_execution_date = "Mission Execution date",
  mission_slot = "Mission slot",
  starting_time = "Starting time",
  ending_time = "Ending time",
  task_status = "Task status",
  additionalInfos = "Additional infos"
}

export enum TRFields {
  task_ID = "Task ID",
  client_fullname = "Client name",
  client_phone_number = "Client phone",
  client_address = "CLIENT ADRESS",
  client_city = "Client City",
  client_country = "Client Country",
  axe_name = "Axe name",
  vehicle_type = "Vehicle type",
  requested_vehicle_type = "Requested Vehicle type",
  product_type = "Product Type",
  driver_fullname = "DRIVER NAME",
  conveyor_fullname = "CONVOYOR NAME",
  product_to_pick = "Product to pick",
  product_to_deliver = "Product to deliver",
  execution_date = "Execution date",
  discount = "discount",
  additionalInfos = "Additional infos",
  task_status = "Task Status"
}

export interface MSGTaskToExport {
  "Task UID"?: string;
  "Task type"?: string;
  "Task status"?: string;
  "Parcel amount to collect"?: number | string;
  "Subtask type"?: string;
  "Order size"?: string;
  "Order UID"?: string;
  "Parcel UID"?: string;
  "Parcel size"?: string;
  "Parcel attempts"?: number | string;
  "Parcel status"?: string;
  "Parcel delivery date"?: string;
  "Vehicle type"?: string;
  "Vehicle License"?: string;
  Driver?: string;
  "Driver UID"?: string;
  "Driver phone"?: string;
  Partner?: string;
  Conveyor?: string;
  "Conveyor UID"?: string;
  "Conveyor phone"?: string;
  Address?: string;
  City?: string;
  "Subtask status"?: string;
  "Execution date"?: string;
  "Client UID"?: string;
  Client?: string;
  "Client phone"?: string;
  Receiver?: string;
  "Receiver phone"?: string;
  country?: string;
  "Creation Date"?: string;
  "Last Updated"?: string;
}
