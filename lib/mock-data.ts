// Hans Jewelry ERP — Mock Data
// All monetary values in Indonesian Rupiah (IDR)

export type StockStatus = 'In Stock' | 'Low' | 'Out of Stock'
export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Returned' | 'Cancelled'
export type CustomerSegment = 'VIP' | 'Regular' | 'New'
export type OrderChannel = 'Tokopedia' | 'Shopee' | 'Website' | 'Instagram'
export type SupplierStatus = 'Active' | 'Inactive'

export interface Product {
  id: string
  sku: string
  name: string
  collection: string
  material: string
  weightG: number
  priceRp: number
  stock: number
  reorderPoint: number
  status: StockStatus
  category: 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets' | 'Pendants'
}

export interface OrderItem {
  productSku: string
  productName: string
  qty: number
  priceRp: number
}

export interface Order {
  id: string
  date: string
  customerName: string
  customerCity: string
  items: OrderItem[]
  subtotalRp: number
  shippingRp: number
  totalRp: number
  status: OrderStatus
  channel: OrderChannel
}

export interface Customer {
  id: string
  name: string
  email: string
  city: string
  country: string
  totalOrders: number
  lifetimeValueRp: number
  lastPurchase: string
  segment: CustomerSegment
  topProducts: string[]
}

export interface Supplier {
  id: string
  name: string
  location: string
  email: string
  materials: string
  moq: string
  leadTimeDays: number
  lastOrderDate: string
  status: SupplierStatus
  paymentTerms: string
}

export interface Collection {
  id: string
  name: string
  description: string
  skuCount: number
  season: string
  status: 'Active' | 'Draft' | 'Archived'
  revenue30dRp: number
}

export interface DailyRevenue {
  date: string
  revenueRp: number
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  chartType?: 'bar' | 'table' | 'donut'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartData?: any
}

export interface ChatSession {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: string
}

// --- PRODUCTS ---

