"use client";

import Link from "next/link";
import { Button, Container, Text, Title } from "@mantine/core";

export default function HomePage() {
  return (
    <Container size="sm" py={80}>
      <Title order={1}>RavaSIM</Title>

      <Text mt="md">
        Digital Connectivity Platform for managing eSIM packages, devices, and
        usage analytics.
      </Text>

      <Button mt="xl" component={Link} href="/login">
        Get Started
      </Button>
    </Container>
  );
}
