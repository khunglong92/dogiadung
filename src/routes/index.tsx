import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/home/Hero';
import { ProductGrid } from '@/components/home/ProductGrid';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';
import { useTheme } from '@/hooks/useTheme';

function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <ProductGrid />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: Home,
});
