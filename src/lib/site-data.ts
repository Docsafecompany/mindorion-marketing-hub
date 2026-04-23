export type BlogSection = {
  id: string;
  headingKey: string;
  bodyKey: string;
};

export type BlogPost = {
  slug: string;
  date: string;
  categoryKey: string;
  titleKey: string;
  excerptKey: string;
  description: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "hidden-risks-documents",
    date: "2026-01-16",
    categoryKey: "blog.categories.compliance",
    titleKey: "blog.posts.hiddenRisks.title",
    excerptKey: "blog.posts.hiddenRisks.excerpt",
    description: "Learn how hidden metadata, comments and tracked changes create avoidable client risk in business documents.",
    sections: [
      { id: "metadata", headingKey: "blog.posts.hiddenRisks.sections.metadata.heading", bodyKey: "blog.posts.hiddenRisks.sections.metadata.body" },
      { id: "comments", headingKey: "blog.posts.hiddenRisks.sections.comments.heading", bodyKey: "blog.posts.hiddenRisks.sections.comments.body" },
      { id: "workflow", headingKey: "blog.posts.hiddenRisks.sections.workflow.heading", bodyKey: "blog.posts.hiddenRisks.sections.workflow.body" },
    ],
  },
  {
    slug: "consulting-quality-gate",
    date: "2026-02-03",
    categoryKey: "blog.categories.consulting",
    titleKey: "blog.posts.consultingQualityGate.title",
    excerptKey: "blog.posts.consultingQualityGate.excerpt",
    description: "Discover why a document quality gate helps consultants protect trust before every proposal and delivery.",
    sections: [
      { id: "trust", headingKey: "blog.posts.consultingQualityGate.sections.trust.heading", bodyKey: "blog.posts.consultingQualityGate.sections.trust.body" },
      { id: "operations", headingKey: "blog.posts.consultingQualityGate.sections.operations.heading", bodyKey: "blog.posts.consultingQualityGate.sections.operations.body" },
      { id: "rollout", headingKey: "blog.posts.consultingQualityGate.sections.rollout.heading", bodyKey: "blog.posts.consultingQualityGate.sections.rollout.body" },
    ],
  },
  {
    slug: "what-gets-cleaned",
    date: "2026-02-19",
    categoryKey: "blog.categories.product",
    titleKey: "blog.posts.whatGetsCleaned.title",
    excerptKey: "blog.posts.whatGetsCleaned.excerpt",
    description: "See what a modern document cleaning workflow removes before a file reaches a client, partner or candidate.",
    sections: [
      { id: "signal", headingKey: "blog.posts.whatGetsCleaned.sections.signal.heading", bodyKey: "blog.posts.whatGetsCleaned.sections.signal.body" },
      { id: "personal-data", headingKey: "blog.posts.whatGetsCleaned.sections.personalData.heading", bodyKey: "blog.posts.whatGetsCleaned.sections.personalData.body" },
      { id: "final-export", headingKey: "blog.posts.whatGetsCleaned.sections.finalExport.heading", bodyKey: "blog.posts.whatGetsCleaned.sections.finalExport.body" },
    ],
  },
  {
    slug: "roi-document-cleanup",
    date: "2026-03-08",
    categoryKey: "blog.categories.operations",
    titleKey: "blog.posts.roiCleanup.title",
    excerptKey: "blog.posts.roiCleanup.excerpt",
    description: "Measure the ROI of document cleanup by reducing rework, legal exposure and lost confidence in sales cycles.",
    sections: [
      { id: "rework", headingKey: "blog.posts.roiCleanup.sections.rework.heading", bodyKey: "blog.posts.roiCleanup.sections.rework.body" },
      { id: "risk", headingKey: "blog.posts.roiCleanup.sections.risk.heading", bodyKey: "blog.posts.roiCleanup.sections.risk.body" },
      { id: "metrics", headingKey: "blog.posts.roiCleanup.sections.metrics.heading", bodyKey: "blog.posts.roiCleanup.sections.metrics.body" },
    ],
  },
  {
    slug: "remove-metadata-word-before-sending",
    date: "2026-03-21",
    categoryKey: "blog.categories.compliance",
    titleKey: "blog.posts.removeMetadata.title",
    excerptKey: "blog.posts.removeMetadata.excerpt",
    description: "A simple framework to remove metadata from Word documents before sending them outside your organization.",
    sections: [
      { id: "sources", headingKey: "blog.posts.removeMetadata.sections.sources.heading", bodyKey: "blog.posts.removeMetadata.sections.sources.body" },
      { id: "controls", headingKey: "blog.posts.removeMetadata.sections.controls.heading", bodyKey: "blog.posts.removeMetadata.sections.controls.body" },
      { id: "governance", headingKey: "blog.posts.removeMetadata.sections.governance.heading", bodyKey: "blog.posts.removeMetadata.sections.governance.body" },
    ],
  },
  {
    slug: "track-changes-proposals",
    date: "2026-04-07",
    categoryKey: "blog.categories.sales",
    titleKey: "blog.posts.trackChanges.title",
    excerptKey: "blog.posts.trackChanges.excerpt",
    description: "Tracked changes in proposals reveal margin, negotiation strategy and internal comments if teams lack a final checkpoint.",
    sections: [
      { id: "exposure", headingKey: "blog.posts.trackChanges.sections.exposure.heading", bodyKey: "blog.posts.trackChanges.sections.exposure.body" },
      { id: "prevention", headingKey: "blog.posts.trackChanges.sections.prevention.heading", bodyKey: "blog.posts.trackChanges.sections.prevention.body" },
      { id: "team-habits", headingKey: "blog.posts.trackChanges.sections.teamHabits.heading", bodyKey: "blog.posts.trackChanges.sections.teamHabits.body" },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
