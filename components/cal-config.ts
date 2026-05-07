export const CAL_NAMESPACE = "freeconsultation";
export const CAL_LINK = "vino-hub/freeconsultation";
export const CAL_DATA = {
  "data-cal-namespace": CAL_NAMESPACE,
  "data-cal-link": CAL_LINK,
  "data-cal-config": JSON.stringify({
    layout: "month_view",
    useSlotsViewOnSmallScreen: "true",
  }),
} as const;