export const products: Product[] = [
  { id: 'p1', sku: 'SLV-R001', name: 'Classic Band Ring', collection: 'Classic Silver', material: 'Bali Sterling 925', weightG: 4.2, priceRp: 285000, stock: 24, reorderPoint: 5, status: 'In Stock', category: 'Rings' },
  { id: 'p2', sku: 'SLV-R002', name: 'Twisted Rope Ring', collection: 'Classic Silver', material: 'Bali Sterling 925', weightG: 5.1, priceRp: 325000, stock: 11, reorderPoint: 5, status: 'In Stock', category: 'Rings' },
  { id: 'p3', sku: 'SLV-R003', name: 'Minimal Stack Ring', collection: 'Minimalist', material: 'Fine Silver 999', weightG: 2.8, priceRp: 195000, stock: 3, reorderPoint: 5, status: 'Low', category: 'Rings' },
  { id: 'p4', sku: 'SLV-R004', name: 'Hammered Band', collection: 'Boho Chic', material: 'Bali Sterling 925', weightG: 6.3, priceRp: 375000, stock: 0, reorderPoint: 3, status: 'Out of Stock', category: 'Rings' },
  { id: 'p5', sku: 'SLV-R005', name: 'Eternity Ring', collection: 'Bridal', material: 'Bali Sterling 925', weightG: 3.9, priceRp: 520000, stock: 7, reorderPoint: 3, status: 'In Stock', category: 'Rings' },
  { id: 'p6', sku: 'SLV-R006', name: 'Signet Ring', collection: 'Classic Silver', material: 'Bali Sterling 925', weightG: 8.4, priceRp: 650000, stock: 5, reorderPoint: 3, status: 'In Stock', category: 'Rings' },
  { id: 'p7', sku: 'SLV-N001', name: 'Box Chain 45cm', collection: 'Classic Silver', material: 'Bali Sterling 925', weightG: 8.1, priceRp: 485000, stock: 18, reorderPoint: 5, status: 'In Stock', category: 'Necklaces' },
  { id: 'p8', sku: 'SLV-N002', name: 'Figaro Chain 50cm', collection: 'Classic Silver', material: 'Bali Sterling 925', weightG: 10.2, priceRp: 575000, stock: 2, reorderPoint: 5, status: 'Low', category: 'Necklaces' },
  { id: 'p9', sku: 'SLV-N003', name: 'Snake Chain 40cm', collection: 'Minimalist', material: 'Fine Silver 999', weightG: 7.3, priceRp: 445000, stock: 9, reorderPoint: 4, status: 'In Stock', category: 'Necklaces' },
  { id: 'p10', sku: 'SLV-N004', name: 'Pendant Moon', collection: 'Boho Chic', material: 'Bali Sterling 925', weightG: 3.1, priceRp: 320000, stock: 14, reorderPoint: 5, status: 'In Stock', category: 'Necklaces' },
  { id: 'p11', sku: 'SLV-N005', name: 'Pendant Bar', collection: 'Minimalist', material: 'Bali Sterling 925', weightG: 2.4, priceRp: 265000, stock: 6, reorderPoint: 4, status: 'In Stock', category: 'Necklaces' },
  { id: 'p12', sku: 'SLV-N006', name: 'Lariat Y-Chain', collection: 'Bridal', material: 'Fine Silver 999', weightG: 9.8, priceRp: 725000, stock: 4, reorderPoint: 3, status: 'Low', category: 'Necklaces' },
  { id: 'p13', sku: 'SLV-E001', name: 'Dome Studs', collection: 'Minimalist', material: 'Fine Silver 999', weightG: 1.6, priceRp: 215000, stock: 2, reorderPoint: 5, status: 'Low', category: 'Earrings' },
  { id: 'p14', sku: 'SLV-E002', name: 'Hoop 20mm', collection: 'Classic Silver', material: 'Bali Sterling 925', weightG: 3.2, priceRp: 285000, stock: 22, reorderPoint: 5, status: 'In Stock', category: 'Earrings' },
  { id: 'p15', sku: 'SLV-E003', name: 'Hoop 35mm', collection: 'Classic Silver', material: 'Bali Sterling 925', weightG: 5.8, priceRp: 365000, stock: 8, reorderPoint: 5, status: 'In Stock', category: 'Earrings' },
  { id: 'p16', sku: 'SLV-E004', name: 'Ear Cuff', collection: 'Boho Chic', material: 'Bali Sterling 925', weightG: 2.1, priceRp: 195000, stock: 0, reorderPoint: 3, status: 'Out of Stock', category: 'Earrings' },
  { id: 'p17', sku: 'SLV-E005', name: 'Leaf Drop Earrings', collection: 'Boho Chic', material: 'Bali Sterling 925', weightG: 3.6, priceRp: 315000, stock: 11, reorderPoint: 4, status: 'In Stock', category: 'Earrings' },
  { id: 'p18', sku: 'SLV-E006', name: 'Pearl Drop Studs', collection: 'Bridal', material: 'Sterling 925 + FW Pearl', weightG: 2.8, priceRp: 445000, stock: 5, reorderPoint: 3, status: 'In Stock', category: 'Earrings' },
  { id: 'p19', sku: 'SLV-B001', name: 'Hammered Cuff', collection: 'Boho Chic', material: 'Bali Sterling 925', weightG: 12.4, priceRp: 685000, stock: 0, reorderPoint: 3, status: 'Out of Stock', category: 'Bracelets' },
  { id: 'p20', sku: 'SLV-B002', name: 'Beaded Bracelet', collection: 'Boho Chic', material: 'Bali Sterling 925', weightG: 9.1, priceRp: 495000, stock: 6, reorderPoint: 4, status: 'In Stock', category: 'Bracelets' },
  { id: 'p21', sku: 'SLV-B003', name: 'Tennis Bracelet', collection: 'Bridal', material: 'Fine Silver 999', weightG: 11.2, priceRp: 895000, stock: 3, reorderPoint: 3, status: 'Low', category: 'Bracelets' },
  { id: 'p22', sku: 'SLV-B004', name: 'Chain Bracelet 18cm', collection: 'Classic Silver', material: 'Bali Sterling 925', weightG: 7.6, priceRp: 425000, stock: 15, reorderPoint: 5, status: 'In Stock', category: 'Bracelets' },
  { id: 'p23', sku: 'SLV-B005', name: 'Bangle Set 3pcs', collection: 'Minimalist', material: 'Bali Sterling 925', weightG: 14.8, priceRp: 475000, stock: 9, reorderPoint: 4, status: 'In Stock', category: 'Bracelets' },
  { id: 'p24', sku: 'SLV-P001', name: 'Star Charm', collection: 'Classic Silver', material: 'Bali Sterling 925', weightG: 1.8, priceRp: 175000, stock: 31, reorderPoint: 8, status: 'In Stock', category: 'Pendants' },
  { id: 'p25', sku: 'SLV-P002', name: 'Crescent Moon', collection: 'Boho Chic', material: 'Fine Silver 999', weightG: 2.2, priceRp: 215000, stock: 17, reorderPoint: 6, status: 'In Stock', category: 'Pendants' },
  { id: 'p26', sku: 'SLV-P003', name: 'Infinity Symbol', collection: 'Classic Silver', material: 'Bali Sterling 925', weightG: 2.6, priceRp: 195000, stock: 7, reorderPoint: 5, status: 'In Stock', category: 'Pendants' },
  { id: 'p27', sku: 'SLV-P004', name: 'Birthstone Garnet', collection: 'Holiday 2025', material: 'Sterling 925 + Garnet', weightG: 3.4, priceRp: 425000, stock: 4, reorderPoint: 4, status: 'Low', category: 'Pendants' },
  { id: 'p28', sku: 'SLV-P005', name: 'Batik Filigree Charm', collection: 'Holiday 2025', material: 'Kota Gede Filigree 925', weightG: 2.1, priceRp: 265000, stock: 12, reorderPoint: 5, status: 'In Stock', category: 'Pendants' },
]

// --- ORDERS ---

