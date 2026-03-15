export const deliveryHistoryRecords = [
  { id: 'P102', address: 'Cheras, Kuala Lumpur', drone: 'H3', date: '2026-03-10', status: 'Delivered' },
  { id: 'P103', address: 'Kajang, Selangor', drone: 'H2', date: '2026-03-11', status: 'Delivered' },
  { id: 'P104', address: 'Ampang, Kuala Lumpur', drone: 'H5', date: '2026-03-11', status: 'Cancelled' },
  { id: 'P105', address: 'Puchong, Selangor', drone: 'H1', date: '2026-03-12', status: 'Delivered' },
  { id: 'P106', address: 'Semenyih, Selangor', drone: 'H6', date: '2026-03-12', status: 'Failed' },
  { id: 'P107', address: 'Subang Jaya, Selangor', drone: 'H4', date: '2026-03-13', status: 'Delivered' },
  { id: 'P108', address: 'KL City Center', drone: 'H7', date: '2026-03-13', status: 'Delivered' },
  { id: 'P109', address: 'Balakong, Selangor', drone: 'H8', date: '2026-03-14', status: 'Cancelled' },
]

export const savedAddressesInitial = [
  {
    id: 'ADDR-1',
    label: 'Customer A',
    name: 'Ali',
    phone: '0123456789',
    address: 'Cheras, Kuala Lumpur',
  },
  {
    id: 'ADDR-2',
    label: 'Office',
    name: 'Admin',
    phone: '0191234567',
    address: 'KL City Center',
  },
  {
    id: 'ADDR-3',
    label: 'Warehouse Partner',
    name: 'Farah',
    phone: '0176621198',
    address: 'Shah Alam Industrial Park, Selangor',
  },
]

export const notificationsInitial = [
  {
    id: 1,
    messageKey: 'notifications.msg1',
    timeKey: 'notifications.time1',
    type: 'info',
    read: false,
  },
  {
    id: 2,
    messageKey: 'notifications.msg2',
    timeKey: 'notifications.time2',
    type: 'warning',
    read: false,
  },
  {
    id: 3,
    messageKey: 'notifications.msg3',
    timeKey: 'notifications.time3',
    type: 'success',
    read: true,
  },
  {
    id: 4,
    messageKey: 'notifications.msg4',
    timeKey: 'notifications.time4',
    type: 'warning',
    read: true,
  },
]
