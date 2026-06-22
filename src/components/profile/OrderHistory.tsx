'use client'

import { motion } from 'framer-motion'
import { Package, Calendar, ChevronRight, Eye } from 'lucide-react'
import Link from 'next/link'

interface Order {
  id: string
  date: string
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: number
}

interface OrderHistoryProps {
  orders: Order[]
}

const STATUS_COLORS = {
  processing: 'bg-amber-100 text-amber-700',
  shipped: 'bg-blue-100 text-blue-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  if (orders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-12 border border-gray-100 text-center"
      >
        <Package size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="font-serif text-xl text-charcoal mb-2">No orders yet</h3>
        <p className="text-sm text-gray-500 font-sans mb-6">
          When you place an order, it will appear here
        </p>
        <Link href="/shop">
          <button className="px-6 py-3 bg-charcoal text-white text-xs uppercase tracking-[0.2em] font-sans hover:bg-gold-500 transition-colors">
            Start Shopping
          </button>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-gray-100"
    >
      <div className="p-8 border-b border-gray-100">
        <h2 className="font-serif text-2xl text-charcoal font-light">Order History</h2>
        <p className="text-sm text-gray-500 font-sans mt-1">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 hover:bg-cream transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* Order Icon */}
                <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center">
                  <Package size={20} className="text-charcoal" />
                </div>

                {/* Order Info */}
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-sans font-medium text-charcoal">
                      Order #{order.id}
                    </span>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-sans ${STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 font-sans">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(order.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package size={12} />
                      {order.items} {order.items === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Total & Actions */}
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-gray-400 font-sans">Total</p>
                  <p className="font-serif text-lg text-charcoal">{formatPrice(order.total)}</p>
                </div>
                <button className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-gold-500 hover:text-gold-500 transition-colors">
                  <Eye size={16} />
                </button>
                <ChevronRight size={20} className="text-gray-300" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
