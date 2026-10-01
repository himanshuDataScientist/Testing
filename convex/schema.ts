import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  companies: defineTable({
    companyId: v.number(),
    companyName: v.string(),
    reviewsCount: v.number(),
    aggregateRating: v.number(),
  }).index("by_companyId", ["companyId"]),

  jobs: defineTable({
    jobId: v.number(),
    title: v.string(),
    companyId: v.number(),
    location: v.string(),
    salary: v.number(),
    currency: v.string(),
    jobUploaded: v.string(),
    minimumExperience: v.number(),
    jobLevel: v.string(),
    jobRole: v.string(),
    jobDescription: v.string(),
    tagsAndSkills: v.string(),
  })
    .index("by_jobId", ["jobId"])
    .index("by_company", ["companyId"])
    .index("by_role_level", ["jobRole", "jobLevel"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["jobRole", "jobLevel", "location"],
    }),

  skills: defineTable({
    skillId: v.number(),
    skillName: v.string(),
  })
    .index("by_skillId", ["skillId"])
    .index("by_name", ["skillName"]),

  jobSkills: defineTable({
    jobId: v.number(),
    skillId: v.number(),
  })
    .index("by_job", ["jobId"])
    .index("by_skill", ["skillId"]),

  users: defineTable({
    userId: v.number(),
    name: v.string(),
    email: v.string(),
    experience: v.number(),
    education: v.string(),
    preferredRole: v.string(),
    minimumSalary: v.number(),
    preferredJobLevel: v.string(),
  })
    .index("by_userId", ["userId"])
    .index("by_email", ["email"]),

  userSkills: defineTable({
    userId: v.number(),
    skillId: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_skill", ["skillId"]),

  userPreferences: defineTable({
    userId: v.number(),
    preferredRole: v.string(),
    minimumSalary: v.number(),
    preferredJobLevel: v.string(),
  }).index("by_userId", ["userId"]),

  applications: defineTable({
    applicationId: v.number(),
    userId: v.number(),
    jobId: v.number(),
    status: v.string(),
    appliedAt: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_job", ["jobId"]),

  recommendations: defineTable({
    userId: v.number(),
    jobId: v.number(),
    score: v.number(),
  }).index("by_user_score", ["userId", "score"]),
});