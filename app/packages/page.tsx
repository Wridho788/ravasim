"use client"

import { useMemo, useState } from "react"
import { Grid, Loader, Select, TextInput, Title } from "@mantine/core"

import AuthGuard from "@/components/auth/AuthGuard"
import DashboardShell from "@/components/layout/AppShell"

import { usePackages } from "@/modules/packages/hooks/usePackages"
import PackageCard from "@/modules/packages/components/PackageCard"

export default function PackagesPage() {
  const { data, isLoading } = usePackages()

  const [search, setSearch] = useState("")
  const [country, setCountry] = useState<string | null>(null)

  const countries = useMemo(() => {
    const set = new Set((data ?? []).map((p) => p.country))
    return Array.from(set).map((c) => ({ value: c, label: c }))
  }, [data])

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    return (data ?? []).filter((p) => {
      const matchKeyword =
        !keyword ||
        p.name.toLowerCase().includes(keyword) ||
        p.country.toLowerCase().includes(keyword)

      const matchCountry = !country || p.country === country

      return matchKeyword && matchCountry
    })
  }, [country, data, search])

  return (
    <AuthGuard>
      <DashboardShell>
        <Title order={2} mb="lg">
          eSIM Packages
        </Title>

        <Grid mb="lg">
          <Grid.Col span={{ base: 12, sm: 8 }}>
            <TextInput
              placeholder="Search packages"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Select
              placeholder="Filter country"
              data={countries}
              value={country}
              onChange={setCountry}
              clearable
            />
          </Grid.Col>
        </Grid>

        {isLoading ? (
          <Loader />
        ) : (
          <Grid>
            {filtered.map((pkg) => (
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={pkg.id}>
                <PackageCard pkg={pkg} />
              </Grid.Col>
            ))}
          </Grid>
        )}
      </DashboardShell>
    </AuthGuard>
  )
}