export const orders: Order[] = [
  {
    id: 'ORD-2025-0420', date: '2025-06-23', customerName: 'Sari Dewi', customerCity: 'Jakarta',
    items: [
      { productSku: 'SLV-R001', productName: 'Classic Band Ring', qty: 1, priceRp: 285000 },
      { productSku: 'SLV-N004', productName: 'Pendant Moon', qty: 1, priceRp: 320000 },
    ],
    subtotalRp: 605000, shippingRp: 25000, totalRp: 630000, status: 'Shipped', channel: 'Tokopedia',
  },
  {
    id: 'ORD-2025-0419', date: '2025-06-22', customerName: 'Emma van der Berg', customerCity: 'Amsterdam',
    items: [
      { productSku: 'SLV-N001', productName: 'Box Chain 45cm', qty: 1, priceRp: 485000 },
    ],
    subtotalRp: 485000, shippingRp: 85000, totalRp: 570000, status: 'Delivered', channel: 'Website',
  },
  {
    id: 'ORD-2025-0418', date: '2025-06-22', customerName: 'Putri Rahayu', customerCity: 'Bali',
    items: [
      { productSku: 'SLV-B003', productName: 'Tennis Bracelet', qty: 1, priceRp: 895000 },
    ],
    subtotalRp: 895000, shippingRp: 25000, totalRp: 920000, status: 'Processing', channel: 'Shopee',
  },
  {
    id: 'ORD-2025-0417', date: '2025-06-21', customerName: 'Andi Pratama', customerCity: 'Surabaya',
    items: [
      { productSku: 'SLV-E006', productName: 'Pearl Drop Studs', qty: 1, priceRp: 445000 },
      { productSku: 'SLV-N006', productName: 'Lariat Y-Chain', qty: 1, priceRp: 725000 },
      { productSku: 'SLV-R005', productName: 'Eternity Ring', qty: 1, priceRp: 520000 },
    ],
    subtotalRp: 1690000, shippingRp: 25000, totalRp: 1715000, status: 'Processing', channel: 'Instagram',
  },
  {
    id: 'ORD-2025-0416', date: '2025-06-21', customerName: 'Sophie Williams', customerCity: 'Sydney',
    items: [
      { productSku: 'SLV-N006', productName: 'Lariat Y-Chain', qty: 1, priceRp: 725000 },
    ],
    subtotalRp: 725000, shippingRp: 95000, totalRp: 820000, status: 'Pending', channel: 'Website',
  },
  {
    id: 'ORD-2025-0415', date: '2025-06-20', customerName: 'Rina Kusuma', customerCity: 'Bandung',
    items: [
      { productSku: 'SLV-R002', productName: 'Twisted Rope Ring', qty: 1, priceRp: 325000 },
    ],
    subtotalRp: 325000, shippingRp: 20000, totalRp: 345000, status: 'Delivered', channel: 'Tokopedia',
  },
  {
    id: 'ORD-2025-0414', date: '2025-06-20', customerName: 'Lena Müller', customerCity: 'Berlin',
    items: [
      { productSku: 'SLV-B001', productName: 'Hammered Cuff', qty: 1, priceRp: 685000 },
      { productSku: 'SLV-E005', productName: 'Leaf Drop Earrings', qty: 1, priceRp: 315000 },
    ],
    subtotalRp: 1000000, shippingRp: 85000, totalRp: 1085000, status: 'Shipped', channel: 'Website',
  },
  {
    id: 'ORD-2025-0413', date: '2025-06-19', customerName: 'Budi Santoso', customerCity: 'Yogyakarta',
    items: [
      { productSku: 'SLV-P005', productName: 'Batik Filigree Charm', qty: 2, priceRp: 265000 },
    ],
    subtotalRp: 530000, shippingRp: 20000, totalRp: 550000, status: 'Delivered', channel: 'Shopee',
  },
  {
    id: 'ORD-2025-0412', date: '2025-06-19', customerName: 'Dewi Anggraeni', customerCity: 'Medan',
    items: [
      { productSku: 'SLV-E002', productName: 'Hoop 20mm', qty: 1, priceRp: 285000 },
      { productSku: 'SLV-P001', productName: 'Star Charm', qty: 1, priceRp: 175000 },
    ],
    subtotalRp: 460000, shippingRp: 30000, totalRp: 490000, status: 'Pending', channel: 'Tokopedia',
  },
  {
    id: 'ORD-2025-0411', date: '2025-06-18', customerName: 'Marcus Tan', customerCity: 'Singapore',
    items: [
      { productSku: 'SLV-R006', productName: 'Signet Ring', qty: 1, priceRp: 650000 },
    ],
    subtotalRp: 650000, shippingRp: 75000, totalRp: 725000, status: 'Delivered', channel: 'Website',
  },
  {
    id: 'ORD-2025-0410', date: '2025-06-18', customerName: 'Indah Permata', customerCity: 'Makassar',
    items: [
      { productSku: 'SLV-B004', productName: 'Chain Bracelet 18cm', qty: 1, priceRp: 425000 },
    ],
    subtotalRp: 425000, shippingRp: 35000, totalRp: 460000, status: 'Shipped', channel: 'Shopee',
  },
  {
    id: 'ORD-2025-0409', date: '2025-06-17', customerName: 'Hanna Fischer', customerCity: 'Zurich',
    items: [
      { productSku: 'SLV-E006', productName: 'Pearl Drop Studs', qty: 1, priceRp: 445000 },
      { productSku: 'SLV-R005', productName: 'Eternity Ring', qty: 1, priceRp: 520000 },
    ],
    subtotalRp: 965000, shippingRp: 85000, totalRp: 1050000, status: 'Shipped', channel: 'Website',
  },
  {
    id: 'ORD-2025-0408', date: '2025-06-17', customerName: 'Ayu Wulandari', customerCity: 'Denpasar',
    items: [
      { productSku: 'SLV-P002', productName: 'Crescent Moon', qty: 1, priceRp: 215000 },
    ],
    subtotalRp: 215000, shippingRp: 20000, totalRp: 235000, status: 'Delivered', channel: 'Instagram',
  },
  {
    id: 'ORD-2025-0407', date: '2025-06-16', customerName: 'Yuki Tanaka', customerCity: 'Tokyo',
    items: [
      { productSku: 'SLV-N003', productName: 'Snake Chain 40cm', qty: 1, priceRp: 445000 },
    ],
    subtotalRp: 445000, shippingRp: 95000, totalRp: 540000, status: 'Pending', channel: 'Website',
  },
  {
    id: 'ORD-2025-0406', date: '2025-06-16', customerName: 'Clara de Vries', customerCity: 'Rotterdam',
    items: [
      { productSku: 'SLV-B005', productName: 'Bangle Set 3pcs', qty: 1, priceRp: 475000 },
    ],
    subtotalRp: 475000, shippingRp: 85000, totalRp: 560000, status: 'Processing', channel: 'Website',
  },
  {
    id: 'ORD-2025-0405', date: '2025-06-15', customerName: 'Sari Dewi', customerCity: 'Jakarta',
    items: [
      { productSku: 'SLV-E003', productName: 'Hoop 35mm', qty: 1, priceRp: 365000 },
      { productSku: 'SLV-N005', productName: 'Pendant Bar', qty: 1, priceRp: 265000 },
    ],
    subtotalRp: 630000, shippingRp: 25000, totalRp: 655000, status: 'Delivered', channel: 'Tokopedia',
  },
  {
    id: 'ORD-2025-0404', date: '2025-06-14', customerName: 'Putri Rahayu', customerCity: 'Bali',
    items: [
      { productSku: 'SLV-R003', productName: 'Minimal Stack Ring', qty: 2, priceRp: 195000 },
    ],
    subtotalRp: 390000, shippingRp: 20000, totalRp: 410000, status: 'Delivered', channel: 'Shopee',
  },
  {
    id: 'ORD-2025-0403', date: '2025-06-13', customerName: 'Andi Pratama', customerCity: 'Surabaya',
    items: [
      { productSku: 'SLV-B002', productName: 'Beaded Bracelet', qty: 1, priceRp: 495000 },
    ],
    subtotalRp: 495000, shippingRp: 25000, totalRp: 520000, status: 'Returned', channel: 'Instagram',
  },
  {
    id: 'ORD-2025-0402', date: '2025-06-12', customerName: 'Rina Kusuma', customerCity: 'Bandung',
    items: [
      { productSku: 'SLV-P004', productName: 'Birthstone Garnet', qty: 1, priceRp: 425000 },
      { productSku: 'SLV-P003', productName: 'Infinity Symbol', qty: 1, priceRp: 195000 },
    ],
    subtotalRp: 620000, shippingRp: 25000, totalRp: 645000, status: 'Pending', channel: 'Tokopedia',
  },
  {
    id: 'ORD-2025-0401', date: '2025-06-11', customerName: 'Sophie Williams', customerCity: 'Sydney',
    items: [
      { productSku: 'SLV-R001', productName: 'Classic Band Ring', qty: 1, priceRp: 285000 },
      { productSku: 'SLV-E002', productName: 'Hoop 20mm', qty: 1, priceRp: 285000 },
    ],
    subtotalRp: 570000, shippingRp: 95000, totalRp: 665000, status: 'Processing', channel: 'Website',
  },
]

