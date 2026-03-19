"use client"

import { useMemo, useState } from "react"
import {
  Card,
  Grid,
  Group,
  RangeSlider,
  Select,
  Skeleton,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core"

import AuthGuard from "@/components/auth/AuthGuard"
import DashboardShell from "@/components/layout/AppShell"

import { usePackages } from "@/modules/packages/hooks/usePackages"
import PackageCard from "@/modules/packages/components/PackageCard"

function parseNumberFromText(text: string) {
  const m = text.match(/(\d+(?:\.\d+)?)/)
  return m ? Number(m[1]) : 0
}

type DataRangeKey = "any" | "0-5" | "5-10" | "10-20" | "20+"
type SortKey = "popular" | "cheapest"

export default function PackagesPage() {
  const { data, isLoading } = usePackages()

  const [search, setSearch] = useState("")
  const [country, setCountry] = useState<string | null>(null)
  const [dataRange, setDataRange] = useState<DataRangeKey>("any")
  const [sort, setSort] = useState<SortKey>("popular")

  const minMaxPrice = useMemo(() => {
    const prices = (data ?? []).map((p) => p.price)
    const min = prices.length ? Math.min(...prices) : 0
    const max = prices.length ? Math.max(...prices) : 50
    return { min, max }
  }, [data])

  const [priceRange, setPriceRange] = useState<[number, number] | null>(null)
  const effectivePriceRange = useMemo<[number, number]>(
    () => priceRange ?? [minMaxPrice.min, minMaxPrice.max],
    [priceRange, minMaxPrice.max, minMaxPrice.min]
  )

  const countries = useMemo(() => {
    const set = new Set((data ?? []).map((p) => p.country))
    return Array.from(set).map((c) => ({ value: c, label: c }))
  }, [data])

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    const [minPrice, maxPrice] = effectivePriceRange

    const matchDataRange = (gb: number) => {
      if (dataRange === "any") return true
      if (dataRange === "0-5") return gb >= 0 && gb <= 5
      if (dataRange === "5-10") return gb > 5 && gb <= 10
      if (dataRange === "10-20") return gb > 10 && gb <= 20
      return gb > 20
    }

    const base = (data ?? []).filter((p) => {
      const matchKeyword =
        !keyword ||
        p.name.toLowerCase().includes(keyword) ||
        p.country.toLowerCase().includes(keyword)

      const matchCountry = !country || p.country === country

      const gb = parseNumberFromText(p.data)
      const matchData = matchDataRange(gb)

      const matchPrice = p.price >= minPrice && p.price <= maxPrice

      return matchKeyword && matchCountry && matchData && matchPrice
    })

    const sorted = [...base].sort((a, b) => {
      if (sort === "cheapest") return a.price - b.price
      return (b.popularity ?? 0) - (a.popularity ?? 0)
    })

    return sorted
  }, [country, data, dataRange, effectivePriceRange, search, sort])

  const dataRangeOptions = useMemo(
    () => [
      { value: "any", label: "Any data" },
      { value: "0-5", label: "0–5 GB" },
      { value: "5-10", label: "5–10 GB" },
      { value: "10-20", label: "10–20 GB" },
      { value: "20+", label: "> 20 GB" },
    ],
    []
  )

  const sortOptions = useMemo(
    () => [
      { value: "popular", label: "Most popular" },
      { value: "cheapest", label: "Cheapest" },
    ],
    []
  )

  return (
    <AuthGuard>
      <DashboardShell>
        <Title order={2} mb="lg">
          eSIM Packages
        </Title>

        <Stack gap={16}>
          <Card>
            <Grid>
              <Grid.Col span={{ base: 12, md: 5 }}>
                <TextInput
                  label="Search"
                  placeholder="Search packages"
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Select
                  label="Country"
                  placeholder="All countries"
                  data={countries}
                  value={country}
                  onChange={setCountry}
                  clearable
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 2 }}>
                <Select
                  label="Data"
                  data={dataRangeOptions}
                  value={dataRange}
                  onChange={(v) => setDataRange((v as DataRangeKey) ?? "any")}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 2 }}>
                <Select
                  label="Sort"
                  data={sortOptions}
                  value={sort}
                  onChange={(v) => setSort((v as SortKey) ?? "popular")}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12 }}>
                <Group justify="space-between" mb={6}>
                  <Text size="sm" fw={600}>
                    Price range
                  </Text>
                  <Text size="sm" c="dimmed">
                    ${effectivePriceRange[0]} – ${effectivePriceRange[1]}
                  </Text>
                </Group>
                <RangeSlider
                  min={minMaxPrice.min}
                  max={minMaxPrice.max}
                  value={effectivePriceRange}
                  onChange={setPriceRange}
                  step={1}
                />
              </Grid.Col>
            </Grid>
          </Card>

          {isLoading ? (
            <Grid>
              {Array.from({ length: 6 }).map((_, i) => (
                <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={i}>
                  <Skeleton height={220} radius="lg" />
                </Grid.Col>
              ))}
            </Grid>
          ) : filtered.length === 0 ? (
            <Card>
              <Text fw={700}>No packages found</Text>
              <Text size="sm" c="dimmed" mt={4}>
                Try adjusting filters or search keywords.
              </Text>
            </Card>
          ) : (
            <Grid>
              {filtered.map((pkg) => (
                <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={pkg.id}>
                  <PackageCard pkg={pkg} />
                </Grid.Col>
              ))}
            </Grid>
          )}
        </Stack>
      </DashboardShell>
    </AuthGuard>
  )
}
