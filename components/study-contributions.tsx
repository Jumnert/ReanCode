"use client"

import { use } from "react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
// import { Spinner } from "@/components/ui/spinner"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import type { Activity } from "@/components/contribution-graph"
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/contribution-graph"

export function StudyContributions({
  contributions,
  className,
}: {
  contributions: Promise<Activity[]> | Activity[]
  className?: string
}) {
  // If it's a promise, unwrap it (assuming React 19 / experimental use). Otherwise, use array directly.
  const data = Array.isArray(contributions) ? contributions : use(contributions)

  return (
    <TooltipProvider>
      <ContributionGraph
        className={cn("mx-auto py-2", className)}
        data={data}
        blockSize={11}
        blockMargin={3}
        blockRadius={2}
      >
        <ContributionGraphCalendar
          className="no-scrollbar px-2"
          title="Study Contributions"
        >
          {({ activity, dayIndex, weekIndex }) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <g>
                  <ContributionGraphBlock
                    activity={activity}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                  />
                </g>
              </TooltipTrigger>
              <TooltipContent className="font-sans">
                <p>
                  {activity.count} study session{activity.count !== 1 ? "s" : null}{" "}
                  on {format(new Date(activity.date), "dd.MM.yyyy")}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </ContributionGraphCalendar>

        <ContributionGraphFooter className="px-2">
          <ContributionGraphTotalCount>
            {({ totalCount, year }) => (
              <div className="text-muted-foreground text-sm font-medium">
                {totalCount.toLocaleString("en")} study sessions in {year}
              </div>
            )}
          </ContributionGraphTotalCount>

          <ContributionGraphLegend />
        </ContributionGraphFooter>
      </ContributionGraph>
    </TooltipProvider>
  )
}

export function StudyContributionsFallback() {
  return (
    <div className="flex h-40 w-full items-center justify-center bg-muted/20 rounded-xl animate-pulse border border-border/50">
      <span className="text-muted-foreground text-sm font-medium">Loading contributions...</span>
    </div>
  )
}