// --- CUSTOMERS ---

export const customers: Customer[] = [
  {
    id: 'c1', name: 'Sari Dewi', email: 'sari.dewi@email.com', city: 'Jakarta', country: 'ID',
    totalOrders: 9, lifetimeValueRp: 4250000, lastPurchase: '3 hari lalu', segment: 'VIP',
    topProducts: ['Classic Band Ring', 'Pendant Moon', 'Hoop 35mm'],
  },
  {
    id: 'c2', name: 'Putri Rahayu', email: 'putri.rahayu@email.com', city: 'Bali', country: 'ID',
    totalOrders: 7, lifetimeValueRp: 3875000, lastPurchase: '1 minggu lalu', segment: 'VIP',
    topProducts: ['Tennis Bracelet', 'Minimal Stack Ring', 'Lariat Y-Chain'],
  },
  {
    id: 'c3', name: 'Emma van der Berg', email: 'emma@vdberg.nl', city: 'Amsterdam', country: 'NL',
    totalOrders: 6, lifetimeValueRp: 3420000, lastPurchase: '2 hari lalu', segment: 'VIP',
    topProducts: ['Box Chain 45cm', 'Dome Studs', 'Signet Ring'],
  },
  {
    id: 'c4', name: 'Andi Pratama', email: 'andi.pratama@email.com', city: 'Surabaya', country: 'ID',
    totalOrders: 5, lifetimeValueRp: 2850000, lastPurchase: '1 minggu lalu', segment: 'VIP',
    topProducts: ['Pearl Drop Studs', 'Lariat Y-Chain', 'Eternity Ring'],
  },
  {
    id: 'c5', name: 'Sophie Williams', email: 'sophie.w@gmail.com', city: 'Sydney', country: 'AU',
    totalOrders: 5, lifetimeValueRp: 2610000, lastPurchase: '2 minggu lalu', segment: 'VIP',
    topProducts: ['Lariat Y-Chain', 'Classic Band Ring', 'Hoop 20mm'],
  },
  {
    id: 'c6', name: 'Rina Kusuma', email: 'rina.kusuma@email.com', city: 'Bandung', country: 'ID',
    totalOrders: 4, lifetimeValueRp: 1840000, lastPurchase: '1 bulan lalu', segment: 'Regular',
    topProducts: ['Twisted Rope Ring', 'Birthstone Garnet', 'Infinity Symbol'],
  },
  {
    id: 'c7', name: 'Lena Müller', email: 'lena.muller@web.de', city: 'Berlin', country: 'DE',
    totalOrders: 4, lifetimeValueRp: 1650000, lastPurchase: '3 minggu lalu', segment: 'Regular',
    topProducts: ['Hammered Cuff', 'Leaf Drop Earrings', 'Box Chain 45cm'],
  },
  {
    id: 'c8', name: 'Budi Santoso', email: 'budi.santoso@email.com', city: 'Yogyakarta', country: 'ID',
    totalOrders: 3, lifetimeValueRp: 1125000, lastPurchase: '2 minggu lalu', segment: 'Regular',
    topProducts: ['Batik Filigree Charm', 'Star Charm', 'Infinity Symbol'],
  },
  {
    id: 'c9', name: 'Dewi Anggraeni', email: 'dewi.a@email.com', city: 'Medan', country: 'ID',
    totalOrders: 3, lifetimeValueRp: 985000, lastPurchase: '4 minggu lalu', segment: 'Regular',
    topProducts: ['Hoop 20mm', 'Star Charm', 'Pendant Moon'],
  },
  {
    id: 'c10', name: 'Marcus Tan', email: 'marcus.tan@gmail.com', city: 'Singapore', country: 'SG',
    totalOrders: 2, lifetimeValueRp: 870000, lastPurchase: '1 minggu lalu', segment: 'Regular',
    topProducts: ['Signet Ring', 'Box Chain 45cm'],
  },
  {
    id: 'c11', name: 'Indah Permata', email: 'indah.p@email.com', city: 'Makassar', country: 'ID',
    totalOrders: 2, lifetimeValueRp: 640000, lastPurchase: '3 minggu lalu', segment: 'Regular',
    topProducts: ['Chain Bracelet 18cm', 'Star Charm'],
  },
  {
    id: 'c12', name: 'Hanna Fischer', email: 'hanna.fischer@gmail.com', city: 'Zurich', country: 'CH',
    totalOrders: 2, lifetimeValueRp: 930000, lastPurchase: '10 hari lalu', segment: 'Regular',
    topProducts: ['Pearl Drop Studs', 'Eternity Ring'],
  },
  {
    id: 'c13', name: 'Yuki Tanaka', email: 'yuki.tanaka@jp.com', city: 'Tokyo', country: 'JP',
    totalOrders: 1, lifetimeValueRp: 485000, lastPurchase: '5 hari lalu', segment: 'New',
    topProducts: ['Snake Chain 40cm'],
  },
  {
    id: 'c14', name: 'Clara de Vries', email: 'clara.devries@gmail.com', city: 'Rotterdam', country: 'NL',
    totalOrders: 1, lifetimeValueRp: 365000, lastPurchase: '2 hari lalu', segment: 'New',
    topProducts: ['Bangle Set 3pcs'],
  },
  {
    id: 'c15', name: 'Ayu Wulandari', email: 'ayu.wulandari@email.com', city: 'Denpasar', country: 'ID',
    totalOrders: 1, lifetimeValueRp: 320000, lastPurchase: '1 hari lalu', segment: 'New',
    topProducts: ['Crescent Moon'],
  },
]

