import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import WritingList from "@/components/WritingList";
import { getPosts } from "@/lib/data";
import { PROFILE } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Writing",
  description: `Engineering notes by ${PROFILE.name} on Android architecture, realtime systems, Compose design systems, and on-device ML.`,
  alternates: { canonical: "/writing" },
};

export default async function WritingPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <Reveal>
        <SectionHeading
          eyebrow="Writing"
          title="Engineering notes"
          description="Field notes from shipping Android at scale — architecture patterns, performance work, and the craft of durable mobile software."
        />
      </Reveal>
      <Reveal>
        <WritingList posts={posts} />
      </Reveal>
    </div>
  );
}
