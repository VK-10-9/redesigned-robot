"use client"

import { useState, useEffect } from "react"
import * as api from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DataExplorer() {
  const [rows, setRows] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(25)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const res = await api.getExplorerEnrollment({ page, limit })
        setRows(res?.rows || [])
        setTotal(res?.total || 0)
      } catch (err) {
        console.error("Data explorer fetch error", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [page, limit])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Data Explorer</h2>
        <p className="text-muted-foreground">Browse aggregated enrollment records (paged)</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enrollment Aggregated</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-64 flex items-center justify-center text-muted-foreground">Loading...</div>
          ) : rows.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <thead>
                  <tr>
                    <th className="text-left">Date</th>
                    <th className="text-left">State</th>
                    <th className="text-left">District</th>
                    <th className="text-right">Pincode</th>
                    <th className="text-right">0-5</th>
                    <th className="text-right">5-17</th>
                    <th className="text-right">18+</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r: any, i: number) => (
                    <tr key={i} className="border-t">
                      <td>{r.date}</td>
                      <td>{r.state}</td>
                      <td>{r.district}</td>
                      <td className="text-right">{r.pincode || ""}</td>
                      <td className="text-right">{r.age_0_5}</td>
                      <td className="text-right">{r.age_5_17}</td>
                      <td className="text-right">{r.age_18_greater}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">No data</div>
          )}

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">Total rows: {total}</div>
            <div className="flex gap-2 items-center">
              <button
                className="px-3 py-1 rounded bg-muted text-muted-foreground"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </button>
              <div>Page {page}</div>
              <button className="px-3 py-1 rounded bg-muted text-muted-foreground" onClick={() => setPage((p) => p + 1)}>
                Next
              </button>
              <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="ml-2">
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