// --- SUPPLIERS ---

export const suppliers: Supplier[] = [
  {
    id: 's1', name: 'Celuk Silver Artisans', location: 'Gianyar, Bali', email: 'celuk@silverceluk.id',
    materials: 'Bali Sterling 925, Fine Silver 999', moq: '100g', leadTimeDays: 7,
    lastOrderDate: '2025-06-10', status: 'Active', paymentTerms: 'Net 14',
  },
  {
    id: 's2', name: 'Kota Gede Workshop', location: 'Yogyakarta', email: 'info@kotagedeworkshop.com',
    materials: 'Filigree 925, Oxidized Silver', moq: '50g', leadTimeDays: 10,
    lastOrderDate: '2025-05-28', status: 'Active', paymentTerms: 'Net 14',
  },
  {
    id: 's3', name: 'Lombok Silver Co.', location: 'Mataram, NTB', email: 'hello@lomboksilver.id',
    materials: 'Sterling 925, Oxidized Finish', moq: '200g', leadTimeDays: 14,
    lastOrderDate: '2025-05-15', status: 'Active', paymentTerms: 'Net 30',
  },
  {
    id: 's4', name: 'GemBridge Asia', location: 'Jaipur, India', email: 'sales@gembridgeasia.com',
    materials: 'Garnet, Labradorite, Moonstone', moq: '20 pcs', leadTimeDays: 21,
    lastOrderDate: '2025-04-30', status: 'Active', paymentTerms: 'Net 30',
  },
  {
    id: 's5', name: 'FreshWater Pearl Co.', location: 'Surabaya, ID', email: 'sales@fwpearl.id',
    materials: 'Freshwater Pearls', moq: '50 pcs', leadTimeDays: 7,
    lastOrderDate: '2025-06-05', status: 'Active', paymentTerms: 'Net 14',
  },
  {
    id: 's6', name: 'BoXcraft Packaging', location: 'Tangerang, ID', email: 'hello@boxcraft.id',
    materials: 'Jewelry boxes, ribbon, tissue paper', moq: '100 pcs', leadTimeDays: 3,
    lastOrderDate: '2025-06-18', status: 'Active', paymentTerms: 'Net 7',
  },
]

