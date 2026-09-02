export type Activity = {
  name: string
  calsPerMinutePerLb: number
  category: string
}

export const activities: Activity[] = [
  // ── Cardio & Aerobics ──
  { category: "Cardio & Aerobics", name: "Aerobic dancing (low impact)",                    calsPerMinutePerLb: 0.03833333333333333  },
  { category: "Cardio & Aerobics", name: "Aerobics step training, 4″ step (beginner)",      calsPerMinutePerLb: 0.04833333333333333  },
  { category: "Cardio & Aerobics", name: "Aerobics, slide training (basic)",                calsPerMinutePerLb: 0.05                 },
  { category: "Cardio & Aerobics", name: "Skipping rope",                                   calsPerMinutePerLb: 0.095                },
  { category: "Cardio & Aerobics", name: "Stair climber machine",                           calsPerMinutePerLb: 0.05333333333333334  },
  { category: "Cardio & Aerobics", name: "Stair climbing",                                  calsPerMinutePerLb: 0.04666666666666667  },
  { category: "Cardio & Aerobics", name: "Rowing machine",                                  calsPerMinutePerLb: 0.06                 },

  // ── Running & Walking ──
  { category: "Running & Walking",  name: "Walking, 2 mph (30 min/mile)",                   calsPerMinutePerLb: 0.02                 },
  { category: "Running & Walking",  name: "Walking, 3 mph (20 min/mile)",                   calsPerMinutePerLb: 0.02666666666666667  },
  { category: "Running & Walking",  name: "Walking, 4 mph (15 min/mile)",                   calsPerMinutePerLb: 0.03333333333333333  },
  { category: "Running & Walking",  name: "Jogging, 5 mph (12 min/mile)",                   calsPerMinutePerLb: 0.06166666666666667  },
  { category: "Running & Walking",  name: "Jogging, 6 mph (10 min/mile)",                   calsPerMinutePerLb: 0.07666666666666666  },
  { category: "Running & Walking",  name: "Running, 8 mph (7.5 min/mile)",                  calsPerMinutePerLb: 0.10166666666666667  },
  { category: "Running & Walking",  name: "Running, 9 mph (6.7 min/mile)",                  calsPerMinutePerLb: 0.11                 },
  { category: "Running & Walking",  name: "Running, 10 mph (6 min/mile)",                   calsPerMinutePerLb: 0.11666666666666667  },

  // ── Strength & Gym ──
  { category: "Strength & Gym",     name: "Weight training (40 sec rest)",                  calsPerMinutePerLb: 0.085                },
  { category: "Strength & Gym",     name: "Weight training (60 sec rest)",                  calsPerMinutePerLb: 0.06333333333333334  },
  { category: "Strength & Gym",     name: "Weight training (90 sec rest)",                  calsPerMinutePerLb: 0.041666666666666664 },

  // ── Cycling & Water ──
  { category: "Cycling & Water",    name: "Bicycling, 10 mph",                              calsPerMinutePerLb: 0.041666666666666664 },
  { category: "Cycling & Water",    name: "Bicycling, 13 mph",                              calsPerMinutePerLb: 0.06666666666666667  },
  { category: "Cycling & Water",    name: "Canoeing, 2.5 mph",                              calsPerMinutePerLb: 0.023333333333333334 },
  { category: "Cycling & Water",    name: "Canoeing, 4.0 mph",                              calsPerMinutePerLb: 0.045                },
  { category: "Cycling & Water",    name: "Rowing (leisurely)",                             calsPerMinutePerLb: 0.025                },
  { category: "Cycling & Water",    name: "Scuba diving",                                   calsPerMinutePerLb: 0.06333333333333334  },
  { category: "Cycling & Water",    name: "Swimming (25 yards/min)",                        calsPerMinutePerLb: 0.04                 },
  { category: "Cycling & Water",    name: "Swimming (50 yards/min)",                        calsPerMinutePerLb: 0.075                },
  { category: "Cycling & Water",    name: "Waterskiing",                                    calsPerMinutePerLb: 0.05333333333333334  },

  // ── Team & Court Sports ──
  { category: "Team & Court Sports", name: "Badminton",                                     calsPerMinutePerLb: 0.05                 },
  { category: "Team & Court Sports", name: "Basketball (game)",                             calsPerMinutePerLb: 0.07333333333333333  },
  { category: "Team & Court Sports", name: "Basketball (leisurely)",                        calsPerMinutePerLb: 0.043333333333333335 },
  { category: "Team & Court Sports", name: "Handball",                                      calsPerMinutePerLb: 0.07666666666666666  },
  { category: "Team & Court Sports", name: "Ping Pong / Table Tennis",                      calsPerMinutePerLb: 0.03                 },
  { category: "Team & Court Sports", name: "Racquetball",                                   calsPerMinutePerLb: 0.06833333333333333  },
  { category: "Team & Court Sports", name: "Soccer",                                        calsPerMinutePerLb: 0.065                },
  { category: "Team & Court Sports", name: "Squash",                                        calsPerMinutePerLb: 0.06833333333333333  },
  { category: "Team & Court Sports", name: "Tennis (singles)",                              calsPerMinutePerLb: 0.05333333333333334  },
  { category: "Team & Court Sports", name: "Tennis (doubles)",                              calsPerMinutePerLb: 0.03666666666666667  },
  { category: "Team & Court Sports", name: "Volleyball (game)",                             calsPerMinutePerLb: 0.04                 },
  { category: "Team & Court Sports", name: "Volleyball (leisurely)",                        calsPerMinutePerLb: 0.023333333333333334 },

  // ── Outdoor & Hiking ──
  { category: "Outdoor & Hiking",   name: "Backpacking with 10 lb load",                   calsPerMinutePerLb: 0.06                 },
  { category: "Outdoor & Hiking",   name: "Backpacking with 20 lb load",                   calsPerMinutePerLb: 0.06666666666666667  },
  { category: "Outdoor & Hiking",   name: "Backpacking with 30 lb load",                   calsPerMinutePerLb: 0.07833333333333334  },
  { category: "Outdoor & Hiking",   name: "Hiking, no load",                               calsPerMinutePerLb: 0.051666666666666666 },
  { category: "Outdoor & Hiking",   name: "Hiking with a 10 lb load",                      calsPerMinutePerLb: 0.06                 },
  { category: "Outdoor & Hiking",   name: "Hiking with a 20 lb load",                      calsPerMinutePerLb: 0.06666666666666667  },
  { category: "Outdoor & Hiking",   name: "Hiking with a 30 lb load",                      calsPerMinutePerLb: 0.07833333333333334  },
  { category: "Outdoor & Hiking",   name: "Snow shoveling",                                calsPerMinutePerLb: 0.065                },

  // ── Winter Sports ──
  { category: "Winter Sports",      name: "Cross-country skiing (leisurely)",               calsPerMinutePerLb: 0.051666666666666666 },
  { category: "Winter Sports",      name: "Cross-country skiing (moderate)",                calsPerMinutePerLb: 0.07333333333333333  },
  { category: "Winter Sports",      name: "Cross-country skiing (intense)",                 calsPerMinutePerLb: 0.11                 },
  { category: "Winter Sports",      name: "Downhill skiing",                                calsPerMinutePerLb: 0.043333333333333335 },

  // ── Dance & Leisure ──
  { category: "Dance & Leisure",    name: "Dancing (non-contact)",                          calsPerMinutePerLb: 0.03333333333333333  },
  { category: "Dance & Leisure",    name: "Dancing (slow)",                                 calsPerMinutePerLb: 0.018333333333333333 },
  { category: "Dance & Leisure",    name: "Bowling",                                        calsPerMinutePerLb: 0.018333333333333333 },
  { category: "Dance & Leisure",    name: "Billiards",                                      calsPerMinutePerLb: 0.015                },
  { category: "Dance & Leisure",    name: "Croquet",                                        calsPerMinutePerLb: 0.02                 },
  { category: "Dance & Leisure",    name: "Golfing (walking, no cart)",                     calsPerMinutePerLb: 0.03333333333333333  },
  { category: "Dance & Leisure",    name: "Golfing (with cart)",                            calsPerMinutePerLb: 0.023333333333333334 },

  // ── Household & Yard ──
  { category: "Household & Yard",   name: "Gardening (moderate)",                           calsPerMinutePerLb: 0.03                 },
  { category: "Household & Yard",   name: "Housework",                                      calsPerMinutePerLb: 0.03                 },
  { category: "Household & Yard",   name: "Ironing",                                        calsPerMinutePerLb: 0.016666666666666666 },
  { category: "Household & Yard",   name: "Mopping",                                        calsPerMinutePerLb: 0.028333333333333332 },
  { category: "Household & Yard",   name: "Mowing",                                         calsPerMinutePerLb: 0.045                },
  { category: "Household & Yard",   name: "Raking",                                         calsPerMinutePerLb: 0.025                },
  { category: "Household & Yard",   name: "Scrubbing the floor",                            calsPerMinutePerLb: 0.04666666666666667  },
  { category: "Household & Yard",   name: "Shopping for groceries",                         calsPerMinutePerLb: 0.02                 },
  { category: "Household & Yard",   name: "Trimming hedges",                                calsPerMinutePerLb: 0.035                },
  { category: "Household & Yard",   name: "Vacuuming",                                      calsPerMinutePerLb: 0.025                },
  { category: "Household & Yard",   name: "Washing the car",                                calsPerMinutePerLb: 0.025                },
  { category: "Household & Yard",   name: "Waxing the car",                                 calsPerMinutePerLb: 0.03333333333333333  },
  { category: "Household & Yard",   name: "Weeding",                                        calsPerMinutePerLb: 0.03333333333333333  },
  { category: "Household & Yard",   name: "Window cleaning",                                calsPerMinutePerLb: 0.025                },
]

/** Unique ordered category list */
export const ACTIVITY_CATEGORIES = [
  "Cardio & Aerobics",
  "Running & Walking",
  "Strength & Gym",
  "Cycling & Water",
  "Team & Court Sports",
  "Outdoor & Hiking",
  "Winter Sports",
  "Dance & Leisure",
  "Household & Yard",
] as const
