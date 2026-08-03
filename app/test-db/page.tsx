'use client'

import { useEffect, useState } from 'react'

export default function TestDatabase() {
  const [status, setStatus] = useState<string>('Loading...')
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        setStatus('Testing connection to Supabase...')
        
        const response = await fetch('/api/verify-database')
        const result = await response.json()

        if (response.ok && result.allTablesCreated) {
          setStatus('✅ SUCCESS: Site is connected to the correct Supabase database!')
          setData(result)
        } else {
          setStatus('❌ ERROR: Database tables not found')
          setData(result)
          setError(result.error || 'Unknown error')
        }
      } catch (err) {
        setStatus('❌ ERROR: Could not connect to database')
        setError(err instanceof Error ? err.message : String(err))
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Database Connection Test</h1>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <p className="text-xl font-semibold mb-2">{status}</p>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>

        {data && (
          <div className="bg-gray-50 rounded-lg p-6 overflow-auto">
            <h2 className="text-2xl font-bold mb-4">Database Status</h2>
            
            <div className="space-y-4">
              {data.database?.products && (
                <div className="bg-white p-4 rounded border border-green-200">
                  <h3 className="font-bold text-green-700">✅ Products Table</h3>
                  <p>Total records: {data.database.products.count}</p>
                  {data.database.products.count > 0 && (
                    <pre className="mt-2 text-sm bg-gray-100 p-2 rounded overflow-auto">
                      {JSON.stringify(data.database.products.sample, null, 2)}
                    </pre>
                  )}
                </div>
              )}

              {data.database?.orders && (
                <div className="bg-white p-4 rounded border border-blue-200">
                  <h3 className="font-bold text-blue-700">✅ Orders Table</h3>
                  <p>Total records: {data.database.orders.count}</p>
                </div>
              )}

              {data.database?.newsletter_subscribers && (
                <div className="bg-white p-4 rounded border border-purple-200">
                  <h3 className="font-bold text-purple-700">✅ Newsletter Subscribers Table</h3>
                  <p>Total records: {data.database.newsletter_subscribers.count}</p>
                </div>
              )}
            </div>

            {data.allTablesCreated && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded p-4">
                <p className="text-green-800 font-semibold">✅ All tables created and connected successfully!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