// --- COLLECTIONS ---

export const collections: Collection[] = [
  {
    id: 'col1', name: 'Classic Silver', description: 'Timeless everyday pieces in Bali Sterling 925. Understated elegance for daily wear.',
    skuCount: 8, season: 'All-year', status: 'Active', revenue30dRp: 8750000,
  },
  {
    id: 'col2', name: 'Minimalist', description: 'Clean lines and fine silver for the modern wearer. Less is more.',
    skuCount: 6, season: 'All-year', status: 'Active', revenue30dRp: 5240000,
  },
  {
    id: 'col3', name: 'Boho Chic', description: 'Handcrafted artisan pieces with organic textures inspired by Indonesian nature.',
    skuCount: 7, season: 'Spring/Summer', status: 'Active', revenue30dRp: 4980000,
  },
  {
    id: 'col4', name: 'Bridal', description: 'Elegant, polished pieces for weddings and special occasions. Timeless and ceremonial.',
    skuCount: 5, season: 'All-year', status: 'Active', revenue30dRp: 6120000,
  },
  {
    id: 'col5', name: 'Holiday 2025', description: 'Limited edition festive pieces. Batik filigree and birthstone accents.',
    skuCount: 2, season: 'Q4 2025', status: 'Draft', revenue30dRp: 890000,
  },
  {
    id: 'col6', name: 'Artisan Heritage', description: 'Traditional Kota Gede filigree and Javanese silverwork. A celebration of Indonesian craft.',
    skuCount: 3, season: 'All-year', status: 'Archived', revenue30dRp: 0,
  },
]

// --- DAILY REVENUE (90 days, ending 2025-06-25) ---

export const dailyRevenue: DailyRevenue[] = [
  { date: '2025-03-27', revenueRp: 1150000 },
  { date: '2025-03-28', revenueRp: 1320000 },
  { date: '2025-03-29', revenueRp: 750000 },
  { date: '2025-03-30', revenueRp: 680000 },
  { date: '2025-03-31', revenueRp: 1180000 },
  { date: '2025-04-01', revenueRp: 1260000 },
  { date: '2025-04-02', revenueRp: 1410000 },
  { date: '2025-04-03', revenueRp: 1380000 },
  { date: '2025-04-04', revenueRp: 1190000 },
  { date: '2025-04-05', revenueRp: 810000 },
  { date: '2025-04-06', revenueRp: 720000 },
  { date: '2025-04-07', revenueRp: 1290000 },
  { date: '2025-04-08', revenueRp: 1350000 },
  { date: '2025-04-09', revenueRp: 1470000 },
  { date: '2025-04-10', revenueRp: 1540000 },
  { date: '2025-04-11', revenueRp: 1210000 },
  { date: '2025-04-12', revenueRp: 890000 },
  { date: '2025-04-13', revenueRp: 760000 },
  { date: '2025-04-14', revenueRp: 1380000 },
  { date: '2025-04-15', revenueRp: 1450000 },
  { date: '2025-04-16', revenueRp: 1510000 },
  { date: '2025-04-17', revenueRp: 1480000 },
  { date: '2025-04-18', revenueRp: 1350000 },
  { date: '2025-04-19', revenueRp: 940000 },
  { date: '2025-04-20', revenueRp: 820000 },
  { date: '2025-04-21', revenueRp: 1420000 },
  { date: '2025-04-22', revenueRp: 1580000 },
  { date: '2025-04-23', revenueRp: 1640000 },
  { date: '2025-04-24', revenueRp: 1520000 },
  { date: '2025-04-25', revenueRp: 1390000 },
  { date: '2025-04-26', revenueRp: 980000 },
  { date: '2025-04-27', revenueRp: 850000 },
  { date: '2025-04-28', revenueRp: 1460000 },
  { date: '2025-04-29', revenueRp: 1530000 },
  { date: '2025-04-30', revenueRp: 1610000 },
  // May — upward trend, Mother's Day spike
  { date: '2025-05-01', revenueRp: 1490000 },
  { date: '2025-05-02', revenueRp: 1380000 },
  { date: '2025-05-03', revenueRp: 1020000 },
  { date: '2025-05-04', revenueRp: 880000 },
  { date: '2025-05-05', revenueRp: 1520000 },
  { date: '2025-05-06', revenueRp: 1690000 },
  { date: '2025-05-07', revenueRp: 1780000 },
  // Mother's Day week spike
  { date: '2025-05-08', revenueRp: 2450000 },
  { date: '2025-05-09', revenueRp: 3120000 },
  { date: '2025-05-10', revenueRp: 2980000 },
  { date: '2025-05-11', revenueRp: 2640000 },
  { date: '2025-05-12', revenueRp: 2210000 },
  { date: '2025-05-13', revenueRp: 1650000 },
  { date: '2025-05-14', revenueRp: 1420000 },
  // Post-holiday normalization
  { date: '2025-05-15', revenueRp: 1580000 },
  { date: '2025-05-16', revenueRp: 1650000 },
  { date: '2025-05-17', revenueRp: 1720000 },
  { date: '2025-05-18', revenueRp: 1490000 },
  { date: '2025-05-19', revenueRp: 1110000 },
  { date: '2025-05-20', revenueRp: 940000 },
  { date: '2025-05-21', revenueRp: 1630000 },
  { date: '2025-05-22', revenueRp: 1710000 },
  { date: '2025-05-23', revenueRp: 1780000 },
  { date: '2025-05-24', revenueRp: 1590000 },
  { date: '2025-05-25', revenueRp: 1430000 },
  { date: '2025-05-26', revenueRp: 1050000 },
  { date: '2025-05-27', revenueRp: 890000 },
  { date: '2025-05-28', revenueRp: 1680000 },
  { date: '2025-05-29', revenueRp: 1750000 },
  { date: '2025-05-30', revenueRp: 1820000 },
  { date: '2025-05-31', revenueRp: 1640000 },
  // June — continued growth
  { date: '2025-06-01', revenueRp: 1580000 },
  { date: '2025-06-02', revenueRp: 1100000 },
  { date: '2025-06-03', revenueRp: 980000 },
  { date: '2025-06-04', revenueRp: 1720000 },
  { date: '2025-06-05', revenueRp: 1840000 },
  { date: '2025-06-06', revenueRp: 1910000 },
  { date: '2025-06-07', revenueRp: 1750000 },
  { date: '2025-06-08', revenueRp: 1580000 },
  { date: '2025-06-09', revenueRp: 1180000 },
  { date: '2025-06-10', revenueRp: 1020000 },
  { date: '2025-06-11', revenueRp: 1790000 },
  { date: '2025-06-12', revenueRp: 1860000 },
  { date: '2025-06-13', revenueRp: 1940000 },
  { date: '2025-06-14', revenueRp: 1810000 },
  { date: '2025-06-15', revenueRp: 1620000 },
  { date: '2025-06-16', revenueRp: 1240000 },
  { date: '2025-06-17', revenueRp: 1080000 },
  { date: '2025-06-18', revenueRp: 1880000 },
  { date: '2025-06-19', revenueRp: 1950000 },
  { date: '2025-06-20', revenueRp: 2020000 },
  { date: '2025-06-21', revenueRp: 1890000 },
  { date: '2025-06-22', revenueRp: 1680000 },
  { date: '2025-06-23', revenueRp: 1290000 },
  { date: '2025-06-24', revenueRp: 1140000 },
  { date: '2025-06-25', revenueRp: 1960000 },
]

