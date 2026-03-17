export const deliveryHistoryRecords = [
  // SME user records — role:'user' (shown to any user-role account)
  { id: 'P101', address: 'Bukit Bintang, Kuala Lumpur', drone: 'H1', date: '2026-03-01', status: 'Delivered', userRole: 'user', recipient: 'Ahmad Razif', weight: '1.2 kg', note: 'Left at doorstep' },
  { id: 'P102', address: 'Cheras, Kuala Lumpur', drone: 'H3', date: '2026-03-03', status: 'Delivered', userRole: 'user', recipient: 'Siti Nora', weight: '0.8 kg', note: 'Received by recipient' },
  { id: 'P103', address: 'Kajang, Selangor', drone: 'H2', date: '2026-03-05', status: 'Delivered', userRole: 'user', recipient: 'Lim Wei Jian', weight: '2.5 kg', note: 'Signed on delivery' },
  { id: 'P104', address: 'Ampang, Kuala Lumpur', drone: 'H5', date: '2026-03-07', status: 'Cancelled', userRole: 'user', recipient: 'Priya Nair', weight: '0.5 kg', note: 'Customer requested cancellation' },
  { id: 'P105', address: 'Puchong, Selangor', drone: 'H1', date: '2026-03-08', status: 'Delivered', userRole: 'user', recipient: 'Tan Ah Kow', weight: '3.0 kg', note: 'Delivered to neighbour' },
  { id: 'P106', address: 'Semenyih, Selangor', drone: 'H6', date: '2026-03-09', status: 'Failed', userRole: 'user', recipient: 'Nurul Ain', weight: '1.1 kg', note: 'Drone battery depleted mid-route' },
  { id: 'P110', address: 'Wangsa Maju, Kuala Lumpur', drone: 'H2', date: '2026-03-10', status: 'Delivered', userRole: 'user', recipient: 'Faizal Hamdan', weight: '0.9 kg', note: 'Received by recipient' },
  { id: 'P111', address: 'Kepong, Kuala Lumpur', drone: 'H4', date: '2026-03-11', status: 'Failed', userRole: 'user', recipient: 'Mei Ling', weight: '1.8 kg', note: 'Address not found — returned to depot' },
  { id: 'P112', address: 'Setapak, Kuala Lumpur', drone: 'H7', date: '2026-03-12', status: 'Cancelled', userRole: 'user', recipient: 'Ravi Kumar', weight: '0.6 kg', note: 'Order cancelled before dispatch' },
  { id: 'P113', address: 'Damansara, Selangor', drone: 'H3', date: '2026-03-13', status: 'Delivered', userRole: 'user', recipient: 'Zainab Othman', weight: '2.2 kg', note: 'Delivered on time' },
  { id: 'P114', address: 'Petaling Jaya, Selangor', drone: 'H8', date: '2026-03-14', status: 'Delivered', userRole: 'user', recipient: 'Jason Teo', weight: '1.4 kg', note: 'Left at security post' },
  { id: 'P115', address: 'Klang, Selangor', drone: 'H5', date: '2026-03-15', status: 'Failed', userRole: 'user', recipient: 'Hamidah Yusof', weight: '3.5 kg', note: 'Parcel too heavy for wind conditions' },
  { id: 'P116', address: 'Rawang, Selangor', drone: 'H1', date: '2026-03-16', status: 'Delivered', userRole: 'user', recipient: 'Chong Boon Keat', weight: '0.7 kg', note: 'Received by recipient' },
  { id: 'P117', address: 'Gombak, Selangor', drone: 'H6', date: '2026-03-17', status: 'Cancelled', userRole: 'user', recipient: 'Nadia Rashid', weight: '1.0 kg', note: 'Recipient unavailable — cancelled' },

  // manager-1 records
  { id: 'P107', address: 'Subang Jaya, Selangor', drone: 'H4', date: '2026-03-10', status: 'Delivered', userId: 'manager-1', recipient: 'Azlan Shah', weight: '2.0 kg', note: 'Delivered to office reception' },
  { id: 'P108', address: 'KL City Center', drone: 'H7', date: '2026-03-11', status: 'Delivered', userId: 'manager-1', recipient: 'Wong Siew Lin', weight: '1.6 kg', note: 'Received by recipient' },
  { id: 'P109', address: 'Balakong, Selangor', drone: 'H8', date: '2026-03-12', status: 'Cancelled', userId: 'manager-1', recipient: 'Suresh Pillai', weight: '0.4 kg', note: 'System error — auto cancelled' },
  { id: 'P118', address: 'Shah Alam, Selangor', drone: 'H2', date: '2026-03-13', status: 'Delivered', userId: 'manager-1', recipient: 'Noraini Bakar', weight: '2.8 kg', note: 'Signed on delivery' },
  { id: 'P119', address: 'Bangsar, Kuala Lumpur', drone: 'H3', date: '2026-03-14', status: 'Failed', userId: 'manager-1', recipient: 'Kevin Loh', weight: '1.3 kg', note: 'Restricted airspace — reroute failed' },
  { id: 'P120', address: 'Mont Kiara, Kuala Lumpur', drone: 'H1', date: '2026-03-15', status: 'Delivered', userId: 'manager-1', recipient: 'Rina Abdullah', weight: '0.9 kg', note: 'Delivered on time' },
  { id: 'P121', address: 'Putrajaya', drone: 'H5', date: '2026-03-16', status: 'Delivered', userId: 'manager-1', recipient: 'Hafiz Zulkifli', weight: '1.7 kg', note: 'Received by recipient' },
  { id: 'P122', address: 'Cyberjaya, Selangor', drone: 'H6', date: '2026-03-17', status: 'Cancelled', userId: 'manager-1', recipient: 'Tan Bee Leng', weight: '0.5 kg', note: 'Customer changed delivery address' },
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
