import type React from "react"
import Header from "../../shared/components/header/page"

export default function CricketRulesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="pt-[100px]">{children}</main>
    </>
  )
}