// --- DEMAND FORECAST (next 12 weeks) ---
export interface ForecastPoint {
  week: string
  actualRp?: number
  forecastRp: number
}

export const demandForecast: ForecastPoint[] = [
  { week: 'W24', actualRp: 11200000, forecastRp: 11000000 },
  { week: 'W25', actualRp: 12400000, forecastRp: 11800000 },
  { week: 'W26 (now)', actualRp: 9600000, forecastRp: 12200000 },
  { week: 'W27', forecastRp: 13100000 },
  { week: 'W28', forecastRp: 13500000 },
  { week: 'W29', forecastRp: 12800000 },
  { week: 'W30', forecastRp: 13200000 },
  { week: 'W31', forecastRp: 13800000 },
  { week: 'W32', forecastRp: 14200000 },
  { week: 'W33', forecastRp: 15100000 },
  { week: 'W34', forecastRp: 14800000 },
  { week: 'W35', forecastRp: 15600000 },
]

// --- CHAT SESSIONS ---

export const chatSessions: ChatSession[] = [
  {
    id: 'chat-1',
    title: 'Top Products This Month',
    createdAt: '2025-06-25',
    messages: [
      {
        id: 'm1', role: 'user',
        content: 'Apa 5 produk terlaris bulan Juni ini?',
      },
      {
        id: 'm2', role: 'assistant',
        content: 'Berikut adalah 5 produk terlaris Anda di bulan Juni 2025 berdasarkan total revenue:',
        chartType: 'bar',
        chartData: [
          { name: 'Classic Band Ring', revenue: 4250000 },
          { name: 'Hoop 20mm', revenue: 3840000 },
          { name: 'Box Chain 45cm', revenue: 3120000 },
          { name: 'Dome Studs', revenue: 2850000 },
          { name: 'Eternity Ring', revenue: 2640000 },
        ],
      },
      {
        id: 'm3', role: 'user',
        content: 'Produk mana yang hampir habis stok?',
      },
      {
        id: 'm4', role: 'assistant',
        content: 'Ada 6 produk yang perlu segera diperhatikan stoknya:',
        chartType: 'table',
        chartData: [
          { sku: 'SLV-R003', name: 'Minimal Stack Ring', stock: 3, reorderPoint: 5, status: 'Low' },
          { sku: 'SLV-E001', name: 'Dome Studs', stock: 2, reorderPoint: 5, status: 'Low' },
          { sku: 'SLV-N002', name: 'Figaro Chain 50cm', stock: 2, reorderPoint: 5, status: 'Low' },
          { sku: 'SLV-R004', name: 'Hammered Band', stock: 0, reorderPoint: 3, status: 'Out of Stock' },
          { sku: 'SLV-E004', name: 'Ear Cuff', stock: 0, reorderPoint: 3, status: 'Out of Stock' },
          { sku: 'SLV-B001', name: 'Hammered Cuff', stock: 0, reorderPoint: 3, status: 'Out of Stock' },
        ],
      },
    ],
  },
  {
    id: 'chat-2',
    title: 'Revenue by Collection',
    createdAt: '2025-06-24',
    messages: [
      {
        id: 'm1', role: 'user',
        content: 'Tampilkan revenue per koleksi bulan ini',
      },
      {
        id: 'm2', role: 'assistant',
        content: 'Revenue breakdown per koleksi untuk bulan Juni 2025. Classic Silver mendominasi dengan 34% dari total revenue:',
        chartType: 'donut',
        chartData: [
          { name: 'Classic Silver', value: 8750000 },
          { name: 'Bridal', value: 6120000 },
          { name: 'Minimalist', value: 5240000 },
          { name: 'Boho Chic', value: 4980000 },
          { name: 'Holiday 2025', value: 890000 },
        ],
      },
    ],
  },
  {
    id: 'chat-3',
    title: 'Customer Insights',
    createdAt: '2025-06-23',
    messages: [
      {
        id: 'm1', role: 'user',
        content: 'Who are my top VIP customers?',
      },
      {
        id: 'm2', role: 'assistant',
        content: 'Your top 5 VIP customers by lifetime value:\n\n1. **Sari Dewi** (Jakarta) — Rp 4.250.000 · 9 orders\n2. **Putri Rahayu** (Bali) — Rp 3.875.000 · 7 orders\n3. **Emma van der Berg** (Amsterdam) — Rp 3.420.000 · 6 orders\n4. **Andi Pratama** (Surabaya) — Rp 2.850.000 · 5 orders\n5. **Sophie Williams** (Sydney) — Rp 2.610.000 · 5 orders\n\nYour VIP customers drive 48% of total revenue. Consider a loyalty program or early-access drops for this group.',
      },
      {
        id: 'm3', role: 'user',
        content: 'Which channels bring the most revenue?',
      },
      {
        id: 'm4', role: 'assistant',
        content: 'Revenue breakdown by sales channel for June 2025:',
        chartType: 'bar',
        chartData: [
          { name: 'Tokopedia', revenue: 15200000 },
          { name: 'Website', revenue: 12800000 },
          { name: 'Shopee', revenue: 7400000 },
          { name: 'Instagram', revenue: 3050000 },
        ],
      },
    ],
  },
]

