import React from "react"
import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function CardDemo({ className, ...props }) {
  return (
    <Card className={cn("mw-[300px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Asset Name</CardTitle>
        <CardDescription>Short description ...</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  )
}

const tempGrid = () => {
  const items = []
  for (let i = 0; i < 30; i++) {
    items.push(<CardDemo />)
  }
  return items
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       {/* grid of assets */}
       <div className="grid grid-cols-5 gap-4">
          {tempGrid()}
        </div>
    </main>
  )
}
