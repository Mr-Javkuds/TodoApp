import React from 'react';
import { HeroUIProvider } from '@heroui/system';
import DefaultLayout from "@/layouts/default";

export default function DashboardPage() {

  return (
    <DefaultLayout>
      <HeroUIProvider>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="inline-block max-w-lg text-center justify-center">
            <h1 className="text-4xl font-bold">Dashboard</h1>

            <p className="mt-4 text-lg text-gray-600">
              Welcome to your dashboard! Here you can manage your settings and view your activity.
            </p>
          </div>

        </section>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="inline-block max-w-lg text-center justify-center">
            <h2 className="text-2xl font-bold">Your Activity</h2>
          </div>
        <div className="w-full max-w-4xl">
          {/* Activity content goes here */}
          {/* make todo list using hero ui */}
          
        </div>
        </section>


      </HeroUIProvider>
    </DefaultLayout>
  )

};