// --- UTILITY FUNCTIONS ---

export function formatRp(amount: number): string {
  return 'Rp ' + amount.toLocaleString('id-ID')
}

export function getStatusColor(status: string): 'success' | 'warning' | 'error' | 'default' {
  const map: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
    'In Stock': 'success',
    'Delivered': 'success',
    'VIP': 'success',
    'Active': 'success',
    'Low': 'warning',
    'Pending': 'warning',
    'Processing': 'warning',
    'Out of Stock': 'error',
    'Returned': 'error',
    'Cancelled': 'error',
    'Inactive': 'error',
    'Shipped': 'default',
    'Regular': 'default',
    'New': 'default',
    'Draft': 'default',
    'Archived': 'default',
  }
  return map[status] || 'default'
}

// --- KPI & AGGREGATE DATA ---

export const kpiData = {
  revenueMtdRp: 38450000,
  activeOrders: 47,
  lowStockItems: 6,
  newCustomersMtd: 12,
  revenueMtdDelta: '+12%',
  activeOrdersDelta: '+3 minggu ini',
  newCustomersDelta: '+4 vs bulan lalu',
}

export const categoryRevenue = [
  { category: 'Classic Silver', revenue: 14250000 },
  { category: 'Bridal', revenue: 8840000 },
  { category: 'Minimalist', revenue: 6520000 },
  { category: 'Boho Chic', revenue: 5980000 },
  { category: 'Pendants', revenue: 3860000 },
]

export const channelRevenue = [
  { channel: 'Tokopedia', revenue: 15200000, orders: 7 },
  { channel: 'Website', revenue: 12800000, orders: 6 },
  { channel: 'Shopee', revenue: 7400000, orders: 4 },
  { channel: 'Instagram', revenue: 3050000, orders: 3 },
]

export const monthlyRevenue = [
  { month: 'Jan', revenue: 22400000 },
  { month: 'Feb', revenue: 28100000 },
  { month: 'Mar', revenue: 31500000 },
  { month: 'Apr', revenue: 29800000 },
  { month: 'Mei', revenue: 42300000 },
  { month: 'Jun', revenue: 38450000 },
]

export const inventoryTurnover = [
  { category: 'Rings', turnover: 4.2 },
  { category: 'Necklaces', turnover: 3.8 },
  { category: 'Earrings', turnover: 5.1 },
  { category: 'Bracelets', turnover: 2.9 },
  { category: 'Pendants', turnover: 6.4 },
]
