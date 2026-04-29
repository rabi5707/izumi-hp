import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SERVICE_LABELS } from "@/lib/journal";
import {
  fetchAllPublishedPosts,
  fetchPostBySlug,
  fetchRelatedPosts,
} from "@/lib/journal-server";
import { breadcrumbLd, orgRef, jsonLdScript } from "@/lib/seo";
import { LEGAL_INFO } from "@/lib/legal";

const SITE_URL = LEGAL_INFO.shopUrl.replace(/\/$/, "");

// Build-time SSG for known slugs, with on-demand ISR for new posts.
export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await fetchAllPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await fetchPostBySlug(params.slug);
  if (!post) return {};
  const isoDate = post.date.replaceAll(".", "-");
  const canonical = `${SITE_URL}/journal/${post.slug}`;
  return {
    title: `${post.ja}　｜　株式会社イズミ産業`,
    description: post.lede.slice(0, 140),
    keywords: [post.cat, post.tag, ...post.tags],
    alternates: { canonical },
    openGraph: {
      title: post.ja,
      description: post.lede.slice(0, 140),
      type: "article",
      url: canonical,
      publishedTime: isoDate,
      modifiedTime: isoDate,
      locale: "ja_JP",
    },
  };
}

export default async function JournalArticle({
  params,
}: {
  params: { slug: string };
}) {
  const post = await fetchPostBySlug(params.slug);
  if (!post) notFound();

  const related = await fetchRelatedPosts(post.slug, 3);

  const isoDate = post.date.replaceAll(".", "-");
  const canonical = `${SITE_URL}/journal/${post.slug}`;
  const wordCount = post.lede.length + post.body.length;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.ja,
    alternativeHeadline: post.en,
    description: post.lede,
    datePublished: isoDate,
    dateModified: isoDate,
    inLanguage: "ja",
    articleSection: post.cat,
    keywords: [post.cat, post.tag, ...post.tags].join(", "),
    wordCount,
    image: [`${SITE_URL}/images/journal/${post.slug}.jpg`],
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    author: orgRef,
    publisher: orgRef,
    about: post.services.map((s) => ({
      "@type": "Service",
      name: SERVICE_LABELS[s].ja,
      url: `${SITE_URL}${SERVICE_LABELS[s].href}`,
    })),
  };

  const crumbLd = breadcrumbLd([
    { name: "ホーム", path: "/" },
    { name: "読み物", path: "/journal" },
    { name: post.ja, path: `/journal/${post.slug}` },
  ]);

  return (
    <section className="shell" style={{ maxWidth: 880 }}>
      <script {...jsonLdScript(articleLd)} />
      <script {...jsonLdScript(crumbLd)} />
      <div className="crumb">
        <Link href="/">ホーム</Link>
        <span className="sep">/</span>
        <Link href="/journal">読み物</Link>
        <span className="sep">/</span>
        <span>{post.ja}</span>
      </div>

      <article style={{ padding: "48px 0 32px" }}>
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontFamily: "var(--f-mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: "var(--ink-mute)",
            }}
          >
            {post.date}
          </span>
          <span
            className="label-ja"
            style={{ fontSize: 11, letterSpacing: "0.2em" }}
          >
            {post.cat}　·　{post.tag}
          </span>
        </div>

        <h1
          className="kanji-display"
          style={{
            fontSize: 36,
            lineHeight: 1.5,
            margin: "0 0 16px",
          }}
        >
          {post.ja}
        </h1>
        <div
          className="label-en"
          style={{ fontSize: 11, marginBottom: 32 }}
        >
          {post.en}
        </div>

        {post.coverImage ? (
          <div
            style={{
              position: "relative",
              aspectRatio: "16/9",
              marginBottom: 40,
              background: "var(--bg-alt)",
              overflow: "hidden",
            }}
          >
            <Image
              src={post.coverImage}
              alt={post.ja}
              fill
              sizes="(max-width: 880px) 100vw, 880px"
              quality={90}
              style={{ objectFit: "cover" }}
              priority
              unoptimized
            />
          </div>
        ) : (
          <div
            className="ph"
            style={{
              aspectRatio: "16/9",
              marginBottom: 40,
            }}
          >
            <div className="ph-label">IMG / {post.slug}</div>
          </div>
        )}

        <p
          style={{
            fontSize: 16,
            lineHeight: 2.2,
            color: "var(--ink-soft)",
            margin: "0 0 8px",
            fontFamily: "var(--f-heading)",
            letterSpacing: "0.04em",
          }}
        >
          {post.lede}
        </p>

        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            color: "var(--ink-mute)",
            padding: "24px 0",
            borderBottom: "1px solid var(--rule)",
          }}
        >
          {post.read}
        </div>

        <div className="journal-md" style={{ paddingTop: 24 }}>
          {post.body ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.body}
            </ReactMarkdown>
          ) : (
            <p
              style={{
                padding: "48px 0",
                textAlign: "center",
                color: "var(--ink-mute)",
                fontFamily: "var(--f-heading)",
                letterSpacing: "0.16em",
              }}
            >
              本文は只今準備中でございます
            </p>
          )}
        </div>
      </article>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "32px 0",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <Link href="/journal" className="btn btn-line">
          ← 読み物一覧へ
        </Link>
        <Link href="/shop" className="btn btn-ghost">
          お品書きを見る　→
        </Link>
      </div>

      {related.length > 0 && (
        <section style={{ padding: "64px 0" }}>
          <div className="section-head">
            <div className="lhs">
              <h2 style={{ fontSize: 22 }}>併せてお読み頂く覚え書き</h2>
              <span className="label-en">Related</span>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/journal/${p.slug}`}
                style={{
                  display: "block",
                  padding: "20px 20px 24px",
                  border: "1px solid var(--rule)",
                  background: "var(--paper)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    color: "var(--ink-mute)",
                    marginBottom: 10,
                  }}
                >
                  {p.date}　·　{p.cat}
                </div>
                <div
                  className="kanji-h"
                  style={{
                    fontSize: 15,
                    lineHeight: 1.7,
                    marginBottom: 8,
                  }}
                >
                  {p.ja}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--ink-mute)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {p.read}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
